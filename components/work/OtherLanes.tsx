"use client";

import { ArrowRight02Icon, ArrowUpRight01Icon, PlayIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { Confirm } from "@/components/Confirm";
import { Icon } from "@/components/Icon";
import { type Project, statusLabel } from "@/content/projects";

/** CLIENT BUILDS → SIGNBOARDS. Each site paints itself in, left to right. */
export function ClientBuilds({ clients }: { clients: Project[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((c, i) => {
          const site = c.links?.[0];
          return (
            <motion.li
              key={c.slug}
              initial={{ clipPath: "inset(0 100% 0 0 round 16px)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0 round 16px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.65, 0, 0.35, 1] }}
              className="group overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="ml-3 truncate font-mono text-[11px] text-muted">{site?.label ?? (c.lane === "school" ? "school project" : `${c.slug} · url tbc`)}</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-raise">
                {c.preview ? (
                  // Tall capture: sits at the top, scrolls to the bottom on hover.
                  <Image
                    src={c.preview}
                    alt={`${c.name} website`}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-[object-position] duration-[5s] ease-in-out group-hover:object-bottom"
                  />
                ) : (
                  <div className="grid h-full place-items-center p-8 text-center">
                    <span className="display t-title">{c.name}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 px-4 py-4 text-sm">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                  <span className="status-light" data-status={c.status} />
                  {statusLabel[c.status]}
                </span>
                <Link href={`/work/${c.slug}`} className="ml-auto inline-flex items-center gap-1.5 text-muted hover:text-fg">
                  Inspect <Icon icon={ArrowRight02Icon} size={15} />
                </Link>
                {site && (
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
                  >
                    Visit <Icon icon={ArrowUpRight01Icon} size={15} />
                  </a>
                )}
              </div>
              <Confirm items={c.confirm} className="mx-4 mb-4" />
            </motion.li>
          );
        })}
      </ul>
    </MotionConfig>
  );
}

const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

/** A small pixel die. Click to roll. */
function Die() {
  const [n, setN] = useState(4);
  return (
    <button
      type="button"
      onClick={() => setN(1 + Math.floor(Math.random() * 6))}
      aria-label={`Roll the die. Showing ${n}.`}
      className="grid h-12 w-12 grid-cols-3 grid-rows-3 gap-0.5 rounded-xl border border-line-strong bg-bg p-2 transition-transform duration-300 hover:rotate-12 active:scale-90"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={`m-auto h-1.5 w-1.5 rounded-[1px] ${PIPS[n].includes(i) ? "bg-fg" : ""}`} />
      ))}
    </button>
  );
}

/** GAMES → PLAY. The lane that's allowed to be silly (a little). */
export function GameLane({ games }: { games: Project[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {games.map((g) => (
        <li key={g.slug} className="rounded-2xl border border-line bg-surface p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                <span className="status-light" data-status={g.status} /> {statusLabel[g.status]}
                <span className="text-muted">· Player 2 wanted</span>
              </p>
              <h3 className="display t-title mt-5">{g.name}</h3>
            </div>
            <Die />
          </div>
          <p className="lede mt-4 max-w-md text-fg/80">{g.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {g.room ? (
              <a href={g.room} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <Icon icon={PlayIcon} size={16} />
                Join a room
              </a>
            ) : (
              <span className="btn btn-secondary btn-sm cursor-default text-muted">Room link soon</span>
            )}
            <Link href={`/work/${g.slug}`} className="btn btn-sm text-muted hover:text-fg">
              Inspect
              <Icon icon={ArrowRight02Icon} size={16} />
            </Link>
            <Confirm items={g.confirm} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** PARTNER WORK → CREDITS. Quiet. Only rendered when permission is confirmed. */
export function PartnerCredits({ partners }: { partners: Project[] }) {
  return (
    <ul className="mx-auto max-w-xl py-10 text-center">
      {partners.map((p) => (
        <li key={p.slug} className="py-6">
          <p className="label">{p.tagline}</p>
          <p className="display t-title mt-3">{p.name}</p>
        </li>
      ))}
    </ul>
  );
}
