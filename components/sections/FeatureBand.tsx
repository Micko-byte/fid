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
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        backgroundColor: "#1d0202",
      }}
    >
      {/* Video background */}
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
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Scrim overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(29,2,2,0.42) 0%, rgba(29,2,2,0.30) 42%, rgba(29,2,2,0.62) 72%, rgba(29,2,2,0.94) 100%)",
        }}
      />

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          paddingTop: "clamp(6rem, 14vh, 9rem)",
          paddingBottom: "clamp(3.5rem, 9vh, 6.5rem)",
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
            fontSize: "clamp(2rem, 5vw, 4.6rem)",
            lineHeight: 1.05,
            letterSpacing: 0,
            maxWidth: "20ch",
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
            color: "rgba(245,242,236,0.80)",
            maxWidth: "54ch",
            marginTop: "clamp(1.4rem, 3vw, 2rem)",
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            lineHeight: 1.6,
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
            className="fid-btn fid-btn-light"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85em 1.7em",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              backgroundColor: "#F5F2EC",
              color: "#750006",
              position: "relative",
              overflow: "hidden",
              fontFamily: "var(--font-body)",
            }}
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
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              backgroundColor: "transparent",
              border: "1px solid rgba(217,171,136,0.45)",
              color: "#F5F2EC",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(217,171,136,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(217,171,136,0.45)")}
          >
            See our work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
