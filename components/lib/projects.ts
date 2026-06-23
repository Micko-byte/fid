export interface SubProperty {
  name: string;
  desc: string;
}

export interface Project {
  slug: string;
  client: string;
  sector: string;
  years: string;
  title: string;
  desc: string;
  body?: string;
  scope: string[];
  impact: string;
  color?: string;
  properties?: SubProperty[];
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
    body: "The Africa Urban Forum brought together heads of state, ministers, urban planners, development finance institutions and civil society from across the continent to shape the future of African cities. FID & Co. was entrusted with audience experience coordination within this high-pressure, high-visibility environment — ensuring every delegate interaction, media moment and logistics touchpoint reflected the gravity of the convening.",
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
    body: "Kansai Plascon's partnership with Gor Mahia — one of Kenya's most iconic football clubs — was more than a sponsorship. It was a cultural statement. FID & Co. architected the communications strategy around this landmark moment, translating the brand's commitment to colour, community and craft into earned media, digital content and live activation. As the Official Communications Partner, we continue to shape Plascon's narrative presence across corporate and consumer touchpoints.",
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
    body: "FID & Co. has worked closely with Thrive Hospitality Group across multiple properties, supporting brand launches, repositioning, experiential activations and ongoing communications. Our role has been to ensure each property launches and operates not just as a venue, but as a distinct lifestyle destination with a clear audience, story and visual identity.",
    scope: [
      "Brand positioning and launch strategy",
      "Influencer and creator engagement (IG & TikTok)",
      "Media hosting and lifestyle PR",
      "Experiential event design and execution",
      "Content strategy for digital platforms",
      "On-ground event production and coordination",
    ],
    impact: "Each property launched as a distinct lifestyle destination with a clear audience, story and visual identity.",
    color: "#D9AB88",
    properties: [
      {
        name: "Café NBO",
        desc: "Supported brand launch and visibility through curated influencer experiences, media engagement and digital storytelling, positioning Café NBO as a contemporary, urban café concept.",
      },
      {
        name: "Glam Hotel – Westlands",
        desc: "Led rooftop launch events, influencer hosting and lifestyle media engagement, positioning Glam Hotel as a premium lifestyle and nightlife destination in Westlands.",
      },
      {
        name: "Social 8",
        desc: "Supported ongoing brand experiences, influencer activations and content amplification, reinforcing Social 8's positioning as a social dining and lifestyle space.",
      },
      {
        name: "Chaii Republic",
        desc: "Delivered concept launch support, influencer engagement and experiential storytelling to introduce Chaii Republic as a modern tea and social culture brand.",
      },
      {
        name: "Kingfisher Nest Hotel",
        desc: "Led launch activations, media hosting and experiential curation, supporting the hotel's entry into Nairobi's hospitality market with strong visibility and brand recall.",
      },
    ],
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
  {
    slug: "allso-beauty",
    client: "Allso Beauty",
    sector: "Beauty, Wellness & Lifestyle",
    years: "2024",
    title: "Brand Launch & Experiential Campaign",
    desc: "FID & Co. led the brand launch and experiential campaign for Allso Beauty, introducing the cosmetics brand to the Kenyan market through a curated beauty and influencer experience.",
    body: "Our role focused on creating a launch moment that combined experiential storytelling, influencer engagement and digital amplification, positioning Allso Beauty within the contemporary beauty and lifestyle space. The launch brought together beauty creators, media and lifestyle influencers, generating strong digital engagement while introducing Allso Beauty to a style-conscious audience.",
    scope: [
      "Launch event concept and experiential design",
      "Influencer and beauty creator engagement",
      "Media invitations and lifestyle PR support",
      "Content creation and social media amplification",
      "Brand storytelling through creator-led content",
    ],
    impact: "Successfully introduced Allso Beauty to Kenya's style-conscious audience through a launch moment that drove strong digital engagement and media coverage.",
    color: "#D9AB88",
  },
  {
    slug: "abyan-salon",
    client: "Abyan Salon & Spa",
    sector: "Beauty, Wellness & Lifestyle",
    years: "2023–2024",
    title: "Brand Revitalisation",
    desc: "Brand revitalisation including rebranding, website development, content strategy and digital campaigns, repositioning Abyan as a leading beauty destination.",
    scope: [
      "Brand strategy and rebranding",
      "Website design and development",
      "Content strategy and production",
      "Digital campaign execution",
      "Photography direction and visual identity refresh",
      "Social media management and community building",
    ],
    impact: "Repositioned Abyan Salon & Spa as a leading beauty destination, with a refreshed visual identity and digital presence to match.",
    color: "#750006",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
