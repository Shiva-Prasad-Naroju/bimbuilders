export default function SiteLoading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60dvh] items-center justify-center px-6"
    >
      <div className="flex items-center gap-3 text-sm text-text-tertiary">
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-accent/70"
        />
        <span>Loading…</span>
      </div>
    </div>
  );
}
