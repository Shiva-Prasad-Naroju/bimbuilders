"use client";

import { useEffect } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type FeatureItem = { title: string; icon: LucideIcon };

/** Individual item reveal — Apple ease, soft Y lift */
const itemVariant = {
  hidden: { opacity: 0, y: 9 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] as const },
  },
};

/** Container orchestration — start children after content reveal settles */
const gridVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

/**
 * Shared 2×2 feature grid used across ALL hero slides.
 * Mobile: compact pill chips. Desktop: animated 2-column grid.
 * Exactly 4 items, identical layout every slide.
 */
export function HeroFeatureGrid({
  items,
  active = false,
  onDark = true,
}: {
  items: readonly FeatureItem[];
  active?: boolean;
  onDark?: boolean;
}) {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduced) {
      void controls.start("visible");
      return;
    }
    if (active) {
      controls.set("hidden");
      void controls.start("visible");
    }
  }, [active, reduced, controls]);

  const shown = items.slice(0, 4);

  return (
    <>
      {/* Mobile (< lg): 3 compact pill chips + overflow indicator */}
      <div className="mt-3 flex flex-wrap gap-1.5 lg:hidden" aria-hidden={!active}>
        {shown.slice(0, 3).map(({ title, icon: Icon }) => (
          <span
            key={title}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[11px] font-medium ring-1 ring-inset ${
              onDark
                ? "bg-white/[0.07] text-white/80 ring-white/[0.09]"
                : "bg-black/[0.05] text-zinc-600 ring-black/[0.08]"
            }`}
          >
            <Icon className="h-[10px] w-[10px] shrink-0" strokeWidth={1.75} aria-hidden />
            {title}
          </span>
        ))}
        {shown.length > 3 && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-medium ring-1 ring-inset ${
              onDark
                ? "bg-white/[0.04] text-white/38 ring-white/[0.06]"
                : "bg-black/[0.03] text-zinc-400 ring-black/[0.05]"
            }`}
          >
            +{shown.length - 3}
          </span>
        )}
      </div>

      {/* Desktop (lg+): animated 2×2 grid — identical height every slide */}
      <motion.ul
        role="list"
        initial="hidden"
        animate={controls}
        variants={gridVariant}
        className="mt-6 hidden w-max max-w-full grid-cols-[auto_auto] gap-x-5 gap-y-[0.875rem] lg:grid xl:mt-7 xl:gap-x-6"
      >
        {shown.map(({ title, icon: Icon }) => (
          <motion.li
            key={title}
            variants={itemVariant}
            className="flex min-w-0 items-center gap-2.5"
          >
            <span
              className={`flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                onDark
                  ? "bg-white/[0.07] text-white/90 ring-white/[0.08]"
                  : "bg-accent/[0.08] text-accent ring-accent/[0.14]"
              }`}
              aria-hidden
            >
              <Icon className="h-[10px] w-[10px]" strokeWidth={1.75} />
            </span>
            <span
              className={`truncate text-[12.5px] font-medium leading-tight ${
                onDark ? "text-white/78" : "text-text-primary"
              }`}
            >
              {title}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
