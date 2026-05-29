import { SERVICES } from "@/lib/site/services-data";

const PROJECT_TYPES = new Set([
  ...SERVICES.map((s) => s.title),
  "Other",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

function asTrimmedString(value: unknown, maxLen: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, maxLen);
}

export function parseContactBody(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const name = asTrimmedString(raw.name, 120);
  const email = asTrimmedString(raw.email, 254).toLowerCase();
  const company = asTrimmedString(raw.company, 160);
  const projectTypeRaw = asTrimmedString(raw.projectType, 200);
  const message = asTrimmedString(raw.message, 5000);

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your name (at least 2 characters)." };
  }

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!message || message.length < 10) {
    return { ok: false, error: "Please enter a message (at least 10 characters)." };
  }

  const projectType = projectTypeRaw || "Not specified";
  if (projectTypeRaw && !PROJECT_TYPES.has(projectTypeRaw)) {
    return { ok: false, error: "Please select a valid project type." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company: company || "—",
      projectType,
      message,
    },
  };
}

export function toTemplateParams(data: ContactPayload): Record<string, string> {
  return {
    from_name: data.name,
    from_email: data.email,
    company: data.company,
    project_type: data.projectType,
    message: data.message,
  };
}
