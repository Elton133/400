import type { Metadata } from "next";
import { DepartureBoard } from "@/components/board/DepartureBoard";
import { PageShell } from "@/components/chrome/PageShell";
import { PageHead } from "@/components/PageHead";
import { SectionHead } from "@/components/SectionHead";
import { ClientBuilds, GameLane, PartnerCredits } from "@/components/work/OtherLanes";
import { ProductLanes } from "@/components/work/ProductLanes";
import { visibleProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Everything 400 has shipped: our products, client builds and games.",
};

const lane = (l: string) => visibleProjects.filter((p) => p.lane === l);

export default function WorkPage() {
  const products = lane("product");
  const clients = lane("client");
  const games = lane("game");
  const partners = lane("partner");
  const side = lane("side");
  const school = lane("school");

  return (
    <PageShell>
      <section className="pb-28" aria-labelledby="work-title">
        <div className="wrap">
          <PageHead kicker="Work" title={<>The work<span className="text-orange">.</span></>} id="work-title">
            Everything on one board. Filter it, or open any row to inspect it.
          </PageHead>
          <DepartureBoard projects={visibleProjects} title="All departures" />
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="products-title">
        <div className="wrap">
          <SectionHead kicker="Lane 01 · Transit" title="Our products" id="products-title">
            Things we built for ourselves first, then for everyone.
          </SectionHead>
          <ProductLanes products={products} />
        </div>
      </section>

      {games.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="games-title">
          <div className="wrap">
            <SectionHead kicker="Lane 02 · Play" title="Games" id="games-title">
              The lane that&apos;s allowed to be silly. Share a room, bring a friend.
            </SectionHead>
            <GameLane games={games} />
          </div>
        </section>
      )}

      {clients.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="clients-title">
          <div className="wrap">
            <SectionHead kicker="Lane 03 · Signboards" title="Client builds" id="clients-title">
              Websites we built for businesses.
            </SectionHead>
            <ClientBuilds clients={clients} />
          </div>
        </section>
      )}

      {side.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="side-title">
          <div className="wrap">
            <SectionHead kicker="Lane 04 · Side projects" title="Built for fun" id="side-title">
              What happens when one of us can&apos;t sleep.
            </SectionHead>
            <GameLane games={side} />
          </div>
        </section>
      )}

      {school.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="school-title">
          <div className="wrap">
            <SectionHead kicker="Lane 05 · School" title="Where it started" id="school-title">
              The semester project that started the group chat, and the final-year projects we defended in May 2026.
            </SectionHead>
            <ClientBuilds clients={school} />
          </div>
        </section>
      )}

      {partners.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="partners-title">
          <div className="wrap">
            <SectionHead kicker="Lane 06 · Credits" title="With partners" id="partners-title" />
            <PartnerCredits partners={partners} />
          </div>
        </section>
      )}
    </PageShell>
  );
}
