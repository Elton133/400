import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/chrome/PageShell";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { SectionHead } from "@/components/SectionHead";
import { visibleProjects } from "@/content/projects";
import { events, proof } from "@/content/site";

export const metadata: Metadata = {
  title: "Track record",
  description: "What 400 has shipped, who we've presented to and where we show up. Dated and checkable.",
};

// Only count what a visitor can open and check for themselves.
const live = visibleProjects.filter((p) => p.status === "live" && p.links?.length).length;
const products = visibleProjects.filter((p) => p.lane === "product").length;
const onStores = 4; // Trofficient + Trofficient Driver + Beagine + Beagine Pro, all on the App Store

export default function TrackRecordPage() {
  const dated = [...proof].sort((a, b) => toTime(b.when) - toTime(a.when));

  return (
    <PageShell>
      <section className="pb-24" aria-labelledby="record-title">
        <div className="wrap">
          <PageHead kicker="Track record" title={<>The receipts<span className="text-orange">.</span></>} id="record-title">
            For partners, funders and anyone deciding whether to trust four people from a group chat. Everything here is
            dated, and almost all of it is something you can open and use.
          </PageHead>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
            {[
              [String(products), "products of our own"],
              [String(live), "live projects you can open today"],
              [String(onStores), "apps on the App Store"],
              ["1", "school workshop, and counting"],
            ].map(([n, label]) => (
              <div key={label} className="bg-surface p-6 md:p-8">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="display block text-[clamp(3rem,6vw,4.5rem)] leading-none tabular-nums">{n}</span>
                  <span className="mt-3 block text-[15px] text-muted">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="proof-title">
        <div className="wrap">
          <SectionHead kicker="Proof points" title="What's happened." id="proof-title" />
          <ol className="divide-y divide-line border-y border-line">
            {dated.map((p) => {
              const row = (
                <>
                  <span className="font-mono text-[13px] text-muted tabular-nums md:w-32">{p.when}</span>
                  <span className="md:flex-1">
                    <span className="block text-xl font-medium">{p.title}</span>
                    <span className="mt-1 block text-[16px] leading-relaxed text-muted">{p.body}</span>
                  </span>
                  {p.href && (
                    <span className="hidden h-10 w-10 flex-none place-items-center rounded-full border border-line-strong transition-colors group-hover:border-fg group-hover:bg-fg group-hover:text-bg md:grid">
                      <Icon icon={ArrowRight02Icon} size={16} />
                    </span>
                  )}
                </>
              );
              return (
                <li key={p.title}>
                  {p.href ? (
                    <Link href={p.href} className="group flex flex-col gap-2 py-7 md:flex-row md:items-center md:gap-10">
                      {row}
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2 py-7 md:flex-row md:items-center md:gap-10">{row}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section border-t border-line bg-surface" aria-labelledby="rooms-title">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHead kicker="In the room" title="Who we've presented to." id="rooms-title" />
            <ul className="flex flex-col gap-4">
              {[
                ["Metro Mass", "Leslie and Elton met the directors about Trofficient.", "01.06.2026"],
                ["Ministry of Transport", "Joyce and Leslie presented Trofficient and Beagine. Waiting on a response.", "07.10.2026"],
                ["De-Masters Academy", "Skill Academy's first workshop, for JHS 1–3.", "23.10.2026"],
              ].map(([who, what, when]) => (
                <li key={who} className="rounded-2xl bg-bg p-6 ring-1 ring-line">
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="text-xl font-medium">{who}</span>
                    <span className="font-mono text-[12px] text-muted">{when}</span>
                  </p>
                  <p className="mt-2 text-[16px] text-muted">{what}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Presenting to someone isn&apos;t a partnership or an endorsement, and we don&apos;t claim either.
            </p>
          </div>
          <div>
            <SectionHead kicker="Out and about" title="Where you'll find us." id="events-title" />
            <ul className="divide-y divide-line border-y border-line">
              {events.map((e) => (
                <li key={e.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span className="text-[17px] font-medium">{e.name}</span>
                  <span className="text-[15px] text-muted">
                    {e.note}
                    {e.when && e.when !== e.note && <span className="ml-3 font-mono text-[12px]">{e.when}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/** "07.10.2026" → sortable number. */
function toTime(d: string) {
  const [day, month, year] = d.split(".").map(Number);
  return Date.UTC(year, month - 1, day);
}
