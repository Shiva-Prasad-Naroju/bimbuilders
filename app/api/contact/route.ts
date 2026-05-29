import { NextResponse } from "next/server";
import {
  getEmailJsConfigStatus,
  isEmailJsConfigured,
  isEmailJsServerReady,
} from "@/lib/contact/config";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/contact/emailjs";
import { checkRateLimit, pruneRateLimitStore } from "@/lib/contact/rate-limit";
import { parseContactBody, toTemplateParams } from "@/lib/contact/validate";

export const runtime = "nodejs";

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function adminFailureResponse(result: Extract<
  Awaited<ReturnType<typeof sendAdminNotification>>,
  { ok: false }
>) {
  const isConfigError =
    result.code === "EMAILJS_NOT_CONFIGURED" ||
    result.code === "EMAILJS_MISSING_PRIVATE_KEY" ||
    result.code === "EMAILJS_NON_BROWSER_DISABLED" ||
    result.code === "EMAILJS_STRICT_MODE";

  const status = result.code === "EMAILJS_RATE_LIMITED"
    ? 429
    : isConfigError
      ? 503
      : result.status >= 400 && result.status < 600
        ? result.status
        : 502;

  return NextResponse.json(
    {
      success: false,
      error:
        status === 503
          ? "Contact form is temporarily unavailable. Please email us directly."
          : "We could not send your message. Please try again or email us directly.",
      code: result.code,
      stage: "admin_notification",
    },
    { status }
  );
}

export async function POST(req: Request) {
  pruneRateLimitStore();

  try {
    if (!isEmailJsConfigured()) {
      const status = getEmailJsConfigStatus();
      console.error("[contact] EmailJS not configured. Missing:", status.missing.join(", "));
      return NextResponse.json(
        {
          success: false,
          error: "Contact form is temporarily unavailable. Please email us directly.",
          code: "EMAILJS_NOT_CONFIGURED",
          stage: "configuration",
          ...(process.env.NODE_ENV === "development" ? { missing: status.missing } : {}),
        },
        { status: 503 }
      );
    }

    if (!isEmailJsServerReady()) {
      console.warn(
        "[contact] EMAILJS_PRIVATE_KEY is missing — attempting send (requires EmailJS Security settings)."
      );
    }

    const ip = getClientIp(req);
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please wait ${rate.retryAfterSec ?? 60} seconds and try again.`,
          code: "RATE_LIMITED",
          stage: "rate_limit",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    const honeypot =
      body && typeof body === "object"
        ? String((body as Record<string, unknown>).website ?? "").trim()
        : "";
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const validated = parseContactBody(body);
    if (!validated.ok) {
      return NextResponse.json(
        { success: false, error: validated.error, code: "VALIDATION_ERROR", stage: "validation" },
        { status: 400 }
      );
    }

    const templateParams = toTemplateParams(validated.data);

    const adminResult = await sendAdminNotification(templateParams);
    if (!adminResult.ok) {
      console.error(
        "[contact] Admin notification failed:",
        adminResult.code,
        adminResult.logDetail
      );
      return adminFailureResponse(adminResult);
    }

    const userResult = await sendUserConfirmation(templateParams);
    if (!userResult.ok) {
      console.warn(
        "[contact] User confirmation failed (admin was notified):",
        userResult.code,
        userResult.logDetail
      );
    }

    return NextResponse.json({
      success: true,
      userConfirmationSent: userResult.ok,
    });
  } catch (error) {
    console.error("[contact] Unhandled error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
        code: "INTERNAL_ERROR",
        stage: "handler",
      },
      { status: 500 }
    );
  }
}
