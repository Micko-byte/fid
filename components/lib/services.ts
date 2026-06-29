export interface Service {
  slug: string;
  num: string;
  title: string;
  iconName: string; // maps to a Phosphor icon in client components
  summary: string;
  body: string;
  capabilities: string[];
  // Clase bcn style card fills
  cards: Array<{ bg: string; label: string; textColor?: string }>;
}

export const services: Service[] = [
  {
    slug: "strategic-communications",
    num: "01",
    title: "Strategic Communications & Public Relations",
    iconName: "Megaphone",
    summary: "We design and implement comprehensive public relations strategies that build credibility, shape narratives and protect reputation.",
    body: "We design and implement comprehensive public relations strategies that build credibility, shape narratives and protect reputation. We maintain strong working relationships with national, regional and international media, enabling us to secure accurate, credible and high-value coverage for our clients.",
    capabilities: [
      "Media relations and press office management",
      "Strategic messaging and narrative development",
      "Corporate and institutional communications",
      "Executive and thought-leadership positioning",
      "Issues management and reputational risk mitigation",
      "Crisis communications planning and response",
    ],
    cards: [
      { bg: "#260000", label: "Media Relations", textColor: "#F5F2EC" },
      { bg: "#F5F2EC", label: "Crisis Comms" },
      { bg: "#D98038", label: "Brand Narrative", textColor: "#260000" },
      { bg: "#1C1C1C", label: "Stakeholder Affairs", textColor: "#F5F2EC" },
    ],
  },
  {
    slug: "media-management",
    num: "02",
    title: "Media Management & Buying",
    iconName: "Television",
    summary: "FID & Co. manages media strategy from planning to placement, ensuring optimal reach, value and effectiveness.",
    body: "FID & Co. manages media strategy from planning to placement, ensuring optimal reach, value and effectiveness. This capability has been critical in government campaigns, national celebrations, corporate launches and high-visibility brand activations.",
    capabilities: [
      "Media planning, strategy and channel selection",
      "Media buying across print, broadcast and digital",
      "Negotiation and placement management",
      "Media monitoring, evaluation and reporting",
    ],
    cards: [
      { bg: "#e8e8e8", label: "Planning" },
      { bg: "#750006", label: "Placement", textColor: "#F5F2EC" },
      { bg: "#D9AB88", label: "OOH & Print" },
      { bg: "#262a36", label: "Analytics", textColor: "#F5F2EC" },
    ],
  },
  {
    slug: "influencer-creator",
    num: "03",
    title: "Influencer, Creator & Talent Engagement",
    iconName: "UsersThree",
    summary: "We design and manage influencer-led campaigns that prioritise authentic alignment and audience relevance.",
    body: "We design and manage influencer-led campaigns that prioritise authentic alignment and audience relevance. This work spans retail, fashion, hospitality, beauty, sport and corporate brands.",
    capabilities: [
      "Influencer and talent strategy development",
      "Creator sourcing, contracting and management",
      "Content briefing and quality assurance",
      "Campaign execution and reporting",
      "Long-term brand–creator partnerships",
    ],
    cards: [
      { bg: "#efccbe", label: "Creator Casting" },
      { bg: "#1c1c1c", label: "Ambassador Programmes", textColor: "#ffffff" },
      { bg: "#D98038", label: "AI Content" },
      { bg: "#F5F2EC", label: "Performance" },
    ],
  },
  {
    slug: "digital-strategy",
    num: "04",
    title: "Digital Strategy, Content & Social Media",
    iconName: "DeviceMobileCamera",
    summary: "FID & Co. builds digital ecosystems that are strategic, consistent and performance-driven, combining creative storytelling with data, technology and platform intelligence.",
    body: "FID & Co. builds digital ecosystems that are strategic, consistent and performance-driven, combining creative storytelling with data, technology and platform intelligence. Our digital delivery is designed to support brand visibility, audience engagement and long-term relevance across owned and paid digital platforms.",
    capabilities: [
      "Digital content and platform strategy",
      "Social media management and community engagement",
      "Campaign content production (photography, video, reels)",
      "After-movies, documentaries and branded video productions",
      "AI-integrated creative production and digital innovation",
      "Platform optimisation, analytics and performance reporting",
    ],
    cards: [
      { bg: "#262a36", label: "Strategy", textColor: "#ffffff" },
      { bg: "#43d491", label: "Content Creation" },
      { bg: "#1C1C1C", label: "Paid Social", textColor: "#F5F2EC" },
      { bg: "#F5F2EC", label: "Analytics" },
    ],
  },
  {
    slug: "experiential-marketing",
    num: "05",
    title: "Experiential Marketing, Events & Brand Activations",
    iconName: "Confetti",
    summary: "Experiential execution is a core strength of FID & Co. We design and deliver immersive brand experiences that connect strategy with audience engagement and measurable impact.",
    body: "Experiential execution is a core strength of FID & Co. We design and deliver immersive brand experiences that connect strategy with audience engagement and measurable impact. Our scope typically includes creative concept development, event branding and visual systems, fabrication and installation, guest list curation and protocol management, media hosting and influencer attendance, and end-to-end production and on-ground execution.",
    capabilities: [
      "National and state events",
      "Product launches and corporate activations",
      "Sponsorship events and stakeholder engagements",
      "Roadshows and on-ground consumer activations",
      "In-store activations and retail experience campaigns",
      "Lifestyle, cultural and entertainment experiences",
    ],
    cards: [
      { bg: "#750006", label: "Event Production", textColor: "#F5F2EC" },
      { bg: "#D9AB88", label: "Brand Activations" },
      { bg: "#260000", label: "Government Events", textColor: "#F5F2EC" },
      { bg: "#e8e8e8", label: "Roadshows" },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
