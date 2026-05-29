/**
 * Single-line JSON logger for API events. Vercel / most log drains parse JSON
 * lines automatically, so structured fields become queryable without an SDK.
 *
 * Convention: `event` is a stable identifier (e.g. "chat.rate_limited"),
 * everything else is context. Never log secrets, full message bodies, or
 * upstream raw response bodies.
 */

type Level = "info" | "warn" | "error";

type Fields = Record<string, unknown>;

function emit(level: Level, event: string, fields: Fields): void {
  const payload = { level, event, ts: new Date().toISOString(), ...fields };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const log = {
  info: (event: string, fields: Fields = {}) => emit("info", event, fields),
  warn: (event: string, fields: Fields = {}) => emit("warn", event, fields),
  error: (event: string, fields: Fields = {}) => emit("error", event, fields),
};

/** Reduce an error to a safe-to-log string with no stack. */
export function errString(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
