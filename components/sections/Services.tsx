"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  { num: "01", title: "Strategic Communications & PR" },
  { num: "02", title: "Media Management & Buying" },
  { num: "03", title: "Influencer, Creator & Talent" },
  { num: "04", title: "Digital Strategy & Social Media" },
  { num: "05", title: "Experiential Marketing & Events" },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      style={{
        backgroundColor: "#F5F2EC",
        color: "#211b18",
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
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7, flexShrink: 0 }} />
              What we do
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600,
                fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#260000",
                marginTop: "0.8rem", letterSpacing: 0, lineHeight: 1,
              }}
            >
              Our Expertise
            </motion.h2>
          </div>

          <Link
            href="/#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(33,27,24,0.6)", fontWeight: 500,
              whiteSpace: "nowrap", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(33,27,24,0.6)")}
          >
            All services
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>

        {/* List */}
        <div style={{ borderTop: "1px solid rgba(38,0,0,0.13)" }}>
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.07 }}
              className="expertise-item"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: "1.5rem", borderBottom: "1px solid rgba(38,0,0,0.13)",
                position: "relative", overflow: "hidden", cursor: "default",
              }}
            >
              <div className="expertise-bg" />
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1rem,2.5vw,2.2rem)", position: "relative", zIndex: 1 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.2em", fontWeight: 500, color: "#D98038", flexShrink: 0, paddingTop: "0.6em" }}>
                  {svc.num}
                </span>
                <span
                  className="expertise-name"
                  style={{
                    fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600,
                    textTransform: "uppercase", color: "#260000",
                    fontSize: "clamp(1.5rem, 4.4vw, 3.4rem)", lineHeight: 1.02,
                    transition: "color 0.35s",
                  }}
                >
                  {svc.title}
                </span>
              </div>
              <svg
                className="expertise-arrow"
                width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                style={{ color: "rgba(33,27,24,0.3)", flexShrink: 0, position: "relative", zIndex: 1, transition: "transform 0.35s, color 0.35s" }}
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            marginTop: "clamp(2.2rem, 5vw, 3.6rem)", maxWidth: "62ch",
            color: "rgba(33,27,24,0.6)", fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
            lineHeight: 1.5, fontFamily: "var(--font-body)",
          }}
        >
          FID &amp; Co. is a 360° communications partner — bringing strategic counsel, cultural fluency and
          cut-through creativity to deliver ideas that move audiences, shape perception and earn lasting
          credibility across Africa.
        </motion.p>
      </div>

      <style>{`
        .expertise-item { padding: clamp(1.3rem, 3vw, 2.3rem) 0; transition: padding-left 0.4s cubic-bezier(0.16,1,0.3,1); }
        .expertise-item:hover { padding-left: 1.1rem; }
        .expertise-bg { position: absolute; inset: 0; background: rgba(117,0,6,0.04); transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 0; }
        .expertise-item:hover .expertise-bg { transform: scaleX(1); }
        .expertise-item:hover .expertise-name { color: #750006 !important; }
        .expertise-item:hover .expertise-arrow { transform: translate(3px,-3px) !important; color: #750006 !important; }
      `}</style>
    </section>
  );
}
