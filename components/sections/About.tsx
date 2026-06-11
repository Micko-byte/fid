"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { Calendar, Buildings, GlobeHemisphereEast, Megaphone } from "@phosphor-icons/react";

const stats = [
  { value: "15+", label: "Years Experience", Icon: Calendar },
  { value: "10+", label: "Industries Served", Icon: Buildings },
  { value: "8+", label: "African Markets", Icon: GlobeHemisphereEast },
  { value: "100+", label: "Campaigns & Activations", Icon: Megaphone },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#1a1a1a",
        paddingTop: "clamp(5.5rem, 12vw, 11rem)",
        paddingBottom: "clamp(5.5rem, 12vw, 11rem)",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        <div className="about-grid">
          {/* LEFT: text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6, flexShrink: 0 }} />
              Who we are
            </motion.span>

            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600, color: "#1a1a1a",
                fontSize: "clamp(2rem, 4.6vw, 3.7rem)", lineHeight: 1.05, letterSpacing: "-0.025em",
                maxWidth: "20ch", textWrap: "balance", marginTop: "1.6rem",
              } as React.CSSProperties}
            >
              A communications partner built for influence at{" "}
              <em style={{ fontStyle: "normal", color: "#750006" }}>scale</em>.
            </motion.h2>

            {/* Exact copy from company profile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "1.8rem", maxWidth: "46ch", display: "flex", flexDirection: "column", gap: "1.1rem" }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.92rem,1.2vw,1.05rem)", lineHeight: 1.7, color: "rgba(26,26,26,0.66)" }}>
                FID &amp; Co. is a full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.92rem,1.2vw,1.05rem)", lineHeight: 1.7, color: "rgba(26,26,26,0.66)" }}>
                Established in 2010, we have evolved into a trusted partner for government institutions, multinational brands, corporates, hospitality groups, healthcare providers, sports organisations, investment firms and social impact initiatives.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.3vw,1.1rem)", lineHeight: 1.7, color: "#1a1a1a", fontWeight: 500 }}>
                Our work is grounded in insight, shaped by strategy, and delivered with precision.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: real photo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="about-img-col"
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden", backgroundColor: "#f0ece5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/editorial/studio-microphone.jpg"
                alt="FID & Co. studio"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Accent badge bottom-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", bottom: "-1.2rem", left: "-1rem", zIndex: 10,
                backgroundColor: "#750006", color: "#fff",
                padding: "1rem 1.4rem",
                fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600,
                fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase",
              }}
            >
              Est. 2010 · Nairobi
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row with icons */}
        <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: "clamp(3.5rem, 7vw, 6rem)", borderTop: "1px solid rgba(26,26,26,0.1)" }}>
          {stats.map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "1.8rem 1.6rem 0",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <Icon size={26} weight="light" color="#750006" />
                <div style={{ fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600, color: "#1a1a1a", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 0.9, letterSpacing: "-0.03em", marginTop: "1rem" }}>
                  <CountUp value={s.value} duration={1.8} />
                </div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.45)", marginTop: "0.7rem", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(3rem, 7vw, 7rem);
          align-items: center;
        }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-img-col { max-width: 480px; }
        }
        @media (max-width: 768px) {
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
