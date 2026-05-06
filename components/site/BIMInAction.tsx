"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, medium } from "@/lib/motion";

/* ── Isometric helpers ── */
const ISO = Math.PI / 6;
const C = Math.cos(ISO);
const S = Math.sin(ISO);

function iso(x: number, y: number, z: number): [number, number] {
  return [200 + (x - y) * C, 160 + (x + y) * S - z];
}

function isoLine(a: [number, number, number], b: [number, number, number]): string {
  const [x1, y1] = iso(...a);
  const [x2, y2] = iso(...b);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function isoPath(pts: [number, number, number][]): string {
  return (
    pts
      .map(([x, y, z], i) => {
        const [sx, sy] = iso(x, y, z);
        return `${i === 0 ? "M" : "L"}${sx.toFixed(1)} ${sy.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

const W = 60,
  D = 45,
  FH = 20,
  FLOORS = 4;
const H = FLOORS * FH;

const buildingEdges = [
  isoLine([0, 0, 0], [W, 0, 0]),
  isoLine([W, 0, 0], [W, D, 0]),
  isoLine([W, D, 0], [0, D, 0]),
  isoLine([0, D, 0], [0, 0, 0]),
  isoLine([0, 0, 0], [0, 0, H]),
  isoLine([W, 0, 0], [W, 0, H]),
  isoLine([W, D, 0], [W, D, H]),
  isoLine([0, D, 0], [0, D, H]),
  isoLine([0, 0, H], [W, 0, H]),
  isoLine([W, 0, H], [W, D, H]),
  isoLine([W, D, H], [0, D, H]),
  isoLine([0, D, H], [0, 0, H]),
];

const floors: string[] = [];
for (let i = 1; i < FLOORS; i++) {
  const z = i * FH;
  floors.push(isoLine([0, 0, z], [W, 0, z]));
  floors.push(isoLine([W, 0, z], [W, D, z]));
}

const ductPath = isoLine([5, 15, FH * 2 + 10], [W - 5, 15, FH * 2 + 10]);
const pipePath = isoLine([5, 30, FH * 2 + 10], [W - 5, 30, FH * 2 + 10]);
const beamPath = isoLine([W / 2 - 2, 0, FH * 2 + 10], [W / 2 - 2, D, FH * 2 + 10]);
const ductResolvedPath = `${isoLine([5, 15, FH * 2 + 10], [W / 2 - 8, 15, FH * 2 + 10])} ${isoLine([W / 2 - 8, 15, FH * 2 + 16], [W / 2 + 8, 15, FH * 2 + 16])} ${isoLine([W / 2 + 8, 15, FH * 2 + 10], [W - 5, 15, FH * 2 + 10])}`;
const clashPt = iso(W / 2 - 2, 15, FH * 2 + 10);

const panels = [
  {
    title: "The Model",
    subtitle: "Multi-discipline assembly",
    description:
      "Architectural, structural, and MEP systems integrated into a single federated model for coordinated review.",
  },
  {
    title: "The Clash",
    subtitle: "Conflict detection",
    description:
      "Clash detection using Navisworks identifies conflicts between systems — flagged and documented before construction begins.",
  },
  {
    title: "The Resolution",
    subtitle: "Coordinated resolution",
    description:
      "Conflicts are resolved across disciplines. Coordinated models and updated documentation are delivered for construction.",
  },
] as const;

const STEP_COUNT = panels.length;

type Panel = (typeof panels)[number];

function DesktopWorkflowStep({
  panel,
  stepIndex,
  activePanel,
}: {
  panel: Panel;
  stepIndex: number;
  activePanel: MotionValue<number>;
}) {
  const opacity = useTransform(activePanel, (v) => (v === stepIndex ? 1 : 0.38));
  const scale = useTransform(activePanel, (v) => (v === stepIndex ? 1 : 0.985));
  const border = useTransform(activePanel, (v) =>
    v === stepIndex ? "rgba(59, 130, 246, 0.42)" : "var(--border)"
  );
  const titleOpacity = useTransform(activePanel, (v) => (v === stepIndex ? 1 : 0.72));
  const descOpacity = useTransform(activePanel, (v) => (v === stepIndex ? 1 : 0.62));
  const ringOpacity = useTransform(activePanel, (v) => (v === stepIndex ? 0.35 : 0));
  const nodeScale = useTransform(activePanel, (v) => (v === stepIndex ? 1.14 : 1));
  const nodeBorder = useTransform(activePanel, (v) =>
    v === stepIndex ? "rgba(59, 130, 246, 0.95)" : "rgba(113, 113, 122, 0.55)"
  );
  const nodeGlow = useTransform(activePanel, (v) =>
    v === stepIndex
      ? "0 0 22px rgba(59, 130, 246, 0.55), 0 0 40px rgba(59, 130, 246, 0.2)"
      : "0 0 0 rgba(0,0,0,0)"
  );
  const nodeBg = useTransform(activePanel, (v) =>
    v === stepIndex ? "rgba(59, 130, 246, 0.12)" : "var(--background)"
  );
  const labelColor = useTransform(activePanel, (v) =>
    v === stepIndex ? "var(--accent)" : "var(--text-tertiary)"
  );

  return (
    <div className="relative flex gap-5">
      {/* Node sits to the RIGHT of the spine — line does not pass through the number */}
      <div className="relative flex w-11 shrink-0 justify-start pt-0.5">
        <motion.div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 will-change-transform"
          style={{
            scale: nodeScale,
            borderColor: nodeBorder,
            boxShadow: nodeGlow,
            backgroundColor: nodeBg,
          }}
        >
          <motion.span className="text-xs font-bold tabular-nums" style={{ color: labelColor }}>
            {stepIndex + 1}
          </motion.span>
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-accent"
            style={{ opacity: ringOpacity }}
          />
        </motion.div>
      </div>

      <motion.div
        className="min-w-0 flex-1 rounded-2xl border bg-surface-elevated p-6 will-change-[transform,opacity]"
        style={{
          opacity,
          scale,
          borderColor: border,
        }}
      >
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
          Step {stepIndex + 1}: {panel.subtitle}
        </p>
        <motion.h3 className="text-xl font-bold text-text-primary will-change-[opacity]" style={{ opacity: titleOpacity }}>
          {panel.title}
        </motion.h3>
        <motion.p
          className="mt-2 text-sm leading-relaxed text-text-secondary will-change-[opacity]"
          style={{ opacity: descOpacity }}
        >
          {panel.description}
        </motion.p>
      </motion.div>
    </div>
  );
}

function MobileTimelineCard({
  panel,
  index,
  activeIndex,
  onActive,
}: {
  panel: Panel;
  index: number;
  activeIndex: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-14% 0px -14% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const isActive = activeIndex === index;

  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-5">
      <div className="relative flex w-10 shrink-0 justify-start sm:w-11">
        <motion.div
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10 will-change-transform"
          animate={{
            scale: isActive ? 1.08 : 1,
            borderColor: isActive ? "rgb(59 130 246)" : "rgb(113 113 122 / 0.55)",
            backgroundColor: isActive ? "rgba(59, 130, 246, 0.12)" : "var(--background)",
            boxShadow: isActive
              ? "0 0 20px rgba(59, 130, 246, 0.45), 0 0 36px rgba(59, 130, 246, 0.12)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <span
            className={`text-[11px] font-bold tabular-nums sm:text-xs ${
              isActive ? "text-accent" : "text-text-tertiary"
            }`}
          >
            {index + 1}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="mb-2 flex-1 rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6 will-change-transform"
        animate={{
          scale: isActive ? 1 : 0.993,
          borderColor: isActive ? "rgba(59, 130, 246, 0.32)" : "var(--border)",
          boxShadow: isActive
            ? "0 16px 44px -22px rgba(59, 130, 246, 0.18), 0 0 0 1px rgba(59, 130, 246, 0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">{panel.subtitle}</p>
        <h3 className={`text-lg font-bold sm:text-xl ${isActive ? "text-text-primary" : "text-text-primary/88"}`}>
          {panel.title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${isActive ? "text-text-secondary" : "text-text-secondary/88"}`}>
          {panel.description}
        </p>
      </motion.div>
    </div>
  );
}

export function BIMInAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const buildingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const clashOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const modelDim = useTransform(scrollYProgress, [0.3, 0.4], [1, 0.3]);
  const clashScale = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const resolveOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const clashFade = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);
  const modelRestore = useTransform(scrollYProgress, [0.65, 0.75], [0.3, 1]);
  const checkOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const activePanel = useTransform(scrollYProgress, (v): number =>
    v < 0.34 ? 0 : v < 0.67 ? 1 : 2
  );

  const [mobileActive, setMobileActive] = useState(0);
  const setActive = useCallback((i: number) => setMobileActive(i), []);
  const mobileFillScale = (mobileActive + 1) / STEP_COUNT;

  return (
    <section className="bg-surface" aria-label="BIM in Action">
      <div className="lg:hidden py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeUp} transition={medium} className="text-center mb-12">
              <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
                Coordination Workflow
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">BIM in Action</h2>
            </motion.div>

            <div className="relative">
              <div
                className="pointer-events-none absolute left-[10px] top-1 bottom-1 z-0 w-[2px] overflow-hidden rounded-full bg-zinc-800/95"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-[10px] top-1 bottom-1 z-[1] w-[2px] overflow-hidden rounded-full"
                aria-hidden
              >
                <motion.div
                  className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent via-accent to-accent/80"
                  animate={{ scaleY: mobileFillScale }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  style={{ transformOrigin: "top center" }}
                />
              </div>
              <div className="relative z-[2] space-y-2 pl-12">
                {panels.map((panel, i) => (
                  <MobileTimelineCard
                    key={panel.title}
                    panel={panel}
                    index={i}
                    activeIndex={mobileActive}
                    onActive={setActive}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      <div ref={sectionRef} className="hidden lg:block relative" style={{ height: "250vh" }}>
        <div className="sticky top-0 h-screen flex items-start pt-6 sm:pt-7 md:pt-8">
          <Container wide>
            <div className="grid grid-cols-2 gap-12 xl:gap-16 items-start">
              <div className="min-w-0">
                <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
                  Coordination Workflow
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-10 xl:mb-12">
                  BIM in Action
                </h2>

                <div className="relative">
                  {/* Spine sits LEFT of the step column so it never crosses the numbered nodes */}
                  <div
                    className="pointer-events-none absolute left-[10px] top-2 bottom-2 z-0 w-[2px] overflow-hidden rounded-full bg-zinc-800/95"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute left-[10px] top-2 bottom-2 z-[1] w-[2px] overflow-hidden rounded-full"
                    aria-hidden
                  >
                    <motion.div
                      className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent via-accent to-accent/75 will-change-transform shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                      style={{
                        scaleY: scrollYProgress,
                        transformOrigin: "top center",
                      }}
                    />
                  </div>

                  <div className="relative z-[2] space-y-6 pl-12">
                    {panels.map((panel, i) => (
                      <DesktopWorkflowStep
                        key={panel.title}
                        panel={panel}
                        stepIndex={i}
                        activePanel={activePanel}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mt-14 xl:mt-16">
                <div className="aspect-square w-full rounded-2xl border border-border bg-background overflow-hidden">
                  <svg viewBox="0 0 400 340" fill="none" className="h-full w-full" aria-hidden>
                    <motion.g stroke="var(--text-tertiary)" strokeWidth="0.8" fill="none" style={{ opacity: buildingOpacity }}>
                      <motion.g style={{ opacity: modelDim as unknown as number }}>
                        {buildingEdges.map((d, i) => (
                          <path key={`be-${i}`} d={d} />
                        ))}
                        {floors.map((d, i) => (
                          <path key={`fl-${i}`} d={d} strokeOpacity={0.4} strokeWidth="0.5" />
                        ))}
                      </motion.g>
                      <motion.g style={{ opacity: modelRestore as unknown as number }}>
                        <path d={isoPath([[0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H]])} fill="var(--accent)" fillOpacity={0.04} />
                        <path d={isoPath([[W, 0, 0], [W, D, 0], [W, D, H], [W, 0, H]])} fill="var(--accent)" fillOpacity={0.03} />
                      </motion.g>
                    </motion.g>

                    <motion.g style={{ opacity: labelOpacity }} fontSize="8" fontWeight="500">
                      <text x={iso(W + 5, 0, FH * 3)[0]} y={iso(W + 5, 0, FH * 3)[1]} fill="var(--accent)">
                        Structural
                      </text>
                      <text x={iso(W + 5, 0, FH * 2 + 10)[0]} y={iso(W + 5, 0, FH * 2 + 10)[1]} fill="#10b981">
                        MEP
                      </text>
                      <text x={iso(W + 5, 0, FH + 10)[0]} y={iso(W + 5, 0, FH + 10)[1]} fill="#f59e0b">
                        Architectural
                      </text>
                    </motion.g>

                    <motion.g style={{ opacity: buildingOpacity }}>
                      <motion.path d={ductPath} stroke="#10b981" strokeWidth="2" style={{ opacity: clashFade as unknown as number }} />
                      <path d={pipePath} stroke="#f59e0b" strokeWidth="1.5" opacity={0.6} />
                      <path d={beamPath} stroke="var(--accent)" strokeWidth="2.5" opacity={0.7} />
                    </motion.g>

                    <motion.g style={{ opacity: clashOpacity }}>
                      <motion.circle
                        cx={clashPt[0]}
                        cy={clashPt[1]}
                        r={12}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        style={{ scale: clashScale }}
                      />
                      <motion.circle
                        cx={clashPt[0]}
                        cy={clashPt[1]}
                        r={12}
                        fill="#ef4444"
                        fillOpacity={0.15}
                        style={{ scale: clashScale }}
                        animate={{ r: [12, 18, 12] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.circle cx={clashPt[0]} cy={clashPt[1]} r={3} fill="#ef4444" style={{ scale: clashScale }} />
                      <motion.g style={{ opacity: clashOpacity }}>
                        <rect
                          x={clashPt[0] + 18}
                          y={clashPt[1] - 20}
                          width="110"
                          height="24"
                          rx="6"
                          fill="var(--surface-elevated)"
                          stroke="#ef4444"
                          strokeWidth="1"
                        />
                        <text x={clashPt[0] + 24} y={clashPt[1] - 4} fontSize="7" fontWeight="600" fill="#ef4444">
                          CLASH DETECTED
                        </text>
                      </motion.g>
                    </motion.g>

                    <motion.path d={ductResolvedPath} stroke="#10b981" strokeWidth="2" fill="none" style={{ opacity: resolveOpacity }} />

                    <motion.g style={{ opacity: checkOpacity }}>
                      <circle cx={clashPt[0]} cy={clashPt[1]} r={12} fill="#10b981" fillOpacity={0.15} />
                      <circle cx={clashPt[0]} cy={clashPt[1]} r={8} fill="#10b981" />
                      <path
                        d={`M${clashPt[0] - 3} ${clashPt[1]} L${clashPt[0] - 1} ${clashPt[1] + 3} L${clashPt[0] + 4} ${clashPt[1] - 3}`}
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x={clashPt[0] + 18}
                        y={clashPt[1] - 16}
                        width="90"
                        height="24"
                        rx="6"
                        fill="var(--surface-elevated)"
                        stroke="#10b981"
                        strokeWidth="1"
                      />
                      <text x={clashPt[0] + 24} y={clashPt[1] - 1} fontSize="7" fontWeight="600" fill="#10b981">
                        RESOLVED
                      </text>
                    </motion.g>
                  </svg>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
