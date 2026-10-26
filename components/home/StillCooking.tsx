"use client";

import { useState, useSyncExternalStore } from "react";
import { cooking } from "@/content/site";

const VOTE_KEY = "400-poll";

/** STILL COOKING. A tease: a status, a stack, a hint. Nothing more. */
export function StillCooking() {
  return (
    <section className="section" aria-labelledby="cooking-title">
      <div className="wrap">
        <p className="label">On the stove</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 id="cooking-title" className="display t-section">
            Still cooking<span className="text-pink">.</span>
          </h2>
          <p className="sign text-[clamp(2rem,3.5vw,3rem)] text-muted">&ldquo;more are still being cooked&rdquo; &middot; Efo</p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {cooking.map((c, i) => (
            <li key={i} className="flex min-h-56 flex-col rounded-2xl border border-line bg-surface p-7">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-pink-text uppercase">
                <span className="status-light blink" data-status="cooking" /> Still cooking
              </p>
              <p
                className="mt-auto pt-10 font-mono text-xl font-semibold tracking-tight select-none"
                aria-label={c.hint.includes("█") ? "redacted" : undefined}
              >
                {c.hint}
              </p>
              <p className="mt-2 font-mono text-[12px] text-muted">
                {c.stack} · {c.where} · {c.when}
              </p>
            </li>
          ))}
        </ul>

        <TurkeyPoll />
      </div>
    </section>
  );
}

const noop = () => () => {};
const readVote = () => {
  try {
    return localStorage.getItem(VOTE_KEY);
  } catch {
    return null;
  }
};

/** Before every work session: "turkey or chicken?" Vote is kept on this device only. */
function TurkeyPoll() {
  const stored = useSyncExternalStore(noop, readVote, () => null);
  const [vote, setVote] = useState<string | null>(null);
  const picked = vote ?? stored;

  const cast = (v: string) => {
    setVote(v);
    try {
      localStorage.setItem(VOTE_KEY, v);
    } catch {}
  };

  return (
    <div className="mt-24 max-w-md">
      <p className="label">The real question</p>
      <p className="mt-4 w-fit rounded-2xl rounded-bl-md bg-raise px-4 py-2.5 font-chat text-[17px]">turkey or chicken?</p>
      <div className="mt-4 grid grid-cols-2 gap-3" role="group" aria-label="Turkey or chicken?">
        {[
          ["turkey", "Turkey"],
          ["chicken", "Chicken"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={picked === id}
            onClick={() => cast(id)}
            className="btn btn-secondary aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {picked ? `Noted: ${picked}. The crew is still arguing about it.` : "Pick a side. There is no neutral."}
      </p>
    </div>
  );
}
