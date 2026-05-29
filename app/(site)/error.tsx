"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";

export default function SiteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[site-error]", error);
  }, [error]);

  return (
    <Container>
      <section
        className="flex min-h-[60dvh] flex-col items-center justify-center py-20 text-center"
        aria-labelledby="site-error-title"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Something broke
        </p>
        <h1
          id="site-error-title"
          className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
        >
          This section couldn&apos;t load right now.
        </h1>
        <p className="mt-3 max-w-md text-sm text-text-secondary">
          It&apos;s probably temporary. Try again, or head back to the homepage.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-accent-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-text-primary transition-colors duration-150 hover:bg-surface"
          >
            Go home
          </Link>
        </div>
      </section>
    </Container>
  );
}
