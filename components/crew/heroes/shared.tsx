import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { CrewMember } from "@/content/crew";

export type HeroProps = { m: CrewMember; index: number; total: number };

/** Back link + "Stop 2 of 4 · role". Sits at the top of every personal hero. */
export function HeroTop({ m, index, total, className = "" }: HeroProps & { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 ${className}`}>
      <Link href="/crew" className="inline-flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100">
        <Icon icon={ArrowLeft02Icon} size={16} />
        The crew
      </Link>
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-70">
        Stop {index + 1} of {total} · {m.role}
      </p>
    </div>
  );
}

/** Everything the chat calls them, on a loop. */
export function NamesMarquee({ m }: { m: CrewMember }) {
  const names = [...m.calledBy, m.title];
  return (
    <div
      aria-label={`Also known as: ${names.join(", ")}`}
      className="overflow-hidden border-y border-current/15 bg-(--p) py-4 text-(--p-on)"
    >
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 motion-reduce:animate-none">
        {[...names, ...names, ...names, ...names].map((n, k) => (
          <span key={k} aria-hidden className="display flex items-center gap-10 text-2xl whitespace-nowrap md:text-3xl">
            {n}
            <span className="h-2 w-2 rounded-full bg-current opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}
