import type { MetadataRoute } from "next";
import { projects } from "@/components/lib/projects";
// Type-only: work-sectors.ts imports Phosphor icon components, and pulling
// those into this server-only route breaks the build. The literal list below is
// still checked against the union, so a renamed sector fails compilation.
import type { WorkSectorSlug } from "@/components/lib/work-sectors";
import { platforms } from "@/components/lib/platforms";
import { services } from "@/components/lib/services";

const BASE = "https://fidco.africa";

/**
 * Full sitemap. This previously listed only the home page, so search engines
 * saw one URL for the whole site — every case study, sector and platform page
 * was left to be found by crawling alone.
 *
 * Built from the same data the pages are generated from, so new work appears
 * here automatically rather than needing a second edit.
 */
const WORK_SECTOR_SLUGS: WorkSectorSlug[] = [
  "government", "retail-fashion", "corporate", "hospitality", "sports-tourism",
  "healthcare", "social-impact", "finance", "lifestyle", "culture-entertainment",
  "owned-ips",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: `${BASE}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/about", 0.8),
    entry("/services", 0.8),
    entry("/work", 0.9, "weekly"),
    entry("/events", 0.7),
    entry("/insights", 0.7, "weekly"),
    entry("/articles", 0.7, "weekly"),
    entry("/brief", 0.6),

    // Our Expertise — one page per discipline
    ...services.map((s) => entry(`/services/${s.slug}`, 0.7)),

    // Our Work — sector index pages, then the individual case studies
    ...WORK_SECTOR_SLUGS.map((slug) => entry(`/work/${slug}`, 0.8)),
    ...projects.map((p) => entry(`/work/${p.slug}`, 0.7)),

    // Owned platforms
    ...platforms.map((p) => entry(`/platforms/${p.slug}`, 0.8)),
  ];
}
