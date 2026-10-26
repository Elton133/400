"use client";

import { AirplaneTakeOff01Icon, ArrowUpRight01Icon, CrownIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { type HeroProps, HeroTop } from "./shared";

// Joyce: trainee pilot, Her Majesty, Chief Executive Fanfooler, always opens
// the presentation. So: a royal boarding pass and a real reflex test.

export function JoyceHero(props: HeroProps) {
  const { m } = props;
  const pass = useRef<HTMLDivElement>(null);

  // The pass leans toward the pointer. Small, physical, a bit cheeky.
  function onMove(e: React.PointerEvent) {
    const el = pass.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.setProperty("--ry", `${x * 10}deg`);
    el.style.setProperty("--rx", `${-y * 8}deg`);
  }
  function onLeave() {
    pass.current?.style.setProperty("--ry", "0deg");
    pass.current?.style.setProperty("--rx", "0deg");
  }

  return (
    <header onPointerMove={onMove} onPointerLeave={onLeave} className="relative overflow-hidden bg-[#141414] text-paper">
      {/* runway lights */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-between px-4 opacity-40">
        {Array.from({ length: 24 }, (_, k) => (
          <span
            key={k}
            className="h-1.5 w-1.5 rounded-full bg-amber motion-safe:animate-[blink_1.6s_steps(2,jump-none)_infinite]"
            style={{ animationDelay: `${k * 0.07}s` }}
          />
        ))}
      </div>

      <div className="wrap relative pt-10 pb-24 md:pt-14 md:pb-32">
        <HeroTop {...props} />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
              <Icon icon={CrownIcon} size={16} /> All hail the queen
            </p>
            <h1 className="sign mt-4 -ml-1 text-[30vw] leading-[0.85] lg:text-[clamp(9rem,15vw,15rem)]">{m.name}</h1>
            <p className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95]">
              Chief Executive <span className="text-amber">Fanfooler</span>
            </p>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">
              Also answers to Your Highness, Her Majesty and Hype queen. Lands the clients, opens every presentation, is
              training to fly actual planes, and is Man United and Messi all the way.
            </p>
          </div>

          <div className="[perspective:1200px]">
            <div
              ref={pass}
              className="relative rounded-3xl bg-paper text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) rotate(-2deg)" }}
            >
              <div className="overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between bg-amber py-4 pr-24 pl-6 md:pr-28">
                <span className="flex items-center gap-2 font-semibold">
                  <Icon icon={AirplaneTakeOff01Icon} size={20} /> 400 Airways
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase">Royal class</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 px-6 pt-7">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-ink/50 uppercase">From</p>
                  <p className="display mt-1 text-5xl">CHAT</p>
                  <p className="mt-1 text-[13px] text-ink/60">The group chat</p>
                </div>
                <Icon icon={AirplaneTakeOff01Icon} size={28} className="mb-8 text-ink/40" />
                <div className="text-right">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-ink/50 uppercase">To</p>
                  <p className="display mt-1 text-5xl">WIN</p>
                  <p className="mt-1 text-[13px] text-ink/60">The next client</p>
                </div>
              </div>

              <dl className="mt-7 grid grid-cols-3 gap-y-5 border-t border-dashed border-ink/25 px-6 py-6 font-mono text-[12px]">
                {[
                  ["Passenger", "JOYCE “MAMA J”"],
                  ["Flight", "CEF 400"],
                  ["Seat", "1A"],
                  ["Class", "HER MAJESTY"],
                  ["Boarding", "ALWAYS FIRST"],
                  ["Status", "TRAINEE PILOT"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] tracking-[0.18em] text-ink/50 uppercase">{k}</dt>
                    <dd className="mt-1 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-end justify-between gap-6 border-t border-dashed border-ink/25 px-6 py-5">
                <p className="text-[13px] leading-snug text-ink/60">
                  Seat 1A because she
                  <br />
                  always opens the presentation.
                </p>
                <span
                  aria-hidden
                  className="h-12 w-36 flex-none bg-[repeating-linear-gradient(90deg,#141414_0_2px,transparent_2px_4px,#141414_4px_5px,transparent_5px_9px,#141414_9px_12px,transparent_12px_14px)]"
                />
              </div>

              <span
                aria-hidden
                className="absolute bottom-6 left-[46%] -translate-x-1/2 rotate-[14deg] rounded-md border-[3px] border-orange px-3 py-1 font-mono text-[13px] font-bold tracking-[0.14em] text-orange uppercase opacity-90 motion-safe:animate-[stamp_0.5s_cubic-bezier(.2,1.6,.4,1)_0.6s_both]"
              >
                Approved by
                <br />
                Her Majesty
              </span>
              </div>

              {/* a luggage sticker: her club */}
              <span className="absolute -top-9 -right-3 z-10 grid h-24 w-24 rotate-12 place-items-center md:-right-6 rounded-full bg-white p-2.5 shadow-[0_12px_24px_-10px_rgb(0_0_0/0.6)] md:h-28 md:w-28">
                <Image src="/man-u.png" alt="Manchester United crest" width={400} height={420} className="h-full w-full object-contain" />
              </span>
            </div>

            <ReflexTest />
          </div>
        </div>
      </div>
    </header>
  );
}

type Phase = { kind: "idle" } | { kind: "wait" } | { kind: "go"; at: number } | { kind: "done"; ms: number } | { kind: "early" };

/** A real reaction test, because she built a whole site of them. */
function ReflexTest() {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function press() {
    if (phase.kind === "wait") {
      window.clearTimeout(timer.current);
      setPhase({ kind: "early" });
      return;
    }
    if (phase.kind === "go") {
      setPhase({ kind: "done", ms: Math.round(performance.now() - phase.at) });
      return;
    }
    setPhase({ kind: "wait" });
    timer.current = window.setTimeout(() => setPhase({ kind: "go", at: performance.now() }), 1200 + Math.random() * 2200);
  }

  const look =
    phase.kind === "go"
      ? "bg-green text-ink"
      : phase.kind === "wait"
        ? "bg-amber text-ink"
        : phase.kind === "early"
          ? "bg-orange text-ink"
          : "bg-paper/10 text-paper hover:bg-paper/15";

  const label =
    phase.kind === "idle"
      ? "Pilot reflex check: tap to start"
      : phase.kind === "wait"
        ? "Wait for green…"
        : phase.kind === "go"
          ? "TAP!"
          : phase.kind === "early"
            ? "Too early. Pilots wait for the signal. Tap to retry"
            : `${phase.ms} ms. Tap to go again`;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onPointerDown={press}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), press())}
        aria-live="polite"
        className={`min-h-14 flex-1 rounded-2xl px-5 text-left font-mono text-[13px] font-semibold tracking-wide transition-colors duration-100 ${look}`}
      >
        {label}
      </button>
      <a
        href="https://pilotreflex.joyceelli.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-paper"
      >
        Her full Pilot Reflex <Icon icon={ArrowUpRight01Icon} size={15} />
      </a>
    </div>
  );
}
