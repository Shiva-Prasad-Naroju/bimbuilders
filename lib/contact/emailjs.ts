import { ADMIN_EMAIL, getEmailJsConfig } from "@/lib/contact/config";
import { classifyEmailJsError, type EmailJsErrorCode } from "@/lib/contact/emailjs-errors";

const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";

export type EmailJsSendResult =
  | { ok: true; status: number }
  | {
      ok: false;
      status: number;
      message: string;
      code: EmailJsErrorCode;
      logDetail: string;
      template?: "admin" | "user";
    };

async function parseEmailJsResponseBody(res: Response): Promise<string> {
  const raw = await res.text().catch(() => "");
  if (!raw) return "";

  try {
    const json = JSON.parse(raw) as unknown;
    if (typeof json === "string") return json;
    if (json && typeof json === "object") {
      const obj = json as Record<string, unknown>;
      const parts = [obj.message, obj.error, obj.text, obj.statusText]
        .filter((v) => typeof v === "string")
        .map(String);
      if (parts.length > 0) return parts.join(" — ");
      return JSON.stringify(json);
    }
  } catch {
    // plain text body
  }

  return raw;
}

export async function sendEmailJsTemplate(
  templateId: string,
  templateParams: Record<string, string>,
  context: { template: "admin" | "user" }
): Promise<EmailJsSendResult> {
  const { serviceId, publicKey, privateKey } = getEmailJsConfig();

  if (!serviceId || !publicKey) {
    const err = {
      code: "EMAILJS_NOT_CONFIGURED" as const,
      message: "Email service is not configured.",
      logDetail: "Missing service ID or public key",
    };
    return { ok: false, status: 500, ...err, template: context.template };
  }

  const body: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
  };

  if (privateKey) {
    body.accessToken = privateKey;
  } else if (process.env.NODE_ENV === "development") {
    console.warn(
      `[contact] EMAILJS_PRIVATE_KEY is not set — send may fail if "Use Private Key" is enabled in EmailJS Security.`
    );
  }

  try {
    const res = await fetch(EMAILJS_SEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return { ok: true, status: res.status };
    }

    const responseText = await parseEmailJsResponseBody(res);
    const classified = classifyEmailJsError(res.status, responseText);

    console.error(
      `[contact] EmailJS ${context.template} send failed:`,
      res.status,
      classified.code,
      classified.logDetail
    );

    return {
      ok: false,
      status: res.status,
      message: classified.message,
      code: classified.code,
      logDetail: classified.logDetail,
      template: context.template,
    };
  } catch (err) {
    const logDetail = err instanceof Error ? err.message : String(err);
    console.error(`[contact] EmailJS ${context.template} request error:`, logDetail);
    return {
      ok: false,
      status: 500,
      message: "Email service is unreachable. Please try again later.",
      code: "EMAILJS_REQUEST_FAILED",
      logDetail,
      template: context.template,
    };
  }
}

export async function sendAdminNotification(
  templateParams: Record<string, string>
): Promise<EmailJsSendResult> {
  const { adminTemplateId } = getEmailJsConfig();
  if (!adminTemplateId) {
    return {
      ok: false,
      status: 500,
      message: "Admin email template is not configured.",
      code: "EMAILJS_NOT_CONFIGURED",
      logDetail: "Missing admin template ID",
      template: "admin",
    };
  }

  return sendEmailJsTemplate(
    adminTemplateId,
    {
      ...templateParams,
      to_email: ADMIN_EMAIL,
      reply_to: templateParams.from_email,
    },
    { template: "admin" }
  );
}

export async function sendUserConfirmation(
  templateParams: Record<string, string>
): Promise<EmailJsSendResult> {
  const { userTemplateId } = getEmailJsConfig();
  if (!userTemplateId) {
    return {
      ok: false,
      status: 500,
      message: "User confirmation template is not configured.",
      code: "EMAILJS_NOT_CONFIGURED",
      logDetail: "Missing user template ID",
      template: "user",
    };
  }

  return sendEmailJsTemplate(
    userTemplateId,
    {
      ...templateParams,
      to_email: templateParams.from_email,
    },
    { template: "user" }
  );
}
