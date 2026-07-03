import { notFound } from "next/navigation";
import WorkSectorPageClient from "@/components/work/WorkSectorPageClient";
import type { WorkSectorSlug } from "@/components/lib/work-sectors";

// Local list keeps this server route free of the phosphor-icon runtime import
// that lives in work-sectors.ts (client-only).
const SECTORS: { slug: WorkSectorSlug; title: string; intro: string }[] = [
  { slug: "government", title: "Government", intro: "Public-sector and national-interest communications." },
  { slug: "corporate", title: "Corporate", intro: "Corporate partnerships, retail and brand communications." },
  { slug: "hospitality", title: "Hospitality", intro: "Launches and lifestyle experiences for hospitality brands." },
  { slug: "healthcare", title: "Healthcare", intro: "Credible, reassuring healthcare communications." },
  { slug: "lifestyle", title: "Lifestyle", intro: "Beauty, wellbeing and lifestyle-led campaigns." },
  { slug: "owned-ips", title: "Owned IPs", intro: "Original platforms owned by FID & Co." },
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
