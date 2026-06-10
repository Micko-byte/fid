"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      id="feature"
      style={{
        position: "relative",
        minHeight: "clamp(560px, 84vh, 880px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        backgroundColor: "#1d0202",
      }}
    >
      {/* Left panel — text content */}
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(2rem, 4vw, 4rem)",
          paddingTop: "clamp(4rem, 10vh, 7rem)",
          paddingBottom: "clamp(4rem, 10vh, 7rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading, 'Oswald', 'Arial Narrow', sans-serif)",
            fontWeight: 300,
            textTransform: "uppercase",
            color: "rgba(245,242,236,0.92)",
            fontSize: "clamp(2rem, 3.8vw, 4.2rem)",
            lineHeight: 1.05,
            letterSpacing: 0,
            maxWidth: "18ch",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          We treat communication as{" "}
          <em style={{ fontStyle: "normal", fontWeight: 600, color: "#D9AB88" }}>influence</em>
          {" "}— not a{" "}
          <strong style={{ fontWeight: 600, color: "#F5F2EC" }}>function</strong>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: "rgba(245,242,236,0.70)",
            maxWidth: "46ch",
            marginTop: "clamp(1.4rem, 3vw, 2rem)",
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            lineHeight: 1.65,
            fontFamily: "var(--font-body, 'Noto Sans', sans-serif)",
          }}
        >
          Every brief begins with insight and ends in measurable impact. We build reputation,
          credibility and cultural relevance for the organisations shaping Africa&apos;s future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: "clamp(1.8rem, 4vw, 2.6rem)",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85em 1.7em",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: "#F5F2EC",
              color: "#750006",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AB88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F2EC"; }}
          >
            Explore our expertise
          </Link>
          <Link
            href="/#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85em 1.7em",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              border: "1px solid rgba(217,171,136,0.45)",
              color: "#F5F2EC",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(217,171,136,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(217,171,136,0.45)")}
          >
            See our work
          </Link>
        </motion.div>
      </div>

      {/* Right panel — video */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vertical divider line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            bottom: "10%",
            left: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(217,171,136,0.25) 30%, rgba(217,171,136,0.25) 70%, transparent)",
            zIndex: 2,
          }}
        />

        <video
          ref={videoRef}
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Scrim — left edge to blend with the text panel */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(29,2,2,0.55) 0%, rgba(29,2,2,0.1) 30%, rgba(29,2,2,0.15) 70%, rgba(29,2,2,0.5) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>

      {/* Mobile fallback — stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          #feature {
            grid-template-columns: 1fr !important;
          }
          #feature > div:last-child {
            height: 40vh;
          }
        }
      `}</style>
    </section>
  );
}
