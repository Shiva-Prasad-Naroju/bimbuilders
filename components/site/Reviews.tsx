"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/Container";
import { fadeUp, medium, stagger } from "@/lib/motion";

export type ReviewItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
  org: string;
};

const REVIEWS: readonly ReviewItem[] = [
  {
    id: "r1",
    quote:
      "Coordination tightened up dramatically once BIM Builders took over the federated model. Clash cycles shrank from weeks to days.",
    name: "Priya N.",
    role: "Project Architect",
    org: "Metro commercial tower, Hyderabad",
  },
  {
    id: "r2",
    quote:
      "LOD 400 deliverables were clean enough for our steel fabricator to work without constant RFIs. That alone saved us real money.",
    name: "James L.",
    role: "Construction Manager",
    org: "Industrial campus, EU",
  },
  {
    id: "r3",
    quote:
      "Their Dynamo scripts cut repetitive documentation work our juniors used to dread. Models stayed consistent across packages.",
    name: "Ananya K.",
    role: "BIM Lead",
    org: "Healthcare retrofit",
  },
  {
    id: "r4",
    quote:
      "Navisworks reports were actionable — not just a list of clashes. Resolution meetings finally had a single source of truth.",
    name: "Marcus T.",
    role: "MEP Coordinator",
    org: "Mixed-use high-rise",
  },
  {
    id: "r5",
    quote:
      "Scan-to-BIM matched site conditions closely enough that our renovation bids were confident the first time.",
    name: "Elena V.",
    role: "Development Director",
    org: "Urban infill project",
  },
  {
    id: "r6",
    quote:
      "Professional, deadline-driven, and easy to brief. They speak both design intent and contractor language fluently.",
    name: "Rahul S.",
    role: "Principal",
    org: "Boutique architecture studio",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 text-accent" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-accent text-accent" strokeWidth={0} />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  layout = "carousel",
}: {
  review: ReviewItem;
  layout?: "carousel" | "grid";
}) {
  const initials = review.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const widthCls =
    layout === "grid"
      ? "w-full max-w-none shrink"
      : "w-[min(21rem,calc(100vw-2rem))] shrink-0 sm:w-96 md:w-[26rem]";

  return (
    <article
      className={`relative flex flex-col rounded-2xl border border-border bg-surface-elevated p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.12)] sm:p-6 ${widthCls}`}
      aria-label={`Review from ${review.name}`}
    >
      <Quote
        className="pointer-events-none absolute right-4 top-4 h-9 w-9 text-accent/15 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
        strokeWidth={1}
        aria-hidden
      />
      <StarRow />
      <blockquote className="mt-3 text-pretty text-[14.5px] leading-relaxed text-text-primary sm:mt-4 sm:text-[15px] md:text-base">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4 sm:mt-6 sm:pt-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold tracking-tight text-accent"
          aria-hidden
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">{review.name}</p>
          <p className="truncate text-xs text-text-secondary">{review.role}</p>
          <p className="truncate text-xs text-text-tertiary">{review.org}</p>
        </div>
      </footer>
    </article>
  );
}

export function Reviews() {
  const reduced = useReducedMotion();
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      className="scroll-mt-20 bg-gradient-to-b from-surface via-background to-surface py-16 sm:py-20 md:py-28"
      aria-labelledby="reviews-heading"
    >
      <Container>
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-accent sm:text-sm">Industry feedback</p>
            <h2
              id="reviews-heading"
              className="mt-3 text-balance text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl"
            >
              What teams say about working with us
            </h2>
          </motion.div>
        </motion.div>
      </Container>

      {reduced ? (
        <Container className="mt-12">
          <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => (
              <ReviewCard key={r.id} review={r} layout="grid" />
            ))}
          </div>
        </Container>
      ) : (
        <div className="relative mt-10 sm:mt-14 md:mt-16">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(2rem,12vw,7rem)] bg-gradient-to-r from-[var(--background)] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(2rem,12vw,7rem)] bg-gradient-to-l from-[var(--background)] to-transparent"
            aria-hidden
          />
          <div className="overflow-hidden py-2">
            <div className="animate-reviews-marquee flex w-max gap-4 sm:gap-6 md:gap-8 2xl:gap-10">
              {loop.map((r, i) => (
                <ReviewCard key={`${r.id}-${i}`} review={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
