"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      style={{
        backgroundColor: "#750006",
        color: "#F5F2EC",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(4.5rem, 9vw, 8rem)",
        paddingBottom: "clamp(4.5rem, 9vw, 8rem)",
      }}
    >
      {/* Diagonal texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(135deg, rgba(245,242,236,0.04) 0 1px, transparent 1px 64px)",
        }}
      />

      {/* Concentric rings (radar) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)",
          width: "min(54vw, 720px)", height: "min(54vw, 720px)", pointerEvents: "none",
          WebkitMaskImage: "radial-gradient(closest-side, #000 60%, transparent 100%)",
          maskImage: "radial-gradient(closest-side, #000 60%, transparent 100%)",
          opacity: 0.7,
        }}
      >
        {[0, 14, 28, 42].map((inset, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              inset: `${inset}%`,
              border: "1px solid rgba(245,242,236,0.14)",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      <div
        ref={ref}
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "1320px", margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(2rem, 5vw, 4rem)",
          flexWrap: "wrap",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 500,
            color: "#F5F2EC",
            fontSize: "clamp(2.6rem, 6.5vw, 5.6rem)",
            lineHeight: 0.96, letterSpacing: "-0.025em",
            maxWidth: "15ch",
          } as React.CSSProperties}
        >
          Let&apos;s build something{" "}
          <em style={{ fontStyle: "normal", color: "#D9AB88" }}>meaningful.</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flexShrink: 0 }}
        >
          <a
            href="/#contact"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0.85em 1.7em", fontSize: "0.8rem", letterSpacing: "0.08em",
              backgroundColor: "#F5F2EC", color: "#750006",
              fontFamily: "var(--font-body)", textDecoration: "none",
              transition: "background 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#260000"; e.currentTarget.style.color = "#F5F2EC"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F2EC"; e.currentTarget.style.color = "#750006"; }}
          >
            Book us
          </a>
          <a
            href="mailto:info@fidco.africa"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0.85em 1.7em", fontSize: "0.8rem", letterSpacing: "0.08em",
              backgroundColor: "transparent",
              border: "1px solid rgba(245,242,236,0.45)", color: "#F5F2EC",
              fontFamily: "var(--font-body)", textDecoration: "none",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,236,0.9)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,236,0.45)"; }}
          >
            info@fidco.africa
          </a>
        </motion.div>
      </div>
    </section>
  );
}
