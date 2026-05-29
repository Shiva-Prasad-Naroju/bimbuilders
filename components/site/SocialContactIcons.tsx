import { Mail, Phone } from "lucide-react";
import {
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_MAILTO,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site/social";

function LinkedInGlyph({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramGlyph({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type Variant = "footer" | "rail";

export function SocialContactIcons({
  variant = "footer",
  className = "",
  showPhone = false,
}: {
  variant?: Variant;
  className?: string;
  /** Phone link in the rail stack (below Instagram). */
  showPhone?: boolean;
}) {
  const isFooter = variant === "footer";
  const isRail = variant === "rail";
  const stroke = isFooter ? 2 : 1.75;
  const box = "h-10 w-10";
  const glyphClass = isFooter ? "h-5 w-5" : "h-[18px] w-[18px] sm:h-5 sm:w-5";
  const motionDur = isFooter ? "duration-500" : "duration-300";

  const linkBase = isFooter
    ? `group relative flex ${box} items-center justify-center rounded-full transition-all ${motionDur} ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background`
    : `group relative flex shrink-0 ${box} items-center justify-center rounded-full outline-offset-4 transition-all ${motionDur} ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background`;

  const layout = isRail
    ? "flex flex-col items-center gap-2.5"
    : "flex items-center gap-2";

  const showGlow = isFooter || isRail;
  const iconMotion = showGlow
    ? `transition-transform ${motionDur} ease-out group-hover:scale-110`
    : "";

  return (
    <div className={`${layout} ${className}`} role="list" aria-label="Contact and social links">
      <a
        href={SITE_MAILTO}
        className={linkBase}
        title="Email us"
        aria-label="Email BIM Builders"
        role="listitem"
      >
        {showGlow ? (
          <div
            className={`absolute inset-0 scale-50 rounded-full bg-[#EA4335]/0 transition-all ${motionDur} ease-out group-hover:scale-100 group-hover:bg-[#EA4335]/15`}
          />
        ) : null}
        <Mail
          strokeWidth={stroke}
          className={`relative z-[1] ${glyphClass} text-[#EA4335] ${iconMotion}`}
        />
      </a>
      <a
        href={SITE_LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
        title="LinkedIn"
        aria-label="BIM Builders on LinkedIn"
        role="listitem"
      >
        {showGlow ? (
          <div
            className={`absolute inset-0 scale-50 rounded-full bg-[#0A66C2]/0 transition-all ${motionDur} ease-out group-hover:scale-100 group-hover:bg-[#0A66C2]/15`}
          />
        ) : null}
        <LinkedInGlyph
          strokeWidth={stroke}
          className={`relative z-[1] ${glyphClass} text-[#0A66C2] ${iconMotion}`}
        />
      </a>
      <a
        href={SITE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
        title="Instagram"
        aria-label="BIM Builders on Instagram"
        role="listitem"
      >
        {showGlow ? (
          <div
            className={`absolute inset-0 scale-50 rounded-full bg-[#E4405F]/0 transition-all ${motionDur} ease-out group-hover:scale-100 group-hover:bg-[#E4405F]/15`}
          />
        ) : null}
        <InstagramGlyph
          strokeWidth={stroke}
          className={`relative z-[1] ${glyphClass} text-[#E4405F] ${iconMotion}`}
        />
      </a>
      {isRail && showPhone ? (
        <a
          href={SITE_PHONE_TEL}
          className={linkBase}
          title={`Call ${SITE_PHONE_DISPLAY}`}
          aria-label={`Call us at ${SITE_PHONE_DISPLAY}`}
          role="listitem"
        >
          <div
            className={`absolute inset-0 scale-50 rounded-full bg-accent/0 transition-all ${motionDur} ease-out group-hover:scale-100 group-hover:bg-accent/15`}
          />
          <Phone
            strokeWidth={stroke}
            className={`relative z-[1] ${glyphClass} text-accent ${iconMotion}`}
          />
        </a>
      ) : null}
    </div>
  );
}
