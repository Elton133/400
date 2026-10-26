import { DepartureBoard } from "@/components/board/DepartureBoard";
import { PageShell } from "@/components/chrome/PageShell";
import { ChatIntro } from "@/components/home/ChatIntro";
import { Doors } from "@/components/home/Doors";
import { Hero } from "@/components/home/Hero";
import { StillCooking } from "@/components/home/StillCooking";
import { TheName } from "@/components/home/TheName";
import { ShipStory } from "@/components/story/ShipStory";
import { visibleProjects } from "@/content/projects";

// Pacing: loud intro, clear hero, playful board, quiet name, loud story,
// doors to the full pages, a tease, then the footer asks directly.

export default function Home() {
  return (
    <PageShell>
      <ChatIntro />
      <Hero />
      <section id="board" className="scroll-mt-20 pb-28 md:pb-36" aria-label="Departure board">
        <div className="wrap">
          <p className="label mb-6">03 / What&apos;s running</p>
          <DepartureBoard projects={visibleProjects} limit={8} />
        </div>
      </section>
      <TheName />
      <ShipStory />
      <Doors />
      <StillCooking />
    </PageShell>
  );
}
