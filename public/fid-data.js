/* ════════════════════════════════════════════════════════════════════
   FID & Co. — shared data (projects + sectors)
   Loaded by both the home page and the case-study page.
   Drop real images at the paths under `images:` and they appear
   automatically; until then a branded placeholder shows.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  window.FID_PROJECTS = [
    {
      slug: "national-minorities-day",
      client: "Executive Office of the President — Kenya",
      sector: "Government & Public Institutions",
      years: "2024–2026",
      title: "National Minorities Day",
      tagline: "A national observance, staged with the weight it deserves.",
      desc: "Creative and communications agency for Kenya's flagship national observance led by the Executive Office of the President.",
      scope: ["Creative direction and theme development", "Event branding and identity systems", "Fabrication and on-ground installation", "Media booking and buying", "Public relations strategy and execution", "Influencer marketing and digital amplification", "Stakeholder visibility and national media coverage"],
      impact: "High-level government communication delivered with sensitivity, accuracy and national impact.",
      images: [
        { src: "public/work/national-minorities-day/1.jpg", label: "main stage & national branding" },
        { src: "public/work/national-minorities-day/2.jpg", label: "identity system in context" },
        { src: "public/work/national-minorities-day/3.jpg", label: "on-ground activation" },
        { src: "public/work/national-minorities-day/4.jpg", label: "press & dignitary coverage" }
      ]
    },
    {
      slug: "africa-urban-forum",
      client: "Africa Urban Forum (AUF) 2026",
      sector: "Government & Public Institutions",
      years: "2026",
      title: "Continental Urban Development Forum",
      tagline: "Convening a continent around the future of its cities.",
      desc: "On-ground experience delivery for the Africa Urban Forum — a high-level continental convening with the African Union and Kenya's State Department for Housing and Urban Development.",
      scope: ["Audience experience coordination", "Event support within a high-level multi-stakeholder environment", "Stakeholder and media engagement"],
      impact: "Advanced dialogue around urban development, sustainable cities and infrastructure, and the future of African urban spaces.",
      images: [
        { src: "public/work/africa-urban-forum/1.jpg", label: "plenary experience" },
        { src: "public/work/africa-urban-forum/2.jpg", label: "delegate journey" },
        { src: "public/work/africa-urban-forum/3.jpg", label: "stakeholder engagement" }
      ]
    },
    {
      slug: "utamaduni-day",
      client: "State Department for Culture, Arts & Heritage",
      sector: "Government & Public Institutions",
      years: "2024",
      title: "Utamaduni Day",
      tagline: "Celebrating the breadth of Kenya's living heritage.",
      desc: "Led creative direction, marketing strategy and media engagement for Utamaduni Day 2024.",
      scope: ["Creative concept development", "Branding and visual assets", "Social media content and amplification", "Road shows", "Media booking, PR coverage and interviews", "TV commercials, print advertising and event visibility"],
      impact: "Supported national cultural celebration and storytelling, reinforcing Kenya's diverse heritage across media platforms.",
      images: [
        { src: "public/work/utamaduni-day/1.jpg", label: "campaign key visual" },
        { src: "public/work/utamaduni-day/2.jpg", label: "road show moments" },
        { src: "public/work/utamaduni-day/3.jpg", label: "broadcast & print" }
      ]
    },
    {
      slug: "lc-waikiki",
      client: "LC Waikiki Sub-Saharan Africa",
      sector: "Retail & Fashion",
      years: "2024–2026",
      title: "Digital & Communications Agency",
      tagline: "One brand voice, tuned for many African markets.",
      desc: "Official digital and communications agency for LC Waikiki Africa across multiple Sub-Saharan markets — delivering locally relevant yet globally aligned storytelling.",
      scope: ["Digital content strategy and creation", "Social media management across markets", "Influencer identification and engagement", "Campaign execution and reporting", "Internal communications videos for Kenya, Uganda and Zambia", "Padel sponsorship activation", "AI-integrated digital production and virtual model campaigns"],
      impact: "Delivered scaled creative output across multiple African markets while maintaining brand consistency and global alignment.",
      images: [
        { src: "public/work/lc-waikiki/1.jpg", label: "campaign photography" },
        { src: "public/work/lc-waikiki/2.jpg", label: "social-first content" },
        { src: "public/work/lc-waikiki/3.jpg", label: "influencer activation" },
        { src: "public/work/lc-waikiki/4.jpg", label: "virtual model production" }
      ]
    },
    {
      slug: "kansai-plascon",
      client: "Kansai Plascon Paints Kenya",
      sector: "Manufacturing & Corporate Brands",
      years: "2025–2026",
      title: "Gor Mahia Partnership & Communications Partner",
      tagline: "Colouring a market-leading brand into culture.",
      desc: "Led communications for the Gor Mahia partnership launch and appointed Official Communications Partner for Kansai Plascon Paints Kenya.",
      scope: ["Strategic communications planning", "Brand narrative and messaging refinement", "Production events curation", "Media relations and corporate storytelling", "Influencer and content strategy", "Stakeholder and partner communications"],
      impact: "Positioned Kansai Plascon as a market leader shaping spaces, communities and lifestyles across Kenya.",
      images: [
        { src: "public/work/kansai-plascon/1.jpg", label: "partnership launch" },
        { src: "public/work/kansai-plascon/2.jpg", label: "brand storytelling" },
        { src: "public/work/kansai-plascon/3.jpg", label: "media & stakeholders" }
      ]
    },
    {
      slug: "thrive-hospitality",
      client: "Thrive Hospitality Group",
      sector: "Hospitality, Lifestyle & Destination Brands",
      years: "Ongoing",
      title: "Brand Launches & Repositioning",
      tagline: "Five destinations, five distinct stories.",
      desc: "Communications partner across Café NBO, Glam Hotel, Social 8, Chaii Republic and Kingfisher Nest Hotel.",
      scope: ["Brand positioning and launch strategy", "Influencer and creator engagement", "Media hosting and lifestyle PR", "Experiential event design and execution", "Content strategy for digital platforms", "On-ground event production and coordination"],
      impact: "Each property launched as a distinct lifestyle destination with a clear audience, story and visual identity.",
      images: [
        { src: "public/work/thrive-hospitality/1.jpg", label: "property reveal" },
        { src: "public/work/thrive-hospitality/2.jpg", label: "lifestyle PR moments" },
        { src: "public/work/thrive-hospitality/3.jpg", label: "experiential events" },
        { src: "public/work/thrive-hospitality/4.jpg", label: "content & creators" }
      ]
    },
    {
      slug: "amahoro-unhcr",
      client: "The Amahoro Coalition & UNHCR",
      sector: "Social Impact & Multilateral Partnerships",
      years: "2023",
      title: "Africa Forum on Displacements — Accra, Ghana",
      tagline: "Elevating private-sector leadership on displacement.",
      desc: "Communications and media engagement for the Private Sector Forum on Displaced Persons held during the Africa Forum on Displacements.",
      scope: ["Strategic communications support for the forum", "Media engagement and interview coordination across multiple African markets", "Development of key messaging", "Coordination of spokesperson interviews with regional and international media", "Amplification of forum outcomes through earned media coverage"],
      impact: "Elevated conversations around private-sector leadership and sustainable solutions for displaced persons across Africa.",
      images: [
        { src: "public/work/amahoro-unhcr/1.jpg", label: "forum in session" },
        { src: "public/work/amahoro-unhcr/2.jpg", label: "media engagement" },
        { src: "public/work/amahoro-unhcr/3.jpg", label: "spokesperson interviews" }
      ]
    },
    {
      slug: "columbia-healthcare",
      client: "Columbia Africa Healthcare",
      sector: "Healthcare & Medical Institutions",
      years: "2025",
      title: "Strategic Communications & Internal Alignment",
      tagline: "Building trust across a network of care.",
      desc: "Strategic communications and internal alignment across healthcare facilities for a leading network of hospitals and clinics in Kenya.",
      scope: ["Internal communications video profiles for hospitals and clinics", "Digital display content for healthcare facilities", "Visual storytelling highlighting medical services, facilities and care standards"],
      impact: "Enhanced stakeholder confidence and reinforced Columbia Africa's reputation as a trusted healthcare provider.",
      images: [
        { src: "public/work/columbia-healthcare/1.jpg", label: "facility storytelling" },
        { src: "public/work/columbia-healthcare/2.jpg", label: "internal comms profiles" },
        { src: "public/work/columbia-healthcare/3.jpg", label: "digital display content" }
      ]
    },
    {
      slug: "wrc-safari-rally",
      client: "WRC Safari Rally",
      sector: "Sports & Tourism",
      years: "2022",
      title: "Corporate Sponsorship Breakfast",
      tagline: "Mobilising boardrooms behind a global event.",
      desc: "Strategic communications and event support for the WRC Safari Rally Corporate Sponsorship Breakfast.",
      scope: ["Identification and curation of potential corporate sponsors", "Strategic guest list development (150+ CEOs and decision-makers)", "Event positioning and stakeholder engagement", "Media support and visibility"],
      impact: "Mobilised corporate support ahead of the global motorsport event, reinforcing Kenya's position on the international rally calendar.",
      images: [
        { src: "public/work/wrc-safari-rally/1.jpg", label: "sponsorship breakfast" },
        { src: "public/work/wrc-safari-rally/2.jpg", label: "executive guest list" },
        { src: "public/work/wrc-safari-rally/3.jpg", label: "event visibility" }
      ]
    }
  ];

  /* Sectors — name, glyph, and a hover image (drop real photos at src) */
  window.FID_SECTORS = [
    { name: "Government & Public Institutions", icon: "◷", src: "public/sectors/government.jpg" },
    { name: "Retail & Fashion", icon: "◇", src: "public/sectors/retail-fashion.jpg" },
    { name: "Manufacturing & Corporate", icon: "△", src: "public/sectors/manufacturing.jpg" },
    { name: "Hospitality & Lifestyle", icon: "□", src: "public/sectors/hospitality.jpg" },
    { name: "Healthcare & Medical", icon: "✜", src: "public/sectors/healthcare.jpg" },
    { name: "Finance & Investment", icon: "◎", src: "public/sectors/finance.jpg" },
    { name: "Sports & Tourism", icon: "◈", src: "public/sectors/sports-tourism.jpg" },
    { name: "Social Impact & Development", icon: "◉", src: "public/sectors/social-impact.jpg" },
    { name: "Beauty & Lifestyle", icon: "◆", src: "public/sectors/beauty.jpg" },
    { name: "Culture & Entertainment", icon: "◐", src: "public/sectors/culture.jpg" }
  ];
})();
