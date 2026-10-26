"use client";

import { ArrowRight02Icon, TickDouble02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { PhotoSlot } from "@/components/Confirm";
import { Icon } from "@/components/Icon";
import { type CrewMember, personVars } from "@/content/crew";
import { useDesktop, useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * THE TROTRO CALL. A route across the screen with four stops.
 * Desktop: the section pins and vertical scrolling drives the route sideways,
 * settling on each stop. Touch and reduced motion: native horizontal swipe.
 */
export function TrotroCall({ crew }: { crew: CrewMember[] }) {
  const desktop = useDesktop();
  const reduced = useReducedMotion();
  const pinned = desktop === true && !reduced;

  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const last = crew.length - 1;

  // Pinned: scroll position → track position, one stop per step.
  useGSAP(
    () => {
      if (!pinned || !track.current) return;
      const el = track.current;
      const stops = el.querySelectorAll<HTMLElement>("[data-index]");
      // Exactly the distance from the first stop to the last, so each step lands a stop in the same place.
      const distance = () => stops[last].offsetLeft - stops[0].offsetLeft;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / last, duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut" },
          onUpdate: (self) => setActive(Math.round(self.progress * last)),
        },
      });
      trigger.current = tween.scrollTrigger ?? null;
      return () => {
        trigger.current = null;
      };
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true },
  );

  // Native: whichever stop is mostly in view is active.
  useEffect(() => {
    const el = track.current;
    if (pinned || !el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.index))),
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll("[data-index]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pinned]);

  const goTo = (i: number) => {
    const st = trigger.current;
    if (pinned && st) {
      window.scrollTo({ top: st.start + ((st.end - st.start) * i) / last, behavior: "smooth" });
      return;
    }
    track.current
      ?.querySelector<HTMLElement>(`[data-index="${i}"]`)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div ref={root} className={pinned ? "flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden" : ""}>
      {/* route map */}
      <ol className="wrap relative mb-10 flex justify-between" aria-label="Stops">
        <span aria-hidden className="absolute top-[7px] right-5 left-5 h-0.5 bg-line-strong md:right-10 md:left-10" />
        {crew.map((m, i) => (
          <li key={m.id} className="relative" style={personVars(m)}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === active ? "step" : undefined}
              aria-label={`Go to ${m.name}`}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`block h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                  i === active ? "scale-125 border-(--p) bg-(--p)" : i < active ? "border-(--p) bg-bg" : "border-line-strong bg-bg"
                }`}
              />
              <span
                className={`label absolute top-7 whitespace-nowrap ${i === active ? "text-fg" : ""} ${
                  i === 0 ? "left-0" : i === last ? "right-0" : "left-1/2 -translate-x-1/2"
                }`}
              >
                Stop {i + 1}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <ol
        ref={track}
        tabIndex={pinned ? undefined : 0}
        aria-label="The crew"
        className={`flex gap-10 px-5 pt-8 pb-8 md:gap-16 md:px-10 xl:px-[max(40px,calc((100vw-1280px)/2+40px))] ${
          pinned ? "will-change-transform" : "snap-x snap-mandatory scroll-px-5 overflow-x-auto [scrollbar-width:none] md:scroll-px-10"
        }`}
      >
        {crew.map((m, i) => {
          // Only show a nickname when it adds something (not just the name again).
          const nickname = m.nickname && !m.nickname.toLowerCase().includes(m.name.toLowerCase()) ? m.nickname : null;
          return (
            <li
              key={m.id}
              data-index={i}
              style={personVars(m)}
              className={`w-[86vw] flex-none snap-start transition-opacity duration-500 sm:w-[72vw] lg:w-[min(1000px,68vw)] ${
                i === active ? "opacity-100" : i < active ? "opacity-0" : "opacity-30"
              }`}
            >
              <article>
                <h3
                  className={`sign w-fit text-[16vw] leading-none text-(--p) transition-transform duration-500 sm:text-[clamp(4rem,7vw,7.5rem)] ${
                    i === active ? "-rotate-2" : "translate-y-3"
                  }`}
                >
                  {m.name}!
                </h3>
                {nickname && (
                  <p className="sign mt-1 w-fit bg-[linear-gradient(transparent_60%,var(--p-accent)_60%,var(--p-accent)_86%,transparent_86%)] px-1 text-[clamp(2.25rem,3.6vw,3.5rem)] text-fg/70">
                    {nickname}
                  </p>
                )}
                <div className="mt-8 grid gap-8 border-t-2 border-(--p) pt-8 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12">
                  <PhotoSlot label={`Photo of ${m.name}`} className="aspect-4/3 w-full rounded-2xl md:aspect-4/5" />
                  <div>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-[15px]">
                      <dt className="label pt-0.5">Usually</dt>
                      <dd>{m.role}</dd>
                      <dt className="label pt-0.5">Owns</dt>
                      <dd>{m.owns.join(" · ")}</dd>
                      <dt className="label pt-0.5">Stack</dt>
                      <dd>{m.stack.join(" · ")}</dd>
                      {m.favouriteError && (
                        <>
                          <dt className="label pt-0.5">Favourite error</dt>
                          <dd className="font-mono text-[13px] text-orange-text">{m.favouriteError}</dd>
                        </>
                      )}
                      {m.team && (
                        <>
                          <dt className="label pt-0.5">Team</dt>
                          <dd className="capitalize">{m.team}</dd>
                        </>
                      )}
                    </dl>
                    {m.line && (
                      <p className="mt-8 inline-flex max-w-sm items-end gap-2 rounded-2xl rounded-bl-md bg-raise px-4 py-2.5 font-chat text-[16px]">
                        {m.line}
                        <Icon icon={TickDouble02Icon} size={14} className="mb-0.5 text-green-text" />
                      </p>
                    )}
                    <Link href={`/crew/${m.id}`} className="btn btn-secondary btn-sm mt-8 w-fit">
                      Meet {m.name} properly
                      <Icon icon={ArrowRight02Icon} size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
      <p className="wrap label flex items-center gap-2">
        Stop {active + 1} of {crew.length} · {pinned ? "Keep scrolling" : "Swipe"}
        <Icon icon={ArrowRight02Icon} size={14} />
      </p>
    </div>
  );
}
