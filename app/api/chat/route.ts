import { NextResponse } from "next/server";
import { CHAT_LIMITS, parseChatBody } from "@/lib/chat/validate";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { fetchWithTimeout, FetchTimeoutError } from "@/lib/api/fetch-with-timeout";
import {
  checkRateLimit,
  getClientIp,
  pruneRateLimitStore,
} from "@/lib/api/rate-limit";
import { isSameOrigin } from "@/lib/api/same-origin";
import { errString, log } from "@/lib/api/log";

export const runtime = "nodejs";

const RATE_LIMIT = {
  name: "chat",
  windowMs: 60 * 1000,
  max: 10,
} as const;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TIMEOUT_MS = 12_000;

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  pruneRateLimitStore(RATE_LIMIT.name);

  if (!isSameOrigin(req)) {
    log.warn("chat.origin_rejected", {
      origin: req.headers.get("origin"),
      referer: req.headers.get("referer"),
    });
    return json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(ip, RATE_LIMIT);
  if (!rate.allowed) {
    log.warn("chat.rate_limited", { ip, retryAfterSec: rate.retryAfterSec });
    return new NextResponse(
      JSON.stringify({
        error: `Too many requests. Try again in ${rate.retryAfterSec}s.`,
        code: "RATE_LIMITED",
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
  if (contentLength > CHAT_LIMITS.maxBodyBytes) {
    log.warn("chat.body_too_large", { ip, contentLength });
    return json({ error: "Payload too large", code: "PAYLOAD_TOO_LARGE" }, 413);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    log.error("chat.config_missing", { missing: "GROQ_API_KEY" });
    return json(
      { error: "Chat is temporarily unavailable.", code: "CONFIG_MISSING" },
      503
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON.", code: "BAD_JSON" }, 400);
  }

  const validated = parseChatBody(body);
  if (!validated.ok) {
    log.info("chat.validation_failed", { ip, code: validated.code });
    return json({ error: validated.error, code: validated.code }, 400);
  }

  let response: Response;
  try {
    response = await fetchWithTimeout(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...validated.messages],
        temperature: 0.7,
        max_tokens: 1024,
      }),
      timeoutMs: GROQ_TIMEOUT_MS,
    });
  } catch (err) {
    if (err instanceof FetchTimeoutError) {
      log.error("chat.upstream_timeout", { ip, timeoutMs: err.timeoutMs });
      return json(
        { error: "The assistant is taking too long to respond. Please try again.", code: "UPSTREAM_TIMEOUT" },
        504
      );
    }
    log.error("chat.upstream_network_error", { ip, err: errString(err) });
    return json(
      { error: "The assistant is unreachable. Please try again shortly.", code: "UPSTREAM_UNREACHABLE" },
      502
    );
  }

  if (!response.ok) {
    const upstreamBody = await response.text().catch(() => "");
    log.error("chat.upstream_status", {
      ip,
      status: response.status,
      bodyPreview: upstreamBody.slice(0, 200),
    });
    const status = response.status === 429 ? 429 : 502;
    return json(
      {
        error: status === 429
          ? "The assistant is rate-limited upstream. Try again in a moment."
          : "The assistant is currently unavailable.",
        code: status === 429 ? "UPSTREAM_RATE_LIMITED" : "UPSTREAM_ERROR",
      },
      status
    );
  }

  let upstream: unknown;
  try {
    upstream = await response.json();
  } catch (err) {
    log.error("chat.upstream_bad_json", { ip, err: errString(err) });
    return json({ error: "The assistant returned an invalid response.", code: "UPSTREAM_BAD_JSON" }, 502);
  }

  const messageContent = extractAssistantMessage(upstream);
  if (!messageContent) {
    log.error("chat.upstream_no_message", { ip });
    return json({ error: "The assistant returned an empty response.", code: "UPSTREAM_EMPTY" }, 502);
  }

  return json({ message: messageContent }, 200);
}

function extractAssistantMessage(upstream: unknown): string | null {
  if (!upstream || typeof upstream !== "object") return null;
  const choices = (upstream as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;
  const first = choices[0] as { message?: { content?: unknown } } | undefined;
  const content = first?.message?.content;
  return typeof content === "string" && content.length > 0 ? content : null;
}
