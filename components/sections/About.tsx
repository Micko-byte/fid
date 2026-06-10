"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/animations/CountUp";

const stats = [
  { value: "15+", count: 15, suffix: "+", label: "Years" },
  { value: "10+", count: 10, suffix: "+", label: "Industries" },
  { value: "8+",  count: 8,  suffix: "+", label: "Markets" },
  { value: "100+", count: 100, suffix: "+", label: "Campaigns" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#260000",
        color: "#F5F2EC",
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
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fid-eyebrow"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#D98038",
          }}
        >
          <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7, flexShrink: 0 }} />
          Who we are
        </motion.span>

        {/* Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading, 'Oswald')",
            fontWeight: 500,
            color: "#F5F2EC",
            fontSize: "clamp(2rem, 4.6vw, 3.9rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            maxWidth: "18ch",
            textWrap: "balance",
            marginTop: "1.6rem",
          } as React.CSSProperties}
        >
          A communications partner built for influence at{" "}
          <em style={{ fontStyle: "normal", color: "#D98038" }}>scale</em>.
        </motion.h2>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid rgba(217,171,136,0.16)",
            marginTop: "clamp(3rem, 6vw, 5rem)",
          }}
          className="about-stats"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "2rem 1.5rem 1.2rem 0",
                borderRight: i < 3 ? "1px solid rgba(217,171,136,0.09)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading, 'Oswald')",
                  fontWeight: 500,
                  color: "#D98038",
                  fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                }}
              >
                <CountUp value={s.value} duration={1.8} />
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(217,171,136,0.45)",
                  marginTop: "0.7rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
