export interface OwnedPlatform {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  shortDesc: string;
  intro: string;
  /** What the platform offers / scope */
  highlights: string[];
  /** Brand partnership opportunities */
  partnerships: string[];
  /** Featured partners (Suhba primarily, others left empty for now) */
  partners?: { name: string; role: string; note?: string; logo?: string }[];
  /** Photo gallery — Google Drive direct URLs or local /public paths */
  gallery?: string[];
  image: string;
  accent: string;
  logo: string;
  logoDark?: boolean;
}

export const platforms: OwnedPlatform[] = [
  {
    slug: "the-tribe-vibe",
    num: "01",
    name: "The Tribe Vibe",
    tagline: "Lifestyle · Music · Culture · Community",
    shortDesc:
      "FID & Co.'s flagship experiential lifestyle platform, bringing together music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    intro:
      "More than an event, The Tribe Vibe has evolved into a lifestyle-driven cultural platform where entertainment, digital storytelling and brand engagement intersect. Hosted across some of Nairobi's most sought-after lifestyle venues.",
    highlights: [
      "Music and live entertainment",
      "Influencer culture and creator visibility",
      "Hospitality experiences",
      "Fashion and lifestyle moments",
      "Social-first audience engagement",
    ],
    partnerships: [
      "Sponsored experiences and installations",
      "Beverage and hospitality partnerships",
      "Fashion and lifestyle integrations",
      "Creator-led campaigns",
      "Content collaborations",
      "Digital amplification partnerships",
    ],
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/tribe-vibe",
    accent: "#d98038",
    logo: "/logos/tribe-vibe.png",
    logoDark: false,
  },
  {
    slug: "suhba-series",
    num: "02",
    name: "Suhba Series",
    tagline: "Curated Conversations · Modern Identity · Thoughtful Experiences",
    shortDesc:
      "An intimate conversation platform created to foster meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    intro:
      "Set within refined and intentionally curated environments, the series combines conversation, community and lifestyle experiences to create moments that feel both personal and culturally relevant. Suhba is intentionally designed for audiences seeking more thoughtful and meaningful experiences beyond traditional networking.",
    highlights: [
      "Curated panel discussions",
      "High tea and networking experiences",
      "Storytelling and moderated conversations",
      "Wellness and empowerment themes",
      "Brand and community engagement",
    ],
    partnerships: [
      "Title sponsorships",
      "Financial and wellness partnerships",
      "Product integration and experiential sampling",
      "Thought-leadership positioning",
      "Branded conversation segments",
      "Content and digital storytelling collaborations",
    ],
    partners: [
      { name: "ABSA La Riba", role: "Financial Partner", logo: "/logos/suhba-partners/absa.png" },
      { name: "Gulf Bank", role: "Banking Partner", logo: "/logos/suhba-partners/gulf-bank.png" },
      { name: "Luton Hospital Foundation", role: "Wellness & Community Partner" },
      { name: "Abyan Salon & Spa", role: "Beauty & Self-Care Partner", logo: "/logos/suhba-partners/abyan-salon-spa.png" },
      { name: "Kingfisher Nest Hotel", role: "Hospitality Partner", logo: "/logos/suhba-partners/kingfisher-nest-hotel.png" },
      { name: "Goodlife Pharmacy", role: "Wellness Partner", logo: "/logos/suhba-partners/goodlife-pharmacy.png" },
      { name: "Allso Beauty", role: "Beauty Partner", logo: "/logos/suhba-partners/allso-beauty.png" },
      { name: "Dessert Galore", role: "Experience Partner" },
    ],
    gallery: [
      "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/suhba-01",
      "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/suhba-02",
      "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/suhba-03",
      // NB: these FID/glam-0X public_ids actually hold Suhba Series photos
      // (mislabeled on upload) — used here for the correct campaign, deduped.
      "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/glam-05",
      "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/glam-06",
      "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/glam-02",
    ],
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/suhba-01",
    accent: "#750006",
    logo: "/logos/suhba-series.png",
    logoDark: false,
  },
  {
    slug: "the-capital-room",
    num: "03",
    name: "The Capital Room",
    tagline: "Leadership · Business · Influence · African Perspectives",
    shortDesc:
      "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets — bringing together founders, executives and changemakers.",
    intro:
      "Positioned at the intersection of business and culture, The Capital Room explores entrepreneurship, leadership, African business and investment, innovation, personal growth and modern influence. Unlike traditional business forums, it is designed to feel conversational, culturally grounded and accessible, while still maintaining depth and credibility.",
    highlights: [
      "Entrepreneurship and leadership journeys",
      "African business and investment conversations",
      "Innovation and market-building",
      "Personal growth and resilience",
      "Modern influence and cultural shifts",
    ],
    partnerships: [
      "Executive and leadership positioning",
      "Corporate and investment partnerships",
      "Thought leadership integrations",
      "Sponsored conversations and panels",
      "Business audience engagement",
      "Premium networking experiences",
    ],
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/podcast-set",
    accent: "#1c1c1c",
    logo: "/logos/capital-room.png",
    logoDark: true,
  },
];

export function getPlatformBySlug(slug: string): OwnedPlatform | undefined {
  return platforms.find((p) => p.slug === slug);
}
