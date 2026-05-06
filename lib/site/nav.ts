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
  { href: "/bim-in-action", label: "BIM in Action" },
  { href: "/process", label: "Process" },
  { href: "/projects", label: "Projects" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
] as const;
