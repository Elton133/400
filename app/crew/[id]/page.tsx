import { ArrowRight02Icon, ArrowUpRight01Icon, TickDouble02Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/chrome/PageShell";
import { Confirm } from "@/components/Confirm";
import { Icon } from "@/components/Icon";
import { type CrewId, crew, crewById, personVars } from "@/content/crew";
import { statusLabel, visibleProjects } from "@/content/projects";
import { EfoHero } from "@/components/crew/heroes/EfoHero";
import { EltonHero } from "@/components/crew/heroes/EltonHero";
import { JoyceHero } from "@/components/crew/heroes/JoyceHero";
import { LeslieHero } from "@/components/crew/heroes/LeslieHero";
import { NamesMarquee } from "@/components/crew/heroes/shared";

// The wild pages. One per person, in their colour. Loud on purpose.

export function generateStaticParams() {
  return crew.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps<"/crew/[id]">): Promise<Metadata> {
  const m = crewById[(await params).id as CrewId];
  return m ? { title: `${m.name}, ${m.title}`, description: m.bio } : {};
}

const HEROES = { joyce: JoyceHero, leslie: LeslieHero, elton: EltonHero, efo: EfoHero };

const TILTS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
const PHOTO_SLOTS = 4;

export default async function CrewMemberPage({ params }: PageProps<"/crew/[id]">) {
  const { id } = await params;
  const m = crewById[id as CrewId];
  if (!m) notFound();

  const i = crew.indexOf(m);
  const next = crew[(i + 1) % crew.length];
  const built = visibleProjects.filter((p) => p.crew?.includes(m.id));
  const Hero = HEROES[m.id];
  const photos = Array.from({ length: Math.max(PHOTO_SLOTS, m.photos.length) }, (_, k) => m.photos[k] ?? null);

  return (
    <PageShell>
      <article style={personVars(m)}>
        {/* ── HERO: built around who they are ── */}
        <Hero m={m} index={i} total={crew.length} />
        <NamesMarquee m={m} />

        {/* ── PHOTO WALL ── */}
        <section className="section overflow-hidden" aria-label={`Photos of ${m.name}`}>
          <div className="wrap">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {photos.map((src, k) => (
                <figure
                  key={k}
                  className={`bg-surface p-3 pb-12 shadow-[0_24px_40px_-24px_rgb(20_20_20/0.45)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] ${TILTS[k % TILTS.length]} ${k % 2 ? "md:mt-12" : ""}`}
                >
                  <div className="relative aspect-4/5 overflow-hidden bg-raise">
                    {src ? (
                      <Image src={src} alt={`${m.name}`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center p-4 text-center font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                        Photo {k + 1}
                        <br />
                        coming soon
                      </div>
                    )}
                  </div>
                </figure>
              ))}
            </div>
            <Confirm items={m.confirm} className="mt-8" />
          </div>
        </section>

        {/* ── THE BASICS (still a little loud) ── */}
        <section className="border-t border-line" aria-labelledby="basics">
          <div className="wrap grid gap-14 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
            <div>
              <h2 id="basics" className="label">
                The professional bit
              </h2>
              <p className="lede mt-6 text-fg/85">{m.bio}</p>
              <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 border-t border-line pt-6 text-[15px]">
                <dt className="label pt-0.5">Usually</dt>
                <dd>{m.role}</dd>
                <dt className="label pt-0.5">Owns</dt>
                <dd>{m.owns.join(" · ")}</dd>
                <dt className="label pt-0.5">Stack</dt>
                <dd>{m.stack.join(" · ")}</dd>
              </dl>
              {m.links.length > 0 && (
                <p className="mt-8 flex flex-wrap gap-3">
                  {m.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      {l.label}
                      <Icon icon={ArrowUpRight01Icon} size={16} />
                    </a>
                  ))}
                </p>
              )}
            </div>
            <div>
              <p className="label">Skills</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {m.skills.map((s, k) => (
                  <li
                    key={s}
                    className={`rounded-full px-5 py-2.5 text-lg font-medium ${TILTS[k % TILTS.length]} ${
                      k % 3 === 0 ? "bg-(--p) text-(--p-on)" : k % 3 === 1 ? "border-2 border-(--p)" : "bg-raise"
                    }`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="label mt-12">Off the clock</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {m.passions.map((p, k) => (
                  <li key={p} className="flex items-center gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line">
                    <span className="display text-3xl text-(--p) [-webkit-text-stroke:1px_var(--fg)]">{String(k + 1).padStart(2, "0")}</span>
                    <span className="text-[16px] leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── MOTTOS, BIG ── */}
        {m.mottos.length > 0 && (
          <section className="bg-ink py-20 text-paper md:py-28" aria-label="Mottos">
            <div className="wrap">
              <p className="font-mono text-[11px] tracking-[0.2em] text-paper/50 uppercase">Lives by</p>
              {m.mottos.map((motto) => (
                <p key={motto} className="display mt-6 text-[clamp(2.25rem,8.5vw,7.5rem)] uppercase">
                  {motto}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── FUN FACTS ── */}
        <section className="section" aria-labelledby="facts">
          <div className="wrap">
            <h2 id="facts" className="display t-section">
              Fun facts<span className="text-(--p)">.</span>
            </h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-2">
              {m.funFacts.map((f, k) => (
                <li
                  key={f}
                  className={`flex gap-6 bg-bg p-7 md:p-9 ${k === m.funFacts.length - 1 && m.funFacts.length % 2 ? "md:col-span-2" : ""}`}
                >
                  <span className="display text-5xl leading-none text-(--p)">{k + 1}</span>
                  <span className="lede pt-1">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── IN THE CHAT ── */}
        {m.quotes.length > 0 && (
          <section className="border-t border-line bg-surface py-20 md:py-28" aria-labelledby="quotes">
            <div className="wrap">
              <h2 id="quotes" className="label">
                In the chat
              </h2>
              <ul className="mt-10 flex max-w-2xl flex-col gap-5">
                {m.quotes.map((q, k) => (
                  <li key={q.text} className={`flex flex-col gap-1.5 ${k % 2 ? "items-end self-end text-right" : "items-start"}`}>
                    <p
                      className={`inline-flex max-w-md items-end gap-2 rounded-3xl px-5 py-3 font-chat text-[18px] leading-snug ${
                        k % 2 ? "rounded-br-md bg-(--p) text-(--p-on)" : "rounded-bl-md bg-bg ring-1 ring-line"
                      }`}
                    >
                      {q.text}
                      <Icon icon={TickDouble02Icon} size={14} className="mb-0.5 flex-none opacity-70" />
                    </p>
                    {q.when && <span className="font-mono text-[11px] text-muted">{q.when}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── THINGS THEY BUILT ── */}
        {built.length > 0 && (
          <section className="section border-t border-line" aria-labelledby="built">
            <div className="wrap">
              <h2 id="built" className="display t-section">
                What {m.name} has shipped<span className="text-(--p)">.</span>
              </h2>
              <ul className="mt-12 divide-y divide-line border-y border-line">
                {built.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/work/${p.slug}`}
                      className="group flex flex-wrap items-center gap-x-8 gap-y-2 py-6 transition-colors hover:bg-surface"
                    >
                      <span className="display t-title transition-transform group-hover:translate-x-2">{p.name}</span>
                      {p.credits?.[m.id] && <span className="text-[15px] text-muted">{p.credits[m.id]}</span>}
                      <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                        <span className="status-light" data-status={p.status} />
                        {statusLabel[p.status]}
                        <Icon icon={ArrowRight02Icon} size={16} className="ml-2" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── NEXT STOP ── */}
        <Link
          href={`/crew/${next.id}`}
          style={personVars(next)}
          className="group block bg-(--p) text-(--p-on) transition-[filter] hover:brightness-110"
        >
          <span className="wrap flex flex-wrap items-end justify-between gap-6 py-16 md:py-20">
            <span>
              <span className="block font-mono text-[11px] tracking-[0.2em] uppercase opacity-70">Next stop</span>
              <span className="sign mt-3 block text-[clamp(4rem,10vw,9rem)] leading-none">{next.name}!</span>
            </span>
            <Icon icon={ArrowRight02Icon} size={48} className="mb-4 transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </article>
    </PageShell>
  );
}
