import { projects, type Project } from "@/components/lib/projects";
import type { WorkImage, WorkProject } from "@/components/lib/work-types";

const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/${id}`;

export const projectGalleryImages: Record<string, WorkImage[]> = {
  "woolworths-kenya": [
    { src: "/photos/projects/woolworths/woolworths-01.jpg", label: "Woolworths — Sarit beauty launch" },
    { src: "/photos/projects/woolworths/woolworths-02.jpg", label: "Woolworths — flagship store" },
  ],
  "national-minorities-day": [],
  "africa-urban-forum-2026": [
    { src: "/photos/projects/auf-2026.jpg", label: "Africa Urban Forum 2026 — KICC" },
    { src: cl("auf-01"), label: "Continental convening" },
    { src: cl("auf-02"), label: "Delegate experience" },
    { src: cl("auf-03"), label: "Stakeholder dialogue" },
    { src: cl("auf-04"), label: "Forum atmosphere" },
  ],
  "utamaduni-day": [],
  "lc-waikiki-africa": [],
  "kansai-plascon": [
    { src: "/photos/projects/kansai-plascon-launch.jpg", label: "Colours of Victory — Gor Mahia launch" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-01.jpg", label: "Plascon brand shoot" },
    { src: "/photos/projects/kansai-plascon-shoot/plascon-b-01.jpg", label: "Plascon campaign edit" },
    { src: cl("kansai-01"), label: "Gor Mahia partnership launch" },
    { src: cl("kansai-02"), label: "Colour and community" },
    { src: cl("kansai-03"), label: "Corporate storytelling" },
    { src: cl("kansai-04"), label: "Stakeholder launch" },
    { src: cl("kansai-05"), label: "Brand moment" },
  ],
  "thrive-hospitality-group": [
    { src: "/photos/projects/glam-hotel.jpg", label: "Glam Hotel — rooftop launch" },
    { src: "/photos/projects/social8/social8-01.jpg", label: "Social 8 — launch entrance" },
    { src: "/photos/projects/chaii-republic/chaii-02.jpg", label: "Chaii Republic — experience" },
    { src: "/photos/projects/chaii-republic/chaii-03.jpg", label: "Chaii Republic — brand moment" },
    { src: "/photos/projects/kingfisher/kingfisher-01.jpg", label: "Kingfisher Nest — launch" },
    { src: "/photos/projects/kingfisher/kingfisher-02.jpg", label: "Kingfisher Nest — hosting" },
    { src: "/photos/projects/glam-rooftop/glam-rooftop-01.jpg", label: "Glam Hotel — rooftop night" },
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
    { src: "/photos/projects/allso-launch.jpg", label: "Allso Beauty launch — experiential set" },
    { src: "/photos/projects/allso-launch/allso-l-01.jpg", label: "Allso launch — creators" },
    { src: "/photos/projects/allso-launch/allso-l-02.jpg", label: "Allso launch — brand moment" },
    { src: cl("allso-01"), label: "Launch event atmosphere" },
    { src: cl("allso-02"), label: "Beauty creator engagement" },
    { src: cl("allso-03"), label: "Influencer storytelling" },
    { src: cl("allso-04"), label: "Brand moment" },
    { src: cl("allso-05"), label: "Digital amplification" },
  ],
  "abyan-salon": [
    { src: cl("abyan-01"), label: "Salon environment" },
    { src: cl("abyan-02"), label: "Beauty destination" },
    { src: cl("abyan-03"), label: "Spa experience" },
    { src: cl("abyan-04"), label: "Interior detail" },
    { src: cl("abyan-05"), label: "Signature styling" },
    { src: cl("abyan-06"), label: "Guest experience" },
    { src: cl("abyan-07"), label: "Beauty craft" },
    { src: cl("abyan-08"), label: "Salon atmosphere" },
    { src: cl("abyan-09"), label: "Brand identity" },
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
