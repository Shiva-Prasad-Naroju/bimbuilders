"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Blocks, Building2, ChevronLeft, ChevronRight, Layers, ScanLine } from "lucide-react";
import { HeroArchServices } from "@/components/site/HeroArchServices";
import { HeroFeatureGrid } from "@/components/site/HeroFeatureGrid";
import {
  HeroFlowSlide,
  heroFlowCtaPrimaryClass,
  heroFlowCtaRowClass,
  heroFlowCtaSecondaryClass,
  heroFlowTaglineClass,
  heroFlowTitleClass,
} from "@/components/site/HeroFlowSlide";
import { HeroLGSServices } from "@/components/site/HeroLGSServices";
import { HeroMasonryServices } from "@/components/site/HeroMasonryServices";
import { HeroScanServices } from "@/components/site/HeroScanServices";
import { useDocumentHidden } from "@/lib/hooks";

const SLIDE_COUNT = 5;
const AUTOPLAY_INTERVAL_MS = 5000;

const HERO_IMG = "/images/hero-bg.avif";
const HERO_IMG_SIZE = { width: 1659, height: 948 };
const SLIDE_ARCH_IMG = "/images/slides/bim-arch-and-structure.avif";
const SLIDE_ARCH_SIZE = { width: 1521, height: 1034 };
const SLIDE_SCAN_IMG = "/images/slides/scan-to-bim.avif";
const SLIDE_SCAN_SIZE = { width: 1717, height: 916 };
const SLIDE_MASONRY_IMG = "/images/slides/masonry-shop-drawings.avif";
const SLIDE_MASONRY_SIZE = { width: 1254, height: 1254 };
const SLIDE_LGS_IMG = "/images/slides/lgs.avif";
const SLIDE_LGS_SIZE = { width: 1536, height: 1024 };

/** Slide 1 brand overview — mirrors the 4-item grid on every service slide */
const SLIDE1_CAPABILITIES = [
  { title: "Architectural & Structural", icon: Building2 },
  { title: "Scan to BIM", icon: ScanLine },
  { title: "Masonry drawings", icon: Blocks },
  { title: "Light gauge steel", icon: Layers },
] as const;

/** Apple-style emphasized decelerate */
const MATERIAL_EASE = [0.32, 0.72, 0, 1] as const;

