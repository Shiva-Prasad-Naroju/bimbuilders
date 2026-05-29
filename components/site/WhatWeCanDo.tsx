"use client";

import { useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, medium } from "@/lib/motion";
import type { ServiceDefinition } from "@/lib/site/services-data";
import { SERVICES } from "@/lib/site/services-data";

/** Horizontal gap between cards in px (matches `gap-5`). */
const GAP_PX = 20;

function colsForViewportWidth(w: number): number {
  if (w >= 1400) return 5;
  if (w >= 880) return 4;
  if (w >= 640) return 3;
  if (w >= 420) return 2;
  return 1;
}

function stepForCols(cols: number): number {
  if (cols >= 4) return 2;
  return 1;
}

/** Start indices reachable with prev/next (matches arrow stepping). */
function slidePositions(total: number, cols: number, step: number): number[] {
  const maxStart = Math.max(0, total - cols);
  const out: number[] = [0];
  let s = 0;
  while (s < maxStart) {
    const next = Math.min(s + step, maxStart);
    if (next === s) break;
    s = next;
    out.push(s);
  }
  return out;
}

function CarouselPagination({
  slides,
  activeIndex,
  onSelect,
}: {
  slides: number[];
  activeIndex: number;
  onSelect: (pos: number) => void;
}) {
  const total = slides.length;
  const safeActive = Math.max(0, Math.min(activeIndex, total - 1));
  // Progress bar shows the active position as a glowing pill that slides.
  // Track width is fluid; the pill is a fixed fraction (1/total).
  const pillWidthPct = 100 / total;
  const pillLeftPct = safeActive * pillWidthPct;

  return (
    <div className="mt-7 flex flex-col items-center gap-3 sm:mt-8">
      {/* Mobile + sm: minimal glowing progress bar */}
      <div
        role="tablist"
        aria-label="Carousel slides"
        className="relative h-1 w-full max-w-[14rem] overflow-hidden rounded-full bg-white/[0.07] md:hidden"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-white via-white to-white/90 shadow-[0_0_12px_rgba(255,255,255,0.45)] transition-[left,width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            left: `${pillLeftPct}%`,
            width: `${pillWidthPct}%`,
          }}
        />
        {/* Invisible tap targets above the track for accessibility */}
        <div className="absolute inset-0 flex">
          {slides.map((pos, idx) => (
            <button
              key={pos}
              type="button"
              role="tab"
              aria-selected={idx === safeActive}
              aria-label={`Slide ${idx + 1} of ${total}`}
              onClick={() => onSelect(pos)}
              className="h-full flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
            />
          ))}
        </div>
      </div>

      {/* md+: compact glowing dots */}
      <div
        role="tablist"
        aria-label="Carousel slides"
        className="hidden items-center gap-2 md:flex"
      >
        {slides.map((pos, idx) => {
          const isActive = idx === safeActive;
          return (
            <button
              key={pos}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${idx + 1} of ${total}`}
              onClick={() => onSelect(pos)}
              className={`relative h-1.5 shrink-0 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive
                  ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>

      <p className="text-[10.5px] tracking-[0.18em] text-white/40 sm:hidden">
        <span className="font-medium text-white/70 tabular-nums">
          {String(safeActive + 1).padStart(2, "0")}
        </span>
        <span className="mx-1.5">·</span>
        <span className="tabular-nums">{String(total).padStart(2, "0")}</span>
      </p>
    </div>
  );
}

function OfferCard({
  service,
  reduceMotion,
}: {
  service: ServiceDefinition;
  reduceMotion: boolean;
}) {
  return (
    <div className="min-w-0">
      <Link
        href={`/services#${service.id}`}
        scroll
        prefetch={false}
        aria-label={`Explore ${service.title}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-950/60 outline-offset-4 ring-1 ring-white/[0.06] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-zinc-950/80 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] hover:ring-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
      >
        {/* Image — slight inset for a "framed" feel */}
        <div className="relative m-1.5 aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900">
          <Image
            src={service.cardImage}
            alt=""
            fill
            sizes="(max-width: 419px) 100vw, (max-width: 639px) 50vw, (max-width: 879px) 33vw, (max-width: 1399px) 25vw, 20vw"
            className={`object-cover will-change-transform ${
              reduceMotion
                ? ""
                : "transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
            }`}
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]"
            aria-hidden
          />
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 text-pretty text-[15px] font-medium leading-snug tracking-tight text-white sm:text-[15.5px] md:text-base">
              {service.title}
            </h3>
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/55 transition-[background-color,color,transform] duration-300 ease-out group-hover:bg-white/[0.1] group-hover:text-white group-hover:rotate-12"
              aria-hidden
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function WhatWeCanDo() {
  const prefersReduced = useReducedMotion();
  const carouselId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const [vpWidth, setVpWidth] = useState(0);
  const [cols, setCols] = useState(4);
  const [startIndex, setStartIndex] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = (width: number) => {
      setVpWidth(width);
      setCols(colsForViewportWidth(width));
    };
    measure(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      measure(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = stepForCols(cols);
  const maxStart = Math.max(0, SERVICES.length - cols);
  const cardWidth = vpWidth > 0 && cols > 0 ? (vpWidth - (cols - 1) * GAP_PX) / cols : 0;
  const stride = cardWidth + GAP_PX;

  const goPrev = useCallback(() => {
    setStartIndex((i) => Math.max(0, i - step));
  }, [step]);

  const goNext = useCallback(() => {
    setStartIndex((i) => Math.min(maxStart, i + step));
  }, [maxStart, step]);

  const slides = useMemo(
    () => slidePositions(SERVICES.length, cols, step),
    [cols, step]
  );

  // Keep startIndex aligned with the current responsive layout. When the column
  // count (and thus the set of valid slide starts) changes, clamp then snap to
  // the nearest valid start — during render, not in an effect, so the carousel
  // transform never points at a stale index for a frame.
  const validStart = (() => {
    const clamped = Math.min(startIndex, maxStart);
    if (slides.includes(clamped)) return clamped;
    return slides.reduce(
      (nearest, p) => (Math.abs(p - clamped) < Math.abs(nearest - clamped) ? p : nearest),
      slides[0] ?? 0
    );
  })();
  if (validStart !== startIndex) {
    setStartIndex(validStart);
  }

  const offsetPx = validStart * stride;
  const dotActiveIndex = slides.indexOf(validStart);

  const slideMs = prefersReduced ? 0 : 520;
  const slideEasing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <section
      className="relative bg-black py-14 text-white sm:py-16 md:py-24"
      aria-labelledby="what-we-offer-heading"
    >
      <Container wide>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={medium}
          className="text-center"
        >
          <p className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55 sm:mb-4 sm:text-[11px]">
            Capabilities
          </p>
          <h2
            id="what-we-offer-heading"
            className="text-balance text-[clamp(1.875rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight"
          >
            What We Offer
          </h2>
        </motion.div>

        <div
          className="mt-8 sm:mt-10 md:mt-12"
          id={carouselId}
          role="region"
          aria-roledescription="carousel"
          aria-label="Services we offer"
        >
          <div className="flex items-stretch gap-2 sm:gap-3 md:items-center md:gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={startIndex === 0}
              aria-controls={carouselId}
              aria-label="Previous services"
              className="hidden h-11 w-11 shrink-0 items-center justify-center self-center rounded-full bg-white/[0.04] text-white/85 ring-1 ring-inset ring-white/10 transition-all duration-300 ease-out hover:bg-white/[0.08] hover:ring-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-25 sm:inline-flex md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden />
            </button>

            <div
              ref={viewportRef}
              className="min-w-0 flex-1 overflow-hidden touch-pan-y"
              style={{ contain: "content" }}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
                touchDeltaX.current = 0;
              }}
              onTouchMove={(e) => {
                if (touchStartX.current === null) return;
                touchDeltaX.current = (e.touches[0]?.clientX ?? 0) - touchStartX.current;
              }}
              onTouchEnd={() => {
                const dx = touchDeltaX.current;
                touchStartX.current = null;
                touchDeltaX.current = 0;
                if (Math.abs(dx) > 40) {
                  if (dx < 0) goNext();
                  else goPrev();
                }
              }}
            >
              <div
                className="flex flex-nowrap items-stretch will-change-transform"
                style={{
                  gap: GAP_PX,
                  transform: `translate3d(-${offsetPx}px, 0, 0)`,
                  transition: slideMs ? `transform ${slideMs}ms ${slideEasing}` : undefined,
                  opacity: cardWidth > 0 ? 1 : 0,
                }}
                role="group"
                aria-label={`Services ${startIndex + 1} to ${Math.min(startIndex + cols, SERVICES.length)} of ${SERVICES.length}`}
              >
                {SERVICES.map((service, i) => {
                  const inView = i >= startIndex && i < startIndex + cols;
                  return (
                    <div
                      key={service.id}
                      className="shrink-0"
                      style={{
                        width: cardWidth > 0 ? cardWidth : "min(100%, 280px)",
                      }}
                      inert={!inView}
                    >
                      <OfferCard service={service} reduceMotion={prefersReduced ?? false} />
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={startIndex >= maxStart}
              aria-controls={carouselId}
              aria-label="Next services"
              className="hidden h-11 w-11 shrink-0 items-center justify-center self-center rounded-full bg-white/[0.04] text-white/85 ring-1 ring-inset ring-white/10 transition-all duration-300 ease-out hover:bg-white/[0.08] hover:ring-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-25 sm:inline-flex md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          {slides.length > 1 ? (
            <CarouselPagination
              slides={slides}
              activeIndex={dotActiveIndex}
              onSelect={(pos) => setStartIndex(pos)}
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
