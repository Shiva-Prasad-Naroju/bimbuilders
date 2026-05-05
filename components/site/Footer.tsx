"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { Mail } from "lucide-react";

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
                    href="mailto:info@bimbuilders.in"
                    className="transition-colors duration-150 hover:text-accent"
                  >
                    info@bimbuilders.in
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
          <div className="flex items-center gap-2">
            <a 
              href="mailto:info@bimbuilders.in" 
              className="group relative flex h-10 w-10 items-center justify-center transition-all duration-500 ease-out hover:-translate-y-1"
              title="Email Us"
            >
              <div className="absolute inset-0 scale-50 rounded-full bg-[#EA4335]/0 transition-all duration-500 group-hover:scale-100 group-hover:bg-[#EA4335]/10" />
              <Mail className="relative h-5 w-5 text-[#EA4335] transition-transform duration-500 group-hover:scale-110" />
            </a>
            <a 
              href="https://www.linkedin.com/company/bimbuilders/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative flex h-10 w-10 items-center justify-center transition-all duration-500 ease-out hover:-translate-y-1"
              title="LinkedIn"
            >
              <div className="absolute inset-0 scale-50 rounded-full bg-[#0A66C2]/0 transition-all duration-500 group-hover:scale-100 group-hover:bg-[#0A66C2]/10" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative text-[#0A66C2] transition-transform duration-500 group-hover:scale-110"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/bim_builders?utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative flex h-10 w-10 items-center justify-center transition-all duration-500 ease-out hover:-translate-y-1"
              title="Instagram"
            >
              <div className="absolute inset-0 scale-50 rounded-full bg-[#E4405F]/0 transition-all duration-500 group-hover:scale-100 group-hover:bg-[#E4405F]/10" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative text-[#E4405F] transition-transform duration-500 group-hover:scale-110"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <div className="h-4 w-px bg-border mx-2" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs font-medium transition-colors duration-150 hover:text-accent flex items-center gap-2"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
