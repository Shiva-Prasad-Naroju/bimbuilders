"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { smooth } from "@/lib/motion";

/** Backdrop / subcopy only — kept soft so the photo drifts calmly. */
const POINTER_SPRING = { stiffness: 200, damping: 28, mass: 0.35 };

/** Letters: snappy follow without lag behind the cursor. */
const LETTER_SPRING = {
  stiffness: 1050,
  damping: 52,
  mass: 0.16,
  restDelta: 0.0006,
  restSpeed: 0.85,
};
const INFLUENCE_RADIUS = 140;
const MAX_SCALE = 1.08;
const MAX_LIFT = 11;
const MAX_TILT = 5.5;
const BASE_OPACITY = 0.92;
const PEAK_OPACITY = 1;

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function MagneticLetter({
  char,
  pointerRawX,
  pointerRawY,
  pointerActive,
  entranceDelay,
}: {
  char: string;
  pointerRawX: MotionValue<number>;
  pointerRawY: MotionValue<number>;
  pointerActive: React.MutableRefObject<boolean>;
  entranceDelay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const targetScale = useMotionValue(1);
  const targetOpacity = useMotionValue(BASE_OPACITY);
  const targetY = useMotionValue(0);
  const targetRotate = useMotionValue(0);

  const scale = useSpring(targetScale, LETTER_SPRING);
  const opacity = useSpring(targetOpacity, LETTER_SPRING);
  const y = useSpring(targetY, LETTER_SPRING);
  const rotate = useSpring(targetRotate, LETTER_SPRING);

  useAnimationFrame(() => {
    const el = ref.current;
    if (!el) return;

    if (!pointerActive.current) {
      targetScale.set(1);
      targetOpacity.set(BASE_OPACITY);
      targetY.set(0);
      targetRotate.set(0);
      return;
    }

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = pointerRawX.get() - cx;
    const dy = pointerRawY.get() - cy;
    const dist = Math.hypot(dx, dy);

    if (dist >= INFLUENCE_RADIUS) {
      targetScale.set(1);
      targetOpacity.set(BASE_OPACITY);
      targetY.set(0);
      targetRotate.set(0);
      return;
    }

    const t = smoothstep(1 - dist / INFLUENCE_RADIUS);
    targetScale.set(1 + t * (MAX_SCALE - 1));
    targetOpacity.set(BASE_OPACITY + t * (PEAK_OPACITY - BASE_OPACITY));

    // Lift toward the viewer + gentle lean — no pull toward the cursor.
    const lift = t * MAX_LIFT;
    const verticalBias = dy < 0 ? 1.08 : 0.92;
    targetY.set(-lift * verticalBias);

    const tiltInput = dx / (INFLUENCE_RADIUS * 0.9);
    const tilt = Math.max(-1, Math.min(1, tiltInput)) * t * MAX_TILT;
    targetRotate.set(tilt);
  });

  if (char === " ") {
    return (
      <span ref={ref} aria-hidden className="inline-block w-[0.34em] shrink-0" />
    );
  }

  return (
    <motion.span
      ref={ref}
      aria-hidden
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.72,
        delay: entranceDelay,
        ease: smooth,
      }}
      className="inline-block origin-[50%_88%] will-change-transform"
      style={{ scale, opacity, y, rotate }}
    >
      {char}
    </motion.span>
  );
}

export type MagneticHeroTitleProps = {
  text: string;
  className?: string;
  /** Instant cursor position — letters track this directly (no pointer smoothing). */
  pointerRawX: MotionValue<number>;
  pointerRawY: MotionValue<number>;
  pointerActive: React.MutableRefObject<boolean>;
  onEntranceComplete?: () => void;
};

export function MagneticHeroTitle({
  text,
  className = "",
  pointerRawX,
  pointerRawY,
  pointerActive,
  onEntranceComplete,
}: MagneticHeroTitleProps) {
  const prefersReduced = useReducedMotion();
  const chars = [...text];

  useEffect(() => {
    if (!onEntranceComplete) return;
    if (prefersReduced) {
      onEntranceComplete();
      return;
    }
    const lastDelay = 0.06 + (chars.length - 1) * 0.028 + 0.72;
    const id = window.setTimeout(onEntranceComplete, lastDelay * 1000);
    return () => window.clearTimeout(id);
  }, [chars.length, onEntranceComplete, prefersReduced]);

  if (prefersReduced) {
    return (
      <h1
        className={`font-sans text-balance font-semibold tracking-[-0.03em] text-white ${className}`}
        style={{ fontFeatureSettings: "'ss01' on, 'cv11' on" }}
      >
        {text}
      </h1>
    );
  }

  const entranceBase = 0.06;

  return (
    <h1
      aria-label={text}
      className={`m-0 inline-flex max-w-[min(100%,24ch)] cursor-default select-none flex-wrap items-baseline justify-center font-sans font-semibold lowercase text-white ${className}`}
      style={{
        fontFeatureSettings: "'ss01' on, 'cv11' on",
        textShadow:
          "0 1px 2px rgba(0,0,0,0.45), 0 12px 48px rgba(0,0,0,0.28)",
      }}
    >
      {chars.map((ch, i) => (
        <MagneticLetter
          key={`${i}-${ch}`}
          char={ch}
          pointerRawX={pointerRawX}
          pointerRawY={pointerRawY}
          pointerActive={pointerActive}
          entranceDelay={entranceBase + i * 0.028}
        />
      ))}
    </h1>
  );
}

/** Smoothed pointer for hero-level parallax (backdrop + subcopy). */
export function useHeroPointer() {
  const prefersReduced = useReducedMotion();
  const pointerActive = useRef(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, POINTER_SPRING);
  const pointerY = useSpring(rawY, POINTER_SPRING);
  const centerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const sync = () => {
      centerRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      if (!pointerActive.current) {
        rawX.set(centerRef.current.x);
        rawY.set(centerRef.current.y);
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [rawX, rawY]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (prefersReduced) return;
      pointerActive.current = true;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    },
    [prefersReduced, rawX, rawY]
  );

  const onPointerLeave = useCallback(() => {
    pointerActive.current = false;
    rawX.set(centerRef.current.x);
    rawY.set(centerRef.current.y);
  }, [rawX, rawY]);

  return {
    prefersReduced: prefersReduced ?? false,
    pointerX,
    pointerY,
    pointerRawX: rawX,
    pointerRawY: rawY,
    pointerActive,
    centerRef,
    onPointerMove,
    onPointerLeave,
  };
}
