"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="feature"
      style={{
        backgroundColor: "#1d0202",
        color: "#F5F2EC",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(7rem, 14vw, 12rem)",
        paddingBottom: "clamp(7rem, 14vw, 12rem)",
      }}
    >
      {/* Subtle diagonal texture — 14islands-style minimal surface decoration */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(217,171,136,0.025) 0 1px, transparent 1px 80px)",
        }}
      />

      {/* Thin top border hairline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(1.5rem, 5vw, 6rem)",
          right: "clamp(1.5rem, 5vw, 6rem)",
          height: "1px",
          background: "rgba(217,171,136,0.18)",
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* Eyebrow — 14islands uppercase label style */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#D98038",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          The FID approach
        </motion.p>

        {/* Display headline — editorial oversized, 14islands scale */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading, 'Oswald')",
            fontWeight: 300,
            textTransform: "uppercase",
            color: "#F5F2EC",
            fontSize: "clamp(2.8rem, 7vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            maxWidth: "16ch",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          We treat communication as{" "}
          <em
            style={{
              fontStyle: "normal",
              fontWeight: 600,
              color: "#D9AB88",
            }}
          >
            influence
          </em>
          {" "}— not a{" "}
          <strong style={{ fontWeight: 600, color: "#D98038" }}>
            function.
          </strong>
        </motion.h2>

        {/* Hairline rule — 14islands divider style */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "left",
            height: "1px",
            background: "rgba(217,171,136,0.2)",
            marginTop: "clamp(3rem, 6vw, 5rem)",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        />

        {/* Bottom row — lede + CTA — 14islands two-zone layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="feature-bottom-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: "clamp(2rem, 6vw, 8rem)",
          }}
        >
          <p
            style={{
              color: "rgba(245,242,236,0.65)",
              fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
              lineHeight: 1.65,
              fontFamily: "var(--font-body)",
              maxWidth: "52ch",
            }}
          >
            Every brief begins with insight and ends in measurable impact. We
            build reputation, credibility and cultural relevance for the
            organisations shaping Africa&apos;s future.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", flexShrink: 0 }}>
            <Link
              href="/#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#D9AB88",
                textDecoration: "none",
                fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "color 0.3s, gap 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F5F2EC";
                e.currentTarget.style.gap = "0.85rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#D9AB88";
                e.currentTarget.style.gap = "0.55rem";
              }}
            >
              Explore our expertise
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <Link
              href="/#work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(217,171,136,0.5)",
                textDecoration: "none",
                fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "color 0.3s, gap 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#D9AB88";
                e.currentTarget.style.gap = "0.85rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(217,171,136,0.5)";
                e.currentTarget.style.gap = "0.55rem";
              }}
            >
              See our work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Thin bottom border hairline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "clamp(1.5rem, 5vw, 6rem)",
          right: "clamp(1.5rem, 5vw, 6rem)",
          height: "1px",
          background: "rgba(217,171,136,0.12)",
        }}
      />

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 640px) {
          #feature .feat-row { grid-template-columns: 1fr !important; }
          .feature-bottom-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
