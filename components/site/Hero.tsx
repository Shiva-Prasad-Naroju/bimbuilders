"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import { HeroBuildingAnimation } from "./HeroBuildingAnimation";
import { HeroBackdrop } from "./HeroBackdrop";
import { Achievements } from "./Achievements";

const heroStagger = stagger(70);

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden pt-20 pb-6 md:pt-24 md:pb-7">
      <HeroBackdrop />

      <Container wide className="relative z-[1] flex flex-1 flex-col">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          {/* ── Text column ── */}
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.h1
              className="mb-5 text-balance text-4xl font-bold tracking-tight text-text-primary [text-shadow:0_2px_28px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl xl:text-7xl sm:leading-[1.08]"
              variants={fadeUp}
              transition={medium}
            >
              Precision BIM That Makes Your Designs{" "}
              <span className="text-accent">Build-Ready</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-text-secondary [text-shadow:0_1px_18px_rgba(0,0,0,0.25)] sm:text-lg"
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
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeUp}
              transition={medium}
            >
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.02] hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface-elevated px-6 text-sm font-semibold text-text-primary shadow-sm transition-all duration-150 hover:scale-[1.02] hover:border-accent/30 hover:shadow-md active:scale-[0.98]"
              >
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Animation column ── */}
          <motion.div
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-[0_24px_70px_-18px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06] backdrop-blur-[2px] dark:shadow-[0_24px_70px_-18px_rgba(0,0,0,0.75)]">
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

      <div className="relative z-[1] mt-auto w-full">
        <Achievements embedded />
      </div>
    </section>
  );
}
