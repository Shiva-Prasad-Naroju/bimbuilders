"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHydrated } from "@/lib/hooks";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Globe,
  HardHat,
  Hammer,
  LineChart,
  Rocket,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, medium, stagger } from "@/lib/motion";
import { SERVICES, type ServiceDefinition } from "@/lib/site/services-data";
import { SERVICE_PAGE_CARDS } from "@/lib/site/services-page-data";

/** Material emphasized decelerate */
const MATERIAL_EASE = [0.4, 0, 0.2, 1] as const;

/* ── Supporting blocks shown beneath the services grid ── */

type SupportItem = { icon: LucideIcon; title: string; text: string };

const SERVICE_STRENGTHS: ReadonlyArray<SupportItem> = [
  {
    icon: ShieldCheck,
    title: "Precision & Accuracy",
    text: "Every model is detail-checked and constructable.",
  },
  {
    icon: Rocket,
    title: "Automation & Efficiency",
    text: "Dynamo scripts accelerate workflows without compromising quality.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    text: "Our BIM processes comply with LOD 300–500 and international coordination standards.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Coordination",
    text: "Integrated, clash-free models that support informed decision-making.",
  },
];

const INDUSTRIES_SERVED: ReadonlyArray<SupportItem> = [
  {
    icon: Building2,
    title: "Residential & Commercial",
    text: "From apartments to high-rises.",
  },
  {
    icon: HardHat,
    title: "Infrastructure & Civil",
    text: "Bridges, utilities, and public works.",
  },
  {
    icon: Hammer,
    title: "Renovation & Retrofits",
    text: "Accurate as-built models for modernization.",
  },
  {
    icon: Briefcase,
    title: "Architectural Firms & Contractors",
    text: "BIM support for documentation and coordination.",
  },
];

