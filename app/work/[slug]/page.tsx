import { notFound } from "next/navigation";
import WorkDetailClient from "@/components/work/WorkDetailClient";
import WorkSectorPageClient from "@/components/work/WorkSectorPageClient";
import type { WorkSectorSlug } from "@/components/lib/work-sectors";
import { getProjectBySlug, projects } from "@/components/lib/projects";
import { pressArticles } from "@/components/lib/articles";
import { fetchLivePreview } from "@/lib/live-preview";

// Local list keeps this server route free of the phosphor-icon runtime import
// that lives in work-sectors.ts (client-only).
const SECTORS: { slug: WorkSectorSlug; title: string; intro: string }[] = [
  { slug: "government", title: "Government & Public Institutions", intro: "Public-sector and national-interest communications." },
  { slug: "retail-fashion", title: "Retail & Fashion", intro: "Retail campaigns and influencer-led fashion storytelling." },
  { slug: "corporate", title: "Manufacturing & Corporate Brands", intro: "Corporate partnerships and brand communications." },
  { slug: "hospitality", title: "Hospitality, Lifestyle & Destination Brands", intro: "Launches and lifestyle experiences for hospitality brands." },
  { slug: "sports-tourism", title: "Sports, Tourism & Mass-Audience Platforms", intro: "High-visibility sporting moments and mass-audience platforms." },
  { slug: "healthcare", title: "Healthcare & Medical Institutions", intro: "Credible, reassuring healthcare communications." },
  { slug: "social-impact", title: "Social Impact, Development & Multilateral Partnerships", intro: "Multi-stakeholder communications for development partners." },
  { slug: "finance", title: "Finance, Investment & Advisory", intro: "Clear investment narratives for frontier markets." },
  { slug: "lifestyle", title: "Beauty, Wellness & Lifestyle", intro: "Beauty, wellbeing and lifestyle-led campaigns." },
  { slug: "culture-entertainment", title: "Culture, Entertainment & Experiential Platforms", intro: "Cross-border cultural platforms and creative expression." },
  { slug: "owned-ips", title: "Owned Experiences & Cultural IPs", intro: "Original platforms owned by FID & Co." },
];

const PROJECT_PARAMS = projects.map((project) => ({ slug: project.slug }));

function toYoutubeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    const videoId =
      parsed.hostname.includes("youtu.be")
        ? parsed.pathname.replace("/", "")
        : parsed.searchParams.get("v") ?? "";
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1` : url;
  } catch {
    return url;
  }
}

export function generateStaticParams() {
  return [...SECTORS.map((s) => ({ slug: s.slug })), ...PROJECT_PARAMS];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (sector) {
    return { title: `${sector.title} — Our Work | FID & Co.`, description: sector.intro };
  }

  const project = getProjectBySlug(slug);
  if (project) {
    return {
      title: `${project.client} — Our Work | FID & Co.`,
      description: project.desc,
    };
  }

  return {};
}

async function resolveProjectMedia(project: NonNullable<ReturnType<typeof getProjectBySlug>>) {
  const media =
    project.slug === "allso-beauty"
      ? pressArticles
          .filter((article) => article.campaignSlug === "allso-beauty")
          .map((article) => {
            const video = article.url.includes("youtu");
            return {
              title: article.title,
              source: article.source,
              href: article.url,
              kind: video ? ("video" as const) : ("link" as const),
              preview: article.image,
              playableSrc: video ? toYoutubeEmbed(article.url) : undefined,
              description: article.campaign,
            };
          })
      : project.media ?? [];
  if (!media.length) return [];

  const resolved = await Promise.all(
    media.map(async (item) => {
      const live = item.href.startsWith("http")
        ? await fetchLivePreview(item.href, {
            title: item.title,
            description: item.description,
            image: item.preview,
            siteName: item.source,
          })
        : {
            title: item.title,
            description: item.description,
            image: item.preview,
            siteName: item.source,
          };

      return {
        ...item,
        title: live.title || item.title,
        description: item.description || live.description,
        preview: live.image || item.preview,
      };
    }),
  );

  return resolved;
}

export default async function WorkSectorRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ client?: string | string[] }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const clientParam = resolvedSearchParams.client;
  const clientSlug = Array.isArray(clientParam) ? clientParam[0] : clientParam ?? "";
  const sector = SECTORS.find((s) => s.slug === slug);
  if (sector) return <WorkSectorPageClient sector={slug as WorkSectorSlug} clientSlug={clientSlug} />;

  const project = getProjectBySlug(slug);
  if (project) {
    const media = await resolveProjectMedia(project);
    return <WorkDetailClient project={project} media={media} />;
  }

  notFound();
}
