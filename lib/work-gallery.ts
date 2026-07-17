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
    { src: "/photos/projects/africa-urban-forum-2026/auf-n-01.jpg", label: "Africa Urban Forum 2026" },
    { src: "/photos/projects/africa-urban-forum-2026/auf-n-02.jpg", label: "Africa Urban Forum 2026" },
    { src: "/photos/projects/africa-urban-forum-2026/auf-n-03.jpg", label: "Africa Urban Forum 2026" },
    { src: cl("auf-01"), label: "Continental convening" },
    { src: cl("auf-02"), label: "Delegate experience" },
    { src: cl("auf-03"), label: "Stakeholder dialogue" },
    { src: cl("auf-04"), label: "Forum atmosphere" },
  ],
  "utamaduni-day": [],
  "lc-waikiki-africa": [
    { src: "/photos/projects/lc-waikiki/lcw-01.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-02.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-03.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-04.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-05.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-06.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-07.jpg", label: "LC Waikiki — denim campaign" },
    { src: "/photos/projects/lc-waikiki/lcw-08.jpg", label: "LC Waikiki — denim campaign" },
  ],
  "kansai-plascon": [
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-plascon-launch", label: "Colours of Victory — Gor Mahia launch" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/plascon-01", label: "Plascon brand shoot" },
    { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/plascon-b-01", label: "Plascon campaign edit" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-s-01.jpg", label: "Kansai Plascon — brand shoot" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-s-02.jpg", label: "Kansai Plascon — brand shoot" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-s-03.jpg", label: "Kansai Plascon — brand shoot" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-s-04.jpg", label: "Kansai Plascon — brand shoot" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-s-05.jpg", label: "Kansai Plascon — brand shoot" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-s-06.jpg", label: "Kansai Plascon — brand shoot" },
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
  ],
  "africa-forum-on-displacements": [],
  "columbia-africa-healthcare": [],
  "medigah-london-hair": [
    { src: "/photos/projects/medigah/mlh-01.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-02.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-03.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-04.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-05.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-06.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-07.jpg", label: "Medigah London Hair — MLH app launch" },
    { src: "/photos/projects/medigah/mlh-08.jpg", label: "Medigah London Hair — MLH app launch" },
  ],
  "allso-beauty": [
    { src: "/photos/projects/allso-beauty/allso-l-01.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-02.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-03.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-04.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-05.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-06.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-07.jpg", label: "Allso Beauty — launch" },
    { src: "/photos/projects/allso-beauty/allso-l-08.jpg", label: "Allso Beauty — launch" },
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
