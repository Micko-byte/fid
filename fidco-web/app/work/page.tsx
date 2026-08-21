import type { Metadata } from "next";
import WorkSectorIndexClient from "@/components/work/WorkSectorIndexClient";
import WorkPageClient from "@/components/work/WorkPageClient";
import { workProjects } from "@/lib/work-gallery";

const SITE_URL = "https://fidco.africa";

function firstQueryValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function resolvePreviewImage(src?: string) {
  if (!src) return `${SITE_URL}/og-image.jpg`;
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ p?: string | string[] }>;
}): Promise<Metadata> {
  const { p } = await searchParams;
  const slug = firstQueryValue(p);
  const project = slug ? workProjects.find((item) => item.slug === slug) : undefined;

  if (!project) {
    return {
      title: "Work | FID & Co.",
      description: "Explore FID & Co. case studies across sectors and campaigns.",
      alternates: { canonical: `${SITE_URL}/work` },
    };
  }

  const description = project.tagline || project.desc;
  const previewImage = resolvePreviewImage(project.images?.[0]?.src);

  return {
    title: `${project.client} | FID & Co.`,
    description,
    alternates: { canonical: `${SITE_URL}/work?p=${project.slug}` },
    openGraph: {
      title: `${project.client} | FID & Co.`,
      description,
      url: `${SITE_URL}/work?p=${project.slug}`,
      siteName: "FID & Co.",
      type: "article",
      images: [{ url: previewImage, width: 1200, height: 630, alt: project.client }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.client} | FID & Co.`,
      description,
      images: [previewImage],
    },
  };
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string | string[] }>;
}) {
  const { p } = await searchParams;
  const slug = firstQueryValue(p);
  return slug ? <WorkPageClient /> : <WorkSectorIndexClient />;
}
