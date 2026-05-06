"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const VIDEO_SRC = "/videos/videoAnimation.mp4";

/**
 * Cinematic video backdrop for the homepage hero: atmospheric, subdued, and
 * heavily overlaid so foreground content stays the focus. Degrades gracefully
 * when video fails to load or the user prefers reduced motion.
 */
export function HeroBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReduced = useReducedMotion();

  const showVideo = prefersReduced !== true && !videoFailed;

  useEffect(() => {
    if (!showVideo) return;
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = () => {
      void el.play().catch(() => setVideoFailed(true));
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, [showVideo]);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Static base — always present (fallback + foundation) */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(37, 99, 235, 0.09), transparent 50%), radial-gradient(ellipse 90% 60% at 80% 100%, rgba(15, 23, 42, 0.5), transparent 55%)",
        }}
      />

      {showVideo ? (
        <div className="hero-video-drift absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-80 [transform:translateZ(0)] will-change-transform"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onError={() => setVideoFailed(true)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      ) : null}

      {/* Readability & atmosphere — layered (video stays subtle) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/78 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/88 via-transparent to-background/75" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-blue-950/[0.1] opacity-90"
        aria-hidden
      />
      {/* Soft vignette + edge darkening */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% 35%, transparent 0%, rgba(0, 0, 0, 0.42) 78%, rgba(0, 0, 0, 0.75) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.55), inset 0 -60px 100px rgba(0, 0, 0, 0.35)",
        }}
      />

      {/* Tie-in with sticky header strip */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/65 to-transparent" />

      {/* Fine grid — very low contrast BIM-tech cue */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 40%, black 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 40%, black 15%, transparent 70%)",
        }}
      />
    </div>
  );
}
