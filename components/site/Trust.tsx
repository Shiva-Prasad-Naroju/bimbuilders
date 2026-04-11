"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import { Target, Eye } from "lucide-react";

type Feature = {
  key: string;
  title: string;
  text: string;
  visual: React.ReactNode;
};

/* ── Per-card micro-animated visuals ──
 * All visuals render inside a fixed 72×56 box so every card tile is optically balanced.
 * SVGs share viewBox 72 56 and never overflow.
 */

const VB = "0 0 72 56";
const SVG_CLS = "h-20 w-[104px]";

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox={VB} className={SVG_CLS}>
        {children}
      </svg>
    </div>
  );
}

function LayersVisual() {
  return (
    <VisualFrame>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="12"
          y={18 + i * 8}
          width="48"
          height="4"
          rx="1.5"
          className="fill-accent/15 stroke-accent/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:fill-accent/35 group-hover:stroke-accent/80"
          strokeWidth="1"
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
            transitionDelay: `${i * 70}ms`,
            transform: "translateY(0)",
          }}
        />
      ))}
      <style>{`
        .group:hover rect:nth-of-type(1) { transform: translateY(-5px); }
        .group:hover rect:nth-of-type(3) { transform: translateY(5px); }
      `}</style>
    </VisualFrame>
  );
}

function CoordinationVisual() {
  return (
    <VisualFrame>
      <line
        x1="16"
        y1="28"
        x2="56"
        y2="28"
        className="stroke-accent/40 transition-all duration-700 [stroke-dasharray:40] [stroke-dashoffset:40] group-hover:[stroke-dashoffset:0]"
        strokeWidth="1.5"
      />
      <circle
        cx="16"
        cy="28"
        r="5"
        className="fill-accent/20 stroke-accent/70 transition-all duration-500 group-hover:fill-accent/45"
        strokeWidth="1.5"
      />
      <circle
        cx="56"
        cy="28"
        r="5"
        className="fill-accent/20 stroke-accent/70 transition-all duration-500 group-hover:fill-accent/45"
        strokeWidth="1.5"
        style={{ transitionDelay: "200ms" }}
      />
      <circle
        cx="36"
        cy="28"
        r="2.5"
        className="fill-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ transitionDelay: "500ms" }}
      />
    </VisualFrame>
  );
}

function AutomationVisual() {
  return (
    <VisualFrame>
      <path
        d="M40 10 L26 30 L34 30 L32 46 L46 26 L38 26 Z"
        className="fill-accent/15 stroke-accent transition-all duration-500 group-hover:fill-accent/35"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={18 + i * 3}
          cy={16 + i * 4}
          r="1.2"
          className="fill-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ transitionDelay: `${300 + i * 80}ms` }}
        />
      ))}
    </VisualFrame>
  );
}

function GlobalVisual() {
  return (
    <VisualFrame>
      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-[20deg]"
        style={{ transformOrigin: "36px 28px" }}
      >
        <circle
          cx="36"
          cy="28"
          r="18"
          className="fill-transparent stroke-accent/50 transition-all duration-500 group-hover:stroke-accent/80"
          strokeWidth="1.5"
        />
        <ellipse
          cx="36"
          cy="28"
          rx="9"
          ry="18"
          className="fill-transparent stroke-accent/35"
          strokeWidth="1.2"
        />
        <line
          x1="18"
          y1="28"
          x2="54"
          y2="28"
          className="stroke-accent/35"
          strokeWidth="1.2"
        />
      </g>
      <circle
        cx="36"
        cy="28"
        r="1.8"
        className="fill-accent transition-all duration-700 group-hover:[filter:drop-shadow(0_0_6px_var(--accent))]"
      />
    </VisualFrame>
  );
}

function ShieldVisual() {
  return (
    <VisualFrame>
      <path
        d="M36 8 L54 15 L54 30 C54 41 46 48 36 51 C26 48 18 41 18 30 L18 15 Z"
        className="fill-accent/12 stroke-accent/70 transition-all duration-500 group-hover:fill-accent/28"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M27 29 L33 36 L45 22"
        fill="none"
        className="stroke-accent transition-all duration-700 [stroke-dasharray:30] [stroke-dashoffset:30] group-hover:[stroke-dashoffset:0]"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transitionDelay: "200ms" }}
      />
    </VisualFrame>
  );
}

