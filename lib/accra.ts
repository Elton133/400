"use client";

import { useSyncExternalStore } from "react";

// Accra runs on GMT all year (no daylight saving), so UTC is Accra time.

export type AccraTime = { h: number; m: number; label: string; push: boolean };

export const isPushHour = (h: number) => h >= 19 || h < 6;

const pad = (n: number) => String(n).padStart(2, "0");

function toAccra(minuteStamp: number): AccraTime {
  const d = new Date(minuteStamp * 60_000);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  return { h, m, label: `${pad(h)}:${pad(m)}`, push: isPushHour(h) };
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 5_000);
  return () => window.clearInterval(id);
}

const currentMinute = () => Math.floor(Date.now() / 60_000);
const serverMinute = () => null;

/** Current Accra time, ticking each minute. `null` during server render. */
export function useAccraTime(): AccraTime | null {
  const minute = useSyncExternalStore(subscribe, currentMinute, serverMinute);
  return minute === null ? null : toAccra(minute);
}
