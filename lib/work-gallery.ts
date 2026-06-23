import { projects, type Project } from "@/components/lib/projects";
import type { WorkImage, WorkProject } from "@/components/lib/work-types";

// Google Drive direct URL helper
const gd = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`;

export const projectGalleryImages: Record<string, WorkImage[]> = {
  "national-minorities-day": [
    { src: "/photos/projects/national-minorities-day.jpg", label: "National observance identity" },
    { src: "/photos/projects/cultural-dancers.jpg", label: "Cultural performance and protocol" },
    { src: "/photos/projects/utamaduni-day.jpg", label: "Public programme staging" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Audience and national coverage" },
    { src: "/photos/cinematic/c01.jpg", label: "Cinematic campaign texture" },
    { src: "/photos/cinematic/c02.jpg", label: "Editorial atmosphere" },
  ],
  "africa-urban-forum-2026": [
    { src: gd("1WSC89riDr2VR-Cl39aMe5xcx2BHc8pE2"), label: "Continental convening" },
    { src: gd("1F28bgIVPy6l_GkBsodQbA_uyOSw5F_um"), label: "Delegate experience" },
    { src: gd("1oIAPWy9WCrG4jenXCoPoVOsH84qYdMhr"), label: "Stakeholder dialogue" },
    { src: gd("1H54R5k1FcIaFwMLOM88nvncYGEwRtDak"), label: "Forum atmosphere" },
    { src: "/photos/projects/africa-forum-displacement.jpg", label: "Multi-stakeholder environment" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Audience engagement" },
  ],
  "utamaduni-day": [
    { src: "/photos/projects/utamaduni-day.jpg", label: "Utamaduni Day celebration" },
    { src: "/photos/projects/cultural-dancers.jpg", label: "Road show and performance" },
    { src: "/photos/editorial/cultural-festival.jpg", label: "Heritage festival detail" },
    { src: "/photos/cinematic/c06.jpg", label: "Broadcast texture" },
    { src: "/photos/cinematic/c07.jpg", label: "Cultural storytelling frame" },
    { src: "/photos/cinematic/c01.jpg", label: "Campaign editorial" },
  ],
  "lc-waikiki-africa": [
    { src: "/photos/projects/lc-waikiki-influencer.jpg", label: "Influencer campaign production" },
    { src: "/photos/projects/cosmo-market.jpg", label: "Retail lifestyle context" },
    { src: "/photos/cinematic/c08.jpg", label: "Social-first campaign frame" },
    { src: "/photos/cinematic/c09.jpg", label: "Multi-market story asset" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Audience response" },
    { src: "/photos/cinematic/c02.jpg", label: "Digital production frame" },
  ],
  "kansai-plascon": [
    { src: gd("1-OfLm_ngVRP-pXCNpHYeY0xYX4qC6KX7"), label: "Gor Mahia partnership launch" },
    { src: gd("1bvcFu6egXuQC2TqBSb0KetzIF8pI7z8m"), label: "Colour and community" },
    { src: gd("1wx7nof84RtkrzxRXfEqewqiWEmpJBZOl"), label: "Corporate storytelling" },
    { src: gd("13ONHzF2RtQJoadxMjiC3AYrS2jgqi1DQ"), label: "Stakeholder launch" },
    { src: gd("12S7RvSSOh8eMMCiLTyIOHU2XgvXE_8hv"), label: "Brand moment" },
    { src: "/photos/projects/kansai-gor-mahia.jpg", label: "Campaign texture" },
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
    { src: gd("1B0cJwfDJL8qAuatOccMTbbGDrDz-iYAh"), label: "Social 8 — lifestyle dining" },
    { src: gd("1Zp1Go_7AS6isqs6yVi4JX3zajnTM-"), label: "Social 8 — brand atmosphere" },
    { src: gd("19PQ1AcLWRHjIGayB_dt0pC46l2kOeCL3"), label: "Social 8 — experiential moment" },
    { src: gd("1nOwZptQCQfKrilaj6fKa6ha1x3zajnTM"), label: "Social 8 — creator engagement" },
    { src: gd("1YZfv7kYOQqJzhujqx1br09QJsZm2wPR7"), label: "Kingfisher Nest — hotel launch" },
    { src: gd("1wKReVU_nCWWN3IMKTdTVI3nMZ5vMufdd"), label: "Kingfisher Nest — destination" },
  ],
  "africa-forum-on-displacements": [
    { src: "/photos/projects/africa-forum-displacement.jpg", label: "Forum on displacement" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Private-sector audience" },
    { src: "/photos/editorial/studio-microphone.jpg", label: "Media engagement" },
    { src: "/photos/editorial/podcast-set.jpg", label: "Spokesperson interview setting" },
    { src: "/photos/cinematic/c04.jpg", label: "Multilateral forum tone" },
    { src: "/photos/cinematic/c06.jpg", label: "Regional coverage frame" },
  ],
  "columbia-africa-healthcare": [
    { src: "/photos/projects/columbia-building.jpg", label: "Healthcare facility profile" },
    { src: "/photos/projects/healthcare-storytelling.jpg", label: "Care standards storytelling" },
    { src: "/photos/cinematic/c07.jpg", label: "Internal communications frame" },
    { src: "/photos/cinematic/c08.jpg", label: "Digital display content" },
    { src: "/photos/editorial/studio-microphone.jpg", label: "Profile interview setup" },
    { src: "/photos/cinematic/c09.jpg", label: "Institutional trust visual" },
  ],
  "allso-beauty": [
    { src: gd("1wVjBaXiiFClZtCghODURETydnXje7ow0"), label: "Launch event atmosphere" },
    { src: gd("1JYHFXL3tr3j_oKWzwaGgs8qILuGBAm-l"), label: "Beauty creator engagement" },
    { src: gd("1wBw6oMHHxChysWDRMdVP2XeaOp_B7Px3"), label: "Influencer storytelling" },
    { src: gd("1ZLWSPFlyIIq-TYndv3X6brjw3IKnfuRP"), label: "Brand moment" },
    { src: gd("1RqeGIsNoBbvN8Hg-zDvpuX8dIWeKKnf4"), label: "Digital amplification" },
    { src: "/photos/projects/cosmo-market.jpg", label: "Lifestyle context" },
  ],
  "abyan-salon": [
    { src: "/photos/projects/abyan-salon/DSC08926.JPG", label: "Salon environment" },
    { src: "/photos/projects/abyan-salon/DSC08859.JPG", label: "Beauty destination" },
    { src: "/photos/projects/abyan-salon/DSC08858.JPG.webp", label: "Spa experience" },
    { src: "/photos/projects/abyan-salon/DSC08860.JPG.webp", label: "Interior detail" },
    { src: "/photos/projects/abyan-salon/DSC08838.JPG.webp", label: "Treatment space" },
    { src: "/photos/projects/abyan-salon/DSC08846.JPG.webp", label: "Brand atmosphere" },
    { src: "/photos/projects/abyan-salon/DSC08835.JPG.webp", label: "Lifestyle editorial" },
    { src: "/photos/projects/abyan-salon/DSC08810.JPG.webp", label: "Visual identity" },
    { src: "/photos/projects/abyan-salon/DSC08749.JPG.webp", label: "Campaign detail" },
  ],
};

export function getProjectGallery(project: Pick<Project, "slug" | "title">): WorkImage[] {
  return projectGalleryImages[project.slug] ?? [
    { src: "/photos/projects/national-minorities-day.jpg", label: project.title },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Audience moment" },
    { src: "/photos/cinematic/c01.jpg", label: "Campaign texture" },
    { src: "/photos/cinematic/c02.jpg", label: "Editorial frame" },
    { src: "/photos/cinematic/c03.jpg", label: "Project atmosphere" },
    { src: "/photos/cinematic/c04.jpg", label: "Story detail" },
  ];
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
