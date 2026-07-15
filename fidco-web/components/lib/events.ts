export interface FidEvent {
  slug: string;
  name: string;
  tagline: string;
  date: string;
  location: string;
  status: "upcoming" | "recurring";
  description: string;
  image: string;
  ticketUrl: string;
}

export const events: FidEvent[] = [
  {
    slug: "the-tribe-vibe",
    name: "The Tribe Vibe",
    tagline: "Lifestyle • Music • Culture • Community",
    date: "Sun, 27 July",
    location: "Nairobi · Lifestyle Venue",
    status: "upcoming",
    description:
      "FID & Co.'s flagship experiential lifestyle platform — a curated day experience blending music, hospitality, creator culture and socially engaged urban audiences. More than an event: a lifestyle-driven cultural platform where entertainment, storytelling and brand engagement intersect.",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/tribe-vibe",
    ticketUrl: "#",
  },
  {
    slug: "suhba-series",
    name: "Suhba Series",
    tagline: "Curated Conversations • Modern Identity • Wellbeing",
    date: "Upcoming Edition",
    location: "Nairobi · Curated Setting",
    status: "upcoming",
    description:
      "An intimate conversation platform fostering meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences. Each edition brings together professionals, creatives, entrepreneurs and thought leaders through curated panels, high tea and moderated conversations.",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/cultural-festival",
    ticketUrl: "#",
  },
  {
    slug: "the-capital-room",
    name: "The Capital Room",
    tagline: "Leadership • Business • Influence • African Perspectives",
    date: "Upcoming Edition",
    location: "Nairobi · Boardroom Setting",
    status: "upcoming",
    description:
      "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets. Bringing together founders, executives, creatives, policymakers and changemakers for reflective conversations around ambition, resilience, growth and influence.",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/podcast-set",
    ticketUrl: "#",
  },
];
