"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";

type Tool = {
  name: string;
  role: string;
  logo: string;
  alt: string;
  /** Wordmarks with dark text — invert to white on dark theme */
  logoLightOnDark?: boolean;
  /** Colored wordmark (e.g. blue icon + black text) — invert + hue-rotate on dark */
  logoColorOnDark?: boolean;
  /** Wordmark shipped on white — show a white pad (no invert; avoids black rectangles) */
  logoWhiteBg?: boolean;
};

const tools: readonly Tool[] = [
  {
    name: "Autodesk Revit",
    role: "Architecture, Structure, MEP",
    logo: "/images/tech/revit-badge.png",
    alt: "Autodesk Revit official product logo",
  },
  {
    name: "Autodesk Navisworks",
    role: "Clash detection and model review",
    logo: "/images/tech/navisworks-badge.png",
    alt: "Autodesk Navisworks official product logo",
  },
  {
    name: "AutoCAD",
    role: "2D drafting and documentation",
    logo: "/images/tech/autocad-badge.png",
    alt: "Autodesk AutoCAD official product logo",
  },
  {
    name: "Dynamo",
    role: "Automation scripting for Revit",
    logo: "/images/tech/dynamo-badge-v2.png",
    alt: "Autodesk Dynamo logo",
  },
  {
    name: "Tekla Structures",
    role: "Structural modeling & steel detailing",
    logo: "/images/tech/tekla-badge.png",
    alt: "Tekla Structures official logo",
    logoLightOnDark: true,
  },
  {
    name: "Graphisoft Archicad",
    role: "Architectural BIM design",
    logo: "/images/tech/Graphisoft.png",
    alt: "Graphisoft Archicad official logo",
    logoWhiteBg: true,
  },
  {
    name: "FRAMECAD",
    role: "Cold-formed steel design & fabrication",
    logo: "/images/tech/FrameCAD.png",
    alt: "FRAMECAD official logo",
    logoWhiteBg: true,
  },
  {
    name: "Vertex BD",
    role: "Light-frame building design",
    logo: "/images/tech/VertexBDsystems.png",
    alt: "Vertex BD Systems official logo",
    logoColorOnDark: true,
  },
  {
    name: "Scottsdale",
    role: "Light-gauge steel & truss design",
    logo: "/images/tech/scottsdale-badge.svg",
    alt: "Scottsdale Construction Systems logo",
    logoLightOnDark: true,
  },
] as const;

const logoImgClass =
  "h-full max-h-12 w-full object-contain object-center [image-rendering:auto] motion-safe:transition-[transform,filter] motion-safe:duration-300 motion-safe:group-hover:scale-[1.03] sm:max-h-14";
const logoImgClassLightOnDark = `${logoImgClass} dark:brightness-0 dark:invert`;
/** Keeps blue icon while turning black wordmark white on dark cards */
const logoImgClassColorOnDark = `${logoImgClass} dark:invert dark:hue-rotate-180`;

function logoClassName(tool: Tool) {
  if (tool.logoColorOnDark) return logoImgClassColorOnDark;
  if (tool.logoLightOnDark) return logoImgClassLightOnDark;
  return logoImgClass;
}

const GRID_GAP_CLASS = "gap-3 sm:gap-4 md:gap-5";

/** Matches four cards to the width of five cards in the row above (gap-5 at xl). */
const CENTERED_ROW2_WIDTH =
  "w-full sm:w-[calc((100%-3rem)/5*4+2.25rem)] md:w-[calc((100%-4rem)/5*4+3rem)] lg:w-[calc((100%-4rem)/5*4+3rem)] xl:w-[calc((100%-5rem)/5*4+3.75rem)]";

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate flex flex-col items-center rounded-xl border border-border/80 bg-surface-elevated px-4 py-5 text-center transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_6px_22px_-12px_var(--accent-glow)] sm:px-5 sm:py-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(120%_80%_at_50%_0%,var(--accent-soft),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <motion.div
        className={`flex h-12 w-full max-w-[5.75rem] items-center justify-center sm:h-14 sm:max-w-[6.75rem] ${
          tool.logoWhiteBg
            ? "rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06]"
            : "px-0.5"
        }`}
      >
        <Image
          src={tool.logo}
          alt={tool.alt}
          width={180}
          height={64}
          sizes="(min-width: 640px) 108px, 92px"
          loading="lazy"
          unoptimized={tool.logo.endsWith(".svg")}
          className={logoClassName(tool)}
        />
      </motion.div>

      <p className="mt-3.5 text-pretty text-[13px] font-semibold leading-tight text-text-primary">
        {tool.name}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-text-tertiary">{tool.role}</p>
    </motion.li>
  );
}

const ROW1_TOOLS = tools.slice(0, 5);
const ROW2_TOOLS = tools.slice(5);

export function TechStack() {
  return (
    <section id="tools" className="scroll-mt-20 py-20 md:py-28" aria-label="Tools and technology">
      <Container>
        <motion.div
          variants={stagger(100)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="mb-14 text-center md:mb-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
              Tools &amp; Technology
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Our Engineering Stack
            </h2>
          </motion.div>

          {/* Below xl: single responsive grid */}
          <motion.ul
            variants={fadeUp}
            transition={medium}
            role="list"
            className={`mx-auto grid max-w-6xl grid-cols-2 ${GRID_GAP_CLASS} sm:grid-cols-3 lg:grid-cols-4 xl:hidden`}
          >
            {tools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </motion.ul>

          {/* xl+: 5 + 4 rows — second row centered under the first */}
          <motion.div
            variants={fadeUp}
            transition={medium}
            className={`mx-auto hidden max-w-6xl flex-col ${GRID_GAP_CLASS} xl:flex`}
          >
            <ul role="list" className={`grid grid-cols-5 ${GRID_GAP_CLASS}`}>
              {ROW1_TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i} />
              ))}
            </ul>
            <ul
              role="list"
              className={`mx-auto grid grid-cols-4 ${GRID_GAP_CLASS} ${CENTERED_ROW2_WIDTH}`}
            >
              {ROW2_TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i + 5} />
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
