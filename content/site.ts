// Site-wide copy and facts. Nothing here should be invented: if it isn't
// known yet, leave it null and the UI will skip it.

export const contact = {
  // CONFIRM: the real inbox before launch.
  email: "hello@example.com",
  // CONFIRM: WhatsApp business number, digits only with country code (e.g. "233…").
  whatsapp: null as string | null,
  // CONFIRM: how fast a human replies.
  replyWithin: "a few days",
};

/**
 * Opening thread: real lines from the chat (400-overview.md), with the real
 * sender where we know it (crew order: 0 Joyce, 1 Leslie, 2 Elton, 3 Efo).
 * `from` left out = sender unknown, shown without a name. Times only where
 * we know them; the date separators carry the rest. All four approve before launch.
 */
export type IntroItem =
  | { kind: "date"; text: string }
  | { kind: "msg"; from?: 0 | 1 | 2 | 3; text: string; at?: string }
  | { kind: "sticker"; from?: 0 | 1 | 2 | 3; at?: string }
  | { kind: "rename"; from: 0 | 1 | 2 | 3; to: string };

export const introThread: IntroItem[] = [
  { kind: "date", text: "23 April 2025" },
  { kind: "msg", from: 0, text: "Good afternoon guys, this group is for the semester project", at: "14:54" },
  { kind: "sticker", from: 1, at: "14:55" },
  { kind: "date", text: "12 June 2025" },
  { kind: "msg", from: 0, text: "Project success ✅ Close project." },
  { kind: "date", text: "5 September 2025" },
  { kind: "rename", from: 2, to: "400" },
  { kind: "date", text: "14 October 2025" },
  { kind: "msg", from: 1, text: "I say we run these projects as a company." },
  { kind: "date", text: "5 November 2025" },
  { kind: "msg", from: 2, text: "We're live." },
  { kind: "date", text: "6 July 2026" },
  { kind: "msg", from: 1, text: "Guyssssssssss We live." },
  { kind: "date", text: "7 July 2026" },
  { kind: "msg", from: 2, text: "i wan somersault" },
  { kind: "date", text: "23 October 2026" },
  { kind: "msg", from: 3, text: "more are still being cooked" },
];

/** Hero background feed: real moments from the work. */
export const activity = [
  "live · trofficient on the App Store",
  "in testing · trofficient android (14-day closed test)",
  "ota update · beagine",
  "live · beagine specialist app",
  "testflight · campus connect",
  "deployed · skill-academy",
  "first workshop · skill academy @ de-masters",
  "built overnight · fourman",
  "live · sellisspa.com",
  "first booking · trofficient (circle → ashaiman)",
];

/** Counted from the group chat. Re-run right before launch; all four approve. */
export const chatStats: { value: number; label: string }[] = [
  { value: 24741, label: "messages since April 2025" },
  { value: 1575, label: "stickers instead of words" },
  { value: 368, label: "voice notes" },
  { value: 46, label: "Google Meet links" },
  { value: 1366, label: "messages sent between midnight and 5am" },
  { value: 317, label: "times someone said “chale”" },
  { value: 1, label: "group chat" },
  { value: 4, label: "people" },
];

export type TimelineItem = { when: string; title: string; body: string; status?: "live" | "testing" | "cooking"; quote?: string };

/** The real arc, from the chat. Nothing from the overview's "keep off" list. */
export const timeline: { year: string; items: TimelineItem[] }[] = [
  {
    year: "2025",
    items: [
      { when: "23 Apr", title: "“Database 2” is created", body: "Joyce starts a group chat for a semester database project. Four people, one brief." },
      { when: "May–Jun", title: "Hirely, the first build", body: "A talent-hiring platform with a résumé parser and applicant tracking, in PHP and MySQL." },
      { when: "12 Jun", title: "Hirely is presented", body: "In official outfits. Waakye followed.", quote: "Project success ✅ Close project." },
      { when: "5 Sep", title: "Renamed 400", body: "Elton renames the group in the first week of final year. 100 each, four of us." },
      { when: "Sep", title: "DevFest Accra 2025", body: "Elton registers everyone." },
      { when: "14 Oct", title: "The turning point", body: "Talking about projects isn't enough any more.", quote: "I say we run these projects as a company." },
      { when: "15–22 Oct", title: "UniCliq, built in a week", body: "A campus social app, from naming session to working build in about seven days." },
      { when: "5 Nov", title: "UniCliq goes live on the web", body: "unicliq-web.vercel.app.", quote: "We're live.", status: "live" },
      { when: "7 Nov", title: "Mentors at DesignPxd", body: "Elton and Leslie mentor at the DesignPxd AI & Design vibe-coding hackathon." },
      { when: "26–27 Nov", title: "Expo Meetup 2.0", body: "With the Expo Ghana community." },
      { when: "25 Dec", title: "Still in active development", body: "End of the first year.", quote: "this friend group is top-tier and still in active development." },
    ],
  },
  {
    year: "2026",
    items: [
      { when: "22 Jan", title: "Smart streetlights", body: "Elton pitches an IoT streetlight system. The group pools money for the hardware and simulates it.", status: "cooking" },
      { when: "Feb", title: "Sabary Tours v2", body: "A full rebuild on Supabase with a CMS." },
      { when: "9–11 Mar", title: "Trofficient, for real", body: "Leslie demos it. Two days later Joyce books a real ride: Circle to Ashaiman, GH₵15." },
      { when: "30 Mar", title: "The first paid client", body: "Joyce lands Sellis Beauty Spa." },
      { when: "5 May", title: "The 400 logo", body: "Elton designs an interwoven 400. Four lines for four members, and quadringenti (400 in Latin) as a quiet line of text." },
      { when: "7 May", title: "sellisspa.com goes live", body: "A week later the client has the link in her bio.", status: "live" },
      { when: "26 May", title: "Final-year defences", body: "SGMS, TowMe and Trofficient, among others." },
      { when: "1 Jun", title: "Metro Mass", body: "Leslie and Elton meet Metro Mass directors about Trofficient." },
      { when: "27 Jun", title: "Graduation", body: "Regional Maritime University, IT." },
      { when: "6 Jul", title: "Trofficient on the App Store", body: "Commuter and driver apps. Google Play closed testing follows.", quote: "Guyssssssssss We live.", status: "live" },
      { when: "7 Jul", title: "Beagine's specialist app goes live", body: "On the App Store.", quote: "i wan somersault", status: "live" },
      { when: "Sep", title: "Campus Connect into TestFlight", body: "Demoed, then shipped to testers.", status: "testing" },
      { when: "30 Sep", title: "Skill Academy, and a chess game overnight", body: "The Skill Academy site goes up. Leslie builds Fourman, four-player chess, in one night." },
      { when: "7 Oct", title: "The Ministry of Transport", body: "Joyce and Leslie present Trofficient and Beagine. Waiting to hear back.", quote: "We are not pitching random app ideas. We are presenting working products.", status: "testing" },
      { when: "23 Oct", title: "Skill Academy's first workshop", body: "De-Masters Academy, JHS 1–3: the internet, AI, websites and robots, on two Arduino kits.", status: "live" },
    ],
  },
];

