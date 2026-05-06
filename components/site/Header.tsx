"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mainNav } from "@/lib/site/nav";

function navLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center rounded-md outline-offset-4 transition-opacity duration-150 hover:opacity-80 active:opacity-70"
        >
          <Image
            src="/images/bb_logo.png"
            alt="BIM Builders"
            width={200}
            height={48}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex lg:gap-0.5" aria-label="Primary">
          {mainNav.map((item) => {
            const active = navLinkActive(pathname, item.href);
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

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
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
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-b border-border bg-background px-4 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col gap-1 py-4">
              {mainNav.map((item, i) => {
                const active = navLinkActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                        active ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-surface hover:text-text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-all duration-150 hover:bg-accent-hover active:scale-[0.98]"
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
