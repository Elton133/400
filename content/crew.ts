// The crew. Sources: the brief and 400-overview.md (built from the group chat).
// 400 has no leader: roles rotate per project, so `role` is what someone
// usually picks up, never a rank. Every chat quote needs all four to approve
// before launch; anything in `confirm` shows as a chip in development only.

export type CrewId = "joyce" | "leslie" | "elton" | "efo";

export type Quote = { text: string; when?: string };

export type CrewMember = {
  id: CrewId;
  name: string;
  nickname: string | null;
  /** The fun headline on their own page. */
  title: string;
  /** What the rest of the chat calls them. */
  calledBy: string[];
  /** What this person usually picks up. Not a rank. */
  role: string;
  owns: string[];
  stack: string[];
  skills: string[];
  passions: string[];
  funFacts: string[];
  mottos: string[];
  quotes: Quote[];
  favouriteError: string | null;
  team: "turkey" | "chicken" | null;
  emoji: string | null;
  /** One line from the chat for the crew card. */
  line: string | null;
  links: { label: string; href: string }[];
  /** Professional bio, used on /crew. */
  bio: string;
  /** Photos in /public, e.g. "/crew/joyce/1.jpg". Empty slots show until they exist. */
  photos: string[];
  /** Personal colour. Used only where the person is: names, avatars, stops, their 100. */
  color: string;
  /** Optional second colour (a highlight that pairs with `color`). */
  accent?: string;
  confirm: string[];
};

