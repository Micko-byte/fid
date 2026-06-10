export interface Project {
  slug: string;
  client: string;
  sector: string;
  years: string;
  title: string;
  desc: string;
  scope: string[];
  impact: string;
  color?: string; // accent color for hero
}

export const projects: Project[] = [
  {
    slug: "national-minorities-day",
    client: "Executive Office of the President – Kenya",
    sector: "Government & Public Institutions",
    years: "2024–2026",
    title: "National Minorities Day",
    desc: "Creative and communications agency for Kenya's flagship national observance led by the Executive Office of the President. Delivered with the sensitivity that high-level government mandates demand — while achieving measurable national media impact.",
    scope: [
      "Creative direction and theme development",
      "Event branding and identity systems",
      "Fabrication and on-ground installation",
      "Media booking and buying",
      "Public relations strategy and execution",
      "Influencer marketing and digital amplification",
      "Stakeholder visibility and national media coverage",
    ],
    impact: "High-level government communication delivered with sensitivity, accuracy and national impact.",
    color: "#750006",
  },
  {
    slug: "africa-urban-forum-2026",
    client: "Africa Urban Forum (AUF) 2026",
    sector: "Government & Public Institutions",
    years: "2026",
    title: "Continental Urban Development Forum",
    desc: "On-ground experience delivery for the Africa Urban Forum — a high-level continental convening involving the African Union and Kenya's State Department for Housing and Urban Development. Managed a multi-stakeholder environment demanding precision logistics and media coordination.",
    scope: [
      "Audience experience coordination",
      "Event support within a high-level multi-stakeholder environment",
      "Stakeholder and media engagement",
    ],
    impact: "Advanced dialogue around urban development, sustainable cities and infrastructure, and the future of African urban spaces.",
    color: "#D98038",
  },
  {
    slug: "utamaduni-day",
    client: "State Department for Culture, Arts & Heritage",
    sector: "Government & Public Institutions",
    years: "2024",
    title: "Utamaduni Day",
    desc: "Led creative direction, marketing strategy and media engagement for Utamaduni Day 2024 — Kenya's national celebration of cultural heritage. From concept through to broadcast, every element was crafted to honour the country's diverse traditions.",
    scope: [
      "Creative concept development",
      "Branding and visual assets",
      "Social media content and amplification",
      "Road shows",
      "Media booking, PR coverage and interviews",
      "TV commercials, print advertising and event visibility",
    ],
    impact: "Supported national cultural celebration and storytelling, reinforcing Kenya's diverse heritage across media platforms.",
    color: "#D9AB88",
  },
  {
    slug: "lc-waikiki-africa",
    client: "LC Waikiki Sub-Saharan Africa",
    sector: "Retail & Fashion",
    years: "2024–2026",
    title: "Digital & Communications Agency",
    desc: "Official digital and communications agency for LC Waikiki Africa across multiple Sub-Saharan markets. Delivering locally resonant storytelling while maintaining global brand alignment — simultaneously managing Kenya, Uganda and Zambia.",
    scope: [
      "Digital content strategy and creation",
      "Social media management across markets",
      "Influencer identification and engagement",
      "Campaign execution and reporting",
      "Internal communications videos for Kenya, Uganda and Zambia",
      "Padel sponsorship activation",
      "AI-integrated digital production and virtual model campaigns",
    ],
    impact: "Delivered scaled creative output across multiple African markets while maintaining brand consistency and global alignment.",
    color: "#750006",
  },
  {
    slug: "kansai-plascon",
    client: "Kansai Plascon Paints Kenya",
    sector: "Manufacturing & Corporate Brands",
    years: "2025–2026",
    title: "Gor Mahia Partnership & Communications Partner",
    desc: "Led communications for the landmark Gor Mahia partnership launch and appointed Official Communications Partner for Kansai Plascon Paints Kenya. Built the brand's narrative around communities, craft and colour.",
    scope: [
      "Strategic communications planning",
      "Brand narrative and messaging refinement",
      "Production events curation",
      "Media relations and corporate storytelling",
      "Influencer and content strategy",
      "Stakeholder and partner communications",
    ],
    impact: "Positioned Kansai Plascon as a market leader shaping spaces, communities and lifestyles across Kenya.",
    color: "#D98038",
  },
  {
    slug: "thrive-hospitality-group",
    client: "Thrive Hospitality Group",
    sector: "Hospitality, Lifestyle & Destination Brands",
    years: "Ongoing",
    title: "Brand Launches & Repositioning",
    desc: "Communications partner across the full Thrive Hospitality Group portfolio — Café NBO, Glam Hotel, Social 8, Chaii Republic and Kingfisher Nest Hotel. Each property required its own distinct voice, audience and launch strategy.",
    scope: [
      "Brand positioning and launch strategy",
      "Influencer and creator engagement",
      "Media hosting and lifestyle PR",
      "Experiential event design and execution",
      "Content strategy for digital platforms",
      "On-ground event production and coordination",
    ],
    impact: "Each property launched as a distinct lifestyle destination with a clear audience, story and visual identity.",
    color: "#D9AB88",
  },
  {
    slug: "africa-forum-on-displacements",
    client: "The Amahoro Coalition & UNHCR",
    sector: "Social Impact & Multilateral Partnerships",
    years: "2023",
    title: "Africa Forum on Displacements — Accra, Ghana",
    desc: "Communications and media engagement for the Private Sector Forum on Displaced Persons held during the Africa Forum on Displacements, Accra. Coordinated multilateral media access across multiple African markets.",
    scope: [
      "Strategic communications support for the forum",
      "Media engagement and interview coordination across multiple African markets",
      "Development of key messaging",
      "Coordination of spokesperson interviews with regional and international media",
      "Amplification of forum outcomes through earned media coverage",
    ],
    impact: "Elevated conversations around private-sector leadership and sustainable solutions for displaced persons across Africa.",
    color: "#750006",
  },
  {
    slug: "columbia-africa-healthcare",
    client: "Columbia Africa Healthcare",
    sector: "Healthcare & Medical Institutions",
    years: "2025",
    title: "Strategic Communications & Internal Alignment",
    desc: "Strategic communications and internal alignment across healthcare facilities for one of Kenya's leading networks of hospitals and clinics. Built visual stories that reinforce institutional trust and care standards.",
    scope: [
      "Internal communications video profiles for hospitals and clinics",
      "Digital display content for healthcare facilities",
      "Visual storytelling highlighting medical services, facilities and care standards",
    ],
    impact: "Enhanced stakeholder confidence and reinforced Columbia Africa's reputation as a trusted healthcare provider.",
    color: "#D98038",
  },
  {
    slug: "wrc-safari-rally",
    client: "WRC Safari Rally",
    sector: "Sports & Tourism",
    years: "2022",
    title: "Corporate Sponsorship Breakfast",
    desc: "Strategic communications and event support for the WRC Safari Rally Corporate Sponsorship Breakfast. Curated a high-value guest list and positioned the event to secure corporate buy-in ahead of one of motorsport's most iconic fixtures.",
    scope: [
      "Identification and curation of potential corporate sponsors",
      "Strategic guest list development (150+ CEOs and decision-makers)",
      "Event positioning and stakeholder engagement",
      "Media support and visibility",
    ],
    impact: "Mobilised corporate support ahead of the global motorsport event, reinforcing Kenya's position on the international rally calendar.",
    color: "#D9AB88",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
