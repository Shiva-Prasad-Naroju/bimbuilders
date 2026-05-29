"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { SocialContactIcons } from "@/components/site/SocialContactIcons";
import { SITE_EMAIL } from "@/lib/site/social";
import { getNextMainNavItem } from "@/lib/site/nav";
import { useHydrated } from "@/lib/hooks";

// Compile-time fallback year keeps the SSR markup and the first client paint
// identical; the effect below upgrades to the live year after hydration so a
// New Year's Eve cache hit can't go stale.
const BUILD_YEAR = new Date().getFullYear();

function CopyrightYear() {
  const hydrated = useHydrated();
  // After hydration, show the live year so a statically-cached page can't
  // display a stale copyright year (e.g. served from a New Year's Eve build).
  return <>{hydrated ? new Date().getFullYear() : BUILD_YEAR}</>;
}

function NextPageNavLink() {
  const pathname = usePathname();
  const next = getNextMainNavItem(pathname);

  return (
    <Link
      href={next.href}
      scroll
      className="flex items-center gap-2 text-xs font-medium transition-colors duration-150 hover:text-accent"
      aria-label={`Go to ${next.label}`}
    >
      Next page
      <span className="text-xs font-semibold leading-none tabular-nums" aria-hidden>
        &gt;
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-surface py-10 sm:py-12"
      style={{
        paddingBottom: "max(2.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.5rem))",
      }}
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <p className="text-sm text-text-primary">
              <span className="font-bold">BIM</span>
              <span className="ml-0.5 font-light">Builders</span>
            </p>
            <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-text-secondary sm:text-sm">
              We are a team of BIM professionals focused on creating accurate,
              coordinated models that support real-world construction.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Services
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>
                  <Link href="/services" className="transition-colors duration-150 hover:text-text-primary">
                    BIM Modeling
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="transition-colors duration-150 hover:text-text-primary">
                    Coordination
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="transition-colors duration-150 hover:text-text-primary">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Company
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>
                  <Link href="/about" className="transition-colors duration-150 hover:text-text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="transition-colors duration-150 hover:text-text-primary">
                    Our Process
                  </Link>
                </li>
                <li>
                  <Link href="/#tools" className="transition-colors duration-150 hover:text-text-primary">
                    Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>
                  <Link href="/contact" className="transition-colors duration-150 hover:text-text-primary">
                    Contact form
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="break-all transition-colors duration-150 hover:text-accent"
                  >
                    {SITE_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917981072411"
                    className="transition-colors duration-150 hover:text-accent"
                  >
                    +91 7981072411
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent sm:mt-10" />

        <div className="mt-6 flex flex-col gap-4 text-xs text-text-tertiary sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">&copy; <CopyrightYear /> BIM Builders. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            <SocialContactIcons variant="footer" />
            <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
            <NextPageNavLink />
          </div>
        </div>
      </Container>
    </footer>
  );
}
