"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

const HERO_IMG = "/images/hero-bg.png";

type HeroBackdropProps = {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  centerX: number;
  centerY: number;
  parallaxEnabled?: boolean;
};

/**
 * Calm hero plate with soft ambient depth; optional pointer parallax on the photo layer.
 */
export function HeroBackdrop({
  pointerX,
  pointerY,
  centerX,
  centerY,
  parallaxEnabled = true,
}: HeroBackdropProps) {
  const prefersReduced = useReducedMotion();
  const on = parallaxEnabled && !prefersReduced && centerX > 0 && centerY > 0;

  const imageX = useTransform(pointerX, (px) => (on ? ((px - centerX) / centerX) * -14 : 0));
  const imageY = useTransform(pointerY, (py) => (on ? ((py - centerY) / centerY) * -10 : 0));
  const orbX = useTransform(pointerX, (px) => (on ? ((px - centerX) / centerX) * 22 : 0));
  const orbY = useTransform(pointerY, (py) => (on ? ((py - centerY) / centerY) * 18 : 0));
  const orb2X = useTransform(orbX, (v) => -v * 0.6);
  const orb2Y = useTransform(orbY, (v) => -v * 0.5);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 -z-10 min-h-full w-full overflow-hidden bg-zinc-950"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 min-h-full min-w-full overflow-hidden"
        style={{ x: imageX, y: imageY }}
      >
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="min-h-full min-w-full scale-[1.04] object-cover object-center brightness-[0.42] contrast-[0.92] saturate-[0.82]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/38" />

      <motion.div
        className="absolute -left-[12%] top-[18%] h-[min(52vw,28rem)] w-[min(52vw,28rem)] rounded-full bg-accent/[0.07] blur-[100px]"
        style={{ x: orbX, y: orbY }}
      />
      <motion.div
        className="absolute -right-[8%] bottom-[22%] h-[min(44vw,22rem)] w-[min(44vw,22rem)] rounded-full bg-blue-400/[0.05] blur-[90px]"
        style={{ x: orb2X, y: orb2Y }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse min(94vw, 44rem) 74% at 50% 40%, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.34) 45%, rgba(0,0,0,0.1) 70%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/50" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 108% 88% at 50% 44%, transparent 0%, transparent 50%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <motion.div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/16 to-transparent" />
    </motion.div>
  );
}
