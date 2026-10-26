import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { PhotoSlot } from "@/components/Confirm";
import { Icon } from "@/components/Icon";
import { crew, crewById, type CrewId } from "@/content/crew";

// The real Trofficient journey, from the chat (400-overview.md).
// Every element marked data-step animates in, in order. [data-count]
// rolls from 1 to its final value. Quotes need all four to approve.

export type Scene = {
  id: string;
  kicker: string;
  title: string;
  body?: string;
  tone?: "fail" | "test" | "live";
  visual: React.ReactNode;
};

const Bubble = ({ children, who }: { children: React.ReactNode; who?: CrewId }) => (
  <div data-step className="flex max-w-[88%] flex-col gap-1">
    {who && (
      <span className="pl-1 text-[12px] font-semibold" style={{ color: crewById[who].color }}>
        {crewById[who].name}
      </span>
    )}
    <span className="w-fit rounded-2xl rounded-tl-md bg-raise px-4 py-2.5 font-chat text-[17px] leading-snug">{children}</span>
  </div>
);

const Terminal = ({ children, tone }: { children: React.ReactNode; tone?: "fail" }) => (
  <div
    className={`w-full overflow-hidden rounded-xl border bg-ink font-mono text-[12px] leading-relaxed text-paper sm:text-[13px] ${
      tone === "fail" ? "border-orange" : "border-ink"
    }`}
  >
    <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
      <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
      <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
      <span className="ml-2 text-[11px] text-paper/50">trofficient · production</span>
    </div>
    <div className="flex flex-col gap-1 p-5">{children}</div>
  </div>
);

const Line = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div data-step className={className}>
    {children}
  </div>
);

const Phone = ({ children, rough = false }: { children: React.ReactNode; rough?: boolean }) => (
  <div
    data-step
    className={`relative aspect-[9/19.5] w-[42%] max-w-[210px] overflow-hidden rounded-[1.75rem] ${
      rough ? "border-2 border-dashed border-line-strong p-2" : "shadow-[0_24px_50px_-26px_rgb(20_20_20/0.5)]"
    }`}
  >
    {children}
  </div>
);

const StoreLink = ({ label, href }: { label: string; href: string }) => (
  <a
    data-step
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 rounded-2xl border border-line bg-bg px-5 py-4 text-[16px] transition-colors hover:border-fg"
  >
    <span className="status-light" data-status="live" />
    {label}
    <Icon icon={ArrowUpRight01Icon} size={18} className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
);

