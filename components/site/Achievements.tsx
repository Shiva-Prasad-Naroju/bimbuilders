"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container";
import { useHydrated } from "@/lib/hooks";

const STATS = [
  { label: "Projects Completed", value: 50 },
  { label: "Clients", value: 10 },
  { label: "Countries", value: 5 },
] as const;

function AnimatedStat({
  target,
  label,
  started,
  reducedMotion,
  compact = false,
}: {
  target: number;
  label: string;
  started: boolean;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    // Reduced-motion and not-yet-started are handled by `display` below, so the
    // effect only drives the count-up animation — no synchronous setState here.
    if (!started || reducedMotion) return;
    let cancelled = false;
    const duration = 1600;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (cancelled) return;
      if (startTs === null) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [started, target, reducedMotion]);

  const display = !started ? 0 : reducedMotion ? target : n;

  return (
    <div className="flex min-w-0 flex-col items-center px-1">
      <p
        className={
          compact
            ? "text-base font-bold tabular-nums tracking-tight text-white sm:text-xl md:text-2xl"
            : "text-xl font-bold tabular-nums tracking-tight text-white sm:text-3xl md:text-4xl"
        }
      >
        {display}
        <span className="ml-0.5 align-baseline text-[0.72em] font-bold">+</span>
      </p>
      <p
        className={
          compact
            ? "mt-1 max-w-full text-balance text-center text-[9px] font-medium leading-tight text-white/90 sm:mt-1.5 sm:max-w-none sm:text-xs md:text-sm"
            : "mt-1.5 max-w-full text-balance text-center text-[10px] font-medium leading-snug text-white/85 sm:mt-2 sm:text-xs md:text-sm"
        }
      >
        {label}
      </p>
    </div>
  );
}

export function Achievements({ embedded = false }: { embedded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;
  const hydrated = useHydrated();
  const started = embedded ? hydrated : inView;

  return (
    <section
      ref={sectionRef}
      className={
        embedded
          ? "relative mt-2 bg-black py-3 sm:mt-3 sm:py-4 md:py-5"
          : "relative bg-black py-6 sm:py-7 md:py-8"
      }
      aria-labelledby="achievements-heading"
    >
      {/* Soft gradient hairlines instead of hard borders */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
      <Container>
        <h2
          id="achievements-heading"
          className={
            embedded
              ? "mb-2 text-center text-lg font-bold tracking-tight text-accent sm:mb-2.5 sm:text-xl md:mb-3 md:text-2xl"
              : "mb-4 text-center text-lg font-bold tracking-tight text-accent sm:mb-5 sm:text-xl md:mb-6 md:text-2xl"
          }
        >
          Achievements
        </h2>
        <div
          className={
            embedded
              ? "mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:max-w-none sm:gap-4 md:gap-6"
              : "mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:max-w-none sm:gap-5 md:gap-7"
          }
        >
          {STATS.map((s) => (
            <AnimatedStat
              key={s.label}
              target={s.value}
              label={s.label}
              started={started}
              reducedMotion={reducedMotion}
              compact={embedded}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
