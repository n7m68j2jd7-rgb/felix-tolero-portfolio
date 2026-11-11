/* All site content lives here. Edit this file to update the portfolio. */
import { cases } from "./cases";

export const profile = {
  fullName: "Felix Mari Tolero",
  shortName: "Felix",
  duty: "Graphic Designer & Video Editor",
  bio: "Design, video and podcast production for brands that publish often.",
  location: "Cebu City, PH · Remote",
  /* split on purpose – see hooks/useEmail.ts */
  emailUser: "felixmaritolero",
  emailDomain: "gmail.com",
  phone: "+639164455024",
  phoneLabel: "0916 445 5024",
  portrait: "/felix/felix-tolero.webp",
  rotatingNames: ["Felix", "Designer", "Editor"],
};

export type Category = "Podcast & Video" | "Thumbnails" | "Social" | "Decks" | "Web & UI";
export const categories: Category[] = ["Podcast & Video", "Thumbnails", "Social", "Decks", "Web & UI"];

export type Item = { src: string; cap: string; href?: string; video?: boolean };

export type Project = {
  id: string;
  title: string;
  client: string;
  category: Category;
  year: string;
  /** cover aspect ratio, CSS value */
  ratio: string;
  /** span both grid columns on desktop */
  wide?: boolean;
  /** "thumbs": every thumbnail visible as a static image grid. "reels": vertical videos side by side. */
  layout?: "thumbs" | "reels";
  /** card links to a landing page instead of opening the gallery */
  page?: string;
  items: Item[];
};

const w = (folder: string, file: string) => `/felix/work/${folder}/${file}.webp`;

