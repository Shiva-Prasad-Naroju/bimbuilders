/**
 * Per-route, fixed-window IP rate limiter.
 *
 * NOTE — this is in-memory and PER-INSTANCE. On Vercel each function instance
 * keeps its own counters; the effective limit is `limit × concurrent instances`.
 * For a marketing site with 2 endpoints this is acceptable as a pre-launch
 * defence against casual abuse — the limits below are tight enough that even
 * 10x amplification by parallel cold starts still blocks meaningful scraping
 * or LLM-cost attacks. Swap for Vercel KV / Upstash before traffic scales.
 */

type Entry = { count: number; resetAt: number };

const stores = new Map<string, Map<string, Entry>>();

export type RateLimitConfig = {
  /** Logical bucket name — separates limits per route. */
  name: string;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Max requests allowed in the window. */
  max: number;
};

export type RateLimitResult =
  | { allowed: true; remaining: number; resetAt: number }
  | { allowed: false; retryAfterSec: number; resetAt: number };

function bucketFor(name: string): Map<string, Entry> {
  let bucket = stores.get(name);
  if (!bucket) {
    bucket = new Map();
    stores.set(name, bucket);
  }
  return bucket;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier || "unknown";
  const bucket = bucketFor(config.name);
  const entry = bucket.get(key);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + config.windowMs;
    bucket.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: config.max - 1, resetAt };
  }

  if (entry.count >= config.max) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: config.max - entry.count,
    resetAt: entry.resetAt,
  };
}

/** Drop expired entries — call opportunistically on POST to bound memory. */
export function pruneRateLimitStore(name: string): void {
  const bucket = stores.get(name);
  if (!bucket) return;
  const now = Date.now();
  for (const [key, entry] of bucket) {
    if (now >= entry.resetAt) bucket.delete(key);
  }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}
