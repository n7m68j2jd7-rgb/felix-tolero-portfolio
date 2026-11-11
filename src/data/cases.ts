/* Landing pages for YouTube projects. Each one gets a page at /work/<slug>. */
import { b3Episodes, b3Shorts } from "./b3";

export type Video = { id: string; title: string; thumb: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  role: string;
  year: string;
  /** one sentence, shown under the title */
  summary: string;
  services: string[];
  channel: { name: string; url: string };
  episodes: Video[];
  /** vertical YouTube Shorts */
  shorts?: Video[];
};

const yt = (folder: string, file: string) => `/felix/work/${folder}/${file}.jpg`;

export const cases: CaseStudy[] = [
  {
    slug: "b3-podcast",
    title: "B3 Podcast",
    client: "B3connect",
    role: "Podcast & Shorts Editor",
    year: "2026",
    summary: "Seven full episodes and 70 podcast Shorts for a parenting and youth-sports show.",
    services: ["Episode edit", "Shorts", "Thumbnails", "Publishing"],
    channel: { name: "@B3connect", url: "https://www.youtube.com/@B3connect" },
    episodes: b3Episodes,
    shorts: b3Shorts,
  },
  {
    slug: "impact-society",
    title: "Impact Society",
    client: "Patrick Wilbanks",
    role: "Video Editor & Thumbnail Designer",
    year: "2025–26",
    summary: "Long-form interview episodes with a consistent, click-ready look.",
    services: ["Multi-cam edit", "Thumbnails", "Audio clean-up", "Publishing"],
    channel: { name: "@IMPACTSOC13TY", url: "https://www.youtube.com/@IMPACTSOC13TY" },
    episodes: [
      { id: "p2zALDE7Xr8", title: "Episode 15", thumb: yt("impact-society", "ep15") },
      { id: "HeqPv90CyQk", title: "Episode 12", thumb: yt("impact-society", "ep12") },
      { id: "1mrFQG44J0o", title: "Episode 7", thumb: yt("impact-society", "ep07") },
      { id: "lXwOnQviAKo", title: "Episode 5", thumb: yt("impact-society", "ep05") },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const shortUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
