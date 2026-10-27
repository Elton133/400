"use client";

import { useEffect, useRef, useState } from "react";
import { flapTick } from "@/lib/sound";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·-/?";
const TICK = 55;

/**
 * A row of split-flap tiles. React always renders the final characters
 * (so no-JS, crawlers and reduced-motion get the real text); the animation
 * only rewrites each tile's text node in place and always lands on that
 * same character.
 */
export function FlapText({
  text,
  length,
  className = "",
  stagger = 0,
}: {
  text: string;
  length: number;
  className?: string;
  /** Extra steps before this text settles, so rows land one after another. */
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const chars = [...text.toUpperCase().padEnd(length, " ").slice(0, length)];
  const key = chars.join("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = [...el.children] as HTMLElement[];
    const finals = [...key];
    const steps = tiles.map((_, i) => (finals[i] === " " ? 1 : 3 + stagger + Math.floor(i * 0.7) + ((i * 7) % 3)));
    const id = window.setInterval(() => {
      let busy = false;
      tiles.forEach((tile, i) => {
        const node = tile.firstElementChild?.firstChild;
        if (!node || steps[i] <= 0) return;
        steps[i]--;
        busy = true;
        node.nodeValue = steps[i] === 0 ? finals[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
        tile.classList.remove("flipping");
        void tile.offsetWidth; // restart the CSS flip
        tile.classList.add("flipping");
      });
      if (busy) flapTick();
      else window.clearInterval(id);
    }, TICK);
    return () => {
      window.clearInterval(id);
      tiles.forEach((tile, i) => {
        const node = tile.firstElementChild?.firstChild;
        if (node) node.nodeValue = finals[i];
      });
    };
  }, [key, visible, stagger]);

  // Callers that hide the flaps on small screens ("hidden lg:inline-flex") set
  // the display themselves; a default inline-flex here would override "hidden".
  const display = /(^|\s)hidden(\s|$)/.test(className) ? "" : "inline-flex ";

  return (
    <span ref={ref} className={`${display}whitespace-pre font-mono font-bold ${className}`} aria-hidden>
      {chars.map((c, i) => (
        <span key={i} className="flap">
          <span>{c}</span>
        </span>
      ))}
    </span>
  );
}