const features: Feature[] = [
  {
    key: "precision",
    title: "LOD 300–500 precision",
    text: "Detail that holds up on site.",
    visual: <LayersVisual />,
  },
  {
    key: "coordination",
    title: "Architecture × Structure",
    text: "Disciplines, fully in sync.",
    visual: <CoordinationVisual />,
  },
  {
    key: "automation",
    title: "Dynamo automation",
    text: "Repeatable. Fast. Reliable.",
    visual: <AutomationVisual />,
  },
  {
    key: "global",
    title: "International standards",
    text: "Built for global protocols.",
    visual: <GlobalVisual />,
  },
  {
    key: "quality",
    title: "Clarity & constructability",
    text: "Reviewed before it ships.",
    visual: <ShieldVisual />,
  },
];

/* ── Feature card shells ── */

function FeatureCardVertical({ feature }: { feature: Feature }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-20px_var(--accent-glow)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 0%, var(--accent-glow), transparent 60%)",
        }}
      />
      <div className="relative flex h-28 items-center justify-center rounded-xl border border-border-subtle bg-background/60 transition-colors duration-500 group-hover:bg-background">
        {feature.visual}
      </div>
      <div className="relative mt-5">
        <h4 className="text-base font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent">
          {feature.title}
        </h4>
        <p className="mt-1 text-sm text-text-tertiary">{feature.text}</p>
      </div>
      <div className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-border transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_0_10px_var(--accent)]" />
    </div>
  );
}

function FeatureCardHorizontal({ feature }: { feature: Feature }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-20px_var(--accent-glow)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, var(--accent-glow), transparent 65%)",
        }}
      />
      <div className="relative flex items-center gap-6">
        <div className="flex h-28 w-40 flex-shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-background/60 transition-colors duration-500 group-hover:bg-background">
          {feature.visual}
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent">
            {feature.title}
          </h4>
          <p className="mt-1 text-sm text-text-tertiary">{feature.text}</p>
        </div>
      </div>
      <div className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-border transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_0_10px_var(--accent)]" />
    </div>
  );
}

export function Trust() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32 bg-surface"
    >
      {/* Blueprint dot-grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--accent-glow)" }}
      />

      <Container className="relative">
        <motion.div
          variants={stagger(90)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── Editorial header ── */}
          <motion.div
            variants={fadeUp}
            transition={medium}
            className="grid gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                About Us
              </div>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl md:text-6xl md:leading-[1.05]">
                BIM professionals
                <br className="hidden sm:block" />{" "}
                building for the{" "}
                <span className="bg-gradient-to-r from-accent to-neon-blue bg-clip-text text-transparent">
                  real world.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pt-6">
              <p className="text-lg leading-relaxed text-text-secondary">
                We&apos;re a team focused on accurate, coordinated models that
                translate design intent into construction reality.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-tertiary">
                Architecture, structure, interior, and scan-to-BIM — delivered
                with workflows that integrate cleanly into project execution.
              </p>
            </div>
          </motion.div>

          {/* ── Mission & Vision bento ── */}
          <motion.div
            variants={fadeUp}
            transition={medium}
            className="mt-16 grid gap-6 md:grid-cols-5"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 md:col-span-3">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--accent-glow)" }}
              />
              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/15">
                  <Target className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                  01 — Mission
                </span>
              </div>
              <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                Precision that supports better construction outcomes.
              </h3>
              <p className="relative mt-3 max-w-md text-base leading-relaxed text-text-secondary">
                We exist to bridge design and execution — through coordinated
                BIM workflows that reduce conflicts and build certainty on
                site.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 md:col-span-2">
              <div
                aria-hidden
                className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--accent-glow)" }}
              />
              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/15">
                  <Eye className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                  02 — Vision
                </span>
              </div>
              <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-text-primary sm:text-[26px]">
                Shaping the future of digital construction.
              </h3>
              <p className="relative mt-3 text-base leading-relaxed text-text-secondary">
                Structured modeling, automation, and a mindset that treats
                every project as a step toward smarter building.
              </p>
            </div>
          </motion.div>

          {/* ── Why teams choose — Google Workspace-style feature cards ── */}
          <motion.div variants={fadeUp} transition={medium} className="mt-24">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                  What sets us apart
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                  Why teams choose BIM Builders
                </h3>
              </div>
            </div>

            {/* Top row: 3 vertical cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.slice(0, 3).map((f) => (
                <FeatureCardVertical key={f.key} feature={f} />
              ))}
            </div>

            {/* Bottom row: 2 wide horizontal cards */}
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {features.slice(3).map((f) => (
                <FeatureCardHorizontal key={f.key} feature={f} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