const allProjects: Project[] = [
  {
    id: "podcast",
    title: "YouTube Thumbnails",
    client: "7 shows",
    category: "Thumbnails",
    year: "2023–26",
    ratio: "16 / 9",
    wide: true,
    layout: "thumbs",
    items: [
      { src: w("podcast", "impact-society-ep5"), cap: "Impact Society · Ep. 5" },
      { src: w("podcast", "wealth-district-ep4"), cap: "The Wealth District · Ep. 4" },
      { src: w("podcast", "gentlemans-playbook-ep6"), cap: "The Gentleman’s Playbook · Ep. 6" },
      { src: w("podcast", "dream-motivates-rod-warner"), cap: "Dream Motivates · Rod Warner" },
      { src: w("podcast", "impact-society-ep8"), cap: "Impact Society · Ep. 7" },
      { src: w("podcast", "pretty-powerful-ep10"), cap: "Pretty Powerful · Ep. 10" },
      { src: w("podcast", "pretty-powerful-ep11"), cap: "Pretty Powerful · Ep. 11" },
    ],
  },
  ...cases.map(
    (c): Project => ({
      id: c.slug,
      title: c.title,
      client: c.client,
      category: "Podcast & Video",
      year: c.year,
      ratio: "16 / 9",
      page: `/work/${c.slug}`,
      items: c.episodes.map((e) => ({ src: e.thumb, cap: e.title })),
    }),
  ),
  {
    id: "reels",
    title: "Short-form Reels",
    client: "Social video",
    category: "Podcast & Video",
    year: "2026",
    ratio: "9 / 16",
    wide: true,
    layout: "reels",
    items: [1, 2, 3].map((n) => ({
      src: `/felix/work/reels/reel-0${n}.mp4`,
      cap: `Reel 0${n}`,
      video: true,
    })),
  },
  {
    id: "deck",
    title: "Brand Acceleration Deck",
    client: "Johnny Wimbrey",
    category: "Decks",
    year: "2025",
    ratio: "16 / 9",
    wide: true,
    items: Array.from({ length: 25 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      return { src: w("deck", `slide-${n}`), cap: `Slide ${n} / 25` };
    }),
  },
  {
    id: "rodwarner",
    title: "Author Campaign",
    client: "Rod Warner",
    category: "Social",
    year: "2025",
    ratio: "1 / 1",
    items: [
      { src: w("rodwarner", "rw-01-real-people-real-stories"), cap: "Real People, Real Stories" },
      { src: w("rodwarner", "rw-06-se7en-ss"), cap: "The Se7en S’s · book promo" },
      { src: w("rodwarner", "rw-07-unshackled"), cap: "Unshackled · book promo" },
      { src: w("rodwarner", "rw-02-unlock-true-confidence"), cap: "Unlock True Confidence" },
      { src: w("rodwarner", "rw-03-guided-by-experience"), cap: "Guided by Experience" },
      { src: w("rodwarner", "rw-04-many-lives-changed"), cap: "Many Lives Changed" },
      { src: w("rodwarner", "rw-05-decades-of-trust"), cap: "Decades of Trust" },
      { src: w("rodwarner", "rw-08-about-rod"), cap: "About Rod" },
      { src: w("rodwarner", "rw-09-challenge-to-clarity"), cap: "From Challenge to Clarity" },
    ],
  },
  {
    id: "impact",
    title: "Financial Literacy Series",
    client: "Impact Society",
    category: "Social",
    year: "2024",
    ratio: "1 / 1",
    items: [
      { src: w("impact", "01-your-family-deserves-more"), cap: "Your Family Deserves More" },
      { src: w("impact", "02-smarter-money-stronger-future"), cap: "Smarter Money, Stronger Future" },
      { src: w("impact", "03-lets-build-your-plan"), cap: "Let’s Build Your Plan" },
      { src: w("impact", "04-financial-literacy"), cap: "Financial Literacy" },
      { src: w("impact", "05-changing-generations"), cap: "Changing Generations" },
      { src: w("impact", "06-your-greatest-success"), cap: "Your Greatest Success" },
    ],
  },
  {
    id: "sisters",
    title: "Survivor Awareness",
    client: "Sisters Network Dallas",
    category: "Social",
    year: "2025",
    ratio: "1 / 1",
    items: [
      { src: w("sisters", "sisters-10"), cap: "Building Hope Beyond Breast Cancer" },
      { src: w("sisters", "sisters-01"), cap: "United Survivors" },
      { src: w("sisters", "sisters-03"), cap: "Who We Are" },
      { src: w("sisters", "sisters-04"), cap: "Join Us In This Fight" },
      { src: w("sisters", "sisters-05"), cap: "Monthly Survivor Meetings" },
      { src: w("sisters", "sisters-06"), cap: "Shared Survivor Knowledge" },
      { src: w("sisters", "sisters-07"), cap: "A Safe Space" },
      { src: w("sisters", "sisters-09"), cap: "Survivor Strength" },
      { src: w("sisters", "sisters-15"), cap: "In Unity There Is Strength" },
      { src: w("sisters", "sisters-21"), cap: "Diagnosis to Survivorship" },
      { src: w("sisters", "sisters-28"), cap: "World Cancer Day" },
    ],
  },
  {
    id: "arctowers",
    title: "Real Estate Marketing",
    client: "ArcTowers, Cebu",
    category: "Social",
    year: "2024",
    ratio: "1 / 1",
    items: [
      { src: w("arctowers", "05-halloween-open-house-purple"), cap: "Halloween Open House" },
      { src: w("arctowers", "06-halloween-open-house-blue"), cap: "Halloween Open House · alt" },
      { src: w("arctowers", "01-study-lounge"), cap: "Study Lounge" },
      { src: w("arctowers", "02-amenities-6th-floor"), cap: "Amenities · 6th Floor" },
      { src: w("arctowers", "03-amenities-23rd-floor"), cap: "Amenities · 23rd Floor" },
      { src: w("arctowers", "04-bedroom-retreat"), cap: "Bedroom Retreat" },
      { src: w("arctowers", "07-commercial-shopping"), cap: "Commercial · Shopping" },
      { src: w("arctowers", "08-commercial-professional"), cap: "Commercial · Professional" },
      { src: w("arctowers", "09-commercial-family"), cap: "Commercial · Family" },
    ],
  },
  {
    id: "jjtammy",
    title: "Episode Teasers",
    client: "See You At The Top",
    category: "Social",
    year: "2025",
    ratio: "1 / 1",
    items: [
      { src: w("jjtammy", "jj-01-inlaw-drama"), cap: "In-Laws & Family Drama" },
      { src: w("jjtammy", "jj-02-life-gets-busy"), cap: "Life Gets Busy" },
      { src: w("jjtammy", "jj-03-money-stress"), cap: "Money & Financial Stress" },
      { src: w("jjtammy", "jj-04-silent-storm"), cap: "The Silent Storm" },
      { src: w("jjtammy", "jj-05-love-rekindled"), cap: "Love Rekindled" },
    ],
  },
  {
    id: "ucredesign",
    title: "University Website",
    client: "University of Cebu",
    category: "Web & UI",
    year: "2025",
    ratio: "1 / 1",
    items: [
      { src: w("ucredesign", "01-homepage"), cap: "Homepage" },
      { src: w("ucredesign", "02-homepage-news-events"), cap: "News & Events" },
      { src: w("ucredesign", "03-campuses"), cap: "Campuses" },
      { src: w("ucredesign", "04-basic-education"), cap: "Basic Education" },
    ],
  },
];

