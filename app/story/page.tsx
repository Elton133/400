import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { PageHead } from "@/components/PageHead";
import { SectionHead } from "@/components/SectionHead";
import { Numbers } from "@/components/story/Numbers";
import { culture, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "Story",
  description: "From a semester group chat called “Database 2” to 400: the real milestones, from the first build to the App Store.",
};

export default function StoryPage() {
  return (
    <PageShell>
      <section className="pb-28" aria-labelledby="story-title">
        <div className="wrap">
          <PageHead
            kicker="Story"
            title={
              <>
                Database 2 <span className="text-muted">to</span> 400<span className="text-orange">.</span>
              </>
            }
            id="story-title"
          >
            It started as a group chat for a semester project at Regional Maritime University. It&apos;s still the same
            group chat. Everything below happened in it.
          </PageHead>

          <div className="grid gap-20">
            {timeline.map((year) => (
              <section key={year.year} aria-labelledby={`y-${year.year}`} className="grid gap-10 lg:grid-cols-[12rem_1fr]">
                <h2 id={`y-${year.year}`} className="display t-section lg:sticky lg:top-24 lg:self-start">
                  {year.year}
                </h2>
                <ol className="relative flex max-w-3xl flex-col gap-10 border-l border-line pl-8 md:pl-12">
                  {year.items.map((t) => (
                    <li key={t.when + t.title} className="relative">
                      <span
                        aria-hidden
                        className="absolute top-1.5 -left-[37px] h-2.5 w-2.5 rounded-full border-2 border-bg bg-fg md:-left-[53px]"
                      />
                      <p className="label">{t.when}</p>
                      <p className="mt-2 flex items-center gap-2.5 text-xl font-medium">
                        {t.status && <span className="status-light" data-status={t.status} />}
                        {t.title}
                      </p>
                      <p className="mt-1.5 max-w-xl leading-relaxed text-muted">{t.body}</p>
                      {t.quote && (
                        <p className="mt-4 w-fit max-w-md rounded-2xl rounded-tl-md bg-surface px-4 py-2.5 font-chat text-[16px] ring-1 ring-line">
                          {t.quote}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="culture-title">
        <div className="wrap">
          <SectionHead kicker="Serious work, unserious chat" title="How the chat sounds." id="culture-title">
            Pidgin and Ghanaian English, stickers instead of replies, football at midnight and a Google Meet link at 11pm.
          </SectionHead>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-2">
            <div className="bg-bg p-8">
              <p className="label">The vocabulary</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {culture.language.map((w) => (
                  <li key={w} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[15px]">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg p-8">
              <p className="label">On the table</p>
              <ul className="mt-5 flex flex-col gap-2 text-[16px]">
                {culture.food.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-bg p-8">
              <p className="label">Rituals</p>
              <ul className="mt-5 flex flex-col gap-2 text-[16px]">
                {culture.rituals.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="bg-bg p-8">
              <p className="label">Running bits</p>
              <ul className="mt-5 flex flex-col gap-2 text-[16px]">
                {culture.bits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-[15px] text-muted">{culture.football}</p>
            </div>
          </div>
          <p className="sign mt-10 text-[clamp(2.25rem,4vw,3.5rem)] text-muted">Sleep was just a rumor to us.</p>
        </div>
      </section>

      <section className="section border-t border-line bg-surface" aria-labelledby="numbers-title">
        <div className="wrap">
          <SectionHead kicker="The thread, in numbers" title="A little ridiculous." id="numbers-title">
            No &ldquo;100+ happy clients&rdquo;. Just what the chat says.
          </SectionHead>
          <Numbers />
          <p className="sign mt-10 text-4xl text-muted">Pulled from our actual group chat. Yes, really.</p>
        </div>
      </section>
    </PageShell>
  );
}