export const crew: CrewMember[] = [
  {
    id: "joyce",
    name: "Joyce",
    nickname: "Mama J",
    title: "Chief Executive Fanfooler",
    calledBy: ["Mama J", "Your Highness", "Her Majesty", "Hype queen", "C.E.F."],
    role: "Partnerships, clients, pitches & frontend",
    owns: ["Partnerships", "Landing clients", "Pitches", "The group fund"],
    stack: ["UI", "Frontend", "Backend when it's needed"],
    skills: ["Partnerships", "Pitching", "Client relationships", "UI design", "Frontend", "Planning", "Community updates"],
    passions: ["Flying (trainee pilot)", "Man United", "Messi", "Hyping everyone up"],
    funFacts: [
      "Landed 400's first paid client: Sellis Beauty Spa.",
      "Always opens the presentation.",
      "Wrote the game plan for the Ministry of Transport visit.",
      "Made Trofficient's first real booking: Circle to Ashaiman, GH₵15.",
      "Training to be a pilot, and built Pilot Reflex to test how fast you react.",
      "Writes Beagine's weekly community updates.",
      "Created the group chat in the first place.",
    ],
    mottos: [],
    quotes: [{ text: "Project success ✅ Close project.", when: "12.06.2025, after presenting Hirely" }],
    favouriteError: null,
    team: null,
    emoji: null,
    line: "Project success ✅ Close project.",
    links: [
      { label: "joyceelli.com", href: "https://www.joyceelli.com" },
      { label: "Pilot Reflex", href: "https://pilotreflex.joyceelli.com" },
    ],
    bio: "Joyce works the outside of the product: partnerships, clients and pitches. She landed 400's first paid client, wrote the game plan for the Ministry of Transport visit and always opens the presentation. On the inside she does UI and frontend, and backend when a sprint needs it.",
    photos: [],
    color: "#141414", // CONFIRM: Joyce's colour is coming. Neutral until then.
    confirm: ["role wording", "nickname public?", "photos", "quote approval", "turkey or chicken", "colour"],
  },
  {
    id: "leslie",
    name: "Leslie",
    nickname: "Leslie Paul",
    title: "God of backend",
    calledBy: ["God of backend", "Ares", "Leslie Paul"],
    role: "Full-stack, DevOps & releases",
    owns: ["Deploys", "Play Store & TestFlight releases", "Trofficient (founder)"],
    stack: ["Full-stack", "DevOps", "CI / releases"],
    skills: ["Full-stack", "Backend & APIs", "DevOps", "App Store & Play releases", "CMS builds", "Rebases"],
    passions: ["Black-and-white, edgy design", "Bebas Neue + Barlow", "Theatrical speeches", "Building games overnight"],
    funFacts: [
      "Founded Trofficient and got it onto the App Store.",
      "Built Fourman, a four-player chess game, overnight.",
      "Met Metro Mass directors about Trofficient, with Elton.",
      "Took Trofficient and Beagine into the Ministry of Transport, with Joyce.",
      "Adopted a stray cat.",
      "Said “I say we run these projects as a company” and meant it.",
    ],
    mottos: ["Forgiveness over permission.", "Tiny commits."],
    quotes: [
      { text: "I say we run these projects as a company.", when: "14.10.2025, the turning point" },
      { text: "this friend group is top-tier and still in active development.", when: "25.12.2025" },
      { text: "I OFFICIALLY HATE ARRAYS", when: "June 2026, Trofficient in production" },
      { text: "Guyssssssssss We live.", when: "06.07.2026, Trofficient hits the App Store" },
      { text: "I smell a rebase." },
    ],
    favouriteError: null,
    team: null,
    emoji: null,
    line: "I smell a rebase.",
    links: [{ label: "lesliepaul.me", href: "https://lesliepaul.me" }],
    bio: "Leslie deploys everything. Founder of Trofficient, full-stack and DevOps, and the one who gets builds through the Play Store and TestFlight. Two mottos: forgiveness over permission, and tiny commits.",
    photos: [],
    color: "#34BB78",
    confirm: ["role wording", "photos", "quote approval", "turkey or chicken"],
  },
  {
    id: "elton",
    name: "Elton",
    nickname: "Nii Marmah",
    title: "Code God",
    calledBy: ["Code God", "Senior Front End Dev", "God of front end and designer", "Papa Elton", "Superman"],
    role: "Frontend, product & system design",
    owns: ["Interfaces", "Mobile apps", "Design reviews", "Beagine (co-founder)"],
    stack: ["Expo", "React Native", "Frontend", "Product design"],
    skills: ["Frontend", "UI & product design", "System design", "Mobile (Expo)", "Code review", "Mentoring", "Logo design"],
    passions: ["Trumpet", "Saxophone", "Chelsea", "Preaching at church youth meetings", "Logos and merch"],
    funFacts: [
      "Co-founded Beagine.",
      "Designed the UniCliq and 400 logos, and Skill Academy's merch.",
      "Mentored at the DesignPxd AI & Design vibe-coding hackathon.",
      "Plays trumpet and sax.",
      "Registered the whole group for DevFest Accra 2025.",
      "Bought the group a Spring Boot course.",
      "Pitched the Smart Streetlight system and built an airplane visualizer for fun.",
    ],
    mottos: [],
    quotes: [
      { text: "We're live.", when: "05.11.2025, UniCliq on the web" },
      { text: "i wan somersault", when: "07.07.2026, Beagine's specialist app goes live" },
      { text: "Sleep was just a rumor to us." },
      { text: "y'all are the GOAT's… I have good friends, I'm proud" },
    ],
    favouriteError: null,
    team: null,
    emoji: null,
    line: "Sleep was just a rumor to us.",
    links: [{ label: "Portfolio", href: "https://bio-ten-nu.vercel.app" }],
    bio: "Elton designs and builds the parts people touch: frontend, product and system design, mostly in Expo and React Native. Co-founder of Beagine, designer of the UniCliq and 400 logos, and a mentor at the DesignPxd vibe-coding hackathon.",
    photos: [],
    color: "#2F54FF", // CONFIRM: exact blue
    accent: "#CBFF36",
    confirm: ["role wording", "nickname public?", "photos", "quote approval", "turkey or chicken"],
  },
  {
    id: "efo",
    name: "Efo",
    nickname: "Selorm",
    title: "The Referee",
    calledBy: ["Daddy Selorm", "Prince", "Reading in the shadows"],
    role: "Database, QA & client delivery",
    owns: ["Data models", "QA & bug-finding", "Keeping client work on track", "Hardware fixes"],
    stack: ["Databases", "Backend", "QA", "Hardware"],
    skills: ["Databases", "QA", "Bug-finding", "Project management", "Hardware"],
    passions: ["Food (always asking about food)", "Refereeing the chat", "Comic relief"],
    funFacts: [
      "Coined the house motto: ELK. Execute, Learn and Keep growing.",
      "The group's comic relief, and its referee.",
      "Always the one asking about food.",
      "Project-managed Sellis, 400's first paid job.",
      "QA and bug-finding on everything.",
      "Reads the whole chat in the shadows.",
    ],
    mottos: ["ELK: Execute, Learn and Keep growing."],
    quotes: [
      {
        text: "400 is a growing group with exceedingly great potentials… more are still being cooked.",
        when: "23.10.2026",
      },
    ],
    favouriteError: null,
    team: null,
    emoji: null,
    line: "More are still being cooked.",
    links: [],
    bio: "Efo (Selorm to the chat) runs the database side, QA and bug-finding, and keeps client work on track. Efo also coined the house motto: ELK. Execute, Learn and Keep growing.",
    photos: [],
    color: "#E5383B", // CONFIRM: exact red
    confirm: ["role wording", "photos", "portfolio link", "quote approval", "turkey or chicken"],
  },
];

/** Text colour that reads on top of a person's colour (their accent if they have one). */
export function onColor(m: CrewMember) {
  if (m.accent) return m.accent;
  const n = parseInt(m.color.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.55 ? "#141414" : "#F4F2EE";
}

/** Inline CSS vars for anything that takes on a person's colour: --p, --p-on, --p-accent. */
export const personVars = (m: CrewMember) =>
  ({ "--p": m.color, "--p-on": onColor(m), "--p-accent": m.accent ?? "transparent" }) as React.CSSProperties;

export const crewById = Object.fromEntries(crew.map((m) => [m.id, m])) as Record<CrewId, CrewMember>;
