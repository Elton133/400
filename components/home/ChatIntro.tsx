"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cancel01Icon, SmileIcon, StickerIcon, TickDouble02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/Icon";
import { crew, personVars } from "@/content/crew";
import { introThread } from "@/content/site";

const SEEN_KEY = "400-intro";
const SUBTITLE = "group created 23.04.2025 · renamed 400 · still shipping";

/**
 * 01 / THE THREAD. Bubbles pop in, speed up, blur into lines and collapse
 * into "400". Under 4s, skippable, once per session. Server-rendered so it
 * covers the page from the first paint; the head script hides it on repeat visits.
 */
export function ChatIntro() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    document.documentElement.style.overflow = "";
    const el = root.current;
    if (!el) return setDone(true);
    gsap.to(el, { yPercent: -100, duration: 0.35, ease: "power3.in", onComplete: () => setDone(true) });
  }, []);

  useGSAP(
    () => {
      const el = root.current!;
      if (document.documentElement.getAttribute("data-intro") === "seen") {
        setDone(true);
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(el);
      const sub = q("[data-sub]")[0] as HTMLElement;

      if (reduced) {
        gsap.set(q("[data-thread]"), { display: "none" });
        gsap.set(q("[data-final]"), { autoAlpha: 1 });
        sub.textContent = SUBTITLE;
        gsap.delayedCall(1.6, finish);
        return;
      }

      const bubbles = q("[data-bubble]");
      gsap.set(bubbles, { display: "none" });
      gsap.set(q("[data-final]"), { autoAlpha: 0 });

      // Budget: ~2.4s of thread, ~1.1s of "400", 0.35s exit. Under 4s total.
      const tl = gsap.timeline({ onComplete: finish });
      let t = 0.3; // typing… before the first message
      bubbles.forEach((b, i) => {
        tl.set(b, { display: "flex" }, t).fromTo(
          b,
          { autoAlpha: 0, y: 16, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "back.out(2)" },
          t,
        );
        // slow for the first four real messages, then the months fly by
        t += i < 4 ? 0.28 : Math.max(0.05, 0.12 - (i - 4) * 0.012);
      });
      tl.set(q("[data-typing]"), { autoAlpha: 0 }, t + 0.1)
        .to(q("[data-thread]"), { scaleX: 1.6, scaleY: 0.03, filter: "blur(6px)", duration: 0.28, ease: "power3.in" })
        .set(q("[data-thread]"), { display: "none" })
        .fromTo(q("[data-final]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 })
        .from(q("[data-400]"), { scaleX: 3, scaleY: 0.05, duration: 0.3, ease: "expo.out" })
        .from(q("[data-ticks]"), { autoAlpha: 0, x: -6, duration: 0.12 })
        .to(
          { n: 0 },
          {
            n: SUBTITLE.length,
            duration: 0.4,
            ease: "none",
            onUpdate() {
              sub.textContent = SUBTITLE.slice(0, Math.round(this.targets()[0].n));
            },
          },
        )
        .to({}, { duration: 0.2 });

      return () => {
        document.documentElement.style.overflow = "";
      };
    },
    { scope: root },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  if (done) return null;

  return (
    <div
      ref={root}
      id="intro"
      role="dialog"
      aria-label="400: shipped from the group chat. Intro animation."
      className="fixed inset-0 z-80 flex flex-col overflow-hidden bg-ink text-paper in-data-[intro=seen]:hidden"
    >
      <noscript>
        <style>{`#intro{display:none}`}</style>
      </noscript>
      <button
        type="button"
        onClick={finish}
        className="absolute top-5 right-5 z-10 inline-flex h-10 items-center gap-2 rounded-full border border-paper/20 px-4 text-sm text-paper/80 transition-colors hover:border-paper/60 hover:text-paper"
      >
        Skip
        <Icon icon={Cancel01Icon} size={16} />
      </button>

      <div data-thread className="mx-auto flex h-full w-full max-w-md origin-center flex-col justify-end gap-2 px-4 pb-10">
        {introThread.map((m, i) => (
          <div key={i} data-bubble className="items-end gap-2">
            <span
              aria-hidden
              style={m.from === undefined ? undefined : personVars(crew[m.from])}
              className={`grid h-7 w-7 flex-none place-items-center rounded-full font-mono text-[8px] font-semibold ring-1 ring-paper/20 ${
                m.from === undefined ? "bg-paper/10 text-paper/60" : "bg-(--p) text-(--p-on)"
              }`}
            >
              100
            </span>
            {m.sticker ? (
              <span className="grid h-16 w-16 -rotate-6 place-items-center rounded-2xl bg-paper/10 text-pink" aria-label="sticker">
                <Icon icon={i % 2 ? SmileIcon : StickerIcon} size={30} />
              </span>
            ) : (
              <span className="max-w-[80%] rounded-2xl rounded-bl-sm bg-paper/10 px-3 py-2 font-chat text-[15px] leading-snug">
                {m.text}
                <span className="ml-2 align-bottom font-mono text-[10px] text-paper/50">{m.at}</span>
              </span>
            )}
          </div>
        ))}
        <div data-typing className="flex items-center gap-2 pt-1 text-paper/60">
          <span className="w-7" />
          <span className="typing-dots rounded-2xl bg-paper/10 px-3 py-2.5 text-[10px]">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>

      <div data-final className="invisible absolute inset-0 grid place-items-center px-4">
        <div className="text-center">
          <div data-400 className="display text-[34vw] leading-none tracking-[-0.06em] text-orange sm:text-[24vw]">
            400
          </div>
          <div data-ticks className="mt-2 flex justify-end text-green" aria-label="read">
            <Icon icon={TickDouble02Icon} size={36} />
          </div>
          <p data-sub className="mt-4 min-h-[1.5em] font-mono text-[11px] tracking-wider text-paper/60 sm:text-[13px]" />
        </div>
      </div>
    </div>
  );
}
