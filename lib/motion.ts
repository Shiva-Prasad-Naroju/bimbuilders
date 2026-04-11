import type { Variants, Transition } from "framer-motion";

/* ── Easing curves ── */
export const ease = [0.25, 0.1, 0.25, 1.0] as const; // Google-style decelerate
export const smooth = [0.16, 1, 0.3, 1] as const; // Apple-style smooth

/* ── Reusable transition presets ── */
export const fast: Transition = { duration: 0.4, ease };
export const medium: Transition = { duration: 0.5, ease };
export const slow: Transition = { duration: 0.8, ease: smooth };

/* ── Fade-up reveal (scroll sections & hero elements) ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/* ── Fade-in (opacity only, no translate) ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ── Scale-in (cards, interactive elements) ── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

/* ── Slide from sides (alternating layouts) ── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0 },
};

/* ── SVG path drawing ── */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

/* ── Stagger container ── */
export const stagger = (staggerMs = 60): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerMs / 1000 } },
});

/* ── Shared viewport config (animate once) ── */
export const once = { once: true, margin: "-60px" as const };