/* Display order under "All": podcast work first, then thumbnails, then the rest. */
const ORDER = ["b3-podcast", "impact-society", "reels", "podcast", "deck", "rodwarner", "impact", "sisters", "arctowers", "jjtammy", "ucredesign"];
export const projects: Project[] = [...allProjects].sort(
  (a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99),
);

export const services = [
  { id: "svc-podcast", title: "Podcast Production" },
  { id: "svc-video", title: "Video & Reels" },
  { id: "svc-design", title: "Social & Campaign Design" },
  { id: "svc-deck", title: "Presentation Design" },
  { id: "svc-web", title: "Webflow & UI" },
];

/* Newest first. */
export const experience = [
  { date: "Jun 2026 – Now", role: "Content Producer Assistant", org: "Leilani Spring Digital" },
  { date: "Feb – Jun 2026", role: "Podcast & Reel Editor", org: "Broadcast Your Authority" },
  { date: "Oct 2025 – Nov 2026", role: "Podcast Production & Management", org: "Life Shift Podcast" },
  { date: "Sep 2025", role: "Webflow Developer", org: "Webflow CMS" },
  { date: "Sep – Nov 2024", role: "Graphic Designer (OJT)", org: "ArcTowers, Cebu City" },
  { date: "Aug 2023 – Now", role: "Graphic Designer & Video Editor", org: "Dream Media" },
  { date: "2022 – 2023", role: "Graphic Designer", org: "Freelance" },
];

export const education = { degree: "BS Computer Science", school: "University of Cebu" };

export const tools = [
  { group: "Design", items: ["Photoshop", "Canva", "Lightroom", "Blender", "Procreate"] },
  { group: "Video", items: ["Premiere Pro", "CapCut", "Opus Clip"] },
  { group: "Web & UI", items: ["Figma", "Webflow", "WordPress"] },
  { group: "AI", items: ["Claude", "ChatGPT", "Higgsfield"] },
];

export const clients = [
  "Johnny Wimbrey",
  "B3connect",
  "Rod Warner",
  "Impact Society",
  "Sisters Network Dallas",
  "Dream Media",
  "Broadcast Your Authority",
  "Leilani Spring Digital",
  "ArcTowers",
  "Pretty Powerful",
  "The Wealth District",
];

export const navItems = [
  { href: "#home", label: "Home", icon: "icon-home" },
  { href: "#work", label: "Work", icon: "icon-high-light" },
  { href: "#service", label: "Services", icon: "icon-service" },
  { href: "#experience", label: "Experience", icon: "icon-edu" },
  { href: "#tools", label: "Tools", icon: "icon-tech-stack" },
  { href: "#contact", label: "Contact", icon: "icon-send" },
];

