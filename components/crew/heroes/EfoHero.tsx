"use client";

import { Bug01Icon, FlashlightIcon, Restaurant01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { type HeroProps, HeroTop } from "./shared";

// Efo reads the chat "in the shadows", referees it, finds the bugs and always
// asks about food. So the hero is dark: bring your own light.

// Things hiding in the dark, placed by percentage of the search zone.
const HIDDEN: { text: string; x: number; y: number; size: string }[] = [
  { text: "Daddy Selorm", x: 6, y: 12, size: "text-3xl md:text-5xl" },
  { text: "Prince", x: 70, y: 10, size: "text-2xl md:text-4xl" },
  { text: "Reading in the shadows", x: 30, y: 46, size: "text-xl md:text-3xl" },
  { text: "Comic relief", x: 6, y: 80, size: "text-xl md:text-2xl" },
  { text: "Database · QA · hardware fixes", x: 54, y: 26, size: "text-base md:text-xl" },
];
const BUGS: { x: number; y: number }[] = [
  { x: 34, y: 18 },
  { x: 86, y: 30 },
  { x: 16, y: 56 },
  { x: 70, y: 66 },
  { x: 50, y: 86 },
];

export function EfoHero(props: HeroProps) {
  const { m } = props;
  const stage = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [squashed, setSquashed] = useState<number[]>([]);
  const [flipped, setFlipped] = useState(false);

  // No mouse? The light wanders by itself until someone touches the stage.
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (!touched.current) {
        const t = (now - start) / 1000;
        el.style.setProperty("--x", `${50 + Math.sin(t * 0.6) * 38}%`);
        el.style.setProperty("--y", `${50 + Math.sin(t * 0.9 + 1) * 34}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function aim(e: React.PointerEvent) {
    const el = stage.current;
    if (!el) return;
    if (e.pointerType !== "mouse") touched.current = true;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  const found = squashed.length;

  return (
    <header className="relative overflow-hidden bg-[#0a0a0a] text-paper">
      <div className="wrap relative z-20 pt-10 md:pt-14">
        <HeroTop {...props} />
      </div>

      <div
        ref={stage}
        onPointerMove={aim}
        onPointerDown={aim}
        className="relative mt-6 cursor-none touch-pan-y select-none motion-reduce:cursor-auto"
        style={{ "--x": "30%", "--y": "25%" } as React.CSSProperties}
      >
        {/* the search zone: what's in the dark */}
        <div className="relative h-[340px] md:h-[380px]">
          <p className="pointer-events-none absolute top-0 right-0 left-0 z-20 text-center font-mono text-[11px] tracking-[0.2em] text-paper/45 uppercase motion-reduce:hidden">
            Move your light around
          </p>
          {HIDDEN.map((h) => (
            <p
              key={h.text}
              className={`display absolute ${h.size} text-paper/90`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              {h.text}
            </p>
          ))}
          <p className="absolute top-[70%] left-[44%] flex items-center gap-2 font-mono text-[12px] tracking-[0.16em] text-amber uppercase md:text-[13px]">
            <Icon icon={Restaurant01Icon} size={16} /> Asks about food. Every time.
          </p>
          {BUGS.map((b, k) => (
            <button
              key={k}
              type="button"
              aria-label={squashed.includes(k) ? "Bug squashed" : "Squash this bug"}
              disabled={squashed.includes(k)}
              onClick={() => setSquashed((s) => [...s, k])}
              className={`absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-all duration-300 ${
                squashed.includes(k) ? "scale-75 text-paper/25" : "text-(--p) hover:scale-110"
              }`}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <Icon icon={Bug01Icon} size={26} />
              {squashed.includes(k) && <span className="absolute h-0.5 w-10 rotate-45 bg-paper/40" />}
            </button>
          ))}
        </div>

        {/* the shadows, with a hole where the light is */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(circle 190px at var(--x) var(--y), transparent 0, transparent 60%, rgb(10 10 10 / 0.8) 78%, rgb(10 10 10 / 0.94) 100%)",
          }}
        />
        {/* the torch itself */}
        <span
          aria-hidden
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 text-amber motion-reduce:hidden"
          style={{ left: "var(--x)", top: "var(--y)" }}
        >
          <Icon icon={FlashlightIcon} size={22} />
        </span>

        {/* always lit: the name, the card, the score */}
        <div className="wrap pointer-events-none relative z-20 pb-16 md:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div>
              <h1 className="sign mt-2 -ml-1 text-[34vw] leading-[0.85] text-(--p) lg:text-[clamp(9rem,14vw,14rem)]">{m.name}</h1>
              <p className="display text-[clamp(2.25rem,5vw,4.25rem)]">{m.title}</p>
              <p className="mt-4 font-mono text-[12px] tracking-[0.12em] text-paper/70 uppercase" aria-live="polite">
                {found === BUGS.length
                  ? "All 5 bugs found. Efo would be proud."
                  : `Bugs found: ${found} / ${BUGS.length} · Efo finds them in the dark`}
              </p>
            </div>

            {/* the red card */}
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-pressed={flipped}
              aria-label={flipped ? "ELK: Execute, Learn and Keep growing. Flip back" : "Show the red card"}
              className="pointer-events-auto mb-2 [perspective:900px]"
            >
              <span
                className="relative block h-48 w-36 transition-transform duration-500 [transform-style:preserve-3d] md:h-64 md:w-44"
                style={{ transform: `rotate(8deg) rotateY(${flipped ? 180 : 0}deg)` }}
              >
                <span className="absolute inset-0 flex flex-col justify-between rounded-xl bg-(--p) p-4 text-left text-paper shadow-[0_30px_60px_-20px_rgb(229_56_59/0.6)] [backface-visibility:hidden]">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-80">The Referee</span>
                  <span className="display text-4xl leading-none">Red card.</span>
                  <span className="text-[12px] opacity-80">Tap to read the rule</span>
                </span>
                <span className="absolute inset-0 flex flex-col justify-between rounded-xl bg-paper p-4 text-left text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-(--p) uppercase">House rule</span>
                  <span className="display text-5xl leading-[0.9]">ELK.</span>
                  <span className="text-[13px] leading-snug">Execute, Learn and Keep growing.</span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