/** Fills the active carousel dot left→right, then triggers advance */
function HeroCarouselDotProgress({
  runKey,
  paused,
  onComplete,
}: {
  runKey: number;
  paused: boolean;
  onComplete: () => void;
}) {
  const controls = useAnimationControls();
  const onCompleteRef = useRef(onComplete);
  // Keep the latest callback in a ref without re-running the animation effect.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (paused) {
      controls.stop();
      return;
    }

    let cancelled = false;
    controls.set({ scaleX: 0 });
    void controls
      .start({
        scaleX: 1,
        transition: {
          duration: AUTOPLAY_INTERVAL_MS / 1000,
          ease: "linear",
        },
      })
      .then(() => {
        if (!cancelled && !document.hidden) onCompleteRef.current();
      });

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [runKey, paused, controls]);

  return (
    <motion.span
      className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent to-neon-blue"
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      animate={controls}
      aria-hidden
    />
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const documentHidden = useDocumentHidden();
  // Pause auto-advance only while the tab is hidden; preserves prior behavior
  // (reduced-motion is not force-paused here).
  const autoplayPaused = reduced ? false : documentHidden;

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const advanceSlide = useCallback(() => {
    setIndex((current) => (current + 1) % SLIDE_COUNT);
  }, []);

  const slideTransition = reduced
    ? { duration: 0.01 }
    : { duration: 0.85, ease: MATERIAL_EASE };

  const slideWidth = `${100 / SLIDE_COUNT}%`;

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start === null) return;
      const end = e.changedTouches[0]?.clientX ?? start;
      const dx = end - start;
      if (Math.abs(dx) > 48) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev],
  );

  return (
    <section
      // Mobile: sit cleanly below the fixed header so its translucent
      // backdrop never crops the top of the slide images. lg+ keeps the
      // original cinematic under-header full-bleed via `-mt-16`.
      className="relative isolate h-[calc(100dvh-4rem)] min-h-[32rem] overflow-hidden bg-zinc-950 text-white lg:-mt-16 lg:h-dvh lg:min-h-[36rem]"
      aria-label="Homepage hero carousel"
      aria-roledescription="carousel"
    >
      {/* ── Slide counter — desktop only (lg+), top-right ── */}
      <div
        className="pointer-events-none absolute right-10 top-24 z-30 hidden items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-white/40 tabular-nums lg:flex"
        aria-hidden
      >
        <span className="text-white/80">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-white/20" />
        <span>{String(SLIDE_COUNT).padStart(2, "0")}</span>
      </div>

      {/* ── Prev / Next — ghost pills, md+ only ── */}
      <NavButton direction="prev" onClick={goPrev} />
      <NavButton direction="next" onClick={goNext} />

      {/* ── Slides — full-bleed horizontal carousel ── */}
      <div
        className="relative h-full overflow-hidden touch-pan-y"
        aria-live="polite"
        aria-atomic="true"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex h-full will-change-transform"
          style={{ width: `${SLIDE_COUNT * 100}%` }}
          animate={{ x: `-${index * (100 / SLIDE_COUNT)}%` }}
          transition={slideTransition}
        >
          <HeroFlowSlide
            aria-label="1 of 5: We build your dreams into digital reality"
            aria-hidden={index !== 0}
            width={slideWidth}
            priority
            active={index === 0}
            image={{
              src: HERO_IMG,
              alt: "Modern building and BIM field capture at dusk",
              ...HERO_IMG_SIZE,
            }}
            content={
              <>
                <h1 className={heroFlowTitleClass}>
                  <span className="block">We build your</span>
                  <span className="block bg-gradient-to-r from-accent via-neon-blue to-accent bg-clip-text text-transparent">
                    digital reality.
                  </span>
                </h1>
                <p className={heroFlowTaglineClass}>Precision models. Flawless delivery.</p>
                <HeroFeatureGrid items={SLIDE1_CAPABILITIES} active={index === 0} onDark />
                <HeroSlideCtas />
              </>
            }
          />

          <HeroFlowSlide
            aria-label="2 of 5: BIM Architecture and Structure"
            aria-hidden={index !== 1}
            width={slideWidth}
            active={index === 1}
            image={{
              src: SLIDE_ARCH_IMG,
              alt: "BIM architecture and structure visualization",
              ...SLIDE_ARCH_SIZE,
            }}
            content={
              <>
                <h2 className={heroFlowTitleClass}>
                  <span className="block">BIM Arch &amp;</span>
                  <span className="block bg-gradient-to-r from-accent via-neon-blue to-accent bg-clip-text text-transparent">
                    Structure
                  </span>
                </h2>
                <p className={heroFlowTaglineClass}>Smarter designs. Stronger structures.</p>
                <HeroArchServices onDark active={index === 1} />
                <HeroSlideCtas />
              </>
            }
          />

          <HeroFlowSlide
            aria-label="3 of 5: Scan to BIM services"
            aria-hidden={index !== 2}
            width={slideWidth}
            active={index === 2}
            image={{
              src: SLIDE_SCAN_IMG,
              alt: "Laser scan point cloud transforming into a detailed BIM building model",
              ...SLIDE_SCAN_SIZE,
            }}
            content={
              <>
                <h2 className={heroFlowTitleClass}>
                  <span className="block">Scan to BIM</span>
                  <span className="block bg-gradient-to-r from-accent via-neon-blue to-accent bg-clip-text text-transparent">
                    Services
                  </span>
                </h2>
                <p className={heroFlowTaglineClass}>Real-world data. Accurate models.</p>
                <HeroScanServices onDark active={index === 2} />
                <HeroSlideCtas />
              </>
            }
          />

          <HeroFlowSlide
            aria-label="4 of 5: Masonry shop drawings"
            aria-hidden={index !== 3}
            width={slideWidth}
            active={index === 3}
            image={{
              src: SLIDE_MASONRY_IMG,
              alt: "Masonry shop drawings — blueprints, concrete blocks, and building under construction",
              ...SLIDE_MASONRY_SIZE,
            }}
            content={
              <>
                <h2 className={heroFlowTitleClass}>
                  <span className="block">Masonry Shop</span>
                  <span className="block bg-gradient-to-r from-accent via-neon-blue to-accent bg-clip-text text-transparent">
                    Drawings
                  </span>
                </h2>
                <p className={heroFlowTaglineClass}>Accuracy in every block.</p>
                <HeroMasonryServices onDark active={index === 3} />
                <HeroSlideCtas />
              </>
            }
          />

          <HeroFlowSlide
            aria-label="5 of 5: Light gauge steel structural solutions"
            aria-hidden={index !== 4}
            width={slideWidth}
            active={index === 4}
            image={{
              src: SLIDE_LGS_IMG,
              alt: "Light gauge steel house frame BIM model with shop drawings and steel profiles",
              ...SLIDE_LGS_SIZE,
            }}
            content={
              <>
                <h2 className={heroFlowTitleClass}>
                  <span className="block">Light Gauge</span>
                  <span className="block bg-gradient-to-r from-accent via-neon-blue to-accent bg-clip-text text-transparent">
                    Steel Solutions
                  </span>
                </h2>
                <p className={heroFlowTaglineClass}>Precise. Efficient. Buildable.</p>
                <HeroLGSServices onDark active={index === 4} />
                <HeroSlideCtas />
              </>
            }
          />
        </motion.div>
      </div>

      {/* ── Dot indicator — minimal glass strip at bottom center ── */}
      <div
        className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/[0.09] bg-black/25 px-3 py-2 backdrop-blur-md sm:gap-2 sm:px-3.5 sm:py-2"
        style={{
          bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
        }}
        role="tablist"
        aria-label="Choose slide"
      >
        {Array.from({ length: SLIDE_COUNT }, (_, i) => {
          const isActive = index === i;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${i + 1} of ${SLIDE_COUNT}`}
              onClick={() => goTo(i)}
              className={`relative h-1.5 shrink-0 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive
                  ? "w-8 bg-white/20"
                  : "w-1.5 bg-white/25 hover:bg-white/45"
              }`}
            >
              {isActive ? (
                reduced ? (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-neon-blue" aria-hidden />
                ) : (
                  <HeroCarouselDotProgress
                    runKey={index}
                    paused={autoplayPaused}
                    onComplete={advanceSlide}
                  />
                )
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function HeroSlideCtas() {
  return (
    <nav aria-label="Primary actions" className={heroFlowCtaRowClass}>
      <Link href="/contact" className={heroFlowCtaPrimaryClass}>
        <span>Start a project</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-0.5"
          strokeWidth={2}
          aria-hidden
        />
      </Link>
      <Link href="/projects" className={heroFlowCtaSecondaryClass}>
        <span>View projects</span>
      </Link>
    </nav>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      className={`group absolute top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.09] bg-black/20 text-white/70 backdrop-blur-sm transition-all duration-300 ease-out hover:border-white/20 hover:bg-black/38 hover:text-white active:scale-95 md:flex lg:h-11 lg:w-11 ${
        isPrev ? "md:left-5 lg:left-7" : "md:right-5 lg:right-7"
      }`}
    >
      <Icon
        className={`h-4 w-4 transition-transform duration-300 ease-out lg:h-5 lg:w-5 ${
          isPrev
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}
