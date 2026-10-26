import type { CrewId } from "./crew";

// Add a project: copy an entry, give it a unique slug, and fill in what's true.
// Leave a field out (or null) rather than guessing. Anything in `confirm`
// shows up as a "CONFIRM" chip in development and is hidden in production.

export type Lane = "product" | "client" | "game" | "side" | "school" | "partner";
export type Status = "live" | "testing" | "prerelease" | "cooking" | "archived";

export type Project = {
  slug: string;
  name: string;
  /** Up to 14 characters, shown on the split-flap board. */
  board: string;
  lane: Lane;
  status: Status;
  platforms: string[];
  tagline: string;
  problem?: string;
  built?: string[];
  crew?: CrewId[];
  /** A project-specific title, shown instead of their usual role (e.g. founder). */
  credits?: Partial<Record<CrewId, string>>;
  stack?: string[];
  links?: { label: string; href: string }[];
  /** Products only: what this line connects to on the transit map. */
  route?: string;
  /** "Join room" link for games. */
  room?: string;
  bug?: string;
  /** The phone shifts to this colour while the product is on screen. */
  brand?: string;
  /** Phone screenshots in /public, e.g. "/work/trofficient/1.png". */
  screens?: string[];
  /** One desktop screenshot, shown in a browser frame on the project page. */
  desktop?: string;
  /** A tall full-page capture; client cards scroll through it on hover. */
  preview?: string;
  /** The chat message from the day it went live (needs all four to approve). */
  moment?: { when: string; who?: CrewId; text: string };
  /** Dated milestones, oldest first. Real ones only. */
  milestones?: { when: string; text: string }[];
  /** Partner work stays hidden until this is true. */
  showPublicly?: boolean;
  confirm?: string[];
};

