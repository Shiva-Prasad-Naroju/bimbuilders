"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useCallback, useId } from "react";

/* ── Isometric projection helpers ── */
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const COS = Math.cos(ISO_ANGLE);
const SIN = Math.sin(ISO_ANGLE);

function iso(x: number, y: number, z: number): [number, number] {
  return [200 + (x - y) * COS, 180 + (x + y) * SIN - z];
}

function isoPath(points: [number, number, number][]): string {
  return points
    .map(([x, y, z], i) => {
      const [sx, sy] = iso(x, y, z);
      return `${i === 0 ? "M" : "L"}${sx.toFixed(1)} ${sy.toFixed(1)}`;
    })
    .join(" ") + " Z";
}

function isoLine(from: [number, number, number], to: [number, number, number]): string {
  const [x1, y1] = iso(...from);
  const [x2, y2] = iso(...to);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/* ── Building geometry ── */
const W = 80; // width
const D = 60; // depth
const FLOOR_H = 24; // floor height
const FLOORS = 5;
const H = FLOORS * FLOOR_H;

// Base edges (wireframe)
const baseEdges = [
  isoLine([0, 0, 0], [W, 0, 0]),
  isoLine([W, 0, 0], [W, D, 0]),
  isoLine([W, D, 0], [0, D, 0]),
  isoLine([0, D, 0], [0, 0, 0]),
];

// Vertical columns
const verticalEdges = [
  isoLine([0, 0, 0], [0, 0, H]),
  isoLine([W, 0, 0], [W, 0, H]),
  isoLine([W, D, 0], [W, D, H]),
  isoLine([0, D, 0], [0, D, H]),
];

// Top edges
const topEdges = [
  isoLine([0, 0, H], [W, 0, H]),
  isoLine([W, 0, H], [W, D, H]),
  isoLine([W, D, H], [0, D, H]),
  isoLine([0, D, H], [0, 0, H]),
];

// Floor plates
const floorLines: string[] = [];
for (let i = 1; i < FLOORS; i++) {
  const z = i * FLOOR_H;
  floorLines.push(isoLine([0, 0, z], [W, 0, z]));
  floorLines.push(isoLine([W, 0, z], [W, D, z]));
}

// Window grid (front face)
const windowLines: string[] = [];
for (let i = 0; i < FLOORS; i++) {
  const z = i * FLOOR_H;
  for (let j = 1; j < 4; j++) {
    const x = (W / 4) * j;
    windowLines.push(isoLine([x, 0, z + 4], [x, 0, z + FLOOR_H - 4]));
  }
}

// Side face windows
const sideWindowLines: string[] = [];
for (let i = 0; i < FLOORS; i++) {
  const z = i * FLOOR_H;
  for (let j = 1; j < 3; j++) {
    const y = (D / 3) * j;
    sideWindowLines.push(isoLine([W, y, z + 4], [W, y, z + FLOOR_H - 4]));
  }
}

// Cross bracing (structural detail on side)
const bracing = [
  isoLine([W, 0, 0], [W, D / 2, FLOOR_H * 2]),
  isoLine([W, D, 0], [W, D / 2, FLOOR_H * 2]),
];

// MEP runs (horizontal pipes on exposed floor)
const mepFloor = 2;
const mepZ = mepFloor * FLOOR_H + FLOOR_H / 2;
const mepLines = [
  isoLine([5, 10, mepZ], [W - 5, 10, mepZ]),
  isoLine([5, 30, mepZ], [W - 5, 30, mepZ]),
  isoLine([5, 50, mepZ], [W - 5, 50, mepZ]),
];

// Faces (filled surfaces)
const frontFace = isoPath([
  [0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H],
]);
const sideFace = isoPath([
  [W, 0, 0], [W, D, 0], [W, D, H], [W, 0, H],
]);
const topFace = isoPath([
  [0, 0, H], [W, 0, H], [W, D, H], [0, D, H],
]);

const smoothEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: smoothEase },
  }),
};

const fillIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: smoothEase },
  }),
};

// Floating particles (fixed positions to avoid hydration mismatch)
const particles = [
  { cx: 72, cy: 58, r: 1.2, delay: 0 },
  { cx: 310, cy: 95, r: 2.1, delay: 0.4 },
  { cx: 155, cy: 280, r: 1.6, delay: 0.8 },
  { cx: 345, cy: 210, r: 1.0, delay: 1.2 },
  { cx: 88, cy: 190, r: 2.4, delay: 1.6 },
  { cx: 260, cy: 45, r: 1.3, delay: 2.0 },
  { cx: 190, cy: 310, r: 1.8, delay: 2.4 },
  { cx: 330, cy: 155, r: 1.1, delay: 2.8 },
];

type HeroBuildingAnimationProps = {
  /** Mount: plays on load. InView: plays when scrolled into viewport. */
  trigger?: "mount" | "inView";
};

