"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const W = 60, D = 45, FH = 20, FLOORS = 4;
const H = FLOORS * FH;

const buildingEdges = [
  isoLine([0,0,0],[W,0,0]), isoLine([W,0,0],[W,D,0]),
  isoLine([W,D,0],[0,D,0]), isoLine([0,D,0],[0,0,0]),
  isoLine([0,0,0],[0,0,H]), isoLine([W,0,0],[W,0,H]),
  isoLine([W,D,0],[W,D,H]), isoLine([0,D,0],[0,D,H]),
  isoLine([0,0,H],[W,0,H]), isoLine([W,0,H],[W,D,H]),
  isoLine([W,D,H],[0,D,H]), isoLine([0,D,H],[0,0,H]),
];

const floors: string[] = [];
for (let i = 1; i < FLOORS; i++) {
  const z = i * FH;
  floors.push(isoLine([0,0,z],[W,0,z]));
  floors.push(isoLine([W,0,z],[W,D,z]));
}

const ductPath = isoLine([5, 15, FH*2+10], [W-5, 15, FH*2+10]);
const pipePath = isoLine([5, 30, FH*2+10], [W-5, 30, FH*2+10]);
const beamPath = isoLine([W/2-2, 0, FH*2+10], [W/2-2, D, FH*2+10]);
const ductResolvedPath = `${isoLine([5, 15, FH*2+10], [W/2-8, 15, FH*2+10])} ${isoLine([W/2-8, 15, FH*2+16], [W/2+8, 15, FH*2+16])} ${isoLine([W/2+8, 15, FH*2+10], [W-5, 15, FH*2+10])}`;
const clashPt = iso(W/2-2, 15, FH*2+10);

