"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Building2, ChevronLeft, ChevronRight, Frame, Heart, X } from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import { useHydrated } from "@/lib/hooks";

const projects = [
  {
    type: "Commercial",
    title: "25-Floor Office Building",
    image: "/images/25FloorBuilding.png",
    overview:
      "Fully coordinated commercial BIM project integrating architectural and structural systems using Revit and Navisworks. We delivered absolute precision from concept to final drawings.",
    scope: [
      "Comprehensive architectural & structural models",
      "Intelligent layouts and zoning coordination",
      "Advanced 3D clash detection workflows",
      "Construction-ready layout visualizations",
    ],
    outcome: [
      "Drastically improved inter-team coordination",
      "Eradicated design conflicts before execution",
      "Secured massive time and cost savings",
    ],
    colors: {
      text: "text-blue-500",
      bg: "bg-blue-500",
      bgLight: "bg-blue-500/10",
    },
    badgeLabel: "Featured Architecture",
    icon: Building,
    gallery: [
      "/images/25F_ProjectImages/1.avif",
      "/images/25F_ProjectImages/2.avif",
      "/images/25F_ProjectImages/3.avif",
      "/images/25F_ProjectImages/4.avif",
      "/images/25F_ProjectImages/5.avif",
      "/images/25F_ProjectImages/7.avif",
      "/images/25F_ProjectImages/8.avif",
      "/images/25F_ProjectImages/9.avif",
    ],
  },
  {
    type: "Healthcare",
    title: "Hospital Space Planning",
    image: "/images/Hospital.jpeg",
    overview:
      "Optimized space utilization and incredibly dense MEP workflow efficiency for a master healthcare facility using cutting-edge BIM modeling.",
    scope: [
      "Rigorous space planning and zoning",
      "Coordination of Architectural, Structural & MEP",
      "Pre-construction spatial clash validation",
      "Advanced medical equipment zoning",
    ],
    outcome: [
      "Maximized spatial and operational efficiency",
      "Optimized acute medical workflow routing",
      "Flawless multi-disciplinary system integration",
    ],
    colors: {
      text: "text-emerald-500",
      bg: "bg-emerald-500",
      bgLight: "bg-emerald-500/10",
    },
    badgeLabel: "Healthcare Infrastructure",
    icon: Heart,
    gallery: [
      "/images/Hospital_ProjectImages/1.avif",
      "/images/Hospital_ProjectImages/2.avif",
      "/images/Hospital_ProjectImages/3.avif",
      "/images/Hospital_ProjectImages/4.avif",
      "/images/Hospital_ProjectImages/5.avif",
      "/images/Hospital_ProjectImages/6.avif",
      "/images/Hospital_ProjectImages/7.avif",
      "/images/Hospital_ProjectImages/8.avif",
      "/images/Hospital_ProjectImages/9.avif",
      "/images/Hospital_ProjectImages/10.avif",
    ],
  },
  {
    type: "Commercial",
    title: "Vaageswari solutions",
    image: "/images/VageshwariSolutions.jpeg",
    overview:
      "Delivered intelligently coordinated, high-fidelity BIM models for the Vaageswari solutions complex to accelerate enterprise collaboration and eradicate structural design errors.",
    scope: [
      "Multi-disciplinary intricate BIM modeling",
      "Proactive spatial and structural coordination",
      "High-fidelity execution documentation generation",
      "Real-time visual simulation rendering",
    ],
    outcome: [
      "Synchronized communication between engineering units",
      "Absolute reduction of logical execution inconsistencies",
      "Accelerated master design delivery phases",
    ],
    colors: {
      text: "text-amber-500",
      bg: "bg-amber-500",
      bgLight: "bg-amber-500/10",
    },
    badgeLabel: "Enterprise Development",
    icon: Building2,
    gallery: [
      "/images/VaageswariSolutions/1.avif",
      "/images/VaageswariSolutions/2.avif",
      "/images/VaageswariSolutions/3.avif",
      "/images/VaageswariSolutions/4.avif",
      "/images/VaageswariSolutions/5.avif",
    ],
  },
  {
    type: "Residential",
    title: "LGSF Residential BIM",
    image: "/images/LGSF_ProjectImages/1.avif",
    overview:
      "Fully coordinated Light Gauge Steel Framing residential model delivered in Autodesk Revit — wall studs, roof trusses, rafters, and framing assemblies built parametrically for clash-free, construction-ready execution.",
    scope: [
      "LGSF wall, truss, and rafter framing in Revit",
      "Architectural and structural BIM coordination",
      "Navisworks clash detection and resolution",
      "Shop drawings, sections, elevations, and 3D visualizations",
    ],
    outcome: [
      "Construction-ready LOD 300 framing documentation",
      "Reduced on-site conflicts through pre-built coordination",
      "Faster documentation turnaround via Revit automation",
    ],
    colors: {
      text: "text-cyan-400",
      bg: "bg-cyan-400",
      bgLight: "bg-cyan-400/10",
    },
    badgeLabel: "Light Gauge Steel Framing",
    icon: Frame,
    gallery: [
      "/images/LGSF_ProjectImages/1.avif",
      "/images/LGSF_ProjectImages/2.avif",
      "/images/LGSF_ProjectImages/3.avif",
      "/images/LGSF_ProjectImages/4.avif",
      "/images/LGSF_ProjectImages/5.avif",
      "/images/LGSF_ProjectImages/6.avif",
      "/images/LGSF_ProjectImages/7.avif",
    ],
  },
] as const;

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const isHospital = project.title.includes("Hospital");
  const isPhotoCover = isHospital || project.title.includes("LGSF");

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/60"
    >
      <div className="overflow-hidden rounded-xl border border-border/80 bg-surface-elevated shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-300 group-hover:border-accent/35 group-hover:shadow-[0_20px_50px_-20px_var(--accent-glow)]">
        <motion.div
          className={`relative aspect-[4/3] w-full overflow-hidden ${
            isHospital ? "bg-white" : "bg-gradient-to-br from-surface to-surface-elevated"
          }`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 25vw"
            className={`transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
              isPhotoCover ? "object-cover object-center" : "object-contain object-center p-4 sm:p-6"
            }`}
            priority={index === 0}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
        <div className="border-t border-border/60 px-4 py-4 sm:px-5 sm:py-5">
          <p className={`text-[10px] font-medium uppercase tracking-[0.18em] ${project.colors.text}`}>
            {project.badgeLabel}
          </p>
          <h3 className="mt-1.5 text-balance text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-2 text-[13px] text-text-tertiary transition-colors group-hover:text-accent">
            View project →
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function ProjectGalleryCarousel({
  images,
  projectTitle,
}: {
  images: readonly string[];
  projectTitle: string;
}) {
  const [index, setIndex] = useState(0);
  const [prevImages, setPrevImages] = useState(images);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  // Reset to the first image when a different project's images are shown.
  // Done during render (not in an effect) to avoid a stale frame at the old index.
  if (images !== prevImages) {
    setPrevImages(images);
    setIndex(0);
  }

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? count - 1 : i - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === count - 1 ? 0 : i + 1));
  }, [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  if (count === 0) return null;

  const current = images[index]!;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${projectTitle} project images`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-text-secondary shadow-sm transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>

        <div
          className="relative min-h-[200px] min-w-0 flex-1 overflow-hidden rounded-xl border border-border/60 bg-zinc-950/30 dark:bg-zinc-950/50"
          style={{ height: "min(52vh, 28rem)" }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start === null) return;
            const end = e.changedTouches[0]?.clientX ?? start;
            const dx = end - start;
            if (Math.abs(dx) > 48) {
              if (dx < 0) goNext();
              else goPrev();
            }
          }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center p-3 sm:p-5"
            >
              <Image
                src={current}
                alt={`${projectTitle} — image ${index + 1} of ${count}`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 720px, (max-width: 1920px) 900px, 1100px"
                quality={75}
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-text-secondary shadow-sm transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      {count > 1 ? (
        <div
          className="mt-6 flex items-center justify-center gap-1.5 sm:gap-2"
          role="tablist"
          aria-label="Image slides"
        >
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Image ${i + 1} of ${count}`}
              onClick={() => setIndex(i)}
              className={`relative h-1.5 shrink-0 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                i === index
                  ? "w-6 bg-text-primary shadow-[0_0_10px_var(--accent-glow)]"
                  : "w-1.5 bg-text-tertiary/35 hover:bg-text-tertiary/65"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const Icon = project.icon;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[260] isolate"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[265] bg-background/80 backdrop-blur-md"
        aria-label="Close project"
      />

      <div className="fixed inset-0 z-[270] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto min-h-full w-full max-w-4xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-16 md:max-w-5xl"
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed right-4 top-4 z-[280] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-text-secondary shadow-md transition-colors hover:text-text-primary sm:right-6 sm:top-6"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <header className="pb-6 sm:pb-8">
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 ${project.colors.bgLight}`}
            >
              <Icon className={`h-3.5 w-3.5 ${project.colors.text}`} aria-hidden />
              <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] ${project.colors.text}`}>
                {project.badgeLabel}
              </span>
            </div>
            <h2
              id="project-modal-title"
              className="text-balance text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl md:text-4xl"
            >
              {project.title}
            </h2>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-text-secondary sm:text-lg">
              {project.overview}
            </p>
          </header>

          <section aria-label="Project images">
            <ProjectGalleryCarousel
              images={project.gallery}
              projectTitle={project.title}
            />
          </section>

          <div className="mt-8 border-t border-border/80 pt-8 sm:mt-10 sm:pt-10">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">
                  Project scope
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-text-primary"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${project.colors.bg}`}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`text-[11px] font-medium uppercase tracking-[0.18em] ${project.colors.text}`}>
                  Key outcomes
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.outcome.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-text-primary"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${project.colors.bg}`}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface-elevated px-6 text-sm font-medium text-text-primary transition-colors hover:border-accent/40 hover:text-accent"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CaseStudy() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const portalReady = useHydrated();

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedIndex]);

  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <section
      id="projects"
      className="scroll-mt-20 relative overflow-hidden bg-background py-16 sm:py-20 md:py-28"
      aria-label="Projects"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-[min(50vw,30rem)] w-[min(50vw,30rem)] translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

      <Container className="relative z-10 max-w-7xl">
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeUp}
            transition={medium}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 md:mb-16"
          >
            <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
              <span className="h-px w-10 bg-border sm:w-14" aria-hidden />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
                Case studies
              </p>
              <span className="h-px w-10 bg-border sm:w-14" aria-hidden />
            </div>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
              Work that speaks for itself.
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary sm:mt-6">
              {projects.map((p) => (
                <span key={p.badgeLabel} className="inline-flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${p.colors.bg}`} />
                  {p.badgeLabel}
                </span>
              ))}
            </div>
            <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden />
          </motion.div>

          <motion.ul
            variants={fadeUp}
            transition={medium}
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4 2xl:gap-10"
          >
            {projects.map((project, index) => (
              <li key={project.title} role="listitem">
                <ProjectCard
                  project={project}
                  index={index}
                  onOpen={() => setSelectedIndex(index)}
                />
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {selectedProject ? (
              <ProjectDetailModal
                key={selectedProject.title}
                project={selectedProject}
                onClose={() => setSelectedIndex(null)}
              />
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
