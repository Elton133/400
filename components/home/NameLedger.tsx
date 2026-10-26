"use client";

import { useEffect, useRef, useState } from "react";
import { crew, personVars } from "@/content/crew";

const STEP_MS = 380;

/**
 * The receipt: four rows of 100, total 400. Rows land one by one when the
 * ledger scrolls into view and the total steps up with them. Renders the
 * finished receipt on the server (no JS, crawlers, reduced motion).
 */
export function NameLedger() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(crew.length);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    // Arm just before it's on screen (reset to empty), play once it's properly in view.
    const arm = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) return;
        if (e.boundingClientRect.top > 0) setStep(0);
      },
      { rootMargin: "0px 0px 240px 0px" },
    );
    const play = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        play.disconnect();
        arm.disconnect();
        let n = 0;
        setStep(0);
        timer = window.setInterval(() => {
          n++;
          setStep(n);
          if (n >= crew.length) window.clearInterval(timer);
        }, STEP_MS);
      },
      { threshold: 0.55 },
    );
    arm.observe(el);
    play.observe(el);
    return () => {
      arm.disconnect();
      play.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const total = step * 100;

  return (
    <div ref={root} className="rounded-2xl border border-line bg-surface p-6 font-mono sm:p-8">
      <div className="flex items-center justify-between border-b border-dashed border-line-strong pb-4 text-[11px] tracking-[0.16em] text-muted uppercase">
        <span>400 · Accra</span>
        <span>Est. 05.09.2025</span>
      </div>

      <ol className="py-2">
        {crew.map((m, i) => (
          <li
            key={m.id}
            style={personVars(m)}
            className={`flex items-center gap-4 border-b border-line py-4 transition-all duration-500 last:border-b-0 ${
              i < step ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }`}
          >
            <span aria-hidden className="h-3 w-3 flex-none rounded-full bg-(--p)" />
            <span className="font-sans text-[17px]">{m.name}</span>
            <span className="hidden truncate text-[12px] text-muted sm:inline">{m.role}</span>
            <span className="ml-auto text-[17px] tabular-nums">100</span>
          </li>
        ))}
      </ol>

      <div className="flex items-end justify-between gap-6 border-t-2 border-fg pt-5">
        <span className="pb-2 text-[11px] tracking-[0.16em] text-muted uppercase">Total</span>
        <span
          className="display text-[clamp(4.5rem,9vw,7.5rem)] leading-[0.85] tracking-[-0.06em] text-orange tabular-nums"
          aria-label="400"
        >
          {total}
        </span>
      </div>
    </div>
  );
}
