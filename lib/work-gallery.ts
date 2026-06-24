import { projects, type Project } from "@/components/lib/projects";
import type { WorkImage, WorkProject } from "@/components/lib/work-types";

// Google Drive direct URL helper
const gd = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`;

export const projectGalleryImages: Record<string, WorkImage[]> = {
  // Only Drive/confirmed-local images — no shared cinematic placeholders
  "national-minorities-day": [],
  "africa-urban-forum-2026": [
    { src: gd("1WSC89riDr2VR-Cl39aMe5xcx2BHc8pE2"), label: "Continental convening" },
    { src: gd("1F28bgIVPy6l_GkBsodQbA_uyOSw5F_um"), label: "Delegate experience" },
    { src: gd("1oIAPWy9WCrG4jenXCoPoVOsH84qYdMhr"), label: "Stakeholder dialogue" },
    { src: gd("1H54R5k1FcIaFwMLOM88nvncYGEwRtDak"), label: "Forum atmosphere" },
  ],
  "utamaduni-day": [],
  "lc-waikiki-africa": [],
  "kansai-plascon": [
    { src: gd("1-OfLm_ngVRP-pXCNpHYeY0xYX4qC6KX7"), label: "Gor Mahia partnership launch" },
    { src: gd("1bvcFu6egXuQC2TqBSb0KetzIF8pI7z8m"), label: "Colour and community" },
    { src: gd("1wx7nof84RtkrzxRXfEqewqiWEmpJBZOl"), label: "Corporate storytelling" },
    { src: gd("13ONHzF2RtQJoadxMjiC3AYrS2jgqi1DQ"), label: "Stakeholder launch" },
    { src: gd("12S7RvSSOh8eMMCiLTyIOHU2XgvXE_8hv"), label: "Brand moment" },
  ],
  "thrive-hospitality-group": [
    { src: "/photos/projects/chaii-republic/DSC02130.jpg", label: "Chaii Republic NBO — launch" },
    { src: "/photos/projects/chaii-republic/DSC01740.jpg", label: "Chaii Republic NBO — community" },
    { src: "/photos/projects/chaii-republic/DSC02138.jpg", label: "Chaii Republic NBO — experience" },
    { src: "/photos/projects/chaii-republic/DSC01938.jpg", label: "Chaii Republic NBO — brand moment" },
    { src: gd("1cYCvWkEiWtaYLJ82HTVzz6RcUtKMGKFc"), label: "Glam Hotel — property" },
    { src: gd("1yKDuR86eOvXJOSlZ3t3leSAEZxDtGSRF"), label: "Glam Hotel — atmosphere" },
    { src: gd("1J8HQvoW-68iVYp2dV5WI5s_dGrA6skGD"), label: "Glam Hotel — experience" },
    { src: gd("1SsBIIKTQZXF2kYxabYZIfu1F4y3csv7O"), label: "Glam Hotel — brand moment" },
    { src: gd("1w4CFgMZWPh13DznStAJK8H8LDSX4fZ10"), label: "Glam Hotel — lifestyle" },
    { src: gd("1kAhVR_VeWItFv6jmuDQmTbvIE0-hKZhO"), label: "Glam Hotel — identity" },
    { src: gd("1cI1ShzFUXFUp_dFl-zkF_juErPOgKegT"), label: "Glam Hotel — destination" },
  ],
  "africa-forum-on-displacements": [],
  "columbia-africa-healthcare": [],
  "allso-beauty": [
    { src: gd("1wVjBaXiiFClZtCghODURETydnXje7ow0"), label: "Launch event atmosphere" },
    { src: gd("1JYHFXL3tr3j_oKWzwaGgs8qILuGBAm-l"), label: "Beauty creator engagement" },
    { src: gd("1wBw6oMHHxChysWDRMdVP2XeaOp_B7Px3"), label: "Influencer storytelling" },
    { src: gd("1ZLWSPFlyIIq-TYndv3X6brjw3IKnfuRP"), label: "Brand moment" },
    { src: gd("1RqeGIsNoBbvN8Hg-zDvpuX8dIWeKKnf4"), label: "Digital amplification" },
  ],
  "abyan-salon": [
    { src: "/photos/projects/abyan-salon/DSC08926.webp", label: "Salon environment" },
    { src: "/photos/projects/abyan-salon/DSC08859.webp", label: "Beauty destination" },
    { src: "/photos/projects/abyan-salon/DSC08858.webp", label: "Spa experience" },
    { src: "/photos/projects/abyan-salon/DSC08860.webp", label: "Interior detail" },
    { src: "/photos/projects/abyan-salon/DSC08838.webp", label: "Treatment space" },
    { src: "/photos/projects/abyan-salon/DSC08846.webp", label: "Brand atmosphere" },
    { src: "/photos/projects/abyan-salon/DSC08835.webp", label: "Lifestyle editorial" },
    { src: "/photos/projects/abyan-salon/DSC08810.webp", label: "Visual identity" },
    { src: "/photos/projects/abyan-salon/DSC08749.webp", label: "Campaign detail" },
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
