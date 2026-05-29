"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Globe2, Layers } from "lucide-react";
import { fadeUpSmall, once, slideInRight, smooth, stagger } from "@/lib/motion";

const HIGHLIGHTS = [
  {
    icon: Layers,
    label: "Multi-discipline BIM",
    detail: "Architecture, structure & interiors in one model.",
    tint: "bg-[#4285F4]/12 text-[#8AB4F8]",
  },
  {
    icon: CheckCircle2,
    label: "Clash-free coordination",
    detail: "Issues resolved before they reach the site.",
    tint: "bg-[#34A853]/12 text-[#81C995]",
  },
  {
    icon: Globe2,
    label: "Global standards",
    detail: "Delivery aligned with international BIM workflows.",
    tint: "bg-[#FBBC04]/12 text-[#FDD663]",
  },
] as const;

export function AboutWhoVisual() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
      variants={slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={once}
      transition={{ duration: 0.55, ease: smooth }}
    >
      <motion.div
        variants={stagger(55)}
        initial="hidden"
        whileInView="visible"
        viewport={once}
        className="rounded-[28px] bg-surface-elevated p-5 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_20px_-6px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.05] sm:p-6"
      >
        <p className="font-hero-title text-[13px] font-normal tracking-wide text-text-tertiary">
          How we work
        </p>
        <p className="mt-2 font-hero-title text-[15px] font-normal leading-snug tracking-tight text-text-primary sm:text-base">
          Architecture &amp; structure,{" "}
          <span className="text-text-secondary">one coordinated model.</span>
        </p>
        <ul role="list" className="mt-5 space-y-4 border-t border-border/80 pt-5">
          {HIGHLIGHTS.map(({ icon: Icon, label, detail, tint }, i) => (
            <motion.li
              key={label}
              variants={fadeUpSmall}
              transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.06, ease: smooth }}
              className="flex gap-3.5"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block text-[14px] font-medium leading-snug text-text-primary sm:text-[15px]">
                  {label}
                </span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-text-tertiary">
                  {detail}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
