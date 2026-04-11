"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, once, medium } from "@/lib/motion";

export function DemoCTA() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 transition-[border-color,box-shadow] duration-200 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/30";

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-950 px-6 py-12 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.65)] sm:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={once}
              transition={medium}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Start Your Project
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-300">
                Tell us about your project — scope, timeline, and what you need.
                We&apos;ll get back to you with a clear plan.
              </p>

              <div className="mt-8 space-y-3 text-sm text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">Email:</span>
                  <a href="mailto:BimBuilders1@gmail.com" className="text-white hover:text-blue-300 transition-colors">
                    BimBuilders1@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">Phone:</span>
                  <a href="tel:+917981072411" className="text-white hover:text-blue-300 transition-colors">
                    +91 7981072411
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={once}
              transition={{ ...medium, delay: 0.06 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-10 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" aria-hidden />
                    </motion.div>
                    <p className="mt-4 text-lg font-semibold text-white">
                      Message sent
                    </p>
                    <p className="mt-2 text-sm text-zinc-300">
                      We&apos;ll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="space-y-4"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium uppercase tracking-wide text-zinc-400"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className={inputClass}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium uppercase tracking-wide text-zinc-400"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-medium uppercase tracking-wide text-zinc-400"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your project — type, scope, and timeline."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-zinc-900 shadow-sm transition-all duration-150 hover:scale-[1.01] hover:bg-zinc-100 hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Sending...
                        </>
                      ) : (
                        <>
                          Start Your Project
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
