"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Eye, Mail, Target } from "lucide-react";
import { AboutWhoVisual } from "@/components/site/AboutWhoVisual";
import { Container } from "@/components/Container";
import { fadeUp, fadeUpSmall, stagger, medium, once, smooth } from "@/lib/motion";
import { SITE_EMAIL, SITE_MAILTO } from "@/lib/site/social";

/* ── Data ── */

const VALUES = ["Accuracy", "Innovation", "Transparency", "Collaboration"] as const;

const REGIONS = ["India", "Middle East", "Europe", "US"] as const;

/* ── Shared ── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <span className="inline-flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
        {children}
      </span>
      {reduced ? (
        <span aria-hidden className="h-px w-8 bg-accent/50" />
      ) : (
        <motion.span
          aria-hidden
          className="h-px w-8 bg-accent/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={once}
          transition={{ duration: 0.55, ease: smooth }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </span>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-accent to-neon-blue bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/* ── 01 · Hero ── */

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-6 sm:pb-20 sm:pt-8 md:pb-24 lg:min-h-[min(540px,78vh)] lg:pb-28 lg:pt-12">
      {/* ── Cinematic architectural backdrop ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Base wash — keeps the dark theme cohesive */}
        <div className="absolute inset-0 bg-background/35" />
        {/* Directional fade — left stays readable, right opens into the image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.72) 34%, rgba(9,9,11,0.32) 62%, rgba(9,9,11,0.08) 100%)",
          }}
        />
        {/* Brand blue glow — top right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 88% 8%, rgba(59,130,246,0.20) 0%, transparent 62%)",
          }}
        />
        {/* Bottom fade — blends seamlessly into the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.7) 60%, rgb(9,9,11) 100%)",
          }}
        />
      </div>

      {/* Soft radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[100px] lg:left-[30%]"
        animate={reduced ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="lg:flex lg:min-h-[min(480px,72vh)] lg:items-center">
        <div className="lg:grid lg:w-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 xl:gap-14">
          <motion.div
            variants={stagger(80)}
            initial="hidden"
            whileInView="visible"
            viewport={once}
          >
            <motion.div variants={fadeUp} transition={medium}>
              <Eyebrow>About us</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={medium}
              className="mt-5 max-w-3xl text-[2.5rem] font-semibold leading-[1.06] tracking-tight text-text-primary sm:text-5xl md:text-[3.25rem] lg:max-w-none"
            >
              A team of BIM specialists turning design intent into{" "}
              <GradientText>build-ready precision.</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={medium}
              className="mt-6 max-w-xl text-[16.5px] leading-[1.75] text-text-secondary lg:max-w-lg"
            >
              We model architecture, structure, and interiors that integrate cleanly into
              how you build — coordinated, clash-free, and ready for the field.
            </motion.p>

            <motion.div
              variants={stagger(45)}
              initial="hidden"
              whileInView="visible"
              viewport={once}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              <motion.span
                variants={fadeUpSmall}
                transition={medium}
                className="text-[13px] font-medium text-text-secondary"
              >
                Global BIM standards
              </motion.span>
              {REGIONS.map((region) => (
                <motion.span
                  key={region}
                  variants={fadeUpSmall}
                  transition={medium}
                  className="rounded-full border border-border/80 bg-surface/50 px-2.5 py-1 text-[12px] text-text-tertiary transition-colors duration-200 hover:border-accent/25 hover:text-text-secondary"
                >
                  {region}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="mt-12 lg:mt-0">
            <AboutWhoVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 02 · Mission, Vision & Values ── */

function Principles() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-16 sm:py-20 md:py-24">
      {/* ── Blueprint-toned architectural backdrop ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1517490232338-06b912a786b5?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        {/* Strong wash — keeps the section readable, image stays atmospheric */}
        <div className="absolute inset-0 bg-surface/70" />
        {/* Diagonal brand glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(59,130,246,0.10) 0%, transparent 60%)",
          }}
        />
        {/* Top + bottom blends — seamless transitions */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background: "linear-gradient(to bottom, rgb(9,9,11) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to top, rgb(9,9,11) 0%, transparent 100%)",
          }}
        />
      </div>

      <Container>
        <motion.div
          variants={stagger(75)}
          initial="hidden"
          whileInView="visible"
          viewport={once}
        >
          <motion.div variants={fadeUp} transition={medium}>
            <Eyebrow>What drives us</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              Mission &amp; vision.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              transition={medium}
              className="relative overflow-hidden rounded-2xl border border-border bg-background p-7 sm:p-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <Target className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                Mission
              </div>
              <p className="text-[17px] leading-[1.65] text-text-primary sm:text-lg">
                Empower the AEC industry with precise, data-driven BIM that cuts
                rework and sharpens every decision.
              </p>
              {/* Accent edge */}
              <span aria-hidden className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-accent to-neon-blue opacity-60" />
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              transition={medium}
              className="rounded-2xl border border-border bg-background p-7 sm:p-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                <Eye className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} aria-hidden />
                Vision
              </div>
              <p className="text-[17px] leading-[1.65] text-text-primary sm:text-lg">
                Become the BIM partner teams trust globally — where design, data,
                and delivery meet.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div variants={fadeUp} transition={medium} className="mt-10 sm:mt-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-tertiary">
              Core values
            </p>
            <motion.ul
              role="list"
              className="mt-4 flex flex-wrap gap-3"
              variants={stagger(50)}
              initial="hidden"
              whileInView="visible"
              viewport={once}
            >
              {VALUES.map((value, i) => (
                <motion.li
                  key={value}
                  variants={fadeUpSmall}
                  transition={{ duration: 0.4, ease: smooth }}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-[14px] font-medium text-text-primary"
                >
                  <span aria-hidden className="text-[10px] font-semibold tabular-nums text-accent/70">
                    0{i + 1}
                  </span>
                  {value}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 03 · CTA ── */

function CTA() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24 md:py-28">
      {/* ── Forward-looking architectural backdrop ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        {/* Deep wash — CTA copy must stay crisp */}
        <div className="absolute inset-0 bg-background/65" />
        {/* Centered brand spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(59,130,246,0.14) 0%, transparent 65%)",
          }}
        />
        {/* Top blend into Principles section */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background: "linear-gradient(to bottom, rgb(9,9,11) 0%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[90px]"
        animate={reduced ? undefined : { opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container narrow>
        <motion.div
          variants={stagger(70)}
          initial="hidden"
          whileInView="visible"
          viewport={once}
          className="text-center"
        >
          <motion.div variants={fadeUp} transition={medium}>
            <Eyebrow>Let&apos;s build together</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={medium}
            className="mt-5 text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-4xl"
          >
            Have a project <GradientText>in mind?</GradientText>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={medium}
            className="mx-auto mt-4 max-w-sm text-[16px] leading-[1.7] text-text-secondary"
          >
            Tell us what you&apos;re building. We&apos;ll bring the precision.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={medium}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white shadow-[0_8px_24px_-12px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
            >
              Start a project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
            <a
              href={SITE_MAILTO}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              {SITE_EMAIL}
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Page export ── */

export function About() {
  return (
    <>
      <Hero />
      <Principles />
      <CTA />
    </>
  );
}
