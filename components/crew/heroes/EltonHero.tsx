"use client";

import {
  CodeIcon,
  Cursor01Icon,
  Delete02Icon,
  Layers01Icon,
  MusicNote01Icon,
  MusicNote02Icon,
  PaintBoardIcon,
  PenTool01Icon,
  PlayIcon,
  StopIcon,
  TextIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { crewById, onColor } from "@/content/crew";
import { CodePanel } from "./elton/CodePanel";
import { COLLABORATORS, HISTORY, NICKNAMES, STICKERS, type Sticker } from "./elton/data";
import { Present } from "./elton/Present";
import { useInstruments } from "./elton/useInstruments";
import { type HeroProps, HeroTop } from "./shared";

// Elton designs the things people touch, writes the frontend, designed the
// 400 and UniCliq logos, mentors, and plays trumpet and sax. So this hero is
// a working design file: drag, draw, switch to the code, press play.

type Tool = "move" | "pen" | "text";
type Mode = "design" | "dev";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const toPath = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

const TOOLS: { id: Tool; label: string; key: string; icon: typeof Cursor01Icon }[] = [
  { id: "move", label: "Move", key: "V", icon: Cursor01Icon },
  { id: "pen", label: "Pen", key: "P", icon: PenTool01Icon },
  { id: "text", label: "Text", key: "T", icon: TextIcon },
];

export function EltonHero(props: HeroProps) {
  const { m } = props;
  const [tool, setTool] = useState<Tool>("move");
  const [mode, setMode] = useState<Mode>("design");
  const [alias, setAlias] = useState(NICKNAMES[0]);
  const [stickers, setStickers] = useState<Sticker[]>(STICKERS);
  const [selected, setSelected] = useState<string | null>(null);
  const [guides, setGuides] = useState<{ x?: number; y?: number }>({});
  const [strokes, setStrokes] = useState<string[]>([]);
  const [draft, setDraft] = useState<string | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [version, setVersion] = useState(HISTORY.length - 1);
  const music = useInstruments();

  const canvas = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const pen = useRef<[number, number][] | null>(null);
  const hovering = useRef(false);

  const pct = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100] as const;
  };

  // ── Move tool: drag stickers, with smart guides ──
  function grab(e: React.PointerEvent, id: string) {
    if (tool !== "move") return;
    e.stopPropagation();
    setSelected(id);
    const [px, py] = pct(e);
    const s = stickers.find((s) => s.id === id)!;
    drag.current = { id, dx: px - s.x, dy: py - s.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function dragMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const [px, py] = pct(e);
    let x = clamp(px - d.dx, 4, 96);
    let y = clamp(py - d.dy, 5, 95);
    const g: { x?: number; y?: number } = {};
    // snap to the canvas centre first, then to any other sticker
    if (Math.abs(x - 50) < 1.2) x = g.x = 50;
    if (Math.abs(y - 50) < 1.2) y = g.y = 50;
    for (const o of stickers) {
      if (o.id === d.id) continue;
      if (g.x === undefined && Math.abs(x - o.x) < 1) x = g.x = o.x;
      if (g.y === undefined && Math.abs(y - o.y) < 1) y = g.y = o.y;
    }
    setGuides(g);
    setStickers((list) => list.map((s) => (s.id === d.id ? { ...s, x, y } : s)));
  }
  function dragEnd() {
    drag.current = null;
    setGuides({});
  }

  // ── Pen tool: draw on the canvas ──
  function canvasDown(e: React.PointerEvent) {
    if (tool === "move") setSelected(null);
    if (tool !== "pen") return;
    const [x, y] = pct(e);
    pen.current = [[x * 10, y * 10]];
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function canvasMove(e: React.PointerEvent) {
    if (!pen.current) return;
    const [x, y] = pct(e);
    pen.current.push([x * 10, y * 10]);
    setDraft(toPath(pen.current));
  }
  function canvasUp() {
    const pts = pen.current;
    pen.current = null;
    if (pts && pts.length > 1) setStrokes((s) => [...s, toPath(pts)]);
    setDraft(null);
  }

  // ── Text tool: the headline cycles through the chat's names for Elton ──
  function nextAlias() {
    setSelected("title");
    setAlias((a) => NICKNAMES[(NICKNAMES.indexOf(a) + 1) % NICKNAMES.length]);
  }

  // ── Shortcuts, Figma-style, only while the pointer is over the hero ──
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!hovering.current || presenting || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, [contenteditable]")) return;
      const key = e.key.toLowerCase();
      if (key === "v") setTool("move");
      else if (key === "p") setTool("pen");
      else if (key === "t") setTool("text");
      else if (key === "d") setMode((md) => (md === "dev" ? "design" : "dev"));
      else if (key === "escape") setSelected(null);
      else if (selected && selected !== "title" && e.key.startsWith("Arrow")) {
        e.preventDefault();
        const step = e.shiftKey ? 5 : 1;
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
        setStickers((list) => list.map((s) => (s.id === selected ? { ...s, x: clamp(s.x + dx, 4, 96), y: clamp(s.y + dy, 5, 95) } : s)));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presenting, selected]);

  const sel = stickers.find((s) => s.id === selected);

  return (
    <header
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
      className="relative overflow-hidden bg-[#18181b] text-paper"
    >
      <div className="wrap relative pt-10 pb-16 md:pt-14 md:pb-20">
        <HeroTop {...props} />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <p className="max-w-xl text-[17px] leading-relaxed text-white/70">
            Designer, frontend dev, trumpet and sax. This is a working file: drag things around, pick up the pen, flip to
            the code, or press play.
          </p>
          <p className="hidden gap-2 font-mono text-[11px] text-white/45 lg:flex">
            {["V move", "P pen", "T text", "D code", "Arrows nudge"].map((k) => (
              <span key={k} className="rounded border border-white/15 px-1.5 py-0.5">
                {k}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#202024] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
          {/* ── toolbar ── */}
          <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 px-3 py-2 [scrollbar-width:none]">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTool(t.id)}
                aria-pressed={tool === t.id}
                aria-label={`${t.label} tool (${t.key})`}
                title={`${t.label} (${t.key})`}
                className="grid h-9 w-9 flex-none place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/5 aria-pressed:bg-(--p) aria-pressed:text-white"
              >
                <Icon icon={t.icon} size={17} />
              </button>
            ))}
            <span className="mx-2 h-6 w-px flex-none bg-white/10" />
            <div role="group" aria-label="Mode" className="flex flex-none rounded-lg bg-black/30 p-0.5 text-[12px]">
              {(["design", "dev"] as Mode[]).map((md) => (
                <button
                  key={md}
                  type="button"
                  onClick={() => setMode(md)}
                  aria-pressed={mode === md}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-white/60 aria-pressed:bg-white/10 aria-pressed:text-white"
                >
                  <Icon icon={md === "design" ? PaintBoardIcon : CodeIcon} size={14} />
                  {md === "design" ? "Design" : "Dev"}
                </button>
              ))}
            </div>
            <span className="mx-auto hidden px-4 font-mono text-[12px] text-white/45 xl:block">elton.fig · 400 / Crew</span>
            <div className="ml-auto flex flex-none items-center gap-1.5 xl:ml-0">
              <span aria-hidden className="mr-1 hidden -space-x-1.5 sm:flex">
                {COLLABORATORS.map((c) => (
                  <span
                    key={c.id}
                    className="grid h-7 w-7 place-items-center rounded-full font-mono text-[10px] font-bold ring-2 ring-[#202024]"
                    style={{ background: crewById[c.id].color, color: onColor(crewById[c.id]) }}
                  >
                    {crewById[c.id].name[0]}
                  </span>
                ))}
              </span>
              {(["trumpet", "sax"] as const).map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => music.play(inst)}
                  aria-pressed={music.playing === inst}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-[12px] text-white/80 transition-colors hover:border-white/30 aria-pressed:border-(--p-accent) aria-pressed:text-(--p-accent)"
                >
                  <Icon icon={music.playing === inst ? StopIcon : inst === "trumpet" ? MusicNote01Icon : MusicNote02Icon} size={15} />
                  {inst === "trumpet" ? "Trumpet" : "Sax"}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPresenting(true)}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-(--p-accent) px-3 text-[13px] font-semibold text-ink transition-transform active:scale-95"
              >
                <Icon icon={PlayIcon} size={15} /> Present
              </button>
            </div>
          </div>

          <div className="relative grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)_300px]">
            {presenting && <Present onClose={() => setPresenting(false)} />}

            {/* ── layers ── */}
            <nav aria-label="Layers" className="border-white/10 lg:border-r">
              <p className="hidden items-center gap-2 px-4 pt-4 font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase lg:flex">
                <Icon icon={Layers01Icon} size={14} /> Text
              </p>
              <ul className="flex gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-visible lg:py-2">
                {NICKNAMES.map((n) => (
                  <li key={n} className="flex-none">
                    <button
                      type="button"
                      aria-pressed={alias === n}
                      onClick={() => {
                        setAlias(n);
                        setSelected("title");
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-[13px] whitespace-nowrap text-white/70 transition-colors hover:bg-white/5 aria-pressed:bg-(--p) aria-pressed:text-white"
                    >
                      <Icon icon={TextIcon} size={13} className="opacity-60" />
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="hidden items-center gap-2 px-4 pt-3 font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase lg:flex">
                <Icon icon={Layers01Icon} size={14} /> Objects
              </p>
              <ul className="hidden flex-col gap-0.5 px-3 pt-2 pb-4 lg:flex">
                {stickers.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-pressed={selected === s.id}
                      onClick={() => {
                        setTool("move");
                        setSelected(s.id);
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left font-mono text-[12px] text-white/60 transition-colors hover:bg-white/5 aria-pressed:bg-white/10 aria-pressed:text-white"
                    >
                      <span className="h-2 w-2 rounded-sm bg-white/30" />
                      {s.layer}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── canvas ── */}
            <div
              ref={canvas}
              onPointerDown={canvasDown}
              onPointerMove={canvasMove}
              onPointerUp={canvasUp}
              onPointerCancel={canvasUp}
              className={`relative min-h-[560px] overflow-hidden bg-(--p) bg-[radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:22px_22px] md:min-h-[640px] ${
                tool === "pen" ? "cursor-crosshair touch-none" : tool === "text" ? "cursor-text" : ""
              }`}
            >
              <p className="absolute top-4 left-5 z-10 font-mono text-[11px] text-white/70">Frame 400 · {m.name}</p>
              {strokes.length > 0 && (
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setStrokes([])}
                  className="absolute top-3 right-4 z-30 inline-flex items-center gap-1.5 rounded-md bg-black/30 px-2 py-1 font-mono text-[11px] text-white hover:bg-black/50"
                >
                  <Icon icon={Delete02Icon} size={13} /> Clear doodles
                </button>
              )}

              {/* smart guides */}
              {guides.x !== undefined && (
                <span aria-hidden className="absolute top-0 bottom-0 z-20 w-px bg-[#ff3d9a]" style={{ left: `${guides.x}%` }} />
              )}
              {guides.y !== undefined && (
                <span aria-hidden className="absolute right-0 left-0 z-20 h-px bg-[#ff3d9a]" style={{ top: `${guides.y}%` }} />
              )}

              {/* the headline */}
              <div className="pointer-events-none absolute top-[28%] left-[7%] z-10 w-[min(86%,30rem)]">
                <h1 className="sign text-[25vw] leading-[0.85] text-(--p-accent) lg:text-[clamp(7rem,10.5vw,10.5rem)]">{m.name}</h1>
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={nextAlias}
                  aria-label={`Name: ${alias}. Click for the next one`}
                  className={`relative mt-4 w-fit max-w-full border-2 px-3 py-1.5 text-left ${
                    tool === "pen" ? "pointer-events-none" : "pointer-events-auto"
                  } ${selected === "title" || tool === "text" ? "border-(--p-accent)" : "border-transparent hover:border-white/40"} cursor-text`}
                >
                  {(selected === "title" || tool === "text") &&
                    ["-top-[6px] -left-[6px]", "-top-[6px] -right-[6px]", "-bottom-[6px] -left-[6px]", "-bottom-[6px] -right-[6px]"].map((pos) => (
                      <span key={pos} aria-hidden className={`absolute h-2.5 w-2.5 border-2 border-(--p-accent) bg-white ${pos}`} />
                    ))}
                  <span key={alias} className="display block text-[clamp(1.6rem,3.4vw,3rem)] leading-[0.95] text-white motion-safe:animate-[pop_0.35s_ease-out]">
                    {alias}
                  </span>
                </button>
              </div>

              {/* doodles */}
              <svg aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                {[...strokes, ...(draft ? [draft] : [])].map((d, i) => (
                  <path key={i} d={d} fill="none" stroke="var(--p-accent)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>

              {/* stickers */}
              {stickers.map((s) => (
                <div
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${s.layer}. Drag to move${selected === s.id ? ", selected" : ""}`}
                  aria-pressed={selected === s.id}
                  onPointerDown={(e) => grab(e, s.id)}
                  onPointerMove={dragMove}
                  onPointerUp={dragEnd}
                  onPointerCancel={dragEnd}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(s.id)}
                  onFocus={() => setSelected(s.id)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.72] outline-none select-none md:scale-100 ${
                    tool === "move" ? "cursor-grab touch-none active:cursor-grabbing" : "pointer-events-none"
                  }`}
                  style={{ left: `${s.x}%`, top: `${s.y}%`, rotate: `${s.tilt ?? 0}deg` }}
                >
                  <StickerFace s={s} />
                  {selected === s.id && (
                    <>
                      <span aria-hidden className="absolute -inset-2 border-2 border-(--p-accent)" />
                      {["-top-[11px] -left-[11px]", "-top-[11px] -right-[11px]", "-bottom-[11px] -left-[11px]", "-bottom-[11px] -right-[11px]"].map((pos) => (
                        <span key={pos} aria-hidden className={`absolute h-2.5 w-2.5 border-2 border-(--p-accent) bg-white ${pos}`} />
                      ))}
                      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 rounded bg-(--p-accent) px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-ink">
                        X {s.x.toFixed(0)} · Y {s.y.toFixed(0)}
                      </span>
                    </>
                  )}
                </div>
              ))}

              {/* the crew, live in the file */}
              {COLLABORATORS.map((c, k) => {
                const who = crewById[c.id];
                const [name, dur] = c.path.split(" ");
                return (
                  <div
                    key={c.id}
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 z-30"
                    style={{ animation: `${name} ${dur} ease-in-out ${-k * 4}s infinite` }}
                  >
                    <Icon icon={Cursor01Icon} size={20} className="drop-shadow" />
                    <span
                      className="ml-4 inline-block rounded-md rounded-tl-none px-2 py-0.5 text-[11px] font-semibold"
                      style={{ background: who.color, color: onColor(who) }}
                    >
                      {who.name}
                    </span>
                    <span className="mt-1 ml-4 block w-max max-w-[180px] rounded-lg bg-white px-2 py-1 text-[11px] leading-snug text-ink shadow">
                      {c.line}
                    </span>
                  </div>
                );
              })}

              {/* notes, while something plays */}
              {music.playing && (
                <div aria-hidden className="pointer-events-none absolute right-12 bottom-14 z-30">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <span
                      key={k}
                      className="absolute bottom-0 text-(--p-accent) motion-safe:animate-[float-note_1.6s_ease-out_infinite]"
                      style={{ left: `${k * 26}px`, animationDelay: `${k * 0.25}s` }}
                    >
                      <Icon icon={k % 2 ? MusicNote02Icon : MusicNote01Icon} size={26} />
                    </span>
                  ))}
                </div>
              )}

              <p className="absolute bottom-4 left-5 z-10 font-mono text-[11px] text-white/60">
                {tool === "pen" ? "Pen: draw anywhere" : tool === "text" ? "Text: click the name" : "Move: drag anything"}
              </p>
            </div>

            {/* ── inspector / code ── */}
            <aside className={`${mode === "dev" ? "block" : "hidden lg:block"} border-white/10 lg:border-l`}>
              {mode === "dev" ? (
                <div className="h-[380px] lg:h-full">
                  <CodePanel alias={alias} stickers={stickers} strokes={strokes.length} fill={m.color} />
                </div>
              ) : (
                <div className="p-5 text-[13px]">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">Inspector</p>
                  {sel ? (
                    <div className="mt-4">
                      <p className="display text-2xl">{sel.layer}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 font-mono">
                        <div className="rounded-md bg-black/30 px-3 py-2">
                          <dt className="text-[10px] text-white/40">X</dt>
                          <dd>{sel.x.toFixed(1)}%</dd>
                        </div>
                        <div className="rounded-md bg-black/30 px-3 py-2">
                          <dt className="text-[10px] text-white/40">Y</dt>
                          <dd>{sel.y.toFixed(1)}%</dd>
                        </div>
                      </dl>
                      <p className="mt-4 leading-relaxed text-white/55">Drag it, or nudge with the arrow keys. Hold Shift for bigger steps.</p>
                    </div>
                  ) : selected === "title" ? (
                    <div className="mt-4">
                      <p className="display text-2xl">Title</p>
                      <p className="mt-2 text-white/70">“{alias}”</p>
                      <p className="mt-4 leading-relaxed text-white/55">
                        One of the names the chat uses for Elton. Click it for the next one.
                      </p>
                    </div>
                  ) : (
                    <dl className="mt-4 grid gap-4">
                      <div>
                        <dt className="text-white/40">Fill</dt>
                        <dd className="mt-1 flex items-center gap-2 font-mono">
                          <span className="h-4 w-4 rounded bg-(--p)" /> {m.color}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Accent</dt>
                        <dd className="mt-1 flex items-center gap-2 font-mono">
                          <span className="h-4 w-4 rounded bg-(--p-accent)" /> {m.accent}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Designed</dt>
                        <dd className="mt-1 leading-relaxed">The 400 logo · the UniCliq logo · Skill Academy merch</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Mentored</dt>
                        <dd className="mt-1">DesignPxd vibe-coding hackathon</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Sundays</dt>
                        <dd className="mt-1">Preaching at youth meetings</dd>
                      </div>
                      <p className="text-white/45">Select anything on the canvas to inspect it.</p>
                    </dl>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* ── version history ── */}
        <div className="mt-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">Version history</p>
          <ol className="relative mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {HISTORY.map((h, k) => (
              <li key={h.v} className="flex-none">
                <button
                  type="button"
                  aria-pressed={version === k}
                  onClick={() => setVersion(k)}
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[12px] text-white/60 transition-colors hover:border-white/30 aria-pressed:border-(--p-accent) aria-pressed:text-white"
                >
                  <span className={`h-2 w-2 rounded-full ${version === k ? "bg-(--p-accent)" : "bg-white/30"}`} />
                  {h.v} · {h.when}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[16px] text-white/80" aria-live="polite">
            <span className="mr-2 font-mono text-(--p-accent)">{HISTORY[version].v}</span>
            {HISTORY[version].what}
            {version === HISTORY.length - 1 && <span className="ml-2 font-mono text-[12px] text-white/40">current</span>}
          </p>
        </div>
      </div>
    </header>
  );
}

function StickerFace({ s }: { s: Sticker }) {
  switch (s.kind) {
    case "pill":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-(--p-accent) px-4 py-2 text-[14px] font-semibold whitespace-nowrap text-ink shadow-lg">
          <Icon icon={s.icon === "sax" ? MusicNote02Icon : MusicNote01Icon} size={16} />
          {s.text}
        </span>
      );
    case "note":
      return (
        <span className="block w-44 bg-[#ffe45e] p-4 text-left font-chat text-[15px] leading-snug text-ink shadow-[0_14px_24px_-12px_rgb(0_0_0/0.55)]">
          {s.text}
        </span>
      );
    case "badge":
      return (
        <span className="block text-center">
          <Image
            src="/chelsea.png"
            alt="Chelsea crest"
            width={700}
            height={700}
            draggable={false}
            className="h-24 w-24 drop-shadow-[0_10px_16px_rgb(0_0_0/0.35)] md:h-28 md:w-28"
          />
          <span className="mt-1 block font-mono text-[10px] tracking-wider text-white/80 uppercase">{s.sub}</span>
        </span>
      );
    case "logo400":
      return (
        <span className="block rounded-xl bg-ink px-4 py-3 text-center shadow-lg">
          <span className="display block text-4xl leading-none text-orange">{s.text}</span>
          <span className="mt-1 block font-mono text-[9px] whitespace-nowrap text-white/60">{s.sub}</span>
        </span>
      );
    case "unicliq":
      return (
        <span className="block rounded-xl bg-white px-4 py-3 text-center shadow-lg">
          <span className="display block text-2xl leading-none text-ink">{s.text}</span>
          <span className="mt-1 block font-mono text-[9px] whitespace-nowrap text-ink/50">{s.sub}</span>
        </span>
      );
    case "beagine":
      return (
        <span className="block rounded-2xl bg-[#FF5F15] px-4 py-3 text-ink shadow-lg">
          <span className="display block text-2xl leading-none">{s.text}</span>
          <span className="mt-1 block font-mono text-[10px] tracking-wider uppercase">{s.sub}</span>
        </span>
      );
    case "bubble":
      return (
        <span className="block">
          <span className="block w-max rounded-2xl rounded-bl-md bg-white px-4 py-2.5 font-chat text-[15px] text-ink shadow-lg">{s.text}</span>
          <span className="mt-1 block font-mono text-[10px] whitespace-nowrap text-white/70">{s.sub}</span>
        </span>
      );
  }
}
