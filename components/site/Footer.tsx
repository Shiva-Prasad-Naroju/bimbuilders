"use client";

import Link from "next/link";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-text-primary">
              <span className="font-bold">BIM</span>
              <span className="font-light ml-0.5">Builders</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
              We are a team of BIM professionals focused on creating accurate,
              coordinated models that support real-world construction.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Services
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>
                  <a href="#services" className="transition-colors duration-150 hover:text-text-primary">
                    BIM Modeling
                  </a>
                </li>
                <li>
                  <a href="#services" className="transition-colors duration-150 hover:text-text-primary">
                    Coordination
                  </a>
                </li>
                <li>
                  <a href="#projects" className="transition-colors duration-150 hover:text-text-primary">
                    Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Company
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>
                  <a href="#about" className="transition-colors duration-150 hover:text-text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#process" className="transition-colors duration-150 hover:text-text-primary">
                    Our Process
                  </a>
                </li>
                <li>
                  <a href="#stack" className="transition-colors duration-150 hover:text-text-primary">
                    Tools
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>
                  <a
                    href="mailto:BimBuilders1@gmail.com"
                    className="transition-colors duration-150 hover:text-accent"
                  >
                    BimBuilders1@gmail.com
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

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="mt-8 flex flex-col gap-3 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} BIM Builders. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors duration-150 hover:text-text-primary">
              Privacy
            </Link>
            <Link href="#" className="transition-colors duration-150 hover:text-text-primary">
              Terms
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="transition-colors duration-150 hover:text-accent"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
