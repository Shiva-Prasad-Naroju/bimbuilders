"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";
import { Container } from "@/components/Container";
import { SERVICES } from "@/lib/site/services-data";
import {
  SITE_EMAIL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
} from "@/lib/site/social";

const PHONE_DISPLAY = "+91 79810 72411";
const PHONE_E164 = "+917981072411";

/** All site services plus a catch-all — kept in sync with `lib/site/services-data`. */
const PROJECT_TYPES = [...SERVICES.map((service) => service.title), "Other"] as const;

type Status = "idle" | "sending" | "sent" | "error";

const contactLinks = [
  { label: "Email", value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}`, icon: Mail, tint: "bg-[#4285F4]/12 text-[#8AB4F8]" },
  { label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_E164}`, icon: Phone, tint: "bg-[#34A853]/12 text-[#81C995]" },
  { label: "Location", value: "Hyderabad, India", href: undefined, icon: MapPin, tint: "bg-[#FBBC04]/12 text-[#FDD663]" },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: SITE_LINKEDIN_URL },
  { label: "Instagram", href: SITE_INSTAGRAM_URL },
] as const;


export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const projectType = String(fd.get("projectType") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          message,
          website,
        }),
      });

      await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error("send_failed");
      }

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-white/[0.09] bg-zinc-950/60 px-3.5 py-2.5 text-[15px] text-text-primary placeholder:text-text-tertiary backdrop-blur-sm transition-[border-color,box-shadow] duration-150 hover:border-white/20 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

  const surfaceCardClass =
    "rounded-[24px] border border-white/[0.09] bg-zinc-950/70 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_12px_48px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.07] backdrop-blur-2xl backdrop-saturate-150";

  return (
    <section
      className="relative isolate py-10 sm:py-14 md:py-16"
      aria-label="Contact"
    >
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-5xl"
        >
          <header className="max-w-2xl">
            <p className="font-hero-title text-[11px] font-normal uppercase tracking-[0.22em] text-accent">
              Get in touch
            </p>
            <h1 className="mt-3 font-hero-title text-[2rem] font-normal leading-tight tracking-tight text-text-primary sm:text-[2.5rem] sm:leading-[1.15]">
              Contact us
            </h1>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`mx-auto mt-6 max-w-xl ${surfaceCardClass} px-6 py-12 text-center sm:mt-7 sm:px-10 lg:mt-8`}
                role="status"
              >
                <CheckCircle2
                  className="mx-auto h-10 w-10 text-emerald-500"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="mt-4 text-lg font-medium text-text-primary">Message sent</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
                  Thanks for reaching out. We&apos;ll get back to you at the email you provided.
                </p>
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`mx-auto mt-6 max-w-xl ${surfaceCardClass} px-6 py-12 text-center sm:mt-7 sm:px-10 lg:mt-8`}
                role="alert"
              >
                <XCircle
                  className="mx-auto h-10 w-10 text-red-500"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="mt-4 text-lg font-medium text-text-primary">Message not sent</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
                  We couldn&apos;t send your message right now. Please email us directly at{" "}
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="font-medium text-text-primary underline underline-offset-2 transition-colors hover:text-accent"
                  >
                    {SITE_EMAIL}
                  </a>
                  , or try again in a moment.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-accent px-7 text-sm font-medium text-white shadow-[0_6px_20px_-8px_var(--accent-glow)] transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
                >
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form-grid"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 grid gap-8 sm:mt-7 sm:gap-10 lg:mt-8 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-14"
              >
                <aside className={`order-2 lg:order-1 ${surfaceCardClass} p-5 sm:p-6`}>
              <p className="font-hero-title text-[13px] font-normal tracking-wide text-text-tertiary">
                Direct contact
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
                Reach us directly — we typically reply within one business day.
              </p>

              <ul role="list" className="mt-5 space-y-3">
                {contactLinks.map(({ label, value, href, icon: Icon, tint }) => (
                  <li key={label}>
                    <div className="flex gap-3 rounded-xl border border-border/60 bg-background/70 p-3 backdrop-blur-sm transition-colors duration-150 hover:border-border hover:bg-background/85">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tint}`}
                      >
                        <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block truncate text-[14px] font-medium text-text-primary transition-colors hover:text-accent"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="mt-0.5 block text-[14px] font-medium text-text-primary">
                            {value}
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-border/80 pt-5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
                  Connect
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-border/80 bg-background/60 px-3.5 text-[13px] font-medium text-text-secondary transition-colors duration-150 hover:border-accent/30 hover:text-accent"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-2.5 rounded-xl bg-background/40 px-3 py-2.5 ring-1 ring-inset ring-border/50">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary" aria-hidden />
                <p className="text-[12px] leading-relaxed text-text-tertiary">
                  Mon–Sat, 10:00–19:00 IST
                  <span className="text-text-tertiary/80"> · NDA on request</span>
                </p>
              </div>
            </aside>

            <div className="order-1 min-w-0 lg:order-2">
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className={`relative ${surfaceCardClass} px-5 py-6 sm:px-8 sm:py-7`}
              >
                    {/* Honeypot — hidden from users, bots often fill it */}
                    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <h2 className="font-hero-title text-[15px] font-normal tracking-tight text-text-primary sm:text-base">
                      Send a message
                    </h2>
                    <p className="mt-1.5 text-[13px] text-text-tertiary">
                      Tell us about your project and we&apos;ll get back to you shortly.
                    </p>

                    <div className="mt-6 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="name" label="Name" required>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            minLength={2}
                            autoComplete="name"
                            className={fieldClass}
                          />
                        </Field>
                        <Field id="company" label="Company">
                          <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            className={fieldClass}
                          />
                        </Field>
                      </div>

                      <Field id="email" label="Email" required>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className={fieldClass}
                        />
                      </Field>

                      <Field id="projectType" label="What do you need help with?">
                        <select
                          id="projectType"
                          name="projectType"
                          defaultValue=""
                          className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          }}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {PROJECT_TYPES.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field id="message" label="Message" required>
                        <textarea
                          id="message"
                          name="message"
                          required
                          minLength={10}
                          rows={4}
                          placeholder="Scope, timeline, software, or any details we should know."
                          className={`${fieldClass} resize-y min-h-[7.5rem] leading-relaxed`}
                        />
                      </Field>

                      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-text-tertiary">
                          We only use your details to respond to this inquiry.
                        </p>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-accent px-7 text-sm font-medium text-white shadow-[0_6px_20px_-8px_var(--accent-glow)] transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:min-w-[7.5rem]"
                        >
                          {status === "sending" ? (
                            <span className="inline-flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                              Sending
                            </span>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>
              </motion.form>
            </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-text-secondary">
        {label}
        {required ? (
          <span className="text-text-tertiary" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
