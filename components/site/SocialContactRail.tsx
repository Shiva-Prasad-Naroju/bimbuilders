"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageSquare, Phone, X } from "lucide-react";
import { SocialContactIcons } from "@/components/site/SocialContactIcons";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site/social";

const railShell =
  "rounded-l-2xl border border-border/80 border-r-0 bg-background/90 shadow-[-4px_0_24px_-8px_rgba(0,0,0,0.15)] backdrop-blur-md supports-[backdrop-filter]:bg-background/75";

const railPadding = {
  paddingRight: "max(0.5rem, env(safe-area-inset-right, 0px))",
} as const;

// Anchor the rail to the lower-right corner with a safe-area-aware offset
// instead of `top: 70%` so it never obstructs viewport content on short
// landscape phones (e.g. 320×568) where 70% of vh sits over the page body.
const railOffset = {
  bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
} as const;

/**
 * Fixed column on the viewport’s right edge: social + phone in one rail,
 * BIM Assistant launcher in a separate control below.
 *
 * Mobile (<sm): the social rail is collapsed by default to a single phone
 * quick-action + chevron toggle so it doesn't blanket page content. Tap the
 * chevron to expand to the full icon stack.
 * sm+: always renders the full icon stack — no toggle.
 */
export function SocialContactRail({
  onChatClick,
  isChatOpen = false,
}: {
  onChatClick?: () => void;
  isChatOpen?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className="pointer-events-none fixed right-0 z-40 flex flex-col items-end gap-3 print:hidden"
      style={railOffset}
      aria-label="Quick contact links"
    >
      <div
        className={`pointer-events-auto ${railShell} py-3 pl-2.5 pr-2 sm:pl-3 sm:pr-2.5`}
        style={railPadding}
      >
        {/* ── Mobile: collapsible ── */}
        <div className="flex flex-col items-center gap-2.5 sm:hidden">
          <AnimatePresence initial={false} mode="wait">
            {expanded ? (
              <motion.div
                key="expanded"
                id="contact-rail-icons"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <SocialContactIcons variant="rail" showPhone />
              </motion.div>
            ) : (
              <motion.a
                key="collapsed"
                href={SITE_PHONE_TEL}
                title={`Call ${SITE_PHONE_DISPLAY}`}
                aria-label={`Call us at ${SITE_PHONE_DISPLAY}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full outline-offset-4 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 scale-50 rounded-full bg-accent/0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-accent/15"
                />
                <Phone
                  className="relative z-[1] h-[18px] w-[18px] text-accent"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </motion.a>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-elevated text-text-secondary outline-offset-4 transition-colors duration-200 ease-out hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label={expanded ? "Collapse contact links" : "Expand contact links"}
            aria-expanded={expanded}
            aria-controls="contact-rail-icons"
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
              aria-hidden
            >
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.span>
          </button>
        </div>

        {/* ── sm+: full rail, always visible ── */}
        <div className="hidden sm:block">
          <SocialContactIcons variant="rail" showPhone />
        </div>
      </div>

      {onChatClick ? (
        <div
          className={`pointer-events-auto ${railShell} p-2 sm:p-2.5`}
          style={railPadding}
        >
          <button
            type="button"
            onClick={onChatClick}
            className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg outline-offset-4 transition-all duration-300 ease-out hover:scale-105 hover:bg-accent/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-11 sm:w-11"
            title={isChatOpen ? "Close assistant" : "Open BIM assistant"}
            aria-label={isChatOpen ? "Close BIM assistant" : "Open BIM assistant"}
            aria-expanded={isChatOpen}
            aria-controls="bim-assistant-panel"
            id="bim-assistant-launch"
          >
            {isChatOpen ? (
              <X className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden />
            ) : (
              <MessageSquare
                className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                strokeWidth={1.75}
                aria-hidden
              />
            )}
          </button>
        </div>
      ) : null}
    </aside>
  );
}