function SupportColumn({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: ReadonlyArray<SupportItem>;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-balance text-xl font-semibold tracking-tight text-text-primary sm:text-2xl md:text-[1.625rem]">
        {title}
      </h2>
      <ul role="list" className="mt-5 space-y-3 sm:mt-6">
        {items.map(({ icon: Icon, title: itemTitle, text }) => (
          <li key={itemTitle} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/15">
              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="text-[14.5px] leading-relaxed text-text-secondary sm:text-[15px]">
              <span className="font-semibold text-text-primary">{itemTitle}</span> — {text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function serviceById(id: string): ServiceDefinition {
  const found = SERVICES.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown service id: ${id}`);
  return found;
}

function ServiceCard({
  card,
  service,
  selected,
  index,
  onSelect,
}: {
  card: (typeof SERVICE_PAGE_CARDS)[number];
  service: ServiceDefinition;
  selected: boolean;
  index: number;
  onSelect: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      id={card.serviceId}
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-label={`Open details for ${service.title}`}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: MATERIAL_EASE }}
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] text-left outline-offset-4 transition-[box-shadow,background-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:rounded-[1.5rem] ${
        selected
          ? "bg-surface-elevated shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-4px_var(--accent-glow)] ring-2 ring-accent/50"
          : "bg-surface-elevated shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.45)]"
      }`}
    >
      {/* Image hero */}
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface">
        <Image
          src={service.cardImage}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
          className={`object-cover object-center ${
            reduced
              ? ""
              : "transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
          }`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <p className="text-[11px] font-medium tabular-nums tracking-[0.16em] text-text-tertiary">
          {card.number}
        </p>
        <h3 className="line-clamp-2 text-pretty text-[15px] font-medium leading-snug tracking-tight text-text-primary sm:text-base">
          {service.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-pretty text-[13px] leading-relaxed text-text-secondary">
          {service.cardTagline}
        </p>

        <span
          className={`mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
            selected
              ? "bg-accent text-white"
              : "bg-accent/10 text-accent group-hover:bg-accent/15 dark:bg-accent/15 dark:group-hover:bg-accent/20"
          }`}
        >
          Learn more
          <ArrowRight
            className={`h-3.5 w-3.5 ${reduced ? "" : "transition-transform duration-200 group-hover:translate-x-0.5"}`}
            aria-hidden
          />
        </span>
      </div>

      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]"
        aria-hidden
      />
    </motion.button>
  );
}

function ServiceDetailContent({ service }: { service: ServiceDefinition }) {
  const Icon = service.icon;

  return (
    <div className="grid gap-0 lg:grid-cols-[1fr_min(480px,45%)] lg:items-stretch 2xl:grid-cols-[1fr_min(560px,42%)]">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${service.colors.bg} ${service.colors.text}`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <p className={`text-xs font-medium tracking-wide ${service.colors.text}`}>
              {service.subtitle}
            </p>
            <h2 className="mt-1 text-2xl font-normal tracking-tight text-text-primary sm:text-[1.75rem]">
              {service.title}
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-[1.7] text-text-secondary sm:text-base">
          {service.description}
        </p>

        <ul className="mt-8 space-y-3.5" role="list">
          {service.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-text-primary"
            >
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${service.colors.bg}`}
                aria-hidden
              >
                <Check className={`h-3 w-3 ${service.colors.text}`} strokeWidth={2.5} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            Start a project
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-elevated"
          >
            View projects
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden bg-surface">
        <Image
          src={service.cardImage}
          alt=""
          width={800}
          height={1000}
          sizes="(min-width: 1024px) 380px, 100vw"
          className="h-full w-full object-cover object-center"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-elevated/60 via-transparent to-transparent lg:from-surface-elevated/30"
          aria-hidden
        />
      </div>
    </div>
  );
}

function ServiceDetailModal({
  serviceId,
  onClose,
}: {
  serviceId: string | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useHydrated();
  const service = serviceId ? serviceById(serviceId) : null;

  useEffect(() => {
    if (!serviceId) return;

    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [serviceId, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {serviceId && service ? (
        <motion.div
          key={serviceId}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close service details"
            className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 20 }}
            transition={{ duration: 0.32, ease: MATERIAL_EASE }}
            className="relative z-10 flex max-h-[min(94dvh,56rem)] w-full max-w-6xl flex-col overflow-hidden rounded-t-[1.75rem] border border-border/80 bg-surface-elevated shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)] sm:rounded-[1.75rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <p
                id="service-modal-title"
                className="text-sm font-medium text-text-secondary"
              >
                Service overview
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-secondary transition-colors hover:bg-border/40 hover:text-text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <ServiceDetailContent service={service} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function Services() {
  const [modalId, setModalId] = useState<string | null>(null);

  const cardsWithService = useMemo(
    () =>
      SERVICE_PAGE_CARDS.map((card, index) => ({
        card,
        service: serviceById(card.serviceId),
        index,
      })),
    [],
  );

  const openService = useCallback((id: string) => {
    setModalId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalId(null);
    if (typeof window !== "undefined") {
      const path = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", path);
    }
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id && SERVICE_PAGE_CARDS.some((c) => c.serviceId === id)) {
        setModalId(id);
      } else if (!id) {
        setModalId(null);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section
      className="services-page relative scroll-mt-24 overflow-hidden py-12 sm:py-16 md:scroll-mt-28 md:py-20"
      aria-label="Services"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--accent-soft),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <Container wide>
        <motion.div
          variants={stagger(50)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.header
            variants={fadeUp}
            transition={medium}
            className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
          >
            <h1 className="font-hero-title text-[clamp(2rem,5vw,3rem)] font-normal tracking-tight text-text-primary">
              BIM services for every phase
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-text-secondary sm:text-lg">
              Pick a service—scope, deliverables, and how we help your team build
              with confidence.
            </p>
          </motion.header>

          <motion.div
            variants={fadeUp}
            transition={medium}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5 2xl:gap-6"
            role="list"
            aria-label="All services"
          >
            {cardsWithService.map(({ card, service, index }) => (
              <div key={card.serviceId} role="listitem" className="min-w-0">
                <ServiceCard
                  card={card}
                  service={service}
                  index={index}
                  selected={modalId === card.serviceId}
                  onSelect={() => openService(card.serviceId)}
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={medium}
            className="mt-16 grid gap-10 border-t border-border pt-12 sm:mt-20 sm:gap-12 sm:pt-14 lg:grid-cols-2 lg:gap-16"
          >
            <SupportColumn
              eyebrow="What sets us apart"
              title="Why our services stand out"
              items={SERVICE_STRENGTHS}
            />
            <SupportColumn
              eyebrow="Sectors we work across"
              title="Industries we serve"
              items={INDUSTRIES_SERVED}
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={medium}
            className="mt-12 text-center text-sm text-text-tertiary sm:mt-14"
          >
            Need something tailored?{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Talk to our team
            </Link>
          </motion.p>
        </motion.div>
      </Container>

      <ServiceDetailModal serviceId={modalId} onClose={closeModal} />
    </section>
  );
}
