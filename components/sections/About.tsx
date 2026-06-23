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
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="fid-section"
      style={{
        backgroundColor: "#f5f2ec",
        color: "#1c1c1c",
        ["--ink" as string]: "#1c1c1c",
        ["--ink-soft" as string]: "#1c1c1c",
        ["--hairline" as string]: "rgba(28,28,28,0.12)",
      }}
    >
      <div ref={ref} className="section-shell">
        <div className="about-grid">
          <div style={{ textAlign: "center" }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="type-eyebrow"
              style={{ color: "#79050B" }}
            >
              Who we are
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="type-h2"
              style={{
                color: "var(--ink)",
                maxWidth: "20ch",
                marginTop: "1.6rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              A communications partner built for influence at{" "}
              <em style={{ fontStyle: "normal", color: "#79050B" }}>scale</em>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "1.8rem",
                maxWidth: "54ch",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              <p className="type-body" style={{ color: "var(--ink-soft)" }}>
                FID &amp; Co. is a full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region.
              </p>
              <p className="type-body" style={{ color: "var(--ink-soft)" }}>
                Established in 2010, we have evolved into a trusted partner for government institutions, multinational brands, corporates, hospitality groups, healthcare providers, sports organisations, investment firms and social impact initiatives.
              </p>
              <p className="type-body" style={{ color: "var(--ink)", fontWeight: 700 }}>
                Our work is grounded in insight, shaped by strategy, and delivered with precision.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="about-img-col"
          >
            <div className="about-video-frame">
              <video
                src="/illustrations/digital-marketing.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Digital marketing and communication visual"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "left",
            height: "1px",
            background: "var(--hairline)",
            marginTop: "clamp(3.5rem, 7vw, 6rem)",
          }}
        />

        <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: "0" }}>
          {stats.map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ padding: "2.2rem 1.6rem 0", borderLeft: i === 0 ? "none" : "1px solid var(--hairline)" }}
              >
                <Icon size={26} weight="light" color="#79050B" />
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--ink)", fontSize: "clamp(3rem, 6.5vw, 5rem)", lineHeight: 0.85, letterSpacing: 0, marginTop: "1rem" }}>
                  <CountUp value={s.value} duration={1.8} />
                </div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)", marginTop: "0.9rem", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
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
        .about-video-frame {
          width: 100%;
          max-width: 560px;
          aspect-ratio: 16 / 10;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(28,28,28,0.08);
          box-shadow: 0 24px 70px rgba(38,0,0,0.12);
          margin: 0 auto;
          background: #f4f0ec;
        }
        .about-video-frame video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-img-col { max-width: 620px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 768px) {
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
