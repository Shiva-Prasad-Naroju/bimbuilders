"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Remounts on each navigation; animates the incoming page and resets scroll.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.26,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
