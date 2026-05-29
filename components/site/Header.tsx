"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site/nav";
import { useLocationHash, useScrolledPast } from "@/lib/hooks";

function navLinkActive(pathname: string, href: string, hash: string): boolean {
  if (href.startsWith("/#")) {
    const target = href.slice(1);
    return pathname === "/" && hash === target;
  }
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(12);
  const hash = useLocationHash();

  // Close the mobile menu when the route changes. Adjusting state during render
  // (instead of in an effect) avoids an extra commit and a flash of the open menu.
  const [navContext, setNavContext] = useState(pathname);
  if (pathname !== navContext) {
    setNavContext(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="flex h-16 w-full items-center pl-4 sm:pl-6 lg:pl-8">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md px-0.5 py-1 text-text-primary outline-offset-4 transition-opacity duration-150 hover:opacity-80 active:opacity-70"
          aria-label="BIM Builders home"
        >
          <span className="flex items-baseline text-[17px] font-sans tracking-tight sm:text-xl">
            <span className="font-bold">BIM</span>
            <span className="ml-1 font-light">Builders</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-4 pr-4 sm:gap-6 sm:pr-6 lg:flex lg:pr-8">
          <nav className="flex items-center gap-1 lg:gap-0.5" aria-label="Primary">
            {mainNav.map((item) => {
              const active = navLinkActive(pathname, item.href, hash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-out outline-offset-4 ${
                    active ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-2 right-2 h-[2px] rounded-full bg-accent transition-[opacity,transform] duration-200 ease-out ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 pr-4 sm:pr-6 lg:hidden lg:pr-8">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-text-primary transition-colors duration-150 hover:bg-surface active:bg-surface-elevated"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-b border-border bg-background px-4 sm:px-6 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              // On short landscape viewports (e.g. 320×568 iPhone SE) the open
              // menu can otherwise exceed the screen with no escape. Cap to
              // viewport height minus the header and allow inner scroll.
              maxHeight: "calc(100dvh - 4rem)",
              overflowY: "auto",
              overscrollBehavior: "contain",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
            }}
          >
            <div className="flex flex-col gap-1 py-3">
              {mainNav.map((item, i) => {
                const active = navLinkActive(pathname, item.href, hash);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors duration-150 ${
                        active ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-surface hover:text-text-primary active:bg-surface"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-all duration-150 hover:bg-accent-hover active:scale-[0.98]"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
