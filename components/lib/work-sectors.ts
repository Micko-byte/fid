import {
  Buildings,
  TShirt,
  Factory,
  ForkKnife,
  Trophy,
  Heartbeat,
  HandHeart,
  ChartLineUp,
  Sparkle,
  MusicNotes,
  SquaresFour,
  type Icon,
} from "@phosphor-icons/react";
import { projects } from "@/components/lib/projects";
import { platforms } from "@/components/lib/platforms";
import type { Project } from "@/components/lib/projects";
import type { OwnedPlatform } from "@/components/lib/platforms";

export type WorkSectorSlug =
  | "government"
  | "retail-fashion"
  | "corporate"
  | "hospitality"
  | "sports-tourism"
  | "healthcare"
  | "social-impact"
  | "finance"
  | "lifestyle"
  | "culture-entertainment"
  | "owned-ips";

export interface WorkSectorMeta {
  slug: WorkSectorSlug;
  title: string;
  intro: string;
  accent: string;
  cover: string;
  Icon: Icon;
}

export const WORK_SECTORS: WorkSectorMeta[] = [
  {
    slug: "government",
    title: "Government & Public Institutions",
    intro: "Public-sector, multilateral and national-interest work that requires precision, protocol and narrative clarity.",
    accent: "#750006",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/national-minorities-day",
    Icon: Buildings,
  },
  {
    slug: "retail-fashion",
    title: "Retail & Fashion",
    intro: "Retail campaigns, influencer-led fashion storytelling and digital ecosystems for style-conscious African audiences.",
    accent: "#b5397a",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/lc-waikiki-influencer",
    Icon: TShirt,
  },
  {
    slug: "corporate",
    title: "Manufacturing & Corporate Brands",
    intro: "Corporate partnerships, brand communications and regional campaigns that build reputation and market confidence.",
    accent: "#d98038",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/kansai-gor-mahia",
    Icon: Factory,
  },
  {
    slug: "hospitality",
    title: "Hospitality, Lifestyle & Destination Brands",
    intro: "Launches, destination storytelling and lifestyle experiences for hospitality brands and venue-led businesses.",
    accent: "#1f6b4a",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/glam-hotel",
    Icon: ForkKnife,
  },
  {
    slug: "sports-tourism",
    title: "Sports, Tourism & Mass-Audience Platforms",
    intro: "High-visibility sporting moments and mass-audience platforms — from the WRC Safari Rally to Gor Mahia FC.",
    accent: "#0f766e",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/crowd-audience",
    Icon: Trophy,
  },
  {
    slug: "healthcare",
    title: "Healthcare & Medical Institutions",
    intro: "Healthcare communication that prioritises credibility, reassurance and clear institutional storytelling.",
    accent: "#2f6f8f",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/columbia-building",
    Icon: Heartbeat,
  },
  {
    slug: "social-impact",
    title: "Social Impact, Development & Multilateral Partnerships",
    intro: "Complex multi-stakeholder communications for UN agencies, NGOs and development partners across Africa.",
    accent: "#7a5c2e",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/africa-forum-displacement",
    Icon: HandHeart,
  },
  {
    slug: "finance",
    title: "Finance, Investment & Advisory",
    intro: "Clarifying complex investment narratives for firms operating across emerging and frontier markets.",
    accent: "#1c1c1c",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/elysium-finance",
    Icon: ChartLineUp,
  },
  {
    slug: "lifestyle",
    title: "Beauty, Wellness & Lifestyle",
    intro: "Beauty, wellbeing and lifestyle-led campaigns shaped around audience culture and visual appeal.",
    accent: "#b5397a",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/allso-beauty-cover",
    Icon: Sparkle,
  },
  {
    slug: "culture-entertainment",
    title: "Culture, Entertainment & Experiential Platforms",
    intro: "Cross-border cultural platforms celebrating African music, fashion, cuisine and creative expression.",
    accent: "#8a5cf0",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/cultural-dancers",
    Icon: MusicNotes,
  },
  {
    slug: "owned-ips",
    title: "Owned Experiences & Cultural IPs",
    intro: "Original platforms and conversation-led properties designed and owned by FID & Co.",
    accent: "#260000",
    cover: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/tribe-vibe",
    Icon: SquaresFour,
  },
];

// Maps the exact `sector` strings used in projects.ts (lowercased) to a sector slug.
const SECTOR_NAME_TO_SLUG: Record<string, WorkSectorSlug> = {
  "government & public institutions": "government",
  "retail & fashion": "retail-fashion",
  "manufacturing & corporate brands": "corporate",
  "hospitality, lifestyle & destination brands": "hospitality",
  "sports & tourism": "sports-tourism",
  "sports, tourism & mass-audience platforms": "sports-tourism",
  "healthcare & medical institutions": "healthcare",
  "social impact & multilateral partnerships": "social-impact",
  "social impact & development": "social-impact",
  "finance & investment": "finance",
  "finance, investment & advisory": "finance",
  "beauty, wellness & lifestyle": "lifestyle",
  "culture & entertainment": "culture-entertainment",
  "culture, entertainment & experiential platforms": "culture-entertainment",
};

export function getWorkSectorMeta(slug: WorkSectorSlug) {
  return WORK_SECTORS.find((sector) => sector.slug === slug);
}

export function getWorkSectorSlugFromProject(project: Pick<Project, "sector" | "slug">): WorkSectorSlug {
  return SECTOR_NAME_TO_SLUG[project.sector.toLowerCase()] ?? "government";
}

export function getProjectsForWorkSector(slug: WorkSectorSlug): Project[] {
  return projects.filter((project) => getWorkSectorSlugFromProject(project) === slug);
}

export function getPlatformsForWorkSector(slug: WorkSectorSlug): OwnedPlatform[] {
  return slug === "owned-ips" ? platforms : [];
}

export function getWorkSectorCount(slug: WorkSectorSlug): number {
  return slug === "owned-ips" ? platforms.length : getProjectsForWorkSector(slug).length;
}
