import { ArrowRight02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { TrotroCall } from "@/components/crew/TrotroCall";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { crew, personVars } from "@/content/crew";

export const metadata: Metadata = {
  title: "Crew",
  description: "Joyce, Leslie, Elton and Efo. 100 each. Four of us. 400.",
};

export default function CrewPage() {
  return (
    <PageShell>
      <section className="pb-28" aria-labelledby="crew-title">
        <div className="wrap">
          <PageHead kicker="Crew" title={<>The crew<span className="text-orange">.</span></>} id="crew-title">
            Four equals. No boss, no fixed titles: whoever is closest to the problem takes the lead on it, and on the
            next project it&apos;s someone else. Four stops on one route; the mate calls each name as you arrive.
            <span className="mt-6 flex flex-wrap items-baseline gap-x-3 text-[15px] text-muted">
              <span className="label">House rule</span>
              <span className="font-medium text-fg">ELK: Execute, Learn and Keep growing.</span>
              <span>(Efo&apos;s)</span>
            </span>
          </PageHead>
        </div>
        <TrotroCall crew={crew} />
      </section>

      <section className="section border-t border-line bg-surface" aria-labelledby="bios-title">
        <div className="wrap">
          <p className="label">The long version</p>
          <h2 id="bios-title" className="sr-only">
            Bios
          </h2>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {crew.map((m) => (
              <li key={m.id} style={personVars(m)} className="grid gap-6 py-12 md:grid-cols-[minmax(0,320px)_1fr]">
                <div>
                  <Link href={`/crew/${m.id}`} className="display t-title flex items-center gap-4 hover:text-muted">
                    <span aria-hidden className="h-8 w-1.5 rounded-full bg-(--p)" />
                    {m.name}
                  </Link>
                  <p className="label mt-3">{m.role}</p>
                </div>
                <div>
                  <p className="lede max-w-2xl text-fg/85">{m.bio}</p>
                  <p className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/crew/${m.id}`} className="btn btn-primary btn-sm">
                      Meet {m.name} properly
                      <Icon icon={ArrowRight02Icon} size={16} />
                    </Link>
                      {m.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                          {l.label}
                          <Icon icon={ArrowUpRight01Icon} size={16} />
                        </a>
                      ))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
