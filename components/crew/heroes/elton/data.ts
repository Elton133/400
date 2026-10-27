import type { CrewId } from "@/content/crew";

// Everything on Elton's canvas. All of it comes from 400-overview.md.

export const NICKNAMES = ["Code God", "Senior Front End Dev", "God of front end and designer", "Papa Elton", "Superman", "Nii Marmah"];

export type StickerKind = "pill" | "note" | "badge" | "logo400" | "unicliq" | "beagine" | "bubble";

export type Sticker = {
  id: string;
  /** Name in the layers panel and in Dev mode. */
  layer: string;
  kind: StickerKind;
  text: string;
  sub?: string;
  icon?: "trumpet" | "sax";
  /** Centre position, as a percentage of the canvas. */
  x: number;
  y: number;
  tilt?: number;
};

export const STICKERS: Sticker[] = [
  { id: "note", layer: "StickyNote", kind: "note", text: "Sleep was just a rumor to us.", x: 24, y: 22, tilt: -4 },
  { id: "somersault", layer: "ChatBubble", kind: "bubble", text: "i wan somersault", sub: "07.07.26 · Beagine Pro goes live", x: 52, y: 12 },
  { id: "trumpet", layer: "Trumpet", kind: "pill", text: "Trumpet", icon: "trumpet", x: 82, y: 22, tilt: 3 },
  { id: "sax", layer: "Saxophone", kind: "pill", text: "Saxophone", icon: "sax", x: 80, y: 40, tilt: -2 },
  { id: "chelsea", layer: "Chelsea", kind: "badge", text: "Chelsea", sub: "the club", x: 76, y: 66 },
  { id: "beagine", layer: "Beagine", kind: "beagine", text: "Beagine", sub: "co-founder", x: 16, y: 82, tilt: 2 },
  { id: "unicliq", layer: "UniCliqLogo", kind: "unicliq", text: "uniCLIQ", sub: "logo · 17.10.25", x: 52, y: 86, tilt: -3 },
  { id: "logo400", layer: "Logo400", kind: "logo400", text: "400", sub: "logo · 05.05.26", x: 88, y: 84, tilt: 4 },
];

/** The rest of the crew, live in the file, each with one of their real lines. */
export const COLLABORATORS: { id: CrewId; line: string; path: string }[] = [
  { id: "leslie", line: "I smell a rebase.", path: "wander-a 17s" },
  { id: "efo", line: "more are still being cooked", path: "wander-b 21s" },
  { id: "joyce", line: "Project success ✅ Close project.", path: "wander-c 19s" },
];

/** Present mode: his work, as a little prototype. */
export const SLIDES: { title: string; caption: string; src: string; href: string }[] = [
  { title: "Beagine", caption: "Co-founder. On the App Store.", src: "/work/beagine/mobile-1.jpg", href: "/work/beagine" },
  { title: "UniCliq", caption: "Frontend and the logo. Built in a week.", src: "/work/unicliq/mobile-1.jpg", href: "/work/unicliq" },
  { title: "Skill Academy", caption: "The site, and the merch.", src: "/work/skill-academy/mobile-1.png", href: "/work/skill-academy" },
  { title: "Sabary Tours", caption: "The v2 rebuild.", src: "/work/sabary-tours/mobile-1.jpg", href: "/work/sabary-tours" },
];

/** Version history: real milestones, oldest first. */
export const HISTORY: { v: string; when: string; what: string }[] = [
  { v: "v1", when: "05.09.25", what: "Renamed the group “400”" },
  { v: "v2", when: "17.10.25", what: "Designed the UniCliq logo" },
  { v: "v3", when: "05.11.25", what: "“We're live.” UniCliq on the web" },
  { v: "v4", when: "07.11.25", what: "Mentor at DesignPxd" },
  { v: "v5", when: "05.05.26", what: "Designed the 400 logo" },
  { v: "v6", when: "07.07.26", what: "Beagine Pro live: “i wan somersault”" },
];
