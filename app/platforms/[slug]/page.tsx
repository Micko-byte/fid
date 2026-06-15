import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platforms, getPlatformBySlug } from "@/lib/platforms";
import PlatformClient from "@/components/platforms/PlatformClient";

export function generateStaticParams() {
  return platforms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlatformBySlug(slug);
  if (!p) return { title: "Platform — FID & Co." };
  return {
    title: `${p.name} — FID & Co.`,
    description: p.shortDesc,
  };
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPlatformBySlug(slug);
  if (!p) notFound();
  return <PlatformClient platform={p} />;
}
