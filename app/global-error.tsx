"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en" className="dark h-full">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#09090b",
          color: "#fafafa",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#60a5fa",
              marginBottom: 12,
            }}
          >
            Unexpected error
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            The page failed to render.
          </h1>
          <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 24 }}>
            We&apos;ve been notified. Please try again — most retries succeed.
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 40,
              padding: "0 18px",
              borderRadius: 9999,
              background: "#3b82f6",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              border: 0,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