export const scenes: Scene[] = [
  {
    id: "demo",
    kicker: "01 / The demo",
    title: "It starts in the chat.",
    body: "9 March 2026: Leslie drops a working Trofficient demo into the group.",
    visual: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <div data-step className="flex max-w-[88%] flex-col gap-1">
          <span className="pl-1 text-[12px] font-semibold" style={{ color: crewById.leslie.color }}>
            Leslie
          </span>
          <span className="grid aspect-video w-64 place-items-center rounded-2xl rounded-tl-md bg-ink font-mono text-[11px] tracking-[0.14em] text-paper/60 uppercase">
            trofficient demo
          </span>
        </div>
        <Bubble who="leslie">thanks to selorm and elton</Bubble>
        <div data-step className="typing-dots w-fit rounded-2xl bg-raise px-3 py-2.5 text-[10px] text-muted">
          <span />
          <span />
          <span />
        </div>
      </div>
    ),
  },
  {
    id: "ride",
    kicker: "02 / The first ride",
    title: "Then someone books for real.",
    body: "Two days later Joyce books a seat with real money. The first real Trofficient booking.",
    visual: (
      <div data-step className="w-full max-w-md overflow-hidden rounded-2xl bg-bg shadow-[0_24px_50px_-28px_rgb(20_20_20/0.45)] ring-1 ring-line">
        <div className="flex items-center justify-between px-6 py-4 text-paper" style={{ background: "#2DA873" }}>
          <span className="font-semibold">Trofficient</span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase">Booking confirmed</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4 px-6 pt-6">
          <div>
            <p className="label">From</p>
            <p className="display mt-2 text-4xl">Circle</p>
          </div>
          <span className="pb-2 font-mono text-muted">→</span>
          <div className="text-right">
            <p className="label">To</p>
            <p className="display mt-2 text-4xl">Ashaiman</p>
          </div>
        </div>
        <dl className="mt-6 grid grid-cols-3 border-t border-dashed border-line-strong px-6 py-5 font-mono text-[12px]">
          <div>
            <dt className="text-muted">PASSENGER</dt>
            <dd className="mt-1">JOYCE</dd>
          </div>
          <div>
            <dt className="text-muted">FARE</dt>
            <dd className="mt-1">GH₵15</dd>
          </div>
          <div className="text-right">
            <dt className="text-muted">DATE</dt>
            <dd className="mt-1">11.03.2026</dd>
          </div>
        </dl>
      </div>
    ),
  },
  {
    id: "load",
    kicker: "03 / The load test",
    title: "Everyone hammers it at once.",
    body: "27 March: all four of us load-test it together. Then it goes on Instagram.",
    visual: (
      <ul className="w-full max-w-md divide-y divide-line border-y border-line">
        {crew.map((m) => (
          <li key={m.id} data-step className="flex items-center gap-4 py-4">
            <span className="h-3 w-3 rounded-full" style={{ background: m.color }} />
            <span className="text-[17px]">{m.name}</span>
            <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-amber-text uppercase">
              <span className="status-light blink" data-status="testing" /> Booking
            </span>
          </li>
        ))}
        <li data-step className="flex items-center gap-4 py-4">
          <span className="text-[17px] text-muted">@trofficient on Instagram</span>
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-green-text uppercase">
            <span className="status-light" data-status="live" /> Launched
          </span>
        </li>
      </ul>
    ),
  },
  {
    id: "screens",
    kicker: "04 / The screens",
    title: "Rough, then real.",
    body: "Boxes on a whiteboard, 3D designs in Blender, promo filming in May, and the screens commuters use today.",
    visual: (
      <div className="flex w-full items-center justify-center gap-6">
        <Phone rough>
          <div className="flex h-full flex-col gap-2 p-1">
            <div className="h-6 rounded border border-dashed border-line-strong" />
            <div className="h-20 rounded border border-dashed border-line-strong" />
            <div className="h-4 w-2/3 rounded border border-dashed border-line-strong" />
            <div className="h-4 w-1/2 rounded border border-dashed border-line-strong" />
            <div className="mt-auto h-8 rounded border border-dashed border-line-strong" />
          </div>
        </Phone>
        <span data-step aria-hidden className="font-mono text-2xl text-muted">
          →
        </span>
        <Phone>
          <Image src="/work/trofficient/mobile-1.jpg" alt="Trofficient on a phone" fill sizes="210px" className="object-cover object-top" />
        </Phone>
      </div>
    ),
  },
  {
    id: "metro-mass",
    kicker: "05 / The first room",
    title: "Metro Mass.",
    body: "1 June: Leslie and Elton sit down with Metro Mass directors to talk about Trofficient.",
    visual: <PhotoSlot label="Leslie and Elton at the Metro Mass meeting" className="aspect-[4/3] w-full max-w-lg" />,
  },
  {
    id: "fail",
    kicker: "06 / The fail",
    title: "400.",
    body: "June: Trofficient is running in production, and crashing. Bad request. Good. Now we know what to fix.",
    tone: "fail",
    visual: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <Terminal tone="fail">
          <Line className="text-paper/60">● commuter app · production</Line>
          <Line className="text-orange">✗ crashing</Line>
          <Line className="mt-2 text-paper/40">everything stops.</Line>
        </Terminal>
        <Bubble who="leslie">I OFFICIALLY HATE ARRAYS</Bubble>
      </div>
    ),
  },
  {
    id: "live",
    kicker: "07 / It's live",
    title: "It's live.",
    body: "6 July 2026: the commuter and driver apps land on the App Store.",
    tone: "live",
    visual: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <Bubble who="leslie">Guyssssssssss We live.</Bubble>
        <StoreLink label="Trofficient on the App Store" href="https://apps.apple.com/app/trofficient/id6783739643" />
        <StoreLink label="Trofficient Driver on the App Store" href="https://apps.apple.com/app/trofficient-driver/id6783736766" />
        <StoreLink label="mytrofficient.com" href="https://www.mytrofficient.com" />
      </div>
    ),
  },
  {
    id: "test",
    kicker: "08 / The test",
    title: "Fourteen days.",
    body: "Android is next. Google Play wants real testers for two weeks before anything goes public. So we wait, and fix, and wait.",
    tone: "test",
    visual: (
      <div className="w-full max-w-md rounded-2xl border border-line bg-bg p-7">
        <div data-step className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-amber-text uppercase">
          <span className="status-light blink" data-status="testing" />
          Google Play closed testing
        </div>
        <div data-step className="display mt-6 text-7xl tabular-nums sm:text-8xl">
          Day <span data-count="14">14</span>
          <span className="text-muted"> / 14</span>
        </div>
      </div>
    ),
  },
  {
    id: "ministry",
    kicker: "09 / The next room",
    title: "Then the Ministry.",
    body: "7 October: Joyce and Leslie present Trofficient and Beagine at the Ministry of Transport. A presentation, not a partnership. We're waiting to hear back.",
    visual: (
      <div className="flex w-full max-w-lg flex-col gap-4">
        <PhotoSlot label="Joyce and Leslie at the Ministry of Transport" className="aspect-[16/10] w-full" />
        <p data-step className="w-fit max-w-md rounded-2xl rounded-tl-md bg-raise px-4 py-2.5 font-chat text-[17px] leading-snug">
          We are not pitching random app ideas. We are presenting working products.
        </p>
      </div>
    ),
  },
];
