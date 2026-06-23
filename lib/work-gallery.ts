import { projects, type Project } from "@/components/lib/projects";
import type { WorkImage, WorkProject } from "@/components/lib/work-types";

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
    { src: "/photos/cinematic/c03.jpg", label: "Continental convening environment" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Delegate experience" },
    { src: "/photos/projects/africa-forum-displacement.jpg", label: "Stakeholder dialogue" },
    { src: "/photos/projects/columbia-building.jpg", label: "Urban infrastructure context" },
    { src: "/photos/cinematic/c04.jpg", label: "Forum rhythm" },
    { src: "/photos/cinematic/c05.jpg", label: "City futures visual language" },
  ],
  "utamaduni-day": [
    { src: "/photos/projects/utamaduni-day.jpg", label: "Utamaduni Day celebration" },
    { src: "/photos/projects/utamaduni-poster.jpg", label: "Campaign key visual" },
    { src: "/photos/projects/cultural-dancers.jpg", label: "Road show and performance" },
    { src: "/photos/editorial/cultural-festival.jpg", label: "Heritage festival detail" },
    { src: "/photos/cinematic/c06.jpg", label: "Broadcast texture" },
    { src: "/photos/cinematic/c07.jpg", label: "Cultural storytelling frame" },
  ],
  "lc-waikiki-africa": [
    { src: "/photos/projects/lc-waikiki-influencer.jpg", label: "Influencer campaign production" },
    { src: "/photos/projects/allso-beauty.jpg", label: "Fashion and beauty crossover" },
    { src: "/photos/projects/cosmo-market.jpg", label: "Retail lifestyle context" },
    { src: "/photos/cinematic/c08.jpg", label: "Social-first campaign frame" },
    { src: "/photos/cinematic/c09.jpg", label: "Multi-market story asset" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Audience response" },
  ],
  "kansai-plascon": [
    { src: "/photos/projects/kansai-gor-mahia.jpg", label: "Gor Mahia partnership launch" },
    { src: "/photos/projects/columbia-building.jpg", label: "Colour and built environment" },
    { src: "/photos/cinematic/c10.jpg", label: "Corporate storytelling frame" },
    { src: "/photos/cinematic/c11.jpg", label: "Stakeholder launch atmosphere" },
    { src: "/photos/projects/cosmo-market.jpg", label: "Community-facing brand moment" },
    { src: "/photos/cinematic/c12.jpg", label: "Campaign texture" },
  ],
  "thrive-hospitality-group": [
    { src: "/photos/projects/cosmo-market.jpg", label: "Hospitality lifestyle launch" },
    { src: "/photos/projects/tribe-vibe.jpg", label: "Creator and culture moment" },
    { src: "/photos/editorial/cultural-festival.jpg", label: "Experiential event energy" },
    { src: "/photos/projects/beauty-spa.jpg", label: "Destination detail" },
    { src: "/photos/cinematic/c01.jpg", label: "Hospitality atmosphere" },
    { src: "/photos/cinematic/c03.jpg", label: "Launch night texture" },
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
    { src: "/photos/projects/elysium-finance.jpg", label: "Institutional trust visual" },
  ],
  "wrc-safari-rally": [
    { src: "/photos/cinematic/c09.jpg", label: "Corporate sponsorship breakfast" },
    { src: "/photos/cinematic/c10.jpg", label: "Executive guest experience" },
    { src: "/photos/cinematic/c11.jpg", label: "Event visibility" },
    { src: "/photos/cinematic/c12.jpg", label: "Motorsport atmosphere" },
    { src: "/photos/projects/tribe-vibe.jpg", label: "Tourism and audience energy" },
    { src: "/photos/editorial/crowd-audience.jpg", label: "Stakeholder momentum" },
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
