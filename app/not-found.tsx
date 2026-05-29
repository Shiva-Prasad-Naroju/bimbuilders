import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-20 text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-accent-hover"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-text-primary transition-colors duration-150 hover:bg-surface"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
