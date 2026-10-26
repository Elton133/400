"use client";

import { useEffect, useRef } from "react";
import { chatStats } from "@/content/site";

const fmt = (n: number) => n.toLocaleString("en-GB");

/** THE NUMBERS. Real, and a little ridiculous. Counts up once, when seen. */
export function Numbers() {
  const root = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cells = [...el.querySelectorAll<HTMLElement>("[data-value]")];
    cells.forEach((c) => (c.textContent = "0"));
    const frames = new Set<number>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const node = e.target as HTMLElement;
          const target = Number(node.dataset.value);
          const start = performance.now();
          const dur = 900 + Math.min(1200, target / 20);
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            node.textContent = fmt(Math.round(target * (1 - Math.pow(1 - t, 4))));
            if (t < 1) frames.add(requestAnimationFrame(step));
          };
          frames.add(requestAnimationFrame(step));
        }),
      { threshold: 0.6 },
    );
    cells.forEach((c) => io.observe(c));
    return () => {
      io.disconnect();
      frames.forEach(cancelAnimationFrame);
      cells.forEach((c) => (c.textContent = fmt(Number(c.dataset.value))));
    };
  }, []);

  return (
    // Every row shares the board's two column tracks (subgrid), so the number
    // column is exactly as wide as the widest final number.
    <ul ref={root} className="grid grid-cols-1 border-y border-line sm:grid-cols-[auto_1fr]">
      {chatStats.map((s) => (
        <li
          key={s.label}
          className="grid grid-cols-subgrid items-baseline gap-x-12 gap-y-2 border-b border-line py-7 last:border-b-0 sm:col-span-2"
        >
          {/* The invisible copy holds the final width while the visible one counts up. */}
          <span className="display grid text-[clamp(3.5rem,8vw,6.5rem)] leading-none tabular-nums sm:text-right">
            <span aria-hidden className="invisible [grid-area:1/1]">
              {fmt(s.value)}
            </span>
            <span data-value={s.value} className="[grid-area:1/1]">
              {fmt(s.value)}
            </span>
          </span>
          <span className="lede text-fg/80">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