/** Proof points for the track-record page. Dated, checkable, nothing inflated. */
export const proof: { when: string; title: string; body: string; href?: string }[] = [
  { when: "30.03.2026", title: "First paid client", body: "Sellis Beauty Spa. Live since 7 May 2026 and in use by the client.", href: "/work/sellis-beauty-spa" },
  { when: "06.07.2026", title: "Trofficient on the App Store", body: "Commuter and driver apps. Android in Google Play closed testing.", href: "/work/trofficient" },
  { when: "07.07.2026", title: "Beagine on the App Store", body: "Beagine for customers and Beagine Pro for specialists.", href: "/work/beagine" },
  { when: "01.06.2026", title: "Metro Mass", body: "Met Metro Mass directors about Trofficient." },
  { when: "07.10.2026", title: "Ministry of Transport", body: "Presented Trofficient and Beagine. A presentation, not a partnership; we're waiting on a response." },
  { when: "23.10.2026", title: "First school workshop", body: "Skill Academy at De-Masters Academy, JHS 1–3.", href: "/work/skill-academy" },
  { when: "07.11.2025", title: "Hackathon mentors", body: "Elton and Leslie mentored at the DesignPxd AI & Design vibe-coding hackathon." },
  { when: "05.11.2025", title: "UniCliq live on the web", body: "Built in about a week.", href: "/work/unicliq" },
];

/** Where you'll find us. Rooms, not trophies. */
export const events: { name: string; note: string; when?: string }[] = [
  { name: "DevFest Accra 2025", note: "All four, registered by Elton", when: "2025" },
  { name: "DesignPxd AI & Design Vibe-Coding Hackathon", note: "Elton and Leslie as mentors", when: "07.11.2025" },
  { name: "Expo Meetup 2.0", note: "Expo Ghana community", when: "26–27.11.2025" },
  { name: "AI for Good Hackathon", note: "Google Accra" },
  { name: "Hack54", note: "Hackathon" },
  { name: "Digital Assets Summit Africa", note: "2026", when: "2026" },
  { name: "ALX hub", note: "Coworking" },
  { name: "A data-centre field trip", note: "Seeing where the servers actually live" },
];

/** The fun half, for /story. From the chat; nothing from the keep-off list. */
export const culture = {
  language: ["Chale", "Ei", "Herh", "Abeg", "You barb", "Fanfooling", "Sharp", "TGBTG", "Na God run am", "Ghana man time"],
  rituals: [
    "Late-night Google Meet revision",
    "Pinned plans",
    "Wednesday Beagine updates",
    "The 100-word apology letter rule",
    "Sunday “what I learnt in church” posts",
  ],
  food: ["Waakye: 8 sausage, 2 egg, 1 garri", "Jollof", "Banku", "Bofrot", "Turkey or chicken?", "A group fund for eat-outs"],
  football: "Chelsea (Elton) vs Man United and Messi (Joyce), with Barça haters on the side. Then the 2026 World Cup took over the chat.",
  bits: [
    "The King James roleplay: “ALL HAIL THE QUEEN”",
    "“Elton et al., 2025” citations",
    "The stray cat Leslie adopted",
    "Coke vs Fanta",
    "“Equity is temporary… delusion is free”",
    "“Claude in the blood”",
  ],
};

/** Teasers for STILL COOKING. Only what the crew is comfortable showing. */
export const cooking = [
  { hint: "SMART STREETLIGHTS", stack: "ESP32 · 4G", where: "CITIES", when: "PROTOTYPE" },
  { hint: "DEMO DAYS", stack: "Arduino · Skill Academy", where: "SCHOOLS", when: "2026" },
  // CONFIRM: OK to tease this one?
  { hint: "████ ███ API", stack: "████", where: "██████", when: "SOON" },
];
