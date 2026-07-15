import { projects, type Project } from "@/components/lib/projects";
import type { WorkImage, WorkProject } from "@/components/lib/work-types";

const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/${id}`;

export const projectGalleryImages: Record<string, WorkImage[]> = {
  "woolworths-kenya": [
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/woolworths-01", label: "Woolworths — Sarit beauty launch" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/woolworths-02", label: "Woolworths — flagship store" },
  ],
  "national-minorities-day": [],
  "africa-urban-forum-2026": [
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/auf-2026", label: "Africa Urban Forum 2026 — KICC" },
    { src: cl("auf-01"), label: "Continental convening" },
    { src: cl("auf-02"), label: "Delegate experience" },
    { src: cl("auf-03"), label: "Stakeholder dialogue" },
    { src: cl("auf-04"), label: "Forum atmosphere" },
  ],
  "utamaduni-day": [],
  "lc-waikiki-africa": [],
  "kansai-plascon": [
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-plascon-launch", label: "Colours of Victory — Gor Mahia launch" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/plascon-01", label: "Plascon brand shoot" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/plascon-b-01", label: "Plascon campaign edit" },
    { src: cl("kansai-01"), label: "Gor Mahia partnership launch" },
    { src: cl("kansai-02"), label: "Colour and community" },
    { src: cl("kansai-03"), label: "Corporate storytelling" },
    { src: cl("kansai-04"), label: "Stakeholder launch" },
    { src: cl("kansai-05"), label: "Brand moment" },
  ],
  "thrive-hospitality-group": [
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/glam-hotel", label: "Glam Hotel — rooftop launch" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/social8-01", label: "Social 8 — launch entrance" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/chaii-02", label: "Chaii Republic — experience" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/chaii-03", label: "Chaii Republic — brand moment" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kingfisher-01", label: "Kingfisher Nest — launch" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kingfisher-02", label: "Kingfisher Nest — hosting" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/glam-rooftop-01", label: "Glam Hotel — rooftop night" },
    { src: cl("glam-01"), label: "Glam Hotel — property" },
    { src: cl("glam-02"), label: "Glam Hotel — atmosphere" },
    { src: cl("glam-03"), label: "Glam Hotel — experience" },
    { src: cl("glam-04"), label: "Glam Hotel — brand moment" },
    { src: cl("glam-05"), label: "Glam Hotel — lifestyle" },
    { src: cl("glam-06"), label: "Glam Hotel — identity" },
    { src: cl("glam-07"), label: "Glam Hotel — destination" },
  ],
  "africa-forum-on-displacements": [],
  "columbia-africa-healthcare": [],
  "allso-beauty": [
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/allso-launch", label: "Allso Beauty launch — experiential set" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/allso-l-01", label: "Allso launch — creators" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/allso-l-02", label: "Allso launch — brand moment" },
    { src: cl("allso-01"), label: "Launch event atmosphere" },
    { src: cl("allso-02"), label: "Beauty creator engagement" },
    { src: cl("allso-03"), label: "Influencer storytelling" },
    { src: cl("allso-04"), label: "Brand moment" },
    { src: cl("allso-05"), label: "Digital amplification" },
  ],
  "abyan-salon": [
    { src: "/photos/projects/abyan-salon/DSC08749.webp", label: "Salon environment" },
    { src: "/photos/projects/abyan-salon/DSC08810.webp", label: "Beauty destination" },
    { src: "/photos/projects/abyan-salon/DSC08835.webp", label: "Spa experience" },
    { src: "/photos/projects/abyan-salon/DSC08838.webp", label: "Interior detail" },
    { src: "/photos/projects/abyan-salon/DSC08846.webp", label: "Signature styling" },
    { src: "/photos/projects/abyan-salon/DSC08858.webp", label: "Guest experience" },
    { src: "/photos/projects/abyan-salon/DSC08859.webp", label: "Beauty craft" },
    { src: "/photos/projects/abyan-salon/DSC08860.webp", label: "Salon atmosphere" },
    { src: "/photos/projects/abyan-salon/DSC08926.webp", label: "Brand identity" },
  ],
};

export function getProjectGallery(project: Pick<Project, "slug" | "title">): WorkImage[] {
  return projectGalleryImages[project.slug] ?? [];
}

export function toWorkProject(project: Project): WorkProject {
  return {
    ...project,
    tagline: project.desc,
    color: undefined,
    images: getProjectGallery(project),
  } as WorkProject;
}

export const workProjects = projects.map(toWorkProject);
