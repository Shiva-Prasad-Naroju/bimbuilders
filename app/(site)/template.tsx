"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Remounts on each navigation; animates the incoming page and resets scroll.
 *
 * Notes:
 * - Skips scroll reset when the URL contains a hash so anchor navigation (e.g.
 *   `/#process`) lands at the target instead of being yanked to the top.
 * - Honors `prefers-reduced-motion`; renders without the wrapper animation in
 *   that case so we never introduce a transform on the page root.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    // Defer to the next paint so any synchronous layout from the new page
    // settles before we adjust scroll, avoiding a visible jump.
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
