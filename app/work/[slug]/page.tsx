import { ArrowLeft02Icon, ArrowRight02Icon, ArrowUpRight01Icon, PlayIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageShell } from "@/components/chrome/PageShell";
import { Confirm } from "@/components/Confirm";
import { Icon } from "@/components/Icon";
import { FlatPhone } from "@/components/phone/FlatPhone";
import { crewById, personVars } from "@/content/crew";
import { getProject, laneLabel, statusLabel, visibleProjects } from "@/content/projects";

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

const statusText = { live: "text-green-text", testing: "text-amber-text", prerelease: "text-amber-text", cooking: "text-pink-text", archived: "text-muted" };

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = visibleProjects.indexOf(p);
  const next = visibleProjects[(i + 1) % visibleProjects.length];

  return (
    <PageShell>
      <article className="pt-10 pb-28">
        <div className="wrap">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <Icon icon={ArrowLeft02Icon} size={16} />
            All departures
          </Link>

          <header className="mt-14 border-b border-line pb-12">
            <p className={`flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase ${statusText[p.status]}`}>
              <span className="status-light" data-status={p.status} />
              {statusLabel[p.status]}
              <span className="text-muted">
                · {laneLabel[p.lane]} {p.platforms.length > 0 && `· ${p.platforms.join(" · ")}`}
              </span>
            </p>
            <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
              <h1 className="display t-page mt-8 w-fit">{p.name}</h1>
            </ViewTransition>
            <p className="lede mt-8 max-w-2xl text-fg/80">{p.tagline}</p>
            <Confirm items={p.confirm} className="mt-4" />
          </header>

          <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_300px]">
            <dl className="grid content-start gap-12">
              {p.problem && (
                <div>
                  <dt className="label">THE PROBLEM</dt>
                  <dd className="lede mt-4 max-w-2xl">{p.problem}</dd>
                </div>
              )}
              {p.built && (
                <div>
                  <dt className="label">WHAT WE BUILT</dt>
                  <dd className="mt-4">
                    <ul className="lede flex flex-col gap-2">
                      {p.built.map((b) => (
                        <li key={b} className="flex gap-3">
                          <Icon icon={ArrowRight02Icon} size={18} className="mt-1.5 text-muted" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {p.crew && (
                <div>
                  <dt className="label">WHO DID WHAT</dt>
                  <dd className="mt-4 flex flex-wrap gap-3">
                    {p.crew.map((id) => (
                      <Link
                        key={id}
                        href="/crew"
                        className="flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pr-5 pl-1.5 transition-colors hover:border-fg"
                      >
                        <span
                          style={personVars(crewById[id])}
                          className="grid h-9 w-9 place-items-center rounded-full bg-(--p) font-mono text-[12px] font-bold text-(--p-on)"
                        >
                          {crewById[id].name[0]}
                        </span>
                        <span>
                          <span className="block text-[15px] font-medium">{crewById[id].name}</span>
                          <span className="block font-mono text-[10px] tracking-wider text-muted">
                            {(p.credits?.[id] ?? crewById[id].role).toUpperCase()}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
              {p.stack && (
                <div>
                  <dt className="label">STACK</dt>
                  <dd className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[12px]">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {(p.links?.length || p.room) && (
                <div>
                  <dt className="label">LINKS</dt>
                  <dd className="mt-4 flex flex-wrap gap-3">
                    {p.links?.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                        {l.label}
                        <Icon icon={ArrowUpRight01Icon} size={16} />
                      </a>
                    ))}
                    {p.room && (
                      <a href={p.room} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        <Icon icon={PlayIcon} size={16} />
                        Join a room
                      </a>
                    )}
                  </dd>
                </div>
              )}
              {p.bug && (
                <div className="border-l-2 border-orange pl-6">
                  <dt className="label text-orange-text">THE BUG WE&apos;LL NEVER FORGET</dt>
                  <dd className="mt-4 max-w-2xl font-mono text-[15px] leading-relaxed">{p.bug}</dd>
                </div>
              )}
              {p.desktop && (
                <div>
                  <dt className="label">On desktop</dt>
                  <dd className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
                    <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                    </div>
                    <Image src={p.desktop} alt={`${p.name} website on desktop`} width={1440} height={900} className="w-full" />
                  </dd>
                </div>
              )}
              {p.screens && p.screens.length > 1 && (
                <div>
                  <dt className="label">On mobile</dt>
                  <dd className="mt-4 flex snap-x gap-5 overflow-x-auto pt-1 pb-8">
                    {p.screens.map((src) => (
                      <Image
                        key={src}
                        src={src}
                        alt={`${p.name} screen`}
                        width={240}
                        height={520}
                        className="flex-none snap-start rounded-[1.5rem] shadow-[0_20px_40px_-24px_rgb(20_20_20/0.4)]"
                      />
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            <aside className="flex justify-center lg:sticky lg:top-24 lg:self-start">
              <FlatPhone project={p} />
            </aside>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-28 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8"
          >
            <span className="label">Next departure</span>
            <span className="display t-title inline-flex items-center gap-4 transition-transform group-hover:-translate-x-2">
              {next.name}
              <Icon icon={ArrowRight02Icon} size={36} />
            </span>
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
