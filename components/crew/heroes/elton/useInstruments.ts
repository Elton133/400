"use client";

import { useEffect, useRef, useState } from "react";

// Elton plays trumpet and sax. Both are synthesised on the spot, and only
// ever start from a click.

export type Instrument = "trumpet" | "sax";

type Note = { freq: number; dur: number; bendTo?: number };

const FANFARE: Note[] = [
  { freq: 392, dur: 0.16 },
  { freq: 523.25, dur: 0.16 },
  { freq: 659.25, dur: 0.16 },
  { freq: 783.99, dur: 0.34 },
  { freq: 659.25, dur: 0.16 },
  { freq: 783.99, dur: 0.7 },
];

// A little blues lick in B-flat, with a bend into the F.
const LICK: Note[] = [
  { freq: 233.08, dur: 0.22 },
  { freq: 277.18, dur: 0.18 },
  { freq: 311.13, dur: 0.18 },
  { freq: 329.63, dur: 0.16, bendTo: 349.23 },
  { freq: 349.23, dur: 0.34 },
  { freq: 415.3, dur: 0.22 },
  { freq: 349.23, dur: 0.62 },
];

function voice(ac: AudioContext, kind: Instrument, n: Note, t: number) {
  const out = ac.createGain();
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  const oscs: OscillatorNode[] = [];

  if (kind === "trumpet") {
    const o = ac.createOscillator();
    o.type = "sawtooth";
    oscs.push(o);
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.linearRampToValueAtTime(2600, t + 0.06);
    out.gain.setValueAtTime(0, t);
    out.gain.linearRampToValueAtTime(0.16, t + 0.03);
    out.gain.setValueAtTime(0.14, t + n.dur - 0.05);
  } else {
    // breathier: saw + soft triangle, darker filter, slower attack
    const a = ac.createOscillator();
    a.type = "sawtooth";
    const b = ac.createOscillator();
    b.type = "triangle";
    b.detune.value = 7;
    oscs.push(a, b);
    filter.frequency.value = 1300;
    filter.Q.value = 2.5;
    out.gain.setValueAtTime(0, t);
    out.gain.linearRampToValueAtTime(0.12, t + 0.07);
    out.gain.setValueAtTime(0.11, t + n.dur - 0.06);
  }
  out.gain.linearRampToValueAtTime(0, t + n.dur);

  const vib = ac.createOscillator();
  const depth = ac.createGain();
  vib.frequency.value = kind === "trumpet" ? 5.5 : 4.6;
  depth.gain.setValueAtTime(0, t);
  depth.gain.linearRampToValueAtTime(n.freq * (kind === "trumpet" ? 0.006 : 0.01), t + Math.min(0.15, n.dur));

  for (const o of oscs) {
    o.frequency.setValueAtTime(n.freq, t);
    if (n.bendTo) o.frequency.linearRampToValueAtTime(n.bendTo, t + n.dur * 0.7);
    vib.connect(depth).connect(o.frequency);
    o.connect(filter);
    o.start(t);
    o.stop(t + n.dur);
  }
  filter.connect(out).connect(ac.destination);
  vib.start(t);
  vib.stop(t + n.dur);
}

export function useInstruments() {
  const [playing, setPlaying] = useState<Instrument | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const done = useRef<number | undefined>(undefined);

  function stop() {
    window.clearTimeout(done.current);
    ctx.current?.close();
    ctx.current = null;
    setPlaying(null);
  }

  function play(kind: Instrument) {
    const wasSame = playing === kind;
    stop();
    if (wasSame) return;
    const ac = new AudioContext();
    ctx.current = ac;
    let t = ac.currentTime + 0.05;
    for (const n of kind === "trumpet" ? FANFARE : LICK) {
      voice(ac, kind, n, t);
      t += n.dur + (kind === "trumpet" ? 0.02 : 0.03);
    }
    setPlaying(kind);
    done.current = window.setTimeout(() => {
      if (ctx.current === ac) stop();
    }, (t - ac.currentTime) * 1000 + 300);
  }

  useEffect(
    () => () => {
      ctx.current?.close();
    },
    [],
  );

  return { playing, play };
}
