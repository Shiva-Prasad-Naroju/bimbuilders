/** Known EmailJS API error phrases (see Account → Security). */
const NON_BROWSER_DISABLED =
  "API access from non-browser environments is currently disabled";
const NON_BROWSER_HINT = "non-browser environments";
const NON_BROWSER_DISABLED_ALT = "API calls are disabled for non-browser applications";
const STRICT_MODE_NO_KEY = "API calls in strict mode, but no private key was passed";

export type EmailJsErrorCode =
  | "EMAILJS_NOT_CONFIGURED"
  | "EMAILJS_MISSING_PRIVATE_KEY"
  | "EMAILJS_NON_BROWSER_DISABLED"
  | "EMAILJS_STRICT_MODE"
  | "EMAILJS_RATE_LIMITED"
  | "EMAILJS_REQUEST_FAILED"
  | "EMAILJS_UNKNOWN";

export function classifyEmailJsError(
  status: number,
  responseText: string
): { code: EmailJsErrorCode; message: string; logDetail: string } {
  const text = responseText.trim();

  if (
    text.includes(NON_BROWSER_DISABLED) ||
    text.includes(NON_BROWSER_DISABLED_ALT) ||
    text.includes(NON_BROWSER_HINT)
  ) {
    return {
      code: "EMAILJS_NON_BROWSER_DISABLED",
      message:
        "Email service cannot send from the server. Enable “Allow EmailJS API for non-browser applications” in EmailJS Account → Security.",
      logDetail: text || NON_BROWSER_DISABLED,
    };
  }

  if (text.includes(STRICT_MODE_NO_KEY)) {
    return {
      code: "EMAILJS_STRICT_MODE",
      message:
        "Email service requires a private key. Add EMAILJS_PRIVATE_KEY to your server environment.",
      logDetail: text || STRICT_MODE_NO_KEY,
    };
  }

  if (status === 429) {
    return {
      code: "EMAILJS_RATE_LIMITED",
      message: "Email service is busy. Please try again in a moment.",
      logDetail: text || "Rate limited",
    };
  }

  if (status === 400) {
    return {
      code: "EMAILJS_REQUEST_FAILED",
      message: text || "Invalid email request. Check template parameters.",
      logDetail: text || "Bad request",
    };
  }

  return {
    code: "EMAILJS_UNKNOWN",
    message: text || `Email service returned status ${status}.`,
    logDetail: text || `HTTP ${status}`,
  };
}

export function missingPrivateKeyError(): {
  code: EmailJsErrorCode;
  message: string;
  logDetail: string;
} {
  return {
    code: "EMAILJS_MISSING_PRIVATE_KEY",
    message:
      "Email service is not fully configured. Add EMAILJS_PRIVATE_KEY (from EmailJS Account → API keys).",
    logDetail: "EMAILJS_PRIVATE_KEY is not set",
  };
}
