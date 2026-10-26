"use client";

import { useSyncExternalStore } from "react";

function mediaStore(query: string) {
  return {
    subscribe(onChange: () => void) {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    get: () => window.matchMedia(query).matches,
  };
}

const reduced = mediaStore("(prefers-reduced-motion: reduce)");
const desktop = mediaStore("(min-width: 900px) and (pointer: fine)");

/** True when the visitor asked for less motion. Server render assumes motion is fine. */
export function useReducedMotion() {
  return useSyncExternalStore(reduced.subscribe, reduced.get, () => false);
}

/** Wide screen with a mouse: the pinned / 3D versions of things. Null on the server. */
export function useDesktop(): boolean | null {
  return useSyncExternalStore(desktop.subscribe, desktop.get, () => null);
}
