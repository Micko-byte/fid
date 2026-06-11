"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Each sector has a primary logo URL (clearbit) + a clean SVG wordmark fallback
const sectors = [
  {
    name: "Government & Public Institutions",
    icon: "◷",
    logoUrl: "https://logo.clearbit.com/kenya.go.ke",
    logoAlt: "GoK",
    fallbackInitial: "GoK",
    fallbackColor: "#1a4d2e",
  },
  {
    name: "Retail & Fashion",
    icon: "◇",
    logoUrl: "https://logo.clearbit.com/lcwaikiki.com",
    logoAlt: "LC Waikiki",
    fallbackInitial: "LCW",
    fallbackColor: "#d40000",
  },
  {
    name: "Manufacturing & Corporate",
    icon: "△",
    logoUrl: "https://logo.clearbit.com/kansai.co.jp",
    logoAlt: "Kansai",
    fallbackInitial: "KPN",
    fallbackColor: "#003580",
  },
  {
    name: "Hospitality & Lifestyle",
    icon: "□",
    logoUrl: "https://logo.clearbit.com/marriott.com",
    logoAlt: "Marriott",
    fallbackInitial: "MAR",
    fallbackColor: "#8b0000",
  },
  {
    name: "Healthcare & Medical",
    icon: "✜",
    logoUrl: "https://logo.clearbit.com/who.int",
    logoAlt: "WHO",
    fallbackInitial: "WHO",
    fallbackColor: "#009fda",
  },
  {
    name: "Finance & Investment",
    icon: "◎",
    logoUrl: "https://logo.clearbit.com/kcbbankgroup.com",
    logoAlt: "KCB Group",
    fallbackInitial: "KCB",
    fallbackColor: "#006600",
  },
  {
    name: "Sports & Tourism",
    icon: "◈",
    logoUrl: "https://logo.clearbit.com/wrc.com",
    logoAlt: "WRC",
    fallbackInitial: "WRC",
    fallbackColor: "#cc0000",
  },
  {
    name: "Social Impact & Development",
    icon: "◉",
    logoUrl: "https://logo.clearbit.com/unhcr.org",
    logoAlt: "UNHCR",
    fallbackInitial: "UNHCR",
    fallbackColor: "#00adef",
  },
  {
    name: "Beauty & Lifestyle",
    icon: "◆",
    logoUrl: "https://logo.clearbit.com/loreal.com",
    logoAlt: "L'Oréal",
    fallbackInitial: "L'OR",
    fallbackColor: "#1a1a1a",
  },
  {
    name: "Culture & Entertainment",
    icon: "◐",
    logoUrl: "https://logo.clearbit.com/spotify.com",
    logoAlt: "Spotify",
    fallbackInitial: "SPT",
    fallbackColor: "#1db954",
  },
];

function SectorCell({ s, i, inView }: { s: typeof sectors[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
      className="sector-cell"
      style={{
        borderRight: "1px solid rgba(38,0,0,0.13)",
        borderBottom: "1px solid rgba(38,0,0,0.13)",
        minHeight: "clamp(130px,14vw,180px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.4s cubic-bezier(0.16,1,0.3,1)",
        padding: "clamp(1.2rem,2vw,1.8rem)",
      }}
    >
      {/* ── LOGO (shown on hover, hidden at rest) ── */}
      <div
        className="sector-logo-wrap"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
          opacity: 0,
          transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 3,
          padding: "1rem",
        }}
      >
        {/* Logo image — tries clearbit, falls back to styled initial */}
        <div style={{ width: "clamp(52px,5.5vw,72px)", height: "clamp(52px,5.5vw,72px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,1)", borderRadius: "6px", padding: "8px", flexShrink: 0 }}>
          <img
            src={s.logoUrl}
            alt={s.logoAlt}
            width={56}
            height={56}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="lazy"
            onError={(e) => {
              // Replace with branded initial on failure
              const img = e.currentTarget as HTMLImageElement;
              const parent = img.parentElement;
              if (!parent) return;
              img.style.display = "none";
              parent.style.backgroundColor = s.fallbackColor;
              parent.style.borderRadius = "4px";
              const span = document.createElement("span");
              span.textContent = s.fallbackInitial;
              span.style.cssText = `font-size:0.6rem;font-weight:700;letter-spacing:0.06em;color:#ffffff;font-family:sans-serif;text-align:center;`;
              parent.appendChild(span);
            }}
          />
        </div>
        {/* Logo alt name */}
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,236,0.8)", textAlign: "center" }}>
          {s.logoAlt}
        </span>
      </div>

      {/* ── Icon (shown at rest, hidden on hover) ── */}
      <span
        className="sector-glyph"
        style={{ fontFamily: "var(--font-heading,'Oswald')", fontSize: "1.5rem", color: "#D98038", position: "relative", zIndex: 1, transition: "opacity 0.35s, transform 0.5s" }}
      >
        {s.icon}
      </span>

      {/* ── Name ── */}
      <span
        className="sector-nm"
        style={{ fontSize: "0.78rem", lineHeight: 1.35, color: "#260000", position: "relative", zIndex: 1, transition: "color 0.35s", fontFamily: "var(--font-body)", letterSpacing: "0.01em" }}
      >
        {s.name}
      </span>
    </motion.div>
  );
}

export default function Sectors() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="sectors"
      style={{ backgroundColor: "#F5F2EC", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>

        <div ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038" }}
          >
            <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7 }} />
            Industries we serve
          </motion.span>

          <motion.h2
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2rem,4vw,3rem)", color: "#260000", marginTop: "0.8rem" }}
          >
            10+ industries, one standard.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(38,0,0,0.5)", marginTop: "0.6rem" }}
          >
            Hover each industry to see the brands we've served.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          className="sector-grid-wrap"
          style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", borderLeft: "1px solid rgba(38,0,0,0.13)", borderTop: "1px solid rgba(38,0,0,0.13)", marginTop: "clamp(2.5rem,5vw,4rem)" }}
        >
          {sectors.map((s, i) => (
            <SectorCell key={i} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* Footprint */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "clamp(2rem,4vw,3rem)", backgroundColor: "#260000", borderLeft: "3px solid #750006", padding: "clamp(2rem,4vw,3.4rem)" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038" }}>
            <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7 }} />
            African footprint
          </span>
          <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, color: "#F5F2EC", fontSize: "clamp(1.5rem,3vw,2.3rem)", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "24ch", margin: "1rem 0 1.2rem" }}>
            Operating across Kenya, Uganda, Tanzania, Ghana, South Sudan and beyond.
          </h3>
          <p style={{ color: "rgba(217,171,136,0.7)", fontSize: "0.88rem", letterSpacing: "0.02em", fontFamily: "var(--font-body)" }}>
            Kenya · Uganda · Rwanda · Ethiopia · South Sudan · Zambia · Ghana · Tanzania
          </p>
        </motion.div>
      </div>

      <style>{`
        /* Hover: fill oxblood, show logo, hide glyph */
        .sector-cell:hover { background: #750006 !important; }
        .sector-cell:hover .sector-logo-wrap { opacity: 1 !important; }
        .sector-cell:hover .sector-glyph { opacity: 0 !important; transform: scale(0.8) translateY(-4px); }
        .sector-cell:hover .sector-nm { color: rgba(245,242,236,0.7) !important; }
        /* Grid responsive */
        @media (max-width:1024px) { .sector-grid-wrap { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width:640px)  { .sector-grid-wrap { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
