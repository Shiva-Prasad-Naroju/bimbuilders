import { SITE_EMAIL } from "@/lib/site/social";

export const ADMIN_EMAIL = SITE_EMAIL;

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function getEmailJsConfig() {
  const serviceId = readEnv("EMAILJS_SERVICE_ID", "NEXT_PUBLIC_EMAILJS_SERVICE_ID");
  const publicKey = readEnv("EMAILJS_PUBLIC_KEY", "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
  const privateKey = readEnv("EMAILJS_PRIVATE_KEY");
  const adminTemplateId = readEnv(
    "EMAILJS_ADMIN_TEMPLATE_ID",
    "NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID"
  );
  const userTemplateId = readEnv(
    "EMAILJS_USER_TEMPLATE_ID",
    "NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID"
  );

  return {
    serviceId,
    publicKey,
    privateKey,
    adminTemplateId,
    userTemplateId,
  };
}

/** Minimum vars for route handler (uses NEXT_PUBLIC_* fallbacks). */
export function isEmailJsConfigured(): boolean {
  const c = getEmailJsConfig();
  return Boolean(c.serviceId && c.publicKey && c.adminTemplateId && c.userTemplateId);
}

export function isEmailJsServerReady(): boolean {
  const c = getEmailJsConfig();
  return isEmailJsConfigured() && Boolean(c.privateKey);
}

export function getEmailJsConfigStatus(): {
  ok: boolean;
  missing: string[];
} {
  const c = getEmailJsConfig();
  const missing: string[] = [];
  if (!c.serviceId) missing.push("EMAILJS_SERVICE_ID or NEXT_PUBLIC_EMAILJS_SERVICE_ID");
  if (!c.publicKey) missing.push("EMAILJS_PUBLIC_KEY or NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
  if (!c.privateKey) missing.push("EMAILJS_PRIVATE_KEY");
  if (!c.adminTemplateId) {
    missing.push("EMAILJS_ADMIN_TEMPLATE_ID or NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID");
  }
  if (!c.userTemplateId) {
    missing.push("EMAILJS_USER_TEMPLATE_ID or NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID");
  }
  return { ok: missing.length === 0, missing };
}
