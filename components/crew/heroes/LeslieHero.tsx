import { CatIcon, GitBranchIcon } from "@hugeicons/core-free-icons";
import { Barlow, Bebas_Neue } from "next/font/google";
import { Icon } from "@/components/Icon";
import { type HeroProps, HeroTop } from "./shared";

// Leslie loves Bebas Neue + Barlow and black-and-white, edgy design, and
// lives by "tiny commits". So his hero is set in exactly that, as a git log.

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "600"] });

// Real moments from the chat, newest first. Hashes are decoration.
const commits: [hash: string, msg: string, when: string][] = [
  ["7c0a1e4", "pitch: trofficient + beagine at the ministry of transport", "2026-10-07"],
  ["f0ur3a1", "feat(fourman): four-player chess, built overnight", "2026-09-30"],
  ["9e7l1v3", "release: trofficient on the app store · guyssssssssss we live", "2026-07-06"],
  ["a44ays0", "fix(prod): I OFFICIALLY HATE ARRAYS", "2026-06"],
  ["m3tr0ms", "meet: metro mass directors", "2026-06-01"],
  ["d3m0b8f", "feat: trofficient demo (thanks to selorm and elton)", "2026-03-09"],
  ["c4t0001", "chore: adopt stray cat", "undated"],
  ["t0pt13r", "docs: friend group is top-tier, still in active development", "2025-12-25"],
  ["1n1t400", "init: run these projects as a company", "2025-10-14"],
];

export function LeslieHero(props: HeroProps) {
  const { m } = props;
  return (
    <header className={`relative overflow-hidden bg-[#0b0b0b] text-white ${barlow.className}`}>
      {/* edgy: hard rules and a giant outlined backdrop */}
      <p
        aria-hidden
        className={`${bebas.className} pointer-events-none absolute -right-6 -bottom-16 text-[42vw] leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.08)] select-none`}
      >
        ARES
      </p>

      <div className="wrap relative pt-10 pb-20 md:pt-14 md:pb-28">
        <HeroTop {...props} />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.3em] uppercase">
              <span className="h-px w-10 bg-white" /> God of backend
            </p>
            <h1 className={`${bebas.className} mt-4 text-[34vw] leading-[0.8] tracking-tight lg:text-[clamp(10rem,17vw,17rem)]`}>
              {m.name}
            </h1>
            <div className="mt-6 border-y-2 border-white py-5">
              {m.mottos.map((motto) => (
                <p key={motto} className={`${bebas.className} text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.9]`}>
                  {motto}
                </p>
              ))}
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-white/60">
              <span>Founder of Trofficient</span>
              <span>Theatrical speeches</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon icon={CatIcon} size={16} /> Adopted a stray
              </span>
            </p>
          </div>

          {/* git log --author=leslie */}
          <div tabIndex={0} className="group overflow-hidden rounded-none border-2 border-white bg-black font-mono text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-(--p) sm:text-[13px]">
            <div className="flex items-center justify-between border-b-2 border-white px-4 py-3">
              <span className="text-white/70">$ git log --author=leslie</span>
              <span className="inline-flex items-center gap-1.5 bg-white px-2 py-0.5 text-[11px] font-semibold text-black">
                <Icon icon={GitBranchIcon} size={13} /> main
              </span>
            </div>
            <ol className="relative px-4 py-4">
              <span aria-hidden className="absolute top-6 bottom-6 left-[23px] w-0.5 bg-white/25" />
              {commits.map(([hash, msg, when], k) => (
                <li key={hash} className="relative flex items-baseline gap-3 py-1.5 pl-6 transition-colors hover:bg-white/[0.06]">
                  <span
                    aria-hidden
                    className={`absolute top-[11px] left-[3px] h-2.5 w-2.5 rounded-full border-2 ${k === 0 ? "border-(--p) bg-(--p)" : "border-white bg-black"}`}
                  />
                  <span className="text-white/45">{hash}</span>
                  <span className={msg.includes("HATE") ? "font-semibold text-white" : "text-white/85"}>
                    {k === 0 && <span className="mr-2 text-(--p)">(HEAD)</span>}
                    {msg}
                  </span>
                  <span className="ml-auto hidden flex-none text-white/35 sm:inline">{when}</span>
                </li>
              ))}
            </ol>
            <p className="border-t-2 border-white px-4 py-3 text-white/50 transition-colors group-hover:text-white group-focus:text-white">
              <span className="group-hover:hidden group-focus:hidden">9 commits. Every one of them tiny. (Tap or hover.)</span>
              <span className="hidden group-hover:inline group-focus:inline">&gt; I smell a rebase.</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
