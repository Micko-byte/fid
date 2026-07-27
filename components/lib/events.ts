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
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/tribe-vibe",
    ticketUrl: "#",
  },
  {
    slug: "suhba-series",
    name: "Suhba Series — Edition 02",
    tagline: "Becoming Her • A Curated High Tea Experience",
    date: "Sat, 3 Oct 2026 · 2:00–5:00 PM",
    location: "Mövenpick Hotel & Residences, Nairobi",
    status: "upcoming",
    description:
      "Following the success of the inaugural edition, the conversation continues. Becoming Her brings women together for a curated high tea experience of meaningful dialogue around identity, leadership and wellbeing. Early Access KES 3,500 · Standard KES 4,000.",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/suhba-02",
    ticketUrl: "https://mookh.com/event/suhba-series-by-fid-pr-2/",
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
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/podcast-set",
    ticketUrl: "#",
  },
];
