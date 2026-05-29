import { NextResponse } from "next/server";
import {
  getEmailJsConfigStatus,
  isEmailJsConfigured,
  isEmailJsServerReady,
} from "@/lib/contact/config";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/contact/emailjs";
import { parseContactBody, toTemplateParams } from "@/lib/contact/validate";
import {
  checkRateLimit,
  getClientIp,
  pruneRateLimitStore,
} from "@/lib/api/rate-limit";
import { isSameOrigin } from "@/lib/api/same-origin";
import { errString, log } from "@/lib/api/log";

export const runtime = "nodejs";

const RATE_LIMIT = {
  name: "contact",
  windowMs: 15 * 60 * 1000,
  max: 5,
} as const;

const MAX_BODY_BYTES = 32 * 1024;

function adminFailureResponse(
  result: Extract<Awaited<ReturnType<typeof sendAdminNotification>>, { ok: false }>
) {
  const isConfigError =
    result.code === "EMAILJS_NOT_CONFIGURED" ||
    result.code === "EMAILJS_MISSING_PRIVATE_KEY" ||
    result.code === "EMAILJS_NON_BROWSER_DISABLED" ||
    result.code === "EMAILJS_STRICT_MODE";

  const status =
    result.code === "EMAILJS_RATE_LIMITED"
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
  pruneRateLimitStore(RATE_LIMIT.name);

  if (!isSameOrigin(req)) {
    log.warn("contact.origin_rejected", {
      origin: req.headers.get("origin"),
      referer: req.headers.get("referer"),
    });
    return NextResponse.json(
      { success: false, error: "Forbidden", code: "FORBIDDEN" },
      { status: 403 }
    );
  }

  try {
    if (!isEmailJsConfigured()) {
      const status = getEmailJsConfigStatus();
      log.error("contact.config_missing", { missing: status.missing });
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
      log.warn("contact.private_key_missing");
    }

    const ip = getClientIp(req);
    const rate = checkRateLimit(ip, RATE_LIMIT);
    if (!rate.allowed) {
      log.warn("contact.rate_limited", { ip, retryAfterSec: rate.retryAfterSec });
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: `Too many requests. Please wait ${rate.retryAfterSec} seconds and try again.`,
          code: "RATE_LIMITED",
          stage: "rate_limit",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rate.retryAfterSec),
          },
        }
      );
    }

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      log.warn("contact.body_too_large", { ip, contentLength });
      return NextResponse.json(
        {
          success: false,
          error: "Your message is too large to send through the form.",
          code: "PAYLOAD_TOO_LARGE",
          stage: "validation",
        },
        { status: 413 }
      );
    }

    const body = await req.json().catch(() => null);

    const honeypot =
      body && typeof body === "object"
        ? String((body as Record<string, unknown>).website ?? "").trim()
        : "";
    if (honeypot) {
      log.warn("contact.honeypot_tripped", { ip });
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
      // Lead is at risk of being lost. Log the FULL submission so it can be
      // recovered from log drains while we have no durable capture layer.
      log.error("contact.admin_send_failed", {
        ip,
        code: adminResult.code,
        status: adminResult.status,
        logDetail: adminResult.logDetail,
        lead: {
          name: validated.data.name,
          email: validated.data.email,
          company: validated.data.company,
          projectType: validated.data.projectType,
          message: validated.data.message,
        },
      });
      return adminFailureResponse(adminResult);
    }

    const userResult = await sendUserConfirmation(templateParams);
    if (!userResult.ok) {
      log.warn("contact.user_confirmation_failed", {
        ip,
        code: userResult.code,
        status: userResult.status,
        logDetail: userResult.logDetail,
      });
    }

    log.info("contact.submitted", {
      ip,
      projectType: validated.data.projectType,
      userConfirmationSent: userResult.ok,
    });

    return NextResponse.json({
      success: true,
      userConfirmationSent: userResult.ok,
    });
  } catch (error) {
    log.error("contact.unhandled_error", { err: errString(error) });
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
