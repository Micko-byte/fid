"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Flag = {
  name: string;
  code: string;
  focus: {
    scale: number;
    x: string;
    y: string;
  };
};

const flags: Flag[] = [
  { name: "Kenya", code: "KE", focus: { scale: 2.9, x: "-8%", y: "-16%" } },
  { name: "Uganda", code: "UG", focus: { scale: 2.7, x: "-6%", y: "-8%" } },
  { name: "Rwanda", code: "RW", focus: { scale: 2.8, x: "-8%", y: "-8%" } },
  { name: "Ethiopia", code: "ET", focus: { scale: 2.15, x: "24%", y: "-40%" } },
  { name: "South Sudan", code: "SS", focus: { scale: 2.25, x: "12%", y: "-18%" } },
  { name: "Zambia", code: "ZM", focus: { scale: 1.95, x: "2%", y: "20%" } },
  { name: "Ghana", code: "GH", focus: { scale: 1.8, x: "-80%", y: "-10%" } },
  { name: "Tanzania", code: "TZ", focus: { scale: 2.2, x: "-8%", y: "14%" } },
];

export default function AfricanFootprint() {
  const [active, setActive] = useState<Flag>(flags[0]);

  const activeFocus = useMemo(() => active.focus, [active]);

  return (
    <section className="af-footprint" style={{ marginTop: "clamp(3rem,6vw,5rem)", paddingTop: 0 }}>
      <div
        className="af-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.85fr) minmax(320px, 1.15fr)",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#F1E194",
            }}
          >
            <span style={{ width: "26px", height: "1px", background: "#F1E194", opacity: 0.7 }} />
            African footprint
          </span>

          <h3
            style={{
              fontFamily: "var(--font-heading,'Oswald')",
              fontWeight: 500,
              color: "#F5F2EC",
              fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: "18ch",
              margin: "1rem 0 0.9rem",
            }}
          >
            8+ markets across East &amp; Southern Africa - and beyond.
          </h3>

          <p
            style={{
              maxWidth: "34ch",
              fontFamily: "var(--font-body)",
              fontSize: "0.96rem",
              lineHeight: 1.55,
              color: "rgba(245,242,236,0.75)",
              marginBottom: "1.5rem",
            }}
          >
            Hover a flag to zoom the map into that market. The map pulses while it focuses, keeping the section alive without overwhelming the page.
          </p>

          <div
            className="af-flags"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "0.7rem",
            }}
          >
            {flags.map((flag) => {
              const activeState = active.code === flag.code;
              return (
                <button
                  key={flag.code}
                  type="button"
                  onMouseEnter={() => setActive(flag)}
                  onFocus={() => setActive(flag)}
                  onMouseLeave={() => setActive(flags[0])}
                  onBlur={() => setActive(flags[0])}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    border: `1px solid ${activeState ? "rgba(241,225,148,0.55)" : "rgba(217,171,136,0.18)"}`,
                    backgroundColor: activeState ? "rgba(241,225,148,0.08)" : "rgba(255,255,255,0.02)",
                    padding: "0.55rem 0.8rem",
                    borderRadius: "999px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "rgba(245,242,236,0.9)",
                    textAlign: "left",
                    transition: "transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                  }}
                  >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w40/${flag.code.toLowerCase()}.png`}
                    alt={`${flag.name} flag`}
                    width={22}
                    height={15}
                    loading="lazy"
                    style={{
                      width: "22px",
                      height: "15px",
                      objectFit: "cover",
                      borderRadius: "1px",
                      boxShadow: activeState ? "0 0 0 4px rgba(241,225,148,0.08)" : "none",
                      flexShrink: 0,
                    }}
                  />
                  {flag.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="af-map"
          style={{
            position: "relative",
            minHeight: "clamp(320px, 44vw, 520px)",
            background: "linear-gradient(180deg, rgba(241,225,148,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(217,171,136,0.18)",
            overflow: "hidden",
          }}
          onMouseLeave={() => setActive(flags[0])}
        >
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0.28, 0.62, 0.28], scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "10%",
              borderRadius: "999px",
              border: "1px solid rgba(241,225,148,0.14)",
              boxShadow: "0 0 90px rgba(241,225,148,0.08)",
              pointerEvents: "none",
            }}
          />

          <motion.img
            src="/africa.svg"
            alt="Africa map"
            initial={false}
            animate={{
              scale: activeFocus.scale,
              x: activeFocus.x,
              y: activeFocus.y,
            }}
            transition={{ type: "spring", stiffness: 70, damping: 18, mass: 1.1 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center center",
              transformOrigin: "center center",
              filter: "drop-shadow(0 0 20px rgba(241,225,148,0.06))",
              willChange: "transform",
            }}
            draggable={false}
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.28, 0.62, 0.28],
              scale: [0.98, 1.04, 0.98],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "auto 12% 12% auto",
              width: "28%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              border: "1px solid rgba(241,225,148,0.24)",
              filter: "blur(0.2px)",
              pointerEvents: "none",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute",
                left: "1rem",
                bottom: "1rem",
                padding: "0.65rem 0.9rem",
                borderRadius: "999px",
                backgroundColor: "rgba(42,5,8,0.82)",
                color: "#F5F2EC",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                border: "1px solid rgba(241,225,148,0.18)",
              }}
            >
              {active.name}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .af-grid { grid-template-columns: 1fr !important; }
          .af-map { min-height: 340px !important; }
        }
        @media (max-width: 560px) {
          .af-flags { grid-template-columns: 1fr !important; }
          .af-map { min-height: 280px !important; }
        }
      `}</style>
    </section>
  );
}
