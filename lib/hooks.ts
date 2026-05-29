"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Returns `false` during SSR and the first client render, then `true` once the
 * component has hydrated. Backed by `useSyncExternalStore` so it never calls
 * `setState` inside an effect (no cascading render) and produces no hydration
 * mismatch — the canonical replacement for the `useEffect(() => setX(true), [])`
 * pattern used to gate client-only UI (portals, animations, live values).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

/**
 * The current `window.location.hash`, kept in sync via the `hashchange` event.
 * Returns `""` on the server so SSR and hydration agree.
 */
export function useLocationHash(): string {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    () => window.location.hash,
    () => ""
  );
}

/**
 * Whether the window has scrolled past `threshold` pixels. Uses a passive
 * scroll listener and reads layout in `getSnapshot`, avoiding an effect that
 * sets state on mount.
 */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false
  );
}

/**
 * Whether the document is currently hidden (tab backgrounded), tracked via the
 * `visibilitychange` event. Returns `false` on the server. Useful for pausing
 * autoplay/animations when the page isn't visible without a setState-in-effect.
 */
export function useDocumentHidden(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.hidden,
    () => false
  );
}
