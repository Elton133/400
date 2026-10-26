import type { Sticker } from "./data";

// Dev mode: the canvas, as the JSX that would draw it. Updates live as
// stickers move, the alias changes or someone doodles.

type Tok = [cls: string, text: string];

const k = (t: string): Tok => ["text-(--p-accent)", t]; // keywords
const tag = (t: string): Tok => ["text-[#8fb1ff]", t]; // components
const attr = (t: string): Tok => ["text-[#ffb3d1]", t];
const str = (t: string): Tok => ["text-[#ffd27a]", t];
const num = (t: string): Tok => ["text-[#9ef0c0]", t];
const p = (t: string): Tok => ["text-white/55", t]; // punctuation
const c = (t: string): Tok => ["text-white/35 italic", t]; // comments
const w = (t: string): Tok => ["text-white/90", t];

export function CodePanel({ alias, stickers, strokes, fill }: { alias: string; stickers: Sticker[]; strokes: number; fill: string }) {
  const lines: Tok[][] = [
    [k("export function "), tag("Elton"), p("() {")],
    [w("  "), k("return"), p(" (")],
    [w("    "), p("<"), tag("Frame"), w(" "), attr("name"), p("="), str('"Elton"'), w(" "), attr("fill"), p("="), str(`"${fill}"`), p(">")],
    [w("      "), p("<"), tag("Script"), p(">"), w("Elton"), p("</"), tag("Script"), p(">")],
    [w("      "), p("<"), tag("Title"), w(" "), attr("alias"), p("="), str(`"${alias}"`), w(" "), p("/>")],
    ...stickers.map((s): Tok[] => [
      w("      "),
      p("<"),
      tag(s.layer),
      w(" "),
      attr("x"),
      p("={"),
      num(s.x.toFixed(0)),
      p("}"),
      w(" "),
      attr("y"),
      p("={"),
      num(s.y.toFixed(0)),
      p("}"),
      w(" "),
      p("/>"),
    ]),
    strokes > 0
      ? [w("      "), p("<"), tag("Doodle"), w(" "), attr("strokes"), p("={"), num(String(strokes)), p("}"), w(" "), p("/>")]
      : [w("      "), c("{/* pick the pen (P) and draw something */}")],
    [w("    "), p("</"), tag("Frame"), p(">")],
    [w("  "), p(");")],
    [p("}")],
  ];

  return (
    <div className="h-full overflow-auto bg-[#141416] p-5 font-mono text-[12px] leading-[1.7]">
      <p className="mb-3 flex items-center justify-between text-[11px] tracking-[0.16em] text-white/40 uppercase">
        <span>Elton.tsx</span>
        <span className="text-(--p-accent)">live</span>
      </p>
      <pre className="whitespace-pre">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-4 inline-block w-5 flex-none text-right text-white/20 select-none">{i + 1}</span>
            <span>
              {line.map(([cls, text], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}
