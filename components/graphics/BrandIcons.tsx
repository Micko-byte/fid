"use client";

/**
 * FID & Co. branded line-icon system.
 * One consistent visual language: 24×24 viewBox, round caps/joins, currentColor stroke.
 * Use for services (5) and industries (7) so the storytelling stays consistent.
 *
 *   <ServiceIcon slug="strategic-communications" size={32} />
 *   <IndustryIcon sector="Government & Public Institutions" size={28} />
 */

interface IconProps {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Svg({ size = 28, strokeWidth = 1.6, className, style, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["brand-icon", className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ─────────────── SERVICE ICONS ─────────────── */

// Strategic Communications & PR — megaphone + signal
function IconStrategicComms(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M15.5 8.5a4 4 0 0 1 0 7" />
      <path d="M18.5 6a7 7 0 0 1 0 12" />
    </Svg>
  );
}

// Media Management & Buying — broadcast screen + waves
function IconMedia(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M8 21h8" />
      <path d="M9.5 10.5a3 3 0 0 1 5 0" />
      <path d="M7.5 12.5a5.5 5.5 0 0 1 9 0" />
    </Svg>
  );
}

// Influencer, Creator & Talent — person + spark network
function IconInfluencer(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 20a5 5 0 0 1 10 0" />
      <path d="M18 4v4M16 6h4" />
      <circle cx="18" cy="14" r="1.4" />
    </Svg>
  );
}

// Digital Strategy & Social Media — node graph
function IconDigital(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M7.6 7.5 6.8 16M8 6.6l8.2.7M17.6 9l-.4 6M16 17.3l-6.2-.2" />
    </Svg>
  );
}

// Experiential Marketing & Events — stage / arch + spark
function IconExperiential(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M4 20h16" />
      <path d="M9 20v-5h6v5" />
      <path d="M12 1.5v2" />
    </Svg>
  );
}

const SERVICE_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  "strategic-communications": IconStrategicComms,
  "media-management": IconMedia,
  "influencer-creator": IconInfluencer,
  "digital-strategy": IconDigital,
  "experiential-marketing": IconExperiential,
};

export function ServiceIcon({ slug, ...rest }: IconProps & { slug: string }) {
  const Cmp = SERVICE_ICONS[slug] ?? IconStrategicComms;
  return <Cmp {...rest} />;
}

/* ─────────────── INDUSTRY ICONS ─────────────── */

// Government & Public Institutions — columned building
function IconGovernment(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 9 12 4l9 5" />
      <path d="M4 9h16" />
      <path d="M6 9v8M10 9v8M14 9v8M18 9v8" />
      <path d="M3 20h18M4 17h16" />
    </Svg>
  );
}

// Retail & Fashion — price tag
function IconRetail(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 12.5 11 5h6.5a1 1 0 0 1 1 1V12.5L11 20Z" />
      <circle cx="15" cy="9" r="1.2" />
    </Svg>
  );
}

// Manufacturing & Corporate — gear
function IconManufacturing(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </Svg>
  );
}

// Hospitality & Lifestyle — service bell / cup
function IconHospitality(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 16a8 8 0 0 1 16 0Z" />
      <path d="M3 16h18M12 8V6" />
      <path d="M12 20v0" />
    </Svg>
  );
}

// Healthcare — pulse + cross
function IconHealthcare(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 12h3l2-5 3 10 2.5-6 1.5 3h4" />
    </Svg>
  );
}

// Social Impact & Multilateral — globe + heart-hand
function IconSocialImpact(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
    </Svg>
  );
}

// Sports & Tourism — trophy / pin
function IconSports(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 4h10v3a5 5 0 0 1-10 0Z" />
      <path d="M7 5H4.5v1.5A2.5 2.5 0 0 0 7 9M17 5h2.5v1.5A2.5 2.5 0 0 1 17 9" />
      <path d="M12 12v3M9 20h6M10 20l.5-3.5M14 20l-.5-3.5" />
    </Svg>
  );
}

const INDUSTRY_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  "Government & Public Institutions": IconGovernment,
  "Retail & Fashion": IconRetail,
  "Manufacturing & Corporate Brands": IconManufacturing,
  "Hospitality, Lifestyle & Destination Brands": IconHospitality,
  "Healthcare & Medical Institutions": IconHealthcare,
  "Social Impact & Multilateral Partnerships": IconSocialImpact,
  "Sports & Tourism": IconSports,
};

export function IndustryIcon({ sector, ...rest }: IconProps & { sector: string }) {
  const Cmp = INDUSTRY_ICONS[sector] ?? IconGovernment;
  return <Cmp {...rest} />;
}
