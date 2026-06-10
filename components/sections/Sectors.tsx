"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Icons exactly matching fid-data.js
const sectors = [
  { name: "Government & Public Institutions", icon: "◷" },
  { name: "Retail & Fashion",                 icon: "◇" },
  { name: "Manufacturing & Corporate",        icon: "△" },
  { name: "Hospitality & Lifestyle",          icon: "□" },
  { name: "Healthcare & Medical",             icon: "✜" },
  { name: "Finance & Investment",             icon: "◎" },
  { name: "Sports & Tourism",                 icon: "◈" },
  { name: "Social Impact & Development",      icon: "◉" },
  { name: "Beauty & Lifestyle",               icon: "◆" },
  { name: "Culture & Entertainment",          icon: "◐" },
];

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
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="sector-cell"
              style={{
                padding: "clamp(1.4rem, 2.2vw, 2rem)",
                borderRight: "1px solid rgba(38,0,0,0.13)",
                borderBottom: "1px solid rgba(38,0,0,0.13)",
                minHeight: "130px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "background 0.4s",
              }}
            >
              <div className="sector-bg" />
              <span
                className="sector-glyph"
                style={{ fontFamily: "var(--font-heading, 'Oswald')", fontSize: "1.4rem", color: "#D98038", position: "relative", zIndex: 1, transition: "color 0.45s, transform 0.55s" }}
              >
                {s.icon}
              </span>
              <span
                className="sector-nm"
                style={{ fontSize: "0.82rem", lineHeight: 1.35, color: "#260000", position: "relative", zIndex: 1, transition: "color 0.4s", marginTop: "1.6rem" }}
              >
                {s.name}
              </span>
            </motion.div>
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
        .sector-cell:hover .sector-glyph { color: #F5F2EC !important; transform: translateY(-2px) rotate(-8deg); }
        .sector-cell:hover .sector-nm { color: #F5F2EC !important; }
        @media (max-width: 1024px) { .sector-grid-wrap { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px)  { .sector-grid-wrap { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
