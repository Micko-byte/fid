export interface ServiceCard {
  bg: string;
  label: string;
  textColor?: string;
  image?: string;
  imageAlt?: string;
}

export interface Service {
  slug: string;
  num: string;
  title: string;
  iconName: string; // maps to a Phosphor icon in client components
  summary: string;
  body: string;
  detailParagraphs: string[];
  capabilities: string[];
  cards: ServiceCard[];
}

export const services: Service[] = [
  {
    slug: "strategic-communications",
    num: "01",
    title: "Strategic Communications & Public Relations",
    iconName: "Megaphone",
    summary: "We design and implement comprehensive public relations strategies that build credibility, shape narratives and protect reputation.",
    body: "We maintain strong working relationships with national, regional and international media, enabling us to secure accurate, credible and high-value coverage for our clients.",
    detailParagraphs: [
      "Our PR work includes media relations and press office management, strategic messaging and narrative development, corporate and institutional communications, executive and thought-leadership positioning, issues management and reputational risk mitigation, and crisis communications planning and response.",
      "We build communications that are strategic, culturally grounded and resilient enough to support organisations operating in high-scrutiny environments.",
    ],
    capabilities: [
      "Media relations and press office management",
      "Strategic messaging and narrative development",
      "Corporate and institutional communications",
      "Executive and thought-leadership positioning",
      "Issues management and reputational risk mitigation",
      "Crisis communications planning and response",
    ],
    cards: [
      { bg: "#260000", label: "Media Relations", textColor: "#F5F2EC", image: "/illustrations/expertise/media-relations.jfif", imageAlt: "Media relations" },
      { bg: "#F5F2EC", label: "Crisis Comms", image: "/illustrations/expertise/crisis-comms.jpg", imageAlt: "Crisis communications" },
      { bg: "#D98038", label: "Brand Narrative", textColor: "#260000", image: "/illustrations/expertise/brand-narrative.jfif", imageAlt: "Brand narrative" },
      { bg: "#1C1C1C", label: "Stakeholder Affairs", textColor: "#F5F2EC", image: "/illustrations/expertise/stakeholder-affairs.jfif", imageAlt: "Stakeholder affairs" },
    ],
  },
  {
    slug: "media-management",
    num: "02",
    title: "Media Management & Buying",
    iconName: "Television",
    summary: "FID & Co. manages media strategy from planning to placement, ensuring optimal reach, value and effectiveness.",
    body: "This capability has been critical in government campaigns, national celebrations, corporate launches and high-visibility brand activations.",
    detailParagraphs: [
      "Our media work includes media planning, strategy and channel selection, media buying across print, broadcast and digital, negotiation and placement management, and media monitoring, evaluation and reporting.",
      "We translate strategy into the right placements, balancing budget efficiency with audience relevance and campaign visibility.",
    ],
    capabilities: [
      "Media planning, strategy and channel selection",
      "Media buying across print, broadcast and digital",
      "Negotiation and placement management",
      "Media monitoring, evaluation and reporting",
    ],
    cards: [
      { bg: "#e8e8e8", label: "Planning", image: "/illustrations/expertise/planning.jfif", imageAlt: "Media planning" },
      { bg: "#750006", label: "Placement", textColor: "#F5F2EC", image: "/illustrations/expertise/placement.jfif", imageAlt: "Media placement" },
      { bg: "#D9AB88", label: "OOH & Print", image: "/photos/projects/kansai-plascon/kansai-01.jpg", imageAlt: "Out of home and print media" },
      { bg: "#262a36", label: "Analytics", textColor: "#F5F2EC", image: "/illustrations/expertise/analytics.jfif", imageAlt: "Media analytics" },
    ],
  },
  {
    slug: "influencer-creator",
    num: "03",
    title: "Influencer, Creator & Talent Engagement",
    iconName: "UsersThree",
    summary: "We design and manage influencer-led campaigns that prioritise authentic alignment and audience relevance.",
    body: "This work spans retail, fashion, hospitality, beauty, sport and corporate brands.",
    detailParagraphs: [
      "Our influencer services include influencer and talent strategy development, creator sourcing, contracting and management, content briefing and quality assurance, campaign execution and reporting, and long-term brand-creator partnerships.",
      "We treat creator partnerships as a strategic channel, not just a media buy, so every collaboration fits the audience, the platform and the brand story.",
    ],
    capabilities: [
      "Influencer and talent strategy development",
      "Creator sourcing, contracting and management",
      "Content briefing and quality assurance",
      "Campaign execution and reporting",
      "Long-term brand-creator partnerships",
    ],
    cards: [
      { bg: "#efccbe", label: "Creator Casting", image: "/illustrations/expertise/creator-casting.jfif", imageAlt: "Creator casting" },
      { bg: "#1c1c1c", label: "Ambassador Programmes", textColor: "#ffffff", image: "/illustrations/expertise/ambassador-programme.png", imageAlt: "Ambassador programme" },
      { bg: "#D98038", label: "AI Content", textColor: "#260000", image: "/illustrations/expertise/ai-content.jfif", imageAlt: "AI content" },
      { bg: "#F5F2EC", label: "Performance", image: "/illustrations/expertise/performance.jfif", imageAlt: "Performance" },
    ],
  },
  {
    slug: "digital-strategy",
    num: "04",
    title: "Digital Strategy, Content & Social Media",
    iconName: "DeviceMobileCamera",
    summary: "FID & Co. builds digital ecosystems that are strategic, consistent and performance-driven.",
    body: "We combine creative storytelling with data, technology and platform intelligence to support brand visibility, audience engagement and long-term relevance across owned and paid digital platforms.",
    detailParagraphs: [
      "Our digital delivery includes digital content and platform strategy, social media management and community engagement, campaign content production, after-movies, documentaries and branded video productions, AI-integrated creative production and digital innovation, and platform optimisation, analytics and performance reporting.",
      "We create content systems that are built to travel across platforms while still feeling tailored to the audience at each touchpoint.",
    ],
    capabilities: [
      "Digital content and platform strategy",
      "Social media management and community engagement",
      "Campaign content production (photography, video, reels)",
      "After-movies, documentaries and branded video productions",
      "AI-integrated creative production and digital innovation",
      "Platform optimisation, analytics and performance reporting",
    ],
    cards: [
      { bg: "#262a36", label: "Strategy", textColor: "#ffffff", image: "/illustrations/expertise/strategy.jfif", imageAlt: "Digital strategy" },
      { bg: "#43d491", label: "Content Creation", image: "/illustrations/expertise/content-creation.jfif", imageAlt: "Content creation" },
      { bg: "#1C1C1C", label: "Paid Social", textColor: "#F5F2EC", image: "/illustrations/expertise/paid-social.jfif", imageAlt: "Paid social" },
      { bg: "#F5F2EC", label: "Analytics", image: "/illustrations/expertise/analytics.jfif", imageAlt: "Analytics" },
    ],
  },
  {
    slug: "experiential-marketing",
    num: "05",
    title: "Experiential Marketing, Events & Brand Activations",
    iconName: "Confetti",
    summary: "Experiential execution is a core strength of FID & Co. We design and deliver immersive brand experiences that connect strategy with audience engagement and measurable impact.",
    body: "Our scope typically includes creative concept development, event branding and visual systems, fabrication and installation, guest list curation and protocol management, media hosting and influencer attendance, and end-to-end production and on-ground execution.",
    detailParagraphs: [
      "We conceptualise and deliver national and state events, product launches and corporate activations, sponsorship events and stakeholder engagements, roadshows and on-ground consumer activations, in-store activations and retail experience campaigns, and lifestyle, cultural and entertainment experiences.",
      "Our work is built to make a brand feel present in the room and memorable long after the event ends.",
    ],
    capabilities: [
      "National and state events",
      "Product launches and corporate activations",
      "Sponsorship events and stakeholder engagements",
      "Roadshows and on-ground consumer activations",
      "In-store activations and retail experience campaigns",
      "Lifestyle, cultural and entertainment experiences",
    ],
    cards: [
      { bg: "#750006", label: "Event Production", textColor: "#F5F2EC", image: "/illustrations/expertise/event-production.jfif", imageAlt: "Event production" },
      { bg: "#D9AB88", label: "Brand Activations", image: "/photos/projects/thrive-hospitality/glam-01.jpg", imageAlt: "Brand activations" },
      { bg: "#260000", label: "Government Events", textColor: "#F5F2EC", image: "/photos/projects/national-minorities-day.jpg", imageAlt: "Government events" },
      { bg: "#e8e8e8", label: "Roadshows", image: "/photos/projects/utamaduni-day.jpg", imageAlt: "Roadshows" },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
