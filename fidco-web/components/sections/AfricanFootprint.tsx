"use client";

import { useState } from "react";
import FootprintMap from "@/components/sections/FootprintMap";
import { motion } from "framer-motion";

type Country = { name: string; code: string };

const countries: Country[] = [
  { name: "Kenya", code: "KE" },
  { name: "Uganda", code: "UG" },
  { name: "Rwanda", code: "RW" },
  { name: "Ethiopia", code: "ET" },
  { name: "South Sudan", code: "SS" },
  { name: "Zambia", code: "ZM" },
  { name: "Ghana", code: "GH" },
  { name: "Tanzania", code: "TZ" },
  { name: "South Africa", code: "ZA" },
];

export default function AfricanFootprint() {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const activeCode = pinned ?? active;

  return (
    <section className="af-footprint" style={{ marginTop: "clamp(3rem,6vw,5rem)", paddingTop: 0 }}>
      <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto clamp(2rem,4vw,3rem)" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", marginBottom: "0.9rem" }}>
          African footprint
        </span>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#1c1c1c", fontSize: "clamp(1.9rem,3.6vw,3rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", textWrap: "balance" } as React.CSSProperties}>
          8+ markets across East &amp; Southern Africa and beyond.
        </h3>
      </div>

      {/* Satellite footprint map — routes drawn out from Nairobi. Replaces the
          flat SVG landmass this section used to show. */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <FootprintMap />
      </motion.div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1.2rem", maxWidth: "760px", marginLeft: "auto", marginRight: "auto" }}>
        {countries.map((country, i) => {
          const isActive = activeCode === country.code;
          return (
            <motion.button
              key={country.code}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onMouseEnter={() => setActive(country.code)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setPinned((p) => (p === country.code ? null : country.code))}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                border: `1px solid ${isActive ? "#2f7f7a" : "rgba(117,0,6,0.18)"}`,
                backgroundColor: isActive ? "#2f7f7a" : "rgba(245,242,236,0.72)",
                padding: "0.42rem 0.8rem",
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontSize: "0.74rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#f5f2ec" : "#1c1c1c",
                cursor: "pointer",
                transition: "transform 0.22s ease, border-color 0.25s, background 0.25s, color 0.25s",
                boxShadow: isActive ? "0 4px 14px rgba(47,127,122,0.22)" : "none",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={18}
                height={12}
                loading="lazy"
                style={{ width: "18px", height: "12px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
              />
              {country.name}
            </motion.button>
          );
        })}
      </div>

      <style>{`
        @keyframes af-glow {
          0%, 100% { transform: scale(1); opacity: 0.58; }
          50% { transform: scale(1.03); opacity: 0.86; }
        }
        .af-pin {
          opacity: 0;
          animation: af-pin-drop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes af-pin-drop {
          from { opacity: 0; margin-top: -18px; }
          to { opacity: 1; margin-top: 0; }
        }
        .af-pin-head {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 2px solid #5d0010;
          box-shadow: 0 0 0 1.5px rgba(245,242,236,0.85), 0 4px 12px rgba(0,0,0,0.5);
          transition: background 0.25s;
        }
        .af-pin-stem {
          display: block;
          width: 2px;
          height: 9px;
          margin: -1px auto 0;
          background: linear-gradient(to bottom, #f5f2ec, rgba(47,127,122,0.18));
          border-radius: 0 0 2px 2px;
        }
        .af-pin-ring {
          position: absolute;
          left: 50%;
          bottom: -3px;
          width: 16px;
          height: 6px;
          transform: translateX(-50%);
          border-radius: 999px;
          border: 1px solid rgba(117,0,6,0.26);
          animation: af-ring-pulse 2.4s ease-out infinite;
        }
        @keyframes af-ring-pulse {
          0% { transform: translateX(-50%) scale(0.6); opacity: 0.8; }
          70% { transform: translateX(-50%) scale(1.7); opacity: 0; }
          100% { opacity: 0; }
        }
        .af-pin:hover .af-pin-head { background: #2f7f7a !important; }
      `}</style>
    </section>
  );
}
