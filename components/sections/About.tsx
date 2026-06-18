"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { Calendar, Buildings, GlobeHemisphereEast, Megaphone } from "@phosphor-icons/react";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/core/image-comparison";

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
        backgroundColor: "#0c0c0c",
        color: "#FFFFFF",
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
          <div style={{ textAlign: "center" }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#d98038",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#d98038", opacity: 0.7, flexShrink: 0 }} />
              Who we are
            </motion.span>

            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 800, color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.04, letterSpacing: "-0.025em",
                maxWidth: "20ch", textWrap: "balance", marginTop: "1.6rem", marginLeft: "auto", marginRight: "auto",
              } as React.CSSProperties}
            >
              A communications partner built for influence at{" "}
              <em style={{ fontStyle: "normal", color: "#d98038" }}>scale</em>.
            </motion.h2>

            {/* Exact copy from company profile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "1.8rem", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column", gap: "1.1rem" }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.92rem,1.2vw,1.05rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
                FID &amp; Co. is a full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.92rem,1.2vw,1.05rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
                Established in 2010, we have evolved into a trusted partner for government institutions, multinational brands, corporates, hospitality groups, healthcare providers, sports organisations, investment firms and social impact initiatives.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.3vw,1.1rem)", lineHeight: 1.7, color: "#FFFFFF", fontWeight: 500 }}>
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
            {/* Before / after image comparison — drag or hover */}
            <ImageComparison
              enableHover
              springOptions={{ bounce: 0.3 }}
              className="about-compare"
            >
              <ImageComparisonImage src="/illustrations/hero-landscape.png" alt="FID & Co. — colour" position="left" />
              <ImageComparisonImage src="/illustrations/hero-landscape.png" alt="FID & Co. — inverse" position="right" style={{ filter: "invert(1) hue-rotate(180deg)" }} />
              <ImageComparisonSlider className="about-compare-slider" />
            </ImageComparison>
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
            background: "rgba(255,255,255,0.15)",
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
                  borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Icon size={26} weight="light" color="#d98038" />
                <div style={{ fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(3rem, 6.5vw, 5rem)", lineHeight: 0.85, letterSpacing: "-0.04em", marginTop: "1rem" }}>
                  <CountUp value={s.value} duration={1.8} />
                </div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "0.9rem", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
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
        .about-compare {
          width: 100%;
          max-width: 520px;
          aspect-ratio: 16 / 10;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.16);
          margin: 0 auto;
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
