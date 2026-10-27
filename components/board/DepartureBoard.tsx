"use client";

import { ArrowRight02Icon, VolumeHighIcon, VolumeOffIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useEffect, useState, ViewTransition } from "react";
import { type Lane, type Project, laneLabel, statusLabel } from "@/content/projects";
import { useAccraTime } from "@/lib/accra";
import { setSound, useSound } from "@/lib/sound";
import { Icon } from "@/components/Icon";
import { FlapText } from "./FlapText";

type Filter = "all" | Lane;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "product", label: "PRODUCTS" },
  { id: "client", label: "CLIENTS" },
  { id: "game", label: "GAMES" },
  { id: "side", label: "SIDE PROJECTS" },
  { id: "school", label: "SCHOOL" },
  { id: "partner", label: "PARTNERS" },
];

/** 03 / THE DEPARTURE BOARD. A trotro station crossed with an airport. */
export function DepartureBoard({
  projects,
  limit,
  title = "Departures",
}: {
  projects: Project[];
  limit?: number;
  title?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const sound = useSound();
  const time = useAccraTime();
  const lanes = new Set(projects.map((p) => p.lane));
  const filters = FILTERS.filter((f) => f.id === "all" || lanes.has(f.id));
  const matching = projects.filter((p) => filter === "all" || p.lane === filter);
  const rows = limit ? matching.slice(0, limit) : matching;

  return (
    <div className="rounded-2xl bg-ink p-4 text-paper sm:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-paper/10 pb-6">
        <div>
          <h2 className="display text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-paper/50 uppercase">
            Accra · {time?.label ?? "--:--"} · {matching.length} services
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSound(!sound)}
          aria-pressed={sound}
          aria-label={sound ? "Turn flap sound off" : "Turn flap sound on"}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-paper/15 px-4 text-sm text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
        >
          <Icon icon={sound ? VolumeHighIcon : VolumeOffIcon} size={16} />
          Sound {sound ? "on" : "off"}
        </button>
      </div>

      <div
        role="group"
        aria-label="Filter the board"
        className="-mx-4 mb-6 flex snap-x gap-2 overflow-x-auto scroll-px-4 px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="min-h-10 flex-none snap-start rounded-full border border-paper/15 px-4 font-mono text-[11px] tracking-[0.12em] text-paper/70 transition-colors hover:text-paper aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-ink"
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[auto_auto_auto_1fr] lg:gap-x-6">
      <div
        aria-hidden
        className="col-span-4 hidden grid-cols-subgrid px-2 pb-3 font-mono text-[10px] tracking-[0.16em] text-paper/40 lg:grid"
      >
        <span>PROJECT</span>
        <span>LANE</span>
        <span>STATUS</span>
        <span>PLATFORM</span>
      </div>

      <ol className="col-span-4 flex flex-col gap-y-1.5 lg:grid lg:grid-cols-subgrid">
        {rows.map((p, i) => (
          <li key={i} className="lg:col-span-4 lg:grid lg:grid-cols-subgrid">
            <Link
              href={`/work/${p.slug}`}
              aria-label={`${p.name}: ${laneLabel[p.lane].toLowerCase()}, ${statusLabel[p.status].toLowerCase()}${p.platforms.length ? `, ${p.platforms.join(", ")}` : ""}`}
              className="group grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-1.5 rounded-sm px-2 py-2 text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:bg-paper/5 sm:text-[17px] lg:col-span-4 lg:grid-cols-subgrid lg:items-center lg:text-[18px]"
            >
              <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                <FlapText text={p.board} length={14} stagger={i} className="text-paper" />
              </ViewTransition>
              <span className="flex min-w-0 items-center gap-3 lg:contents">
                <FlapText text={laneLabel[p.lane]} length={7} stagger={i} className="hidden text-paper/80 lg:inline-flex" />
                <span className="flex flex-none items-center gap-2">
                  <span className="status-light" data-status={p.status} />
                  <FlapText text={statusLabel[p.status]} length={13} stagger={i} className="hidden lg:inline-flex" />
                  <span className="font-mono text-[11px] tracking-wider whitespace-nowrap lg:hidden">
                    {statusLabel[p.status]} · {laneLabel[p.lane]}
                  </span>
                </span>
                <span className="ml-auto min-w-0 truncate font-mono text-[11px] tracking-wider text-paper/70 lg:ml-0 lg:text-[13px]">
                  {p.platforms.join(" · ").toUpperCase() || "TBC"}
                </span>
              </span>
            </Link>
          </li>
        ))}
        <li className="lg:col-span-4 lg:grid lg:grid-cols-subgrid">
          <CookingRow />
        </li>
      </ol>
      </div>

      {limit && matching.length > limit && (
        <Link
          href="/work"
          className="mt-6 flex items-center justify-between border-t border-paper/10 px-2 pt-6 text-sm text-paper/70 transition-colors hover:text-paper"
        >
          <span>{matching.length - limit} more departures</span>
          <span className="inline-flex items-center gap-2">
            Full board <Icon icon={ArrowRight02Icon} size={16} />
          </span>
        </Link>
      )}
    </div>
  );
}

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?";

/** The last row is always something unannounced. */
function CookingRow() {
  const [peek, setPeek] = useState(false);
  const [name, setName] = useState("???");

  useEffect(() => {
    if (peek || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const n = 4 + Math.floor(Math.random() * 6);
      setName(Array.from({ length: n }, () => SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]).join(""));
    }, 2200);
    return () => window.clearInterval(id);
  }, [peek]);

  return (
    <div
      tabIndex={0}
      onPointerEnter={() => setPeek(true)}
      onPointerLeave={() => setPeek(false)}
      onFocus={() => setPeek(true)}
      onBlur={() => setPeek(false)}
      aria-label="Still cooking: an unannounced product"
      className="group grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-1.5 rounded-sm px-2 py-2 text-[15px] sm:text-[17px] lg:col-span-4 lg:grid-cols-subgrid lg:items-center lg:text-[18px]"
    >
      <FlapText text={peek ? "NOT YET" : name} length={14} className="text-pink" />
      <span className="flex min-w-0 items-center gap-3 lg:contents">
        <FlapText text="PRODUCT" length={7} className="hidden text-paper/80 lg:inline-flex" />
        <span className="flex flex-none items-center gap-2">
          <span className="status-light" data-status="cooking" />
          <FlapText text="STILL COOKING" length={13} className="hidden lg:inline-flex" />
          <span className="font-mono text-[11px] tracking-wider lg:hidden">STILL COOKING</span>
        </span>
        <span className="ml-auto min-w-0 truncate font-mono text-[11px] tracking-wider text-paper/50 lg:ml-0 lg:text-[13px]">TBC</span>
      </span>
    </div>
  );
}
