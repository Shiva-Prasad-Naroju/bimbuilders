"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#bim-action", label: "BIM in Action" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Tools" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-[15px] tracking-tight text-text-primary transition-opacity duration-150 hover:opacity-70 active:opacity-60"
        >
          <span className="font-bold">BIM</span>
          <span className="font-light ml-0.5">Builders</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative text-sm font-medium transition-colors duration-150 ${
                activeSection === item.href.slice(1)
                  ? "text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full bg-accent transition-[width] duration-200 ease-out ${
                  activeSection === item.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:scale-[1.02] hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
          >
            Get a Quote
          </a>
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
            <div className="flex flex-col gap-3 py-4">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-150 ${
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                className="mt-1 inline-flex h-10 items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-all duration-150 hover:bg-accent-hover active:scale-[0.98]"
                onClick={() => setOpen(false)}
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
