"use client";

import { ArrowDown01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@/components/Icon";
import { crew } from "@/content/crew";
import { activity } from "@/content/site";
import { INTRO_DONE } from "./ChatIntro";

const LINES = ["We ship from", "the group chat"];

/** 02 / WE SHIP FROM THE GROUP CHAT. Clear type, one quiet live layer behind it. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const feed = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // The weight axis does the work: each line settles from light to heavy.
      // If the chat intro is still playing, wait for it to hand off.
      const waiting = document.documentElement.getAttribute("data-intro") !== "seen";
      const tl = gsap.timeline({ paused: waiting, delay: 0.05 });
      tl.from("[data-line]", { fontWeight: 300, yPercent: 30, autoAlpha: 0, duration: 1, ease: "expo.out", stagger: 0.08 }).from(
        "[data-rise]",
        { autoAlpha: 0, y: 16, duration: 0.8, ease: "power3.out", stagger: 0.08 },
        0.3,
      );
      if (!waiting) return;
      const go = () => tl.play();
      window.addEventListener(INTRO_DONE, go, { once: true });
      return () => window.removeEventListener(INTRO_DONE, go);
    },
    { scope: root },
  );

  // Pointer lifts the nearest feed line. That's it. Restraint.
  function onPointerMove(e: React.PointerEvent) {
    const lines = feed.current?.querySelectorAll<HTMLElement>("[data-feed]");
    if (!lines) return;
    let best: HTMLElement | null = null;
    let bestD = 90;
    for (const l of lines) {
      const r = l.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) / 3;
      if (d < bestD) {
        bestD = d;
        best = l;
      }
      l.dataset.near = "";
    }
    if (best) best.dataset.near = "1";
  }

  const feedLines = [...activity, ...activity];

  return (
    <section
      ref={root}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pt-16 pb-24 md:pt-24 md:pb-36"
      aria-labelledby="hero-title"
    >
      <div
        ref={feed}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[38%] overflow-hidden mask-[linear-gradient(transparent,black_18%,black_48%,transparent_68%)] md:block"
      >
        <div className="flex flex-col gap-8 pt-10 font-mono text-[12.5px]" style={{ animation: "drift-up 70s linear infinite" }}>
          {feedLines.map((line, i) => {
            const [verb, rest] = line.split(" · ");
            const status = /testing|testflight/.test(verb) ? "testing" : /prototype|idea/.test(verb) ? "cooking" : "live";
            return (
              <div
                key={i}
                data-feed
                className="flex items-center gap-2.5 text-muted/40 transition-all duration-300 data-[near=1]:-translate-y-1 data-[near=1]:text-fg"
                style={{ marginLeft: `${(i * 37) % 40}%` }}
              >
                <span className="status-light opacity-70" data-status={status} />
                {verb} · {rest}
              </div>
            );
          })}
        </div>
      </div>

      <div className="wrap">
        <p data-rise className="label">
          Product crew · Accra, Ghana · 4 people
        </p>
        <h1 id="hero-title" className="display t-hero mt-8">
          {LINES.map((l, i) => (
            <span key={l} data-line className="block">
              {l}
              {i === LINES.length - 1 && <span className="text-orange">.</span>}
            </span>
          ))}
        </h1>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,30rem)_auto] md:items-end md:justify-between">
          <div data-rise>
            <p className="lede text-fg/80">
              Four friends who design, build and launch real apps for transport, services, campuses, schools and small
              businesses.
            </p>
            <p className="sign mt-4 text-[34px]">
              {crew.map((m, i) => (
                <span key={m.id}>
                  <span style={{ color: m.color }}>{m.name}</span>
                  <span className="text-muted">{i < crew.length - 2 ? ", " : i === crew.length - 2 ? " & " : ""}</span>
                </span>
              ))}
            </p>
          </div>
          <div data-rise className="flex flex-wrap gap-3">
            <Link href="/request" className="btn btn-primary">
              Send us a request
              <Icon icon={ArrowRight02Icon} />
            </Link>
            <a href="#board" className="btn btn-secondary">
              See what&apos;s live
              <Icon icon={ArrowDown01Icon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
