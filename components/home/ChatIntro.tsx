"use client";

import { Cancel01Icon, SentIcon, SmileIcon, StickerIcon, TickDouble02Icon } from "@hugeicons/core-free-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { crew, onColor, personVars } from "@/content/crew";
import { introThread } from "@/content/site";

const SEEN_KEY = "400-intro";
export const INTRO_DONE = "400:intro-done";
const SUBTITLE = "database 2 → 400 · 100 each · still shipping";
const LOGO = 'header a[aria-label="400, home"]';

/**
 * 01 / THE THREAD. The real group chat plays out, gets renamed "400", the
 * four of us add up (100 + 100 + 100 + 100) and the 400 flies into the nav
 * logo as the page appears. About 4s, skippable, once per session.
 * Server-rendered so it covers the first paint; the head script hides it on
 * repeat visits.
 */
export function ChatIntro() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);

  const close = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    document.documentElement.style.overflow = "";
    document.documentElement.setAttribute("data-intro", "seen");
    const logo = document.querySelector<HTMLElement>(LOGO);
    if (logo) logo.style.visibility = "";
    window.dispatchEvent(new Event(INTRO_DONE));
    setDone(true);
  }, []);

  const skip = useCallback(() => {
    tl.current?.kill();
    const el = root.current;
    if (!el) return close();
    window.dispatchEvent(new Event(INTRO_DONE));
    gsap.to(el, { autoAlpha: 0, duration: 0.3, ease: "power2.out", onComplete: close });
  }, [close]);

  useGSAP(
    () => {
      const el = root.current!;
      if (document.documentElement.getAttribute("data-intro") === "seen") {
        setDone(true);
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const logo = document.querySelector<HTMLElement>(LOGO);
      if (logo) logo.style.visibility = "hidden"; // the intro's 400 lands here

      const q = gsap.utils.selector(el);
      const [card] = q("[data-card]");
      const [backdrop] = q("[data-backdrop]");
      const [big] = q("[data-400]");
      const [sub] = q("[data-sub]") as HTMLElement[];
      const ticks = q("[data-ticks]");
      const chips = q("[data-chip]");
      const pluses = q("[data-plus]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([card, ...chips, ...pluses], { autoAlpha: 0 });
        gsap.set([q("[data-result]"), big, ticks], { autoAlpha: 1 });
        sub.textContent = SUBTITLE;
        gsap.delayedCall(1.4, skip);
        return;
      }

      const items = q("[data-item]");
      gsap.set(items, { display: "none" });

      const t0 = gsap.timeline({ onComplete: close });
      tl.current = t0;

      // ── 1. the chat opens and the months fly by ──
      t0.fromTo(card, { autoAlpha: 0, y: 28, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }, 0.05);
      let t = 0.32;
      items.forEach((it, i) => {
        t0.set(it, { display: "flex" }, t).fromTo(
          it,
          { autoAlpha: 0, y: 14, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "back.out(1.8)" },
          t,
        );
        if (it.dataset.item === "rename") {
          // the moment it becomes 400: the header title flips
          t0.to(q("[data-title-old]"), { yPercent: -110, autoAlpha: 0, duration: 0.2, ease: "power2.in" }, t + 0.04).fromTo(
            q("[data-title-new]"),
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.28, ease: "back.out(2.2)" },
            t + 0.16,
          );
          t += 0.3;
        } else {
          t += i < 3 ? 0.2 : Math.max(0.05, 0.11 - (i - 3) * 0.006);
        }
      });

      // ── 2. four hundreds add up ──
      const sum = t + 0.1;
      t0.to(q("[data-typing]"), { autoAlpha: 0, duration: 0.1 }, sum)
        .to(card, { autoAlpha: 0, y: -24, scale: 0.92, duration: 0.25, ease: "power2.in" }, sum)
        .set(q("[data-sum]"), { autoAlpha: 1 }, sum + 0.1)
        .fromTo(chips, { autoAlpha: 0, scale: 0.3, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.28, ease: "back.out(2)", stagger: 0.05 }, sum + 0.1)
        .fromTo(pluses, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, stagger: 0.05 }, sum + 0.18)
        .addLabel("merge", sum + 0.52)
        .to(pluses, { autoAlpha: 0, duration: 0.1 }, "merge")
        .to(
          chips,
          {
            // every chip slides into the middle of the row
            x: (_: number, chip: HTMLElement) => {
              const r = chip.getBoundingClientRect();
              const row = chip.parentElement!.getBoundingClientRect();
              return row.left + row.width / 2 - (r.left + r.width / 2);
            },
            scale: 0.5,
            autoAlpha: 0,
            duration: 0.26,
            ease: "power3.in",
          },
          "merge",
        )
        .set(q("[data-result]"), { autoAlpha: 1 }, "merge+=0.14")
        .fromTo(big, { autoAlpha: 0, scale: 0.35 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "expo.out" }, "merge+=0.14")
        .fromTo(ticks, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.12 }, "merge+=0.3")
        .to(
          { n: 0 },
          {
            n: SUBTITLE.length,
            duration: 0.3,
            ease: "none",
            onUpdate() {
              sub.textContent = SUBTITLE.slice(0, Math.round(this.targets()[0].n));
            },
          },
          "merge+=0.3",
        )
        .addLabel("land", "merge+=0.7");

      // ── 3. the 400 lands on the nav logo as the page appears ──
      let flip: { x: number; y: number; s: number } | null = null;
      const measure = () => {
        if (flip) return flip;
        const b = big.getBoundingClientRect();
        const l = logo?.getBoundingClientRect();
        if (!l) return (flip = { x: 0, y: -b.top - b.height, s: 0.2 });
        const s = parseFloat(getComputedStyle(logo!).fontSize) / parseFloat(getComputedStyle(big).fontSize);
        return (flip = { x: l.left - b.left, y: l.top + l.height / 2 - b.top - (b.height * s) / 2, s });
      };
      t0.call(() => window.dispatchEvent(new Event(INTRO_DONE)), [], "land")
        .set(big, { transformOrigin: "0% 0%" }, "land")
        .to([sub, ...ticks], { autoAlpha: 0, duration: 0.12 }, "land")
        .to(backdrop, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, "land")
        .to(
          big,
          { x: () => measure().x, y: () => measure().y, scale: () => measure().s, duration: 0.5, ease: "power3.inOut" },
          "land",
        );

      return () => {
        document.documentElement.style.overflow = "";
        if (logo) logo.style.visibility = "";
      };
    },
    { scope: root },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  if (done) return null;

  return (
    <div
      ref={root}
      id="intro"
      role="dialog"
      aria-label="400: shipped from the group chat. Intro animation."
      className="fixed inset-0 z-80 text-paper in-data-[intro=seen]:hidden"
    >
      <noscript>
        <style>{`#intro{display:none}`}</style>
      </noscript>
      <div data-backdrop aria-hidden className="absolute inset-0 bg-ink" />

      <button
        type="button"
        onClick={skip}
        className="absolute top-5 right-5 z-10 inline-flex h-10 items-center gap-2 rounded-full border border-paper/20 px-4 text-sm text-paper/80 transition-colors hover:border-paper/60 hover:text-paper"
      >
        Skip
        <Icon icon={Cancel01Icon} size={16} />
      </button>

      {/* ── the group chat ── */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div
          data-card
          className="invisible flex h-[min(620px,80svh)] w-[min(400px,100%)] flex-col overflow-hidden rounded-[28px] bg-[#1b1b1d] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="flex -space-x-2">
              {crew.map((m) => (
                <span
                  key={m.id}
                  className="grid h-8 w-8 place-items-center rounded-full font-mono text-[11px] font-bold ring-2 ring-[#1b1b1d]"
                  style={{ background: m.color, color: onColor(m) }}
                >
                  {m.name[0]}
                </span>
              ))}
            </span>
            <span className="min-w-0 flex-1">
              <span className="relative block h-6 overflow-hidden">
                <span data-title-old className="absolute inset-0 font-semibold">
                  Database 2
                </span>
                <span data-title-new className="invisible absolute inset-0 font-semibold text-orange">
                  400
                </span>
              </span>
              <span className="block truncate text-[12px] text-paper/50">Joyce, Leslie, Elton, Efo</span>
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
            {introThread.map((item, i) => {
              if (item.kind === "date")
                return (
                  <div key={i} data-item="date" className="justify-center py-1">
                    <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] text-paper/55">{item.text}</span>
                  </div>
                );
              if (item.kind === "rename")
                return (
                  <div key={i} data-item="rename" className="justify-center py-1">
                    <span className="rounded-full bg-orange/15 px-3 py-1.5 text-[12px] text-orange">
                      {crew[item.from].name} renamed the group to &ldquo;{item.to}&rdquo;
                    </span>
                  </div>
                );
              const who = item.from === undefined ? null : crew[item.from];
              return (
                <div key={i} data-item={item.kind} className="items-end gap-2">
                  <span
                    aria-hidden
                    style={who ? personVars(who) : undefined}
                    className={`grid h-7 w-7 flex-none place-items-center rounded-full font-mono text-[10px] font-bold ${
                      who ? "bg-(--p) text-(--p-on)" : "bg-white/10 text-paper/50"
                    }`}
                  >
                    {who ? who.name[0] : "?"}
                  </span>
                  {item.kind === "sticker" ? (
                    <span className="grid h-16 w-16 -rotate-6 place-items-center rounded-2xl bg-white/8 text-pink" aria-label="sticker">
                      <Icon icon={i % 2 ? SmileIcon : StickerIcon} size={30} />
                    </span>
                  ) : (
                    <span className="max-w-[78%] rounded-2xl rounded-bl-md bg-white/8 px-3 py-2 font-chat text-[15px] leading-snug">
                      {who && (
                        <span className="mb-0.5 block text-[12px] font-semibold" style={{ color: who.id === "joyce" ? "#F4F2EE" : who.color }}>
                          {who.name}
                        </span>
                      )}
                      {item.text}
                      {item.at && <span className="ml-2 align-bottom font-mono text-[10px] text-paper/40">{item.at}</span>}
                    </span>
                  )}
                </div>
              );
            })}
            <div data-typing className="flex items-center gap-2 pt-1 text-paper/50">
              <span className="w-7" />
              <span className="typing-dots rounded-2xl bg-white/8 px-3 py-2.5 text-[9px]">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5">
            <span className="flex-1 rounded-full bg-white/8 px-4 py-2 text-[14px] text-paper/40">Message</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange text-ink">
              <Icon icon={SentIcon} size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* ── 100 + 100 + 100 + 100 ── */}
      <div data-sum className="pointer-events-none invisible absolute inset-0 grid place-items-center px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {crew.map((m, i) => (
            <Fragment key={m.id}>
              {i > 0 && (
                <span data-plus className="display text-3xl text-paper/40 sm:text-5xl">
                  +
                </span>
              )}
              <span
                data-chip
                style={personVars(m)}
                className="grid h-16 w-16 place-items-center rounded-full bg-(--p) text-(--p-on) ring-2 ring-white/25 sm:h-24 sm:w-24"
              >
                <span className="display text-[17px] sm:text-[26px]">100</span>
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ── = 400 ── */}
      <div data-result className="pointer-events-none invisible absolute inset-0 grid place-items-center px-4">
        <div className="text-center">
          <span data-400 className="display inline-block text-[34vw] leading-none tracking-[-0.06em] text-orange sm:text-[22vw]">
            400
          </span>
          <div data-ticks className="mt-2 flex justify-end text-green">
            <Icon icon={TickDouble02Icon} size={36} />
          </div>
          <p data-sub className="mt-4 min-h-[1.5em] font-mono text-[11px] tracking-wider text-paper/60 sm:text-[13px]" />
        </div>
      </div>
    </div>
  );
}
