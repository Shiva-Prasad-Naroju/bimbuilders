/**
 * Validates that a POST request originated from this site.
 *
 * Checks Origin first (most reliable; sent on cross-origin fetch), falls back
 * to Referer. Rejects when both are missing or point to a different host than
 * the request itself. Designed to deter off-site abuse of `/api/chat` and
 * `/api/contact`; it is NOT a substitute for auth — a determined attacker can
 * forge headers from a non-browser client.
 *
 * In development we accept missing Origin/Referer so curl/tools still work.
 */

function hostOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

export function isSameOrigin(req: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const selfHost = new URL(req.url).host;
  const originHost = hostOf(req.headers.get("origin"));
  if (originHost) return originHost === selfHost;

  const refererHost = hostOf(req.headers.get("referer"));
  if (refererHost) return refererHost === selfHost;

  return false;
}
