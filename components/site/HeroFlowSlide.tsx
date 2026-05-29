"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export type HeroSlideImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type HeroFlowSlideProps = {
  "aria-label": string;
  "aria-hidden": boolean;
  content: ReactNode;
  image: HeroSlideImage;
  priority?: boolean;
  active?: boolean;
  /** Width of this slide within the horizontal flex row (e.g. "20%"). */
  width: string;
};

/**
 * Mobile/desktop split:
 * - Mobile/tablet (<lg): image fills a dedicated top band; content sits in a
 *   clean dark band beneath it. This avoids the wide architectural source
 *   images being squeezed into a tall portrait viewport behind a heavy scrim
 *   and getting cropped past recognition.
 * - Desktop (lg+): image goes full-bleed and content overlays the left side
 *   with a cinematic left-to-right scrim — unchanged from the original design.
 */
export function HeroFlowSlide({
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  content,
  image,
  priority,
  active = false,
  width,
}: HeroFlowSlideProps) {
  const reduced = useReducedMotion();
  const slideRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 70, damping: 28, mass: 0.9 };
  const tx = useSpring(useTransform(mx, [-1, 1], [-12, 12]), springConfig);
  const ty = useSpring(useTransform(my, [-1, 1], [-8, 8]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = slideRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <article
      ref={slideRef}
      className="relative h-full shrink-0 grow-0 overflow-hidden bg-zinc-950"
      style={{ width }}
      role="group"
      aria-roledescription="slide"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── Image band ───
       * Mobile: top ~54% of the slide (a dedicated showcase area).
       * lg+: full-bleed (original cinematic layout). */}
      <div className="absolute inset-x-0 top-0 bottom-[46%] overflow-hidden lg:inset-0 lg:bottom-0">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            x: reduced ? 0 : tx,
            y: reduced ? 0 : ty,
            scale: 1.05,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            quality={88}
            sizes="(max-width: 1023px) 100vw, 100vw"
            className={`object-cover object-center will-change-transform ${
              !reduced && active
                ? "motion-safe:animate-[hero-kenburns_14s_ease-out_both]"
                : ""
            }`}
          />
        </motion.div>

        {/* Top darkening edge — softens sky/ceiling and frames the image under the header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,9,11,0.62) 0%, rgba(9,9,11,0.22) 55%, transparent 100%)",
          }}
        />

        {/* Desktop only: heavy left-side gradient so content floats over the image */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.82) 18%, rgba(9,9,11,0.58) 35%, rgba(9,9,11,0.28) 50%, rgba(9,9,11,0.10) 64%, transparent 76%)",
          }}
        />

        {/* Mobile only: short bottom fade so the image dissolves into the content band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.55) 55%, rgb(9,9,11) 100%)",
          }}
        />

        {/* Global cinematic vignette — corner darkening for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(9,9,11,0.40) 100%)",
          }}
        />

        {/* Ambient blue accent glow behind content (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[56%] lg:block"
          style={{
            background:
              "radial-gradient(ellipse 90% 65% at 10% 55%, rgba(59,130,246,0.09) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ─── Content band ───
       * Mobile: solid dark area filling the bottom 46% of the slide.
       * lg+: full-height overlay anchored to the left half (original layout). */}
      <div className="absolute inset-x-0 bottom-0 top-[54%] z-10 flex flex-col justify-start bg-zinc-950 lg:inset-0 lg:top-0 lg:justify-center lg:bg-transparent">
        <div className="w-full px-5 pb-[4.75rem] pt-3 sm:max-w-[32rem] sm:px-8 sm:pb-20 sm:pt-4 lg:max-w-none lg:w-[52%] lg:px-14 lg:py-0 xl:w-[48%] xl:px-16 2xl:px-20">
          <ContentReveal active={active} reduced={!!reduced}>
            {content}
          </ContentReveal>
        </div>
      </div>

      {/* ─── Floating UI chrome — ambient framing elements (desktop only) ─── */}

      <span
        aria-hidden
        className="pointer-events-none absolute right-8 top-24 z-20 hidden h-9 w-9 border-l border-t border-white/[0.13] lg:block xl:right-10 xl:top-28"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-20 right-8 z-20 hidden h-9 w-9 border-b border-r border-white/[0.13] lg:block xl:bottom-24 xl:right-10"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-20 hidden w-px lg:block"
        style={{
          left: "50%",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 75%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)",
        }}
      />
    </article>
  );
}

/** Slide content reveal: Y-lift + opacity fade when slide becomes active. */
function ContentReveal({
  active,
  reduced,
  children,
}: {
  active: boolean;
  reduced: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : { opacity: active ? 1 : 0.2, y: active ? 0 : 18 }
      }
      transition={{
        duration: 0.85,
        ease: [0.32, 0.72, 0, 1],
        delay: active ? 0.18 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/** ─── Typography — unified scale for all slides ─── */

/**
 * Single title class for every slide. Two manual `<span className="block">` lines
 * create the consistent 2-line composition. max-w prevents runaway line lengths.
 */
export const heroFlowTitleClass =
  "font-hero-title max-w-[16ch] text-pretty text-[clamp(1.75rem,5.2vw,4.75rem)] font-normal leading-[1.04] tracking-[-0.03em] text-white";

/**
 * One-line tagline beneath the title — same weight on every slide.
 * Intentionally lighter and smaller than body copy to create hierarchy.
 */
export const heroFlowTaglineClass =
  "mt-2 text-[12.5px] font-light leading-snug text-zinc-300/65 sm:text-[13px] lg:mt-3 lg:text-[13.5px]";

/** ─── CTAs — matches services overview modal (accent + outline) ─── */

export const heroFlowCtaRowClass =
  "mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3 lg:mt-8";

export const heroFlowCtaPrimaryClass =
  "group/cta inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-5 text-[13.5px] font-medium text-white shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98] sm:h-11 sm:px-6 sm:text-[14px] lg:h-12 lg:px-7 lg:text-[15px]";

export const heroFlowCtaSecondaryClass =
  "group/cta inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-all duration-300 ease-out hover:border-white/35 hover:bg-white/10 active:scale-[0.98] sm:h-11 sm:px-6 sm:text-[14px] lg:h-12 lg:px-7 lg:text-[15px]";