const panels = [
  {
    title: "The Model",
    subtitle: "Multi-discipline assembly",
    description: "Architectural, structural, and MEP systems integrated into a single federated model for coordinated review.",
  },
  {
    title: "The Clash",
    subtitle: "Conflict detection",
    description: "Clash detection using Navisworks identifies conflicts between systems — flagged and documented before construction begins.",
  },
  {
    title: "The Resolution",
    subtitle: "Coordinated resolution",
    description: "Conflicts are resolved across disciplines. Coordinated models and updated documentation are delivered for construction.",
  },
];

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
  const activePanel = useTransform(scrollYProgress, (v) =>
    v < 0.33 ? 0 : v < 0.66 ? 1 : 2
  );

  return (
    <section id="bim-action" className="bg-surface">
      {/* Mobile: stacked panels */}
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
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                BIM in Action
              </h2>
            </motion.div>

            <div className="space-y-8">
              {panels.map((panel, i) => (
                <motion.div
                  key={panel.title}
                  className="rounded-2xl border border-border bg-surface-elevated p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
                    {panel.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{panel.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{panel.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Desktop: scroll-driven */}
      <div ref={sectionRef} className="hidden lg:block relative" style={{ height: "250vh" }}>
        <div className="sticky top-0 h-screen flex items-center">
          <Container wide>
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
                  Coordination Workflow
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-12">
                  BIM in Action
                </h2>

                <div className="space-y-6">
                  {panels.map((panel, i) => (
                    <motion.div
                      key={panel.title}
                      className="rounded-2xl border border-border bg-surface-elevated p-6 transition-all duration-300"
                      style={{
                        opacity: useTransform(activePanel, (v: number) => (v === i ? 1 : 0.4)),
                        scale: useTransform(activePanel, (v: number) => (v === i ? 1 : 0.97)),
                        borderColor: useTransform(activePanel, (v: number) => (v === i ? "var(--accent)" : "var(--border)")),
                      }}
                    >
                      <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
                        Step {i + 1}: {panel.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-text-primary mb-2">{panel.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{panel.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square w-full rounded-2xl border border-border bg-background overflow-hidden">
                  <svg viewBox="0 0 400 340" fill="none" className="h-full w-full" aria-hidden>
                    <motion.g stroke="var(--text-tertiary)" strokeWidth="0.8" fill="none" style={{ opacity: buildingOpacity }}>
                      <motion.g style={{ opacity: modelDim as unknown as number }}>
                        {buildingEdges.map((d, i) => (<path key={`be-${i}`} d={d} />))}
                        {floors.map((d, i) => (<path key={`fl-${i}`} d={d} strokeOpacity={0.4} strokeWidth="0.5" />))}
                      </motion.g>
                      <motion.g style={{ opacity: modelRestore as unknown as number }}>
                        <path d={isoPath([[0,0,0],[W,0,0],[W,0,H],[0,0,H]])} fill="var(--accent)" fillOpacity={0.04} />
                        <path d={isoPath([[W,0,0],[W,D,0],[W,D,H],[W,0,H]])} fill="var(--accent)" fillOpacity={0.03} />
                      </motion.g>
                    </motion.g>

                    <motion.g style={{ opacity: labelOpacity }} fontSize="8" fontWeight="500">
                      <text x={iso(W+5, 0, FH*3)[0]} y={iso(W+5, 0, FH*3)[1]} fill="var(--accent)">Structural</text>
                      <text x={iso(W+5, 0, FH*2+10)[0]} y={iso(W+5, 0, FH*2+10)[1]} fill="#10b981">MEP</text>
                      <text x={iso(W+5, 0, FH+10)[0]} y={iso(W+5, 0, FH+10)[1]} fill="#f59e0b">Architectural</text>
                    </motion.g>

                    <motion.g style={{ opacity: buildingOpacity }}>
                      <motion.path d={ductPath} stroke="#10b981" strokeWidth="2" style={{ opacity: clashFade as unknown as number }} />
                      <path d={pipePath} stroke="#f59e0b" strokeWidth="1.5" opacity={0.6} />
                      <path d={beamPath} stroke="var(--accent)" strokeWidth="2.5" opacity={0.7} />
                    </motion.g>

                    <motion.g style={{ opacity: clashOpacity }}>
                      <motion.circle cx={clashPt[0]} cy={clashPt[1]} r={12} fill="none" stroke="#ef4444" strokeWidth="2" style={{ scale: clashScale }} />
                      <motion.circle cx={clashPt[0]} cy={clashPt[1]} r={12} fill="#ef4444" fillOpacity={0.15} style={{ scale: clashScale }} animate={{ r: [12, 18, 12] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.circle cx={clashPt[0]} cy={clashPt[1]} r={3} fill="#ef4444" style={{ scale: clashScale }} />
                      <motion.g style={{ opacity: clashOpacity }}>
                        <rect x={clashPt[0] + 18} y={clashPt[1] - 20} width="110" height="24" rx="6" fill="var(--surface-elevated)" stroke="#ef4444" strokeWidth="1" />
                        <text x={clashPt[0] + 24} y={clashPt[1] - 4} fontSize="7" fontWeight="600" fill="#ef4444">CLASH DETECTED</text>
                      </motion.g>
                    </motion.g>

                    <motion.path d={ductResolvedPath} stroke="#10b981" strokeWidth="2" fill="none" style={{ opacity: resolveOpacity }} />

                    <motion.g style={{ opacity: checkOpacity }}>
                      <circle cx={clashPt[0]} cy={clashPt[1]} r={12} fill="#10b981" fillOpacity={0.15} />
                      <circle cx={clashPt[0]} cy={clashPt[1]} r={8} fill="#10b981" />
                      <path d={`M${clashPt[0]-3} ${clashPt[1]} L${clashPt[0]-1} ${clashPt[1]+3} L${clashPt[0]+4} ${clashPt[1]-3}`} stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x={clashPt[0] + 18} y={clashPt[1] - 16} width="90" height="24" rx="6" fill="var(--surface-elevated)" stroke="#10b981" strokeWidth="1" />
                      <text x={clashPt[0] + 24} y={clashPt[1] - 1} fontSize="7" fontWeight="600" fill="#10b981">RESOLVED</text>
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
