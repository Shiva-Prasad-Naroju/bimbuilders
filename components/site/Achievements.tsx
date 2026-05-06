"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/Container";

const STATS = [
  { label: "Projects Completed", value: 19 },
  { label: "Clients", value: 3 },
  { label: "Countries", value: 3 },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

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
    if (!started) return;
    if (reducedMotion) {
      setN(target);
      return;
    }
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

  return (
    <div className="flex flex-col items-center">
      <p
        className={
          compact
            ? "text-xl font-bold tabular-nums tracking-tight text-white sm:text-2xl md:text-3xl"
            : "text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl md:text-5xl"
        }
      >
        {n}
        <span className="ml-0.5 align-baseline text-[0.72em] font-bold">+</span>
      </p>
      <p
        className={
          compact
            ? "mt-1 max-w-[9rem] text-center text-[10px] font-medium leading-tight text-white/90 sm:mt-1.5 sm:max-w-none sm:text-xs md:text-sm"
            : "mt-2 max-w-[14rem] text-center text-sm font-medium text-white/90 sm:text-base"
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
  const reducedMotion = usePrefersReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const started = embedded ? hydrated : inView;

  return (
    <section
      ref={sectionRef}
      className={
        embedded
          ? "mt-5 border-y border-white/10 bg-black py-3.5 sm:mt-6 sm:py-4 md:py-4.5"
          : "border-y border-white/10 bg-black py-8 sm:py-10 md:py-12"
      }
      aria-labelledby="achievements-heading"
    >
      <Container>
        <h2
          id="achievements-heading"
          className={
            embedded
              ? "mb-3 text-center text-xl font-bold tracking-tight text-accent sm:mb-3.5 sm:text-2xl md:mb-4 md:text-3xl"
              : "mb-8 text-center text-2xl font-bold tracking-tight text-accent sm:mb-9 sm:text-3xl md:mb-10 md:text-4xl"
          }
        >
          Achievements
        </h2>
        <div
          className={
            embedded
              ? "mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:max-w-none sm:gap-5 md:gap-8"
              : "mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-3 sm:gap-6 md:gap-10"
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