export function HeroBuildingAnimation({ trigger = "mount" }: HeroBuildingAnimationProps) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [2, -2]);
  const rotateY = useTransform(mouseX, [-200, 200], [-2, 2]);

  const playProps = reduced
    ? { initial: "visible" as const, animate: "visible" as const }
    : trigger === "inView"
      ? { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-40px" } }
      : { initial: "hidden" as const, animate: "visible" as const };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [mouseX, mouseY, reduced]
  );

  return (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      onMouseMove={handleMouseMove}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, perspective: 800, transformStyle: "preserve-3d" }
      }
    >
      <defs>
        <linearGradient id={`${uid}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--accent)" stopOpacity="0.08" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`${uid}-side`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--accent)" stopOpacity="0.05" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${uid}-top`} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="var(--accent)" stopOpacity="0.12" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.06" />
        </linearGradient>
        <filter id={`${uid}-glow`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Phase 1: Grid lines */}
      <motion.g {...playProps}>
        {[0, 80, 160, 240, 320, 400].map((x, i) => (
          <motion.line
            key={`gv-${i}`}
            x1={x} y1={0} x2={x} y2={360}
            stroke="var(--border)"
            strokeWidth="0.3"
            strokeDasharray="2 6"
            variants={draw}
            custom={i * 0.05}
          />
        ))}
        {[0, 72, 144, 216, 288, 360].map((y, i) => (
          <motion.line
            key={`gh-${i}`}
            x1={0} y1={y} x2={400} y2={y}
            stroke="var(--border)"
            strokeWidth="0.3"
            strokeDasharray="2 6"
            variants={draw}
            custom={i * 0.05}
          />
        ))}
      </motion.g>

      {/* Phase 3: Surface fills (behind wireframe) */}
      <motion.g {...playProps}>
        <motion.path d={frontFace} fill={`url(#${uid}-front)`} variants={fillIn} custom={1.6} />
        <motion.path d={sideFace} fill={`url(#${uid}-side)`} variants={fillIn} custom={1.8} />
        <motion.path d={topFace} fill={`url(#${uid}-top)`} variants={fillIn} custom={2.0} />
      </motion.g>

      {/* Phase 2: Wireframe structure */}
      <motion.g {...playProps} stroke="var(--text-tertiary)" strokeWidth="1" fill="none">
        {baseEdges.map((d, i) => (
          <motion.path key={`base-${i}`} d={d} variants={draw} custom={0.4 + i * 0.06} />
        ))}
        {verticalEdges.map((d, i) => (
          <motion.path key={`vert-${i}`} d={d} variants={draw} custom={0.7 + i * 0.08} />
        ))}
        {topEdges.map((d, i) => (
          <motion.path key={`top-${i}`} d={d} variants={draw} custom={1.0 + i * 0.06} />
        ))}
        {floorLines.map((d, i) => (
          <motion.path key={`floor-${i}`} d={d} variants={draw} custom={1.2 + i * 0.04} strokeWidth="0.6" strokeOpacity={0.5} />
        ))}
      </motion.g>

      {/* Phase 4: Details (windows, bracing, MEP) */}
      <motion.g {...playProps} fill="none">
        {windowLines.map((d, i) => (
          <motion.path key={`win-${i}`} d={d} stroke="var(--accent)" strokeWidth="0.5" strokeOpacity={0.3} variants={draw} custom={2.4 + i * 0.02} />
        ))}
        {sideWindowLines.map((d, i) => (
          <motion.path key={`swin-${i}`} d={d} stroke="var(--accent)" strokeWidth="0.5" strokeOpacity={0.25} variants={draw} custom={2.6 + i * 0.02} />
        ))}
        {bracing.map((d, i) => (
          <motion.path key={`brace-${i}`} d={d} stroke="var(--neon-blue)" strokeWidth="0.8" strokeOpacity={0.4} strokeDasharray="3 3" variants={draw} custom={2.8 + i * 0.1} />
        ))}
        {mepLines.map((d, i) => (
          <motion.path key={`mep-${i}`} d={d} stroke="#10b981" strokeWidth="1" strokeOpacity={0.5} variants={draw} custom={3.0 + i * 0.1} filter={`url(#${uid}-glow)`} />
        ))}
      </motion.g>

      {/* Phase 5: Ambient floating particles */}
      {!reduced &&
        particles.map((p, i) => (
        <motion.circle
          key={`p-${i}`}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="var(--accent)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 3.5 + p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ambient edge glow pulse on main structure */}
      <motion.g
        initial={{ opacity: reduced ? 0.45 : 0 }}
        animate={reduced ? { opacity: 0.45 } : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: reduced ? 0 : Infinity, delay: 3.5, ease: "easeInOut" }}
        fill="none"
        stroke="var(--neon-blue)"
        strokeWidth="1.5"
        filter={`url(#${uid}-glow)`}
      >
        {topEdges.map((d, i) => (
          <path key={`glow-${i}`} d={d} />
        ))}
      </motion.g>
    </motion.svg>
  );
}
