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
        backgroundColor: "#f7ecc4",
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
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.6, flexShrink: 0 }} />
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
              <em style={{ fontStyle: "normal", color: "#5B0E14" }}>scale</em>.
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

          {/* RIGHT: floating illustration */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="about-img-col"
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Gold gradient blob behind illustration */}
            <div
              style={{
                position: "absolute",
                width: "75%",
                aspectRatio: "1/1",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(209,171,68,0.22) 0%, rgba(241,225,148,0.1) 50%, transparent 75%)",
                filter: "blur(48px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
            {/* Illustration with parallax drift */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", width: "92%", maxWidth: "500px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/svc-strategic-comms.png"
                alt="Strategic communications illustration"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  mixBlendMode: "multiply",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Thin divider between text and stats */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "left",
            height: "1px",
            background: "rgba(26,26,26,0.1)",
            marginTop: "clamp(3.5rem, 7vw, 6rem)",
          }}
        />

        {/* Stats row with icons — larger Atra-style numbers */}
        <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: "0" }}>
          {stats.map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "2.2rem 1.6rem 0",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <Icon size={26} weight="light" color="#5B0E14" />
                <div style={{ fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 700, color: "#1a1a1a", fontSize: "clamp(3rem, 6.5vw, 5rem)", lineHeight: 0.85, letterSpacing: "-0.04em", marginTop: "1rem" }}>
                  <CountUp value={s.value} duration={1.8} />
                </div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.45)", marginTop: "0.9rem", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
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
