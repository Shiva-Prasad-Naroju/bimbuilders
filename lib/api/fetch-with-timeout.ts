/**
 * `fetch` wrapper that aborts after `timeoutMs` and surfaces a typed error so
 * callers can distinguish a network/timeout failure from an HTTP-status failure.
 *
 * Why this exists: serverless functions cap at a fixed duration. A hung upstream
 * (Groq, EmailJS) that takes the full duration consumes a concurrency slot the
 * whole time, cascading into platform-level 503s under load. Aborting at e.g.
 * 12s frees the slot while leaving enough headroom for typical responses (~1–3s).
 */

export class FetchTimeoutError extends Error {
  readonly code = "FETCH_TIMEOUT";
  constructor(public readonly timeoutMs: number) {
    super(`Upstream request exceeded ${timeoutMs}ms`);
  }
}

export async function fetchWithTimeout(
  input: string | URL,
  init: RequestInit & { timeoutMs: number }
): Promise<Response> {
  const { timeoutMs, signal: callerSignal, ...rest } = init;
  const controller = new AbortController();

  const onCallerAbort = () => controller.abort(callerSignal?.reason);
  if (callerSignal) {
    if (callerSignal.aborted) controller.abort(callerSignal.reason);
    else callerSignal.addEventListener("abort", onCallerAbort, { once: true });
  }

  const timer = setTimeout(() => controller.abort(new FetchTimeoutError(timeoutMs)), timeoutMs);

  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      const reason = controller.signal.reason;
      if (reason instanceof FetchTimeoutError) throw reason;
    }
    throw err;
  } finally {
    clearTimeout(timer);
    if (callerSignal) callerSignal.removeEventListener("abort", onCallerAbort);
  }
}
