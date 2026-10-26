"use client";

import { useSyncExternalStore } from "react";

// Split-flap clatter, synthesised so there's no audio file to download.
// Always off until the visitor turns it on.

let enabled = false;
let ctx: AudioContext | null = null;
const listeners = new Set<() => void>();

export function setSound(on: boolean) {
  enabled = on;
  if (on && !ctx) ctx = new AudioContext();
  listeners.forEach((l) => l());
}

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => enabled,
    () => false,
  );
}

let last = 0;

/** One flap tick. Throttled so a whole board flipping sounds like a clatter, not a buzz. */
export function flapTick() {
  if (!enabled || !ctx) return;
  const now = ctx.currentTime;
  if (now - last < 0.018) return;
  last = now;
  const len = Math.floor(ctx.sampleRate * 0.012);
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1800 + Math.random() * 1400;
  const gain = ctx.createGain();
  gain.gain.value = 0.18;
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
}
