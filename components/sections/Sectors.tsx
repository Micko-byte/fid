"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Each sector mapped to a recognisable brand logo via Clearbit Logo API
const sectors = [
  {
    name: "Government & Public Institutions",
    icon: "◷",
    logoDomain: "kenya.go.ke",
    logoLabel: "GoK",
  },
  {
    name: "Retail & Fashion",
    icon: "◇",
    logoDomain: "lcwaikiki.com",
    logoLabel: "LC Waikiki",
  },
  {
    name: "Manufacturing & Corporate",
    icon: "△",
    logoDomain: "kansai.co.jp",
    logoLabel: "Kansai",
  },
  {
    name: "Hospitality & Lifestyle",
    icon: "□",
    logoDomain: "marriott.com",
    logoLabel: "Marriott",
  },
  {
    name: "Healthcare & Medical",
    icon: "✜",
    logoDomain: "who.int",
    logoLabel: "WHO",
  },
  {
    name: "Finance & Investment",
    icon: "◎",
    logoDomain: "kcbbankgroup.com",
    logoLabel: "KCB",
  },
  {
    name: "Sports & Tourism",
    icon: "◈",
    logoDomain: "wrc.com",
    logoLabel: "WRC",
  },
  {
    name: "Social Impact & Development",
    icon: "◉",
    logoDomain: "unhcr.org",
    logoLabel: "UNHCR",
  },
  {
    name: "Beauty & Lifestyle",
    icon: "◆",
    logoDomain: "loreal.com",
    logoLabel: "L'Oréal",
  },
  {
    name: "Culture & Entertainment",
    icon: "◐",
    logoDomain: "spotify.com",
    logoLabel: "Spotify",
  },
];

function SectorCell({ s, i, inView }: { s: typeof sectors[0]; i: number; inView: boolean }) {
  const logoSrc = `https://logo.clearbit.com/${s.logoDomain}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      className="sector-cell"
      style={{
        padding: "clamp(1.4rem, 2.2vw, 2rem)",
        borderRight: "1px solid rgba(38,0,0,0.13)",
        borderBottom: "1px solid rgba(38,0,0,0.13)",
        minHeight: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.4s",
      }}
    >
      {/* Bg fill on hover */}
      <div className="sector-bg" style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "transparent",
        transition: "background 0.4s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Glyph icon — fades out on hover */}
      <span
        className="sector-glyph"
        style={{
          fontFamily: "var(--font-heading, 'Oswald')",
          fontSize: "1.4rem",
          color: "#D98038",
          position: "relative",
          zIndex: 1,
          transition: "opacity 0.35s, transform 0.55s",
        }}
      >
        {s.icon}
      </span>

      {/* Logo — appears on hover */}
      <div
        className="sector-logo"
        style={{
          position: "absolute",
          top: "clamp(0.8rem, 1.5vw, 1.2rem)",
          left: "clamp(0.8rem, 1.5vw, 1.2rem)",
          width: "clamp(48px, 5vw, 64px)",
          height: "clamp(48px, 5vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.35s",
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.92)",
          borderRadius: "4px",
          padding: "6px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={s.logoLabel}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "grayscale(0%)",
          }}
          onError={(e) => {
            // Fallback: show label text if logo fails
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.style.backgroundColor = "transparent";
              const label = document.createElement("span");
              label.textContent = s.logoLabel;
              label.style.cssText = "font-size:0.55rem;letter-spacing:0.1em;text-transform:uppercase;color:#fff;font-family:sans-serif;text-align:center;line-height:1.2;";
              parent.appendChild(label);
            }
          }}
        />
      </div>

      <span
        className="sector-nm"
        style={{
          fontSize: "0.82rem",
          lineHeight: 1.35,
          color: "#260000",
          position: "relative",
          zIndex: 1,
          transition: "color 0.4s",
          marginTop: "1.6rem",
        }}
      >
        {s.name}
      </span>
    </motion.div>
  );
}

export default function Sectors() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="sectors"
      style={{
        backgroundColor: "#F5F2EC",
        paddingTop: "clamp(5.5rem, 12vw, 11rem)",
        paddingBottom: "clamp(5.5rem, 12vw, 11rem)",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>

        <div ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038" }}
          >
            <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7 }} />
            Industries we serve
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#260000", marginTop: "0.8rem", letterSpacing: 0 }}
          >
            10+ industries, one standard.
          </motion.h2>
        </div>

        {/* Grid */}
        <div
          className="sector-grid-wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            borderLeft: "1px solid rgba(38,0,0,0.13)",
            borderTop: "1px solid rgba(38,0,0,0.13)",
            marginTop: "clamp(3rem, 6vw, 4.5rem)",
          }}
        >
          {sectors.map((s, i) => (
            <SectorCell key={i} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* Footprint */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            marginTop: "clamp(2rem, 4vw, 3rem)",
            backgroundColor: "#260000",
            borderLeft: "3px solid #750006",
            padding: "clamp(2rem, 4vw, 3.4rem)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038" }}>
            <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7 }} />
            African footprint
          </span>
          <h3 style={{ fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 500, color: "#F5F2EC", fontSize: "clamp(1.5rem, 3vw, 2.3rem)", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "24ch", margin: "1rem 0 1.2rem" }}>
            Operating across Kenya, Uganda, Tanzania, Ghana, South Sudan and beyond.
          </h3>
          <p style={{ color: "rgba(217,171,136,0.7)", fontSize: "0.88rem", letterSpacing: "0.02em", fontFamily: "var(--font-body)" }}>
            Kenya · Uganda · Rwanda · Ethiopia · South Sudan · Zambia · Ghana · Tanzania
          </p>
        </motion.div>
      </div>

      <style>{`
        .sector-cell:hover { background: #750006 !important; }
        .sector-cell:hover .sector-bg { background: #750006 !important; }
        .sector-cell:hover .sector-glyph { opacity: 0 !important; }
        .sector-cell:hover .sector-logo { opacity: 1 !important; }
        .sector-cell:hover .sector-nm { color: #F5F2EC !important; }
        @media (max-width: 1024px) { .sector-grid-wrap { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px)  { .sector-grid-wrap { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
