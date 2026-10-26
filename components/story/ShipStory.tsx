"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useDesktop, useReducedMotion } from "@/lib/motion";
import { type Scene, scenes } from "./scenes";

gsap.registerPlugin(ScrollTrigger);

const toneBg: Record<NonNullable<Scene["tone"]>, string> = {
  fail: "text-orange-text",
  test: "text-amber-text",
  live: "text-green-text",
};

/** 05 / FROM "WHAT IF" TO "IT'S LIVE". The emotional centre of the site. */
export function ShipStory() {
  const desktop = useDesktop();
  const reduced = useReducedMotion();
  const mode = desktop === null || reduced ? "stacked" : desktop ? "pinned" : "taps";

  return (
    <section aria-labelledby="ship-title" className="border-y border-line bg-surface">
      <div className="wrap pt-24 md:pt-36">
        <p className="label">05 / One product, start to finish</p>
        <h2 id="ship-title" className="display t-section mt-6 max-w-[14ch]">
          From &ldquo;what if&rdquo; to &ldquo;it&apos;s live<span className="text-green">.</span>&rdquo;
        </h2>
        <p className="lede mt-6 max-w-md text-muted">The real path of Trofficient. Failure included.</p>
      </div>
      {mode === "pinned" ? <Pinned /> : mode === "taps" ? <Taps /> : <Stacked />}
    </section>
  );
}

function SceneView({ scene, className = "" }: { scene: Scene; className?: string }) {
  return (
    <div className={`grid w-full items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20 ${className}`}>
      <div>
        <p className={`label ${scene.tone ? toneBg[scene.tone] : ""}`}>{scene.kicker}</p>
        <h3
          className={`display mt-5 ${scene.tone === "fail" ? "text-[clamp(6rem,15vw,13rem)] tracking-[-0.06em] text-orange" : "t-section"}`}
        >
          {scene.title}
        </h3>
        {scene.body && (
          <p className={`mt-6 max-w-md ${scene.tone === "fail" ? "font-mono text-[15px]" : "lede text-fg/80"}`}>
            {scene.body}
          </p>
        )}
      </div>
      <div className="flex justify-center">{scene.visual}</div>
    </div>
  );
}

/** Reduced motion, no JS, and the server render: everything, in order, nothing moves. */
function Stacked() {
  return (
    <ol className="wrap pb-12">
      {scenes.map((s) => (
        <li key={s.id} className="border-b border-line py-20 last:border-b-0">
          <SceneView scene={s} />
        </li>
      ))}
    </ol>
  );
}

/** Desktop: pinned and scrubbed by scroll. */
function Pinned() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${els.length * 85}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: () => setActive(Number(tl.currentLabel()?.slice(1) || 0)),
        },
      });

      els.forEach((el, i) => {
        const steps = el.querySelectorAll("[data-step]");
        const count = el.querySelector<HTMLElement>("[data-count]");
        tl.addLabel(`s${i}`);
        if (i > 0) tl.fromTo(el, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.35 });
        tl.from(steps, { autoAlpha: 0, y: 24, duration: 0.3, stagger: 0.18 });
        if (el.dataset.scene === "fail") {
          tl.from(el.querySelector("h3"), { scale: 1.6, autoAlpha: 0, duration: 0.25, ease: "expo.out" }, "<");
          tl.to({}, { duration: 0.6 }); // everything stops
        }
        if (count) {
          const target = Number(count.dataset.count);
          const n = { v: 1 };
          count.textContent = "1";
          tl.to(n, {
            v: target,
            duration: 0.8,
            ease: "none",
            onUpdate: () => {
              count.textContent = String(Math.round(n.v));
            },
          });
        }
        tl.to({}, { duration: 0.35 });
        if (i < els.length - 1) tl.to(el, { autoAlpha: 0, y: -60, duration: 0.3 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative h-[calc(100svh-4rem)] overflow-hidden">
      {scenes.map((s, i) => (
        <div
          key={s.id}
          data-scene={s.id}
          className={`wrap absolute inset-0 flex items-center ${i > 0 ? "invisible" : ""}`}
        >
          <SceneView scene={s} />
        </div>
      ))}
      <div className="wrap absolute inset-x-0 bottom-8">
        <Progress active={active} />
      </div>
    </div>
  );
}

/** Mobile: short "status update" format, tap to advance. */
function Taps() {
  const [i, setI] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const scene = scenes[i];

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const steps = el.querySelectorAll("[data-step]");
    const tween = gsap.from(steps, { autoAlpha: 0, y: 16, duration: 0.35, stagger: 0.12, ease: "power2.out" });
    const count = el.querySelector<HTMLElement>("[data-count]");
    let roll: gsap.core.Tween | undefined;
    if (count) {
      const n = { v: 1 };
      roll = gsap.to(n, {
        v: Number(count.dataset.count),
        duration: 1.4,
        delay: 0.3,
        ease: "power1.inOut",
        onUpdate: () => {
          count.textContent = String(Math.round(n.v));
        },
      });
    }
    return () => {
      tween.revert();
      roll?.progress(1).kill();
    };
  }, [i]);

  const go = (d: number) => setI((v) => Math.min(scenes.length - 1, Math.max(0, v + d)));

  return (
    <div className="wrap py-12">
      <Progress active={i} className="mb-4" />
      <div ref={card} className="relative min-h-[78svh] rounded-2xl border border-line bg-bg p-6">
        <SceneView key={scene.id} scene={scene} />
        <button
          type="button"
          aria-label="Previous step"
          onClick={() => go(-1)}
          className="absolute inset-y-0 left-0 w-1/3"
          disabled={i === 0}
        />
        <button
          type="button"
          aria-label="Next step"
          onClick={() => go(1)}
          className="absolute inset-y-0 right-0 w-2/3"
          disabled={i === scenes.length - 1}
        />
      </div>
      <p className="label mt-4 text-center" aria-live="polite">
        {i < scenes.length - 1 ? `Tap to continue · ${i + 1} / ${scenes.length}` : "That's how it goes. Every time."}
      </p>
    </div>
  );
}

function Progress({ active, className = "" }: { active: number; className?: string }) {
  return (
    <ol className={`flex gap-1.5 ${className}`} aria-label="Story progress">
      {scenes.map((s, i) => (
        <li key={s.id} className="flex-1" aria-current={i === active ? "step" : undefined}>
          <span
            className={`block h-0.5 rounded-full transition-colors duration-300 ${
              i < active ? "bg-fg" : i === active ? (s.tone === "fail" ? "bg-orange" : s.tone === "test" ? "bg-amber" : s.tone === "live" ? "bg-green" : "bg-fg") : "bg-line"
            }`}
          />
          <span className="mt-3 hidden font-mono text-[10px] tracking-[0.14em] text-muted uppercase lg:block">
            {s.kicker.split(" / ")[1]}
          </span>
        </li>
      ))}
    </ol>
  );
}
