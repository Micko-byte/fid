import { notFound } from "next/navigation";
import WorkSectorPageClient from "@/components/work/WorkSectorPageClient";
import type { WorkSectorSlug } from "@/components/lib/work-sectors";

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

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = SECTORS.find((s) => s.slug === slug);
  if (!meta) return {};
  return { title: `${meta.title} — Our Work | FID & Co.`, description: meta.intro };
}

export default async function WorkSectorRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = SECTORS.find((s) => s.slug === slug);
  if (!meta) notFound();
  return <WorkSectorPageClient sector={slug as WorkSectorSlug} />;
}
