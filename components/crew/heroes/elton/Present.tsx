"use client";

import { ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { SLIDES } from "./data";

/** Present mode: Elton's work, played like a prototype. */
export function Present({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const go = (d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const auto = reduced ? undefined : window.setInterval(() => setI((v) => (v + 1) % SLIDES.length), 3200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % SLIDES.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearInterval(auto);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-label="Present mode: Elton's work" className="absolute inset-0 z-40 flex flex-col bg-[#0e0e10]">
      <div className="flex items-center justify-between px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-white/50 uppercase">
        <span>
          Presenting · {i + 1} / {SLIDES.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-white/70 hover:bg-white/10 hover:text-white"
        >
          Esc <Icon icon={Cancel01Icon} size={14} />
        </button>
      </div>

      <div className="grid flex-1 items-center gap-8 px-6 pb-6 md:grid-cols-[1fr_auto] md:px-14">
        <div key={slide.title} className="motion-safe:animate-[pop_0.4s_ease-out]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-(--p-accent) uppercase">Elton&apos;s work</p>
          <p className="display mt-3 text-[clamp(2.75rem,6vw,5.5rem)] text-white">{slide.title}</p>
          <p className="mt-3 max-w-sm text-lg text-white/70">{slide.caption}</p>
          <Link href={slide.href} className="mt-6 inline-flex items-center gap-1.5 text-sm text-(--p-accent) hover:underline">
            Inspect the project <Icon icon={ArrowUpRight01Icon} size={15} />
          </Link>
        </div>
        <div
          key={slide.src}
          className="relative mx-auto aspect-[9/19.5] w-[180px] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.9)] motion-safe:animate-[pop_0.45s_ease-out] md:w-[230px]"
        >
          <Image src={slide.src} alt={`${slide.title} on a phone`} fill sizes="230px" className="object-cover object-top" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-5">
        <button type="button" aria-label="Previous" onClick={() => go(-1)} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10">
          <Icon icon={ArrowLeft01Icon} size={18} />
        </button>
        {SLIDES.map((s, k) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Show ${s.title}`}
            onClick={() => setI(k)}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-(--p-accent)" : "w-3 bg-white/25"}`}
          />
        ))}
        <button type="button" aria-label="Next" onClick={() => go(1)} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10">
          <Icon icon={ArrowRight01Icon} size={18} />
        </button>
      </div>
    </div>
  );
}
