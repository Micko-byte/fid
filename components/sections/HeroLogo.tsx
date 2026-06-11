"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoReveal from "@/components/motion/LogoReveal";
import Magnetic from "@/components/motion/Magnetic";

export default function HeroLogo() {
  const [revealed, setRevealed] = useState(false);

  // fallback: reveal content even if onComplete is delayed
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        color: "#1a1a1a",
      }}
    >
      {/* subtle warm ambient wash (no burgundy) */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 80% at 50% 18%, rgba(217,128,56,0.06) 0%, transparent 55%)" }} />

      {/* Top kicker */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", width: "100%", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(7rem,15vh,9rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#D98038" }}>
            <span style={{ width: "22px", height: "1px", background: "#D98038", opacity: 0.7 }} />
            Insight. Strategy. Impact.
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)" }}>
            Nairobi · Africa
          </span>
        </motion.div>
      </div>

      {/* Logo reveal centerpiece */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <LogoReveal
          onComplete={() => setRevealed(true)}
          style={{ width: "min(92vw, 1100px)", aspectRatio: "16/9" }}
        />
      </div>

      {/* Lede + CTAs (fade in after reveal) */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", width: "100%", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingBottom: "clamp(2.5rem,6vh,4.5rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}
        >
          <p style={{ maxWidth: "44ch", color: "rgba(26,26,26,0.7)", fontSize: "clamp(1rem,1.4vw,1.2rem)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
            A full-service strategic communications and brand experience firm operating across Kenya and Africa.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Magnetic strength={14}>
              <Link href="/#contact" data-cursor="Let's talk"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", backgroundColor: "#1a1a1a", color: "#fff", padding: "0.95rem 1.6rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px" }}
              >
                Start a project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </Magnetic>
            <Link href="/#feature" data-cursor="Explore"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.7)", fontWeight: 500, textDecoration: "none", transition: "gap 0.3s, color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = "0.9rem"; e.currentTarget.style.color = "#1a1a1a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = "0.55rem"; e.currentTarget.style.color = "rgba(26,26,26,0.7)"; }}
            >
              Explore the firm
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
