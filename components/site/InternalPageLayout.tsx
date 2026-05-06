/**
 * Wraps internal (non-home) routes to tighten the gap between the sticky header
 * and page content. Spacing is defined in `app/globals.css` under `.internal-page`
 * so overrides reliably win over symmetric `py-*` on section roots (Tailwind
 * arbitrary variants with attribute selectors were not consistently applied).
 *
 * Homepage is unchanged — it does not render inside this wrapper.
 */
export function InternalPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="internal-page">{children}</div>;
}
