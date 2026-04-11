"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, fadeUpSmall, stagger, medium } from "@/lib/motion";
import { HeroBuildingAnimation } from "./HeroBuildingAnimation";

const heroStagger = stagger(70);

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
        <motion.div
          className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 65%)",
          }}
          animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, rgba(14,165,233,0.18) 0%, transparent 65%)",
          }}
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          {/* ── Text column ── */}
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.p
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/80 px-3.5 py-1.5 text-xs font-medium text-text-secondary shadow-sm backdrop-blur"
              variants={fadeUpSmall}
              transition={medium}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              End-to-End BIM Services
            </motion.p>

            <motion.h1
              className="text-balance text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl sm:leading-[1.08]"
              variants={fadeUp}
              transition={medium}
            >
              Precision BIM That Makes Your Designs{" "}
              <span className="text-accent">Build-Ready</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-secondary"
              variants={fadeUp}
              transition={medium}
            >
              We create coordinated BIM models that improve design clarity,
              reduce conflicts, and support smooth construction — from concept
              to execution.
            </motion.p>

            <motion.p
              className="mt-3 max-w-xl text-sm text-text-tertiary"
              variants={fadeUp}
              transition={medium}
            >
              Architectural, Structural, Scan-to-BIM, Coordination, and
              Automation workflows built using Revit, Navisworks, and Dynamo.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeUp}
              transition={medium}
            >
              <a
                href="#projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.02] hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface-elevated px-6 text-sm font-semibold text-text-primary shadow-sm transition-all duration-150 hover:scale-[1.02] hover:border-accent/30 hover:shadow-md active:scale-[0.98]"
              >
                Get a Quote
              </a>
            </motion.div>
          </motion.div>

          {/* ── Animation column ── */}
          <motion.div
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_80px_-24px_rgba(15,23,42,0.15)]">
              <HeroBuildingAnimation />

              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-background/85 px-3 py-2 text-xs text-text-secondary shadow-sm backdrop-blur">
                <span className="font-medium text-text-primary">Coordinated BIM Model</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                  Revit + Navisworks
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
