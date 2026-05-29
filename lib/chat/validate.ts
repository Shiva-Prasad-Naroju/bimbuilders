/**
 * Validates the message array sent to /api/chat.
 *
 * Limits are chosen to keep both per-request cost (Groq tokens) and per-instance
 * memory bounded under abuse. They are intentionally conservative — the assistant
 * is a short-form sales bot, not a long-context tool.
 */

export const CHAT_LIMITS = {
  /** Hard cap on raw request body bytes. Beyond this we 413 without parsing. */
  maxBodyBytes: 32 * 1024, // 32 KiB
  /** Max user+assistant turns we accept from the client per request. */
  maxMessages: 20,
  /** Per-message content length cap. */
  maxContentChars: 4000,
  /** Total content character cap across all messages. */
  maxTotalContentChars: 16000,
} as const;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatValidationResult =
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; error: string; code: ChatValidationCode };

export type ChatValidationCode =
  | "BODY_NOT_OBJECT"
  | "MESSAGES_NOT_ARRAY"
  | "MESSAGES_EMPTY"
  | "TOO_MANY_MESSAGES"
  | "MESSAGE_SHAPE"
  | "INVALID_ROLE"
  | "CONTENT_TOO_LONG"
  | "TOTAL_CONTENT_TOO_LONG";

export function parseChatBody(body: unknown): ChatValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, code: "BODY_NOT_OBJECT", error: "Invalid request body." };
  }

  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages)) {
    return { ok: false, code: "MESSAGES_NOT_ARRAY", error: "messages must be an array." };
  }

  if (messages.length === 0) {
    return { ok: false, code: "MESSAGES_EMPTY", error: "messages cannot be empty." };
  }

  if (messages.length > CHAT_LIMITS.maxMessages) {
    return {
      ok: false,
      code: "TOO_MANY_MESSAGES",
      error: `Too many messages (max ${CHAT_LIMITS.maxMessages}).`,
    };
  }

  const cleaned: ChatMessage[] = [];
  let totalChars = 0;

  for (const raw of messages) {
    if (!raw || typeof raw !== "object") {
      return { ok: false, code: "MESSAGE_SHAPE", error: "Each message must be an object." };
    }

    const role = (raw as Record<string, unknown>).role;
    const content = (raw as Record<string, unknown>).content;

    if (role !== "user" && role !== "assistant") {
      // Drop any "system" or other roles — only the server controls the system prompt.
      return { ok: false, code: "INVALID_ROLE", error: "role must be user or assistant." };
    }

    if (typeof content !== "string") {
      return { ok: false, code: "MESSAGE_SHAPE", error: "content must be a string." };
    }

    if (content.length > CHAT_LIMITS.maxContentChars) {
      return {
        ok: false,
        code: "CONTENT_TOO_LONG",
        error: `Message too long (max ${CHAT_LIMITS.maxContentChars} chars).`,
      };
    }

    totalChars += content.length;
    if (totalChars > CHAT_LIMITS.maxTotalContentChars) {
      return {
        ok: false,
        code: "TOTAL_CONTENT_TOO_LONG",
        error: "Conversation too long. Start a new chat.",
      };
    }

    cleaned.push({ role, content });
  }

  return { ok: true, messages: cleaned };
}
