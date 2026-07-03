import { Buildings, ForkKnife, Heartbeat, Sparkle, SquaresFour, GlobeHemisphereEast, type Icon } from "@phosphor-icons/react";
import { projects } from "@/components/lib/projects";
import { platforms } from "@/components/lib/platforms";
import type { Project } from "@/components/lib/projects";
import type { OwnedPlatform } from "@/components/lib/platforms";

export type WorkSectorSlug = "government" | "corporate" | "hospitality" | "healthcare" | "lifestyle" | "owned-ips";

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
    title: "Government",
    intro: "Public-sector, multilateral and national-interest work that requires precision, protocol and narrative clarity.",
    accent: "#750006",
    cover: "/photos/projects/national-minorities-day.jpg",
    Icon: Buildings,
  },
  {
    slug: "corporate",
    title: "Corporate",
    intro: "Corporate partnerships, retail campaigns and brand communications that build reputation and market confidence.",
    accent: "#d98038",
    cover: "/photos/projects/kansai-gor-mahia.jpg",
    Icon: GlobeHemisphereEast,
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    intro: "Launches, destination storytelling and lifestyle experiences for hospitality brands and venue-led businesses.",
    accent: "#d9ab88",
    cover: "/photos/projects/thrive-hospitality/glam-01.jpg",
    Icon: ForkKnife,
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    intro: "Healthcare communication that prioritises credibility, reassurance and clear institutional storytelling.",
    accent: "#1c1c1c",
    cover: "/photos/projects/columbia-building.jpg",
    Icon: Heartbeat,
  },
  {
    slug: "lifestyle",
    title: "Lifestyle",
    intro: "Beauty, wellbeing and lifestyle-led campaigns shaped around audience culture and visual appeal.",
    accent: "#43d491",
    cover: "/photos/projects/allso-beauty.jpg",
    Icon: Sparkle,
  },
  {
    slug: "owned-ips",
    title: "Owned IPs",
    intro: "Original platforms and conversation-led properties designed and owned by FID & Co.",
    accent: "#260000",
    cover: "/photos/projects/tribe-vibe.jpg",
    Icon: SquaresFour,
  },
];

const GOVERNMENT_SECTORS = new Set([
  "government & public institutions",
  "social impact & multilateral partnerships",
  "sports & tourism",
]);

const CORPORATE_SECTORS = new Set([
  "manufacturing & corporate brands",
  "retail & fashion",
  "finance & investment",
]);

const HOSPITALITY_SECTORS = new Set([
  "hospitality, lifestyle & destination brands",
]);

const HEALTHCARE_SECTORS = new Set([
  "healthcare & medical institutions",
]);

const LIFESTYLE_SECTORS = new Set([
  "beauty, wellness & lifestyle",
]);

export function getWorkSectorMeta(slug: WorkSectorSlug) {
  return WORK_SECTORS.find((sector) => sector.slug === slug);
}

export function getWorkSectorSlugFromProject(project: Pick<Project, "sector" | "slug">): WorkSectorSlug {
  const sector = project.sector.toLowerCase();
  if (GOVERNMENT_SECTORS.has(sector)) return "government";
  if (CORPORATE_SECTORS.has(sector)) return "corporate";
  if (HOSPITALITY_SECTORS.has(sector)) return "hospitality";
  if (HEALTHCARE_SECTORS.has(sector)) return "healthcare";
  if (LIFESTYLE_SECTORS.has(sector)) return "lifestyle";
  return "government";
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
