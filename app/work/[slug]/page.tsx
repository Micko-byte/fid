import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import WorkDetailClient from "@/components/work/WorkDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.client} — ${project.title} | FID & Co.`,
    description: project.desc,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <WorkDetailClient project={project} />;
}
