export interface Service {
  slug: string;
  num: string;
  title: string;
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
    title: "Strategic Communications & PR",
    summary: "We shape how organisations are understood — by media, stakeholders, and the public.",
    body: "Strategic communications is the foundation of everything we do. We work with clients to develop narratives that are honest, compelling and built to last — then we execute them across every channel that matters. From media relations to crisis management to corporate storytelling, we ensure your organisation is positioned, protected and heard.",
    capabilities: [
      "Media relations and earned coverage",
      "Crisis communications and reputation management",
      "Stakeholder and public affairs",
      "Corporate communications and internal alignment",
      "Brand positioning and narrative development",
      "Spokesperson training and media coaching",
      "Issues management and monitoring",
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
    summary: "The right message, in the right place, at the right moment.",
    body: "Media without strategy is just noise. We plan, negotiate and place across every channel — TV, radio, print, digital and out-of-home — with a focus on reach efficiency and audience precision. We manage the full cycle from strategy to booking to post-campaign analysis, so every shilling is accountable.",
    capabilities: [
      "Integrated media planning and strategy",
      "TV, radio, print and digital media placement",
      "Out-of-home (OOH) and billboard advertising",
      "Sponsored content and editorial partnerships",
      "Media negotiation and rate management",
      "Campaign performance monitoring and reporting",
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
    title: "Influencer, Creator & Talent",
    summary: "We connect brands with the voices their audiences already trust.",
    body: "Influence is not about reach — it is about resonance. We identify, brief and manage creators and talent who genuinely align with your brand, your values and your audience. From one-off activations to long-term ambassador partnerships, we handle the full relationship so every collaboration is authentic, measurable and on-brief.",
    capabilities: [
      "Influencer identification, vetting and matching",
      "Campaign briefing and creative direction",
      "Contract negotiation and relationship management",
      "Content review and brand alignment oversight",
      "Performance tracking, analytics and reporting",
      "Long-term ambassador and partnership programmes",
      "AI-integrated content production and virtual campaigns",
    ],
    cards: [
      { bg: "#efccbe", label: "Creator Casting" },
      { bg: "#0a0a0a", label: "Ambassador Programmes", textColor: "#ffffff" },
      { bg: "#D98038", label: "AI Content" },
      { bg: "#F5F2EC", label: "Performance" },
    ],
  },
  {
    slug: "digital-strategy",
    num: "04",
    title: "Digital Strategy & Social Media",
    summary: "Consistent, strategic presence across the platforms that matter to your audience.",
    body: "Social media is not a broadcast tool — it is a conversation. We manage that conversation with editorial discipline, creative rigour and platform-specific intelligence. From strategy to content production to community management, we build and sustain digital presences that grow audiences, drive engagement and support business objectives.",
    capabilities: [
      "Social media strategy and platform planning",
      "Content creation: copywriting, photography direction, video",
      "Community management and audience engagement",
      "Paid social advertising and campaign management",
      "Editorial calendars and content workflows",
      "Analytics, monthly insights and performance reporting",
      "AI-integrated content production pipelines",
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
    title: "Experiential Marketing & Events",
    summary: "Experiences that put people inside the brand — not just in front of it.",
    body: "The most powerful brand moments are the ones people experience directly. We design and produce events and activations that are thoughtful, logistically sound and narratively coherent — whether a government national observance for thousands, a VIP brand launch for fifty, or a roadshow across multiple cities. Every touchpoint is intentional.",
    capabilities: [
      "Event concept development and creative direction",
      "Full-service event production and logistics",
      "Brand launches, activations and product reveals",
      "Government and high-profile event management",
      "Roadshows and multi-city campaign execution",
      "Live and hybrid event design",
      "Post-event PR, coverage and amplification",
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
