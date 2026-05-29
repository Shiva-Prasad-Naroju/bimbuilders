export const SITE_NAME = "BIM Builders";

export type NavItem = {
  href: string;
  label: string;
};

/** Primary routes — single source for Header & cross-links */
export const mainNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

/** Next item in `mainNav` for footer “Next page” (wraps Home after Contact). */
export function getNextMainNavItem(pathname: string): NavItem {
  const normalized =
    pathname === "/" || pathname === ""
      ? "/"
      : pathname.replace(/\/$/, "") || "/";
  const i = mainNav.findIndex((n) => n.href === normalized);
  if (i === -1) {
    return mainNav[0]!;
  }
  return mainNav[(i + 1) % mainNav.length]!;
}