export const projects: Project[] = [
  // ── OUR PRODUCTS ────────────────────────────────────────────
  {
    slug: "trofficient",
    name: "Trofficient",
    board: "TROFFICIENT",
    lane: "product",
    status: "testing",
    platforms: ["iOS", "Android", "Web"],
    tagline: "Live ETAs, booking and digital fares for Ghana's tro-tro routes.",
    route: "public transport",
    problem:
      "Ghana's buses and tro-tros run without timetables, so commuters guess at the roadside, seats go unseen and fares change hands in cash. Trofficient doesn't buy buses or replace operators. It makes the network that already exists predictable, payable and measurable.",
    built: [
      "Commuter app: search a destination, compare walking time against the live bus ETA, get a leave-now countdown",
      "Driver app: assigned routes, pickup details, live GPS, trip chat and earnings",
      "Operator dashboard: bookings, demand, routes and live fleet movement",
      "Fares: MTN MoMo, Telecel, AirtelTigo, cards, wallet top-ups and cash",
    ],
    crew: ["leslie", "elton", "efo", "joyce"],
    credits: { leslie: "Founder", elton: "Helped build it", efo: "Helped build it", joyce: "First real booking · the pitch" },
    links: [
      { label: "mytrofficient.com", href: "https://www.mytrofficient.com" },
      { label: "App Store: commuter", href: "https://apps.apple.com/app/trofficient/id6783739643" },
      { label: "App Store: driver", href: "https://apps.apple.com/app/trofficient-driver/id6783736766" },
    ],
    bug: "Running in production and crashing, June 2026. Leslie, in the chat: “I OFFICIALLY HATE ARRAYS.”",
    moment: { when: "06.07.2026", who: "leslie", text: "Guyssssssssss We live." },
    milestones: [
      { when: "09.03.2026", text: "Leslie demos Trofficient to the group." },
      { when: "11.03.2026", text: "Joyce makes the first real booking: Circle to Ashaiman, GH₵15." },
      { when: "27.03.2026", text: "Group load test, then the Instagram launch." },
      { when: "May 2026", text: "3D designs in Blender and promo filming." },
      { when: "26.05.2026", text: "Defended as Leslie's final-year project." },
      { when: "01.06.2026", text: "Leslie and Elton meet Metro Mass directors." },
      { when: "06.07.2026", text: "On the App Store. Google Play closed testing follows." },
      { when: "07.10.2026", text: "Joyce and Leslie take it to the Ministry of Transport. Waiting on a response." },
    ],
    brand: "#2DA873",
    screens: ["/work/trofficient/mobile-1.jpg", "/work/trofficient/mobile-2.jpg", "/work/trofficient/mobile-3.jpg"],
    desktop: "/work/trofficient/desktop.jpg",
    preview: "/work/trofficient/tall.jpg",
    // iOS apps are public; both Google Play listings 404 (closed testing); the service runs a pilot waitlist.
    confirm: ["status: iOS live, Android in closed testing, pilot running", "stack", "quote approval"],
  },
  {
    slug: "beagine",
    name: "Beagine / Beagine Pro",
    board: "BEAGINE",
    lane: "product",
    status: "live",
    platforms: ["iOS", "Web"],
    tagline: "Find, book and track verified engineering professionals.",
    route: "youth employment",
    problem:
      "Finding a plumber, electrician or mason you can trust usually comes down to word of mouth and luck. Beagine lets customers find, book and track verified specialists, and pay only after the job is done. Beagine Pro gives the specialists a profile, a job queue and a way to get discovered.",
    built: [
      "Beagine for customers: say what you need, pick a specialist, they come to you, pay after the job",
      "Beagine Pro for specialists: get discovered, build a profile, manage jobs",
      "Vendor and admin apps, and a marketplace where vendors bring their shop online",
      "Live on the App Store, with an Android waitlist open",
    ],
    crew: ["elton", "leslie", "joyce"],
    credits: { elton: "Co-founder", leslie: "Builds it", joyce: "Weekly community updates" },
    stack: ["Expo", "React Native"],
    links: [
      { label: "beagine.com", href: "https://www.beagine.com" },
      { label: "App Store: Beagine", href: "https://apps.apple.com/gh/app/beagine/id6788364908" },
      { label: "App Store: Beagine Pro", href: "https://apps.apple.com/gh/app/beagine-pro/id6788364574" },
    ],
    moment: { when: "07.07.2026", who: "elton", text: "i wan somersault" },
    milestones: [
      { when: "07.07.2026", text: "The specialist app goes live." },
      { when: "07.10.2026", text: "Pitched at the Ministry of Transport alongside Trofficient." },
      { when: "19.10.2026", text: "Over-the-air update ships." },
    ],
    brand: "#FF5F15",
    screens: ["/work/beagine/mobile-1.jpg", "/work/beagine/mobile-2.jpg", "/work/beagine/mobile-3.jpg"],
    desktop: "/work/beagine/desktop.jpg",
    preview: "/work/beagine/tall.jpg",
    confirm: ["stack", "quote approval"],
  },
  {
    slug: "unicliq",
    name: "UniCliq / Campus Connect",
    board: "UNICLIQ",
    lane: "product",
    status: "prerelease",
    platforms: ["iOS", "Android", "Web"],
    tagline: "Join the Cliq. Stay in the loop. The social hub for university students.",
    route: "campus life",
    problem:
      "Campus life runs on scattered group chats. UniCliq brings it into one place: sign up with your university email and meet people on your course and with your interests. We built the first version in about a week.",
    built: [
      "University-email sign-up, with course and interest matching",
      "Posts, stories and chat",
      "A geofenced campus map",
      "Per-university themes, and dark mode",
      "An admin dashboard with “Ask”: type a question in plain English, get the SQL",
    ],
    crew: ["elton", "leslie", "joyce", "efo"],
    credits: { elton: "Frontend & the logo", leslie: "Backend", joyce: "Messaging" },
    stack: ["Expo", "React Native"],
    links: [{ label: "unicliq-web.vercel.app", href: "https://unicliq-web.vercel.app" }],
    moment: { when: "05.11.2025", who: "elton", text: "We're live." },
    milestones: [
      { when: "15–22.10.2025", text: "Built in about a week, right after deciding to run our projects like a company." },
      { when: "17.10.2025", text: "Naming session. “Join the Cliq. Stay in the Loop.” Elton designs the logo." },
      { when: "05.11.2025", text: "The web app goes live." },
      { when: "Sep 2026", text: "Demoed, then into TestFlight." },
    ],
    brand: "#FF6FB5",
    screens: ["/work/unicliq/mobile-1.jpg"],
    desktop: "/work/unicliq/desktop.jpg",
    confirm: ["Efo's part", "quote approval"],
  },
  {
    slug: "intellexa",
    name: "Intellexa",
    board: "INTELLEXA",
    lane: "product",
    status: "prerelease",
    platforms: ["Web"],
    tagline: "Know what sold, what's low, and what to do next.",
    route: "small businesses",
    problem:
      "Small shops run on notebooks and spreadsheets. Intellexa turns sales, stock, expenses and reports into owner-ready actions: what's moving, what to restock before it runs out, and where money is leaking.",
    built: [
      "Sales, stock and expense insights for shop owners",
      "Restock alerts before stockouts",
      "Lexa, an assistant that keeps users unstuck",
      "A counter workflow built for real shop staff",
    ],
    crew: ["leslie"],
    links: [{ label: "intellexa-sme.vercel.app", href: "https://intellexa-sme.vercel.app" }],
    milestones: [{ when: "Apr 2026", text: "Starts life as AI-SME." }],
    brand: "#0A0A0A",
    screens: ["/work/intellexa/mobile-1.jpg"],
    desktop: "/work/intellexa/desktop.jpg",
    confirm: ["status: pilots?", "stack"],
  },
  {
    slug: "skill-academy",
    name: "Skill Academy",
    board: "SKILL ACADEMY",
    lane: "product",
    status: "live",
    platforms: ["Web"],
    tagline: "Coding, robotics and AI for schools in Accra.",
    route: "schools in Accra",
    problem:
      "Most students learn about technology by watching it. Skill Academy puts robotics, coding, electronics and AI into schools so students build things that actually work. We bring the instructors, programme structure, equipment and project pathway; the school brings the curious students.",
    built: [
      "Three formats: a weekly technology club, a timetabled classroom programme, and workshops + camps",
      "Arduino lessons with a wiring player",
      "The website, with an interactive code lab, a sensor lab and a build-a-robot mini lesson",
      "The merch",
    ],
    crew: ["elton", "joyce", "leslie", "efo"],
    credits: { elton: "Site design & the merch" },
    stack: ["Next.js", "GSAP", "Tailwind CSS", "Arduino"],
    links: [{ label: "skill-academy-lac.vercel.app", href: "https://skill-academy-lac.vercel.app" }],
    milestones: [
      { when: "02.09.2026", text: "The idea: an ICT teacher post turns into “do it for schools”." },
      { when: "30.09.2026", text: "The website goes up." },
      { when: "23.10.2026", text: "First workshop, at De-Masters Academy: JHS 1–3, the internet, AI, websites and robots, on two Arduino kits." },
    ],
    brand: "#2B5CFF",
    screens: ["/work/skill-academy/mobile-1.png", "/work/skill-academy/mobile-2.png", "/work/skill-academy/mobile-3.png"],
    desktop: "/work/skill-academy/desktop.png",
    confirm: ["photos from De-Masters (with permission)"],
  },
  {
    slug: "smart-streetlight",
    name: "Smart Streetlight System",
    board: "STREETLIGHT",
    lane: "product",
    status: "cooking",
    platforms: ["Hardware", "Web"],
    tagline: "IoT streetlight monitoring with fault alerts.",
    route: "cities",
    problem:
      "A broken streetlight usually stays broken until someone complains. Light sensors and a 4G board on each pole report to one dashboard, so faults show up the moment they happen.",
    built: ["Light sensors + an ESP32 4G board on each pole", "A monitoring dashboard with fault alerts", "Simulated end to end in Proteus"],
    crew: ["elton", "leslie", "joyce", "efo"],
    credits: { elton: "Idea & architecture" },
    stack: ["ESP32", "4G", "Proteus"],
    milestones: [{ when: "22.01.2026", text: "Elton pitches it; the group pools money for the hardware." }],
    confirm: ["OK to show the idea?"],
  },
  {
    slug: "stewardly",
    name: "Stewardly",
    board: "STEWARDLY",
    lane: "product",
    status: "live",
    platforms: ["Web"],
    tagline: "Duty rosters for church teams, done right.",
    problem:
      "Church service units still build duty rosters by hand. Stewardly automates the roster, finds replacements, tracks attendance and sends SMS reminders.",
    built: ["Auto scheduling and smart replacements", "Attendance tracking", "SMS reminders", "AI reports, multi-service and multi-unit support"],
    crew: ["leslie"],
    links: [{ label: "wci-scheduler.vercel.app", href: "https://wci-scheduler.vercel.app" }],
    brand: "#1A3C34",
    screens: ["/work/wci-scheduler/mobile-1.jpg"],
    desktop: "/work/wci-scheduler/desktop.jpg",
    confirm: ["it started as WCI Scheduler: keep that name?", "stack"],
  },
  {
    slug: "family-bible",
    name: "Family Bible",
    board: "FAMILY BIBLE",
    lane: "product",
    status: "testing",
    platforms: ["Android", "iOS"],
    tagline: "A Bible app for the family.",
    crew: ["leslie"],
    milestones: [{ when: "Jun 2026", text: "Into Google Play testing and TestFlight." }],
    confirm: ["store links", "stack", "one-line description"],
  },

  // ── GAMES ───────────────────────────────────────────────────
  {
    slug: "fourman",
    name: "Fourman",
    board: "FOURMAN",
    lane: "game",
    status: "live",
    platforms: ["Web"],
    tagline: "Four-player chess. Built overnight.",
    crew: ["leslie"],
    milestones: [{ when: "30.09.2026", text: "Leslie builds it in one night." }],
    confirm: ["room link"],
  },
  {
    slug: "tycoon",
    name: "Tycoon",
    board: "TYCOON",
    lane: "game",
    status: "live",
    platforms: ["Web"],
    tagline: "A multiplayer board game in your browser. Share a room link and play.",
    crew: ["leslie"],
    confirm: ["room link", "status"],
  },
  {
    slug: "tracer",
    name: "Tracer",
    board: "TRACER",
    lane: "game",
    status: "live",
    platforms: ["Web"],
    tagline: "The town game.",
    crew: ["elton"],
    confirm: ["room link", "one-line description"],
  },

  // ── SIDE PROJECTS ───────────────────────────────────────────
  {
    slug: "pilot-reflex",
    name: "Pilot Reflex",
    board: "PILOT REFLEX",
    lane: "side",
    status: "live",
    platforms: ["Web"],
    tagline: "Three aviation-inspired challenges for reaction, signals and focus. Built by a trainee pilot.",
    crew: ["joyce"],
    links: [{ label: "pilotreflex.joyceelli.com", href: "https://pilotreflex.joyceelli.com" }],
    screens: ["/work/pilot-reflex/mobile-1.jpg"],
    desktop: "/work/pilot-reflex/desktop.jpg",
  },
  {
    slug: "airplane-visualizer",
    name: "Airplane Visualizer",
    board: "AIRPLANE VIZ",
    lane: "side",
    status: "archived",
    platforms: ["Web"],
    tagline: "An aircraft visualizer, built for fun.",
    crew: ["elton"],
    confirm: ["link", "status", "one-line description"],
  },

  // ── SCHOOL PROJECTS ─────────────────────────────────────────
  {
    slug: "hirely",
    name: "Hirely",
    board: "HIRELY",
    lane: "school",
    status: "archived",
    platforms: ["Web"],
    tagline: "The first build: a talent-hiring platform with a résumé parser and applicant tracking.",
    problem:
      "A semester database project that got out of hand in the best way: companies post roles, candidates apply, and the platform reads their résumés and tracks every applicant.",
    built: ["Job posts and applications", "A résumé parser", "An applicant tracking system"],
    crew: ["joyce", "leslie", "elton", "efo"],
    stack: ["PHP", "MySQL"],
    moment: { when: "12.06.2025", who: "joyce", text: "Project success ✅ Close project." },
    milestones: [
      { when: "May–Jun 2025", text: "Built for the semester database project." },
      { when: "12.06.2025", text: "Presented, in official outfits. Waakye followed." },
    ],
    confirm: ["quote approval"],
  },
  {
    slug: "sgms",
    name: "SGMS",
    board: "SGMS",
    lane: "school",
    status: "archived",
    platforms: ["Web"],
    tagline: "Student Grievance Management System. Elton's final-year project.",
    crew: ["elton"],
    milestones: [{ when: "26.05.2026", text: "Defended." }],
    confirm: ["stack", "one-line description"],
  },
  {
    slug: "towme",
    name: "TowMe",
    board: "TOWME",
    lane: "school",
    status: "archived",
    platforms: ["Mobile"],
    tagline: "Find a tow when you need one. Joyce's final-year project, with project partner Enoch.",
    crew: ["joyce"],
    milestones: [{ when: "26.05.2026", text: "Defended." }],
    confirm: ["platforms", "stack"],
  },

  // ── CLIENT BUILDS ───────────────────────────────────────────
  {
    slug: "sellis-beauty-spa",
    name: "Sellis Beauty Spa",
    board: "SELLIS SPA",
    lane: "client",
    status: "live",
    platforms: ["Web"],
    tagline: "Our first paid job: luxury beauty, hair, spa, nails, waxing and lashes in Accra, booked online.",
    built: [
      "The full service menu with prices: hair, facials, spa and massage, nails, waxing, lashes and brows",
      "Online appointment booking",
      "A CMS so the spa runs its own content",
    ],
    crew: ["joyce", "leslie", "elton", "efo"],
    credits: {
      joyce: "Landed the client · frontend",
      leslie: "Backend & CMS",
      elton: "Project owner & integration",
      efo: "Project management",
    },
    stack: ["CMS", "Railway"],
    links: [{ label: "sellisspa.com", href: "https://www.sellisspa.com" }],
    moment: { when: "14.05.2026", text: "She has placed the link in the bio." },
    milestones: [
      { when: "30.03.2026", text: "Joyce lands it: 400's first paid client." },
      { when: "07.05.2026", text: "sellisspa.com goes live." },
      { when: "14.05.2026", text: "The client is using it, link in her bio." },
    ],
    brand: "#A8865A",
    screens: ["/work/sellis-beauty-spa/mobile-1.jpg"],
    desktop: "/work/sellis-beauty-spa/desktop.jpg",
    preview: "/work/sellis-beauty-spa/tall.jpg",
    confirm: ["quote approval"],
  },
  {
    slug: "sabary-tours",
    name: "Sabary Tours",
    board: "SABARY TOURS",
    lane: "client",
    status: "live",
    platforms: ["Web"],
    tagline: "Tours, packages and custom trips across Ghana, booked online.",
    built: [
      "A full rebuild with a CMS",
      "Tour and package booking with customer accounts",
      "A custom trip planner",
      "Prices in cedis with a currency switcher, plus translation",
    ],
    crew: ["elton"],
    credits: { elton: "The rebuild" },
    stack: ["Supabase", "CMS"],
    links: [{ label: "sabarytours.com", href: "https://www.sabarytours.com" }],
    milestones: [{ when: "Feb 2026", text: "Version 2: rebuilt on Supabase with a CMS." }],
    brand: "#FF5E00",
    screens: ["/work/sabary-tours/mobile-1.jpg"],
    desktop: "/work/sabary-tours/desktop.jpg",
    preview: "/work/sabary-tours/tall.jpg",
  },
  {
    slug: "nesisoft",
    name: "Nesisoft",
    board: "NESISOFT",
    lane: "client",
    status: "live",
    platforms: ["Web"],
    tagline: "The website for a software studio building web, mobile, desktop and IoT products for Africa.",
    crew: ["leslie", "elton"],
    credits: { leslie: "Built it", elton: "Review" },
    links: [{ label: "nesisoft.com", href: "https://nesisoft.com" }],
    screens: ["/work/nesisoft/mobile-1.jpg"],
    desktop: "/work/nesisoft/desktop.jpg",
    preview: "/work/nesisoft/tall.jpg",
  },
  {
    slug: "rent-a-roof",
    name: "Rent-a-Roof",
    board: "RENT-A-ROOF",
    lane: "client",
    status: "live",
    platforms: ["Web"],
    tagline: "Website for Rent-a-Roof.",
    crew: ["elton"],
    milestones: [{ when: "24.03.2026", text: "Deployed." }],
    confirm: ["live URL", "one-line description"],
  },
  {
    slug: "hostel-management",
    name: "Hostel management system",
    board: "HOSTEL SYSTEM",
    lane: "client",
    status: "live",
    platforms: ["Web"],
    tagline: "A hostel management system for a client.",
    crew: ["leslie"],
    milestones: [{ when: "Dec 2025", text: "Built for a client." }],
    confirm: ["OK to show?", "status", "one-line description"],
  },

  // ── WORK WITH PARTNERS (hidden until permission is confirmed) ──
  ...(
    [
      ["goride", "GoRide", "GORIDE"],
      ["godriver", "GoDriver", "GODRIVER"],
      ["tapngo", "TapnGo", "TAPNGO"],
      ["vip-bus", "VIP Bus Ticketing", "VIP BUS"],
      ["eazyed", "EazyEd", "EAZYED"],
    ] as const
  ).map(
    ([slug, name, board]): Project => ({
      slug,
      name,
      board,
      lane: "partner",
      status: "live",
      platforms: [],
      tagline: "Via Global Icons / Transport for Ghana.",
      crew: ["joyce", "leslie", "elton", "efo"],
      showPublicly: false,
      confirm: ["permission to show", "what we did", "status"],
    }),
  ),
];

export const visibleProjects = projects.filter((p) => p.lane !== "partner" || p.showPublicly);

export const getProject = (slug: string) => visibleProjects.find((p) => p.slug === slug);

export const laneLabel: Record<Lane, string> = {
  product: "PRODUCT",
  client: "CLIENT",
  game: "GAME",
  side: "SIDE",
  school: "SCHOOL",
  partner: "PARTNER",
};

export const statusLabel: Record<Status, string> = {
  live: "LIVE",
  testing: "IN TESTING",
  prerelease: "PRE-RELEASE",
  cooking: "STILL COOKING",
  archived: "COMPLETED",
};
