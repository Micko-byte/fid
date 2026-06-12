"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Lightbulb, Target, ChartLineUp } from "@phosphor-icons/react";
import LogoReveal from "@/components/motion/LogoReveal";
import Magnetic from "@/components/motion/Magnetic";

const PILLARS = [
  { word: "Insight", num: "01", Icon: Lightbulb, desc: "Deep audience intelligence that uncovers what truly drives perception, behaviour and decision-making.", lines: ["Audience Analysis", "Cultural Mapping", "Media Landscape", "Stakeholder Research"] },
  { word: "Strategy", num: "02", Icon: Target, desc: "Purposeful planning that connects brand truth to cultural moment — across every channel and market.", lines: ["Narrative Development", "Channel Architecture", "Campaign Blueprinting", "Market Positioning"] },
  { word: "Impact", num: "03", Icon: ChartLineUp, desc: "Measurable results: earned attention, shifted reputation and enduring cultural relevance.", lines: ["Earned Coverage", "Reputation Shift", "Audience Growth", "Legacy Building"] },
];

export default function HeroApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [pillar, setPillar] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Logo choreography: centered+large in hero → small on the right during Approach
  const logoScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0.52]);
  const logoX = useTransform(scrollYProgress, [0.2, 0.4], ["0vw", "24vw"]);
  const logoY = useTransform(scrollYProgress, [0.2, 0.4], ["0vh", "0vh"]);

  // Hero-only elements fade out as we enter the approach
  const heroFade = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0]);
  // Approach left panel fades in
  const approachFade = useTransform(scrollYProgress, [0.36, 0.46], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // map [0.4, 1.0] -> pillar 0..2
    if (p < 0.4) { setPillar(0); return; }
    const t = (p - 0.4) / 0.6;
    setPillar(t < 0.34 ? 0 : t < 0.67 ? 1 : 2);
  });

  return (
    <section ref={sectionRef} id="hero" style={{ position: "relative", height: "360vh", backgroundColor: "#F1E194" }}>
      {/* Pinned stage */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", color: "#1a1a1a", background: "linear-gradient(135deg, #F1E194 0%, #f7ecc4 55%, #efd98a 100%)" }}>
        {/* animated wine glow wash */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(80% 70% at 25% 15%, rgba(91,14,20,0.30) 0%, transparent 55%), radial-gradient(70% 60% at 85% 90%, rgba(91,14,20,0.22) 0%, transparent 50%)" }}
        />

        {/* ── Top kicker (hero phase) ── */}
        <motion.div style={{ opacity: heroFade, position: "absolute", top: 0, left: 0, right: 0, zIndex: 5, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(6.5rem,13vh,8rem)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#5B0E14" }}>
            <span style={{ width: "22px", height: "1px", background: "#5B0E14", opacity: 0.7 }} /> Strategic Communications
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)" }}>Nairobi · Africa</span>
        </motion.div>

        {/* ── Left: Our Approach pillars (approach phase) ── */}
        <motion.div
          className="ha-pillars"
          style={{ opacity: approachFade, position: "absolute", top: 0, bottom: 0, left: 0, width: "52%", zIndex: 4, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "2rem" }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
            Our Approach
          </span>
          {PILLARS.map((p, i) => {
            const active = pillar === i;
            const Icon = p.Icon;
            return (
              <div key={i} style={{ borderTop: "1px solid rgba(26,26,26,0.1)", paddingTop: "clamp(0.8rem,1.6vw,1.4rem)", paddingBottom: "clamp(0.8rem,1.6vw,1.4rem)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.22em", color: active ? "#5B0E14" : "rgba(26,26,26,0.25)" }}>{p.num}</span>
                  <motion.span animate={{ scale: active ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} style={{ display: "inline-flex" }}>
                    <Icon size={24} weight={active ? "fill" : "light"} color={active ? "#1a1a1a" : "rgba(26,26,26,0.2)"} />
                  </motion.span>
                  <h2 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: active ? 600 : 300, fontSize: "clamp(1.6rem,3vw,2.8rem)", color: active ? "#1a1a1a" : "rgba(26,26,26,0.16)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.98, transition: "color 0.5s, font-weight 0.3s" }}>
                    {p.word}
                  </h2>
                </div>
                <motion.div initial={false} animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(26,26,26,0.6)", maxWidth: "34ch", marginTop: "0.8rem", paddingLeft: "2.1rem" }}>{p.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem 1rem", marginTop: "0.9rem", paddingLeft: "2.1rem" }}>
                    {p.lines.map((l, li) => (
                      <span key={li} style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(26,26,26,0.45)" }}>— {l}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }} />
        </motion.div>

        {/* ── Logo stage (persists across both phases) ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <motion.div style={{ x: logoX, y: logoY, scale: logoScale, width: "min(58vw, 640px)", aspectRatio: "16/9", transformOrigin: "center" }}>
            {/* multiply blend drops the white frame background onto the gold field */}
            <LogoReveal onComplete={() => setRevealed(true)} style={{ width: "100%", height: "100%", mixBlendMode: "multiply" }} />
            {/* Tagline lockup under the logo (hero phase) */}
            <motion.p style={{ opacity: heroFade, textAlign: "center", marginTop: "-1rem", fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1rem,2.2vw,1.8rem)", letterSpacing: "0.04em", color: "#5B0E14", textTransform: "none" }}>
              Insight. Strategy. Impact.
            </motion.p>
          </motion.div>
        </div>

        {/* ── Bottom lede + CTAs (hero phase) ── */}
        <motion.div style={{ opacity: heroFade, position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingBottom: "clamp(2.5rem,6vh,4rem)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <p style={{ maxWidth: "42ch", color: "rgba(26,26,26,0.7)", fontSize: "clamp(0.95rem,1.3vw,1.15rem)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
              A full-service strategic communications and brand experience firm operating across Kenya and Africa.
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <Magnetic strength={14}>
                <Link href="/#contact" data-cursor="Let's talk" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", backgroundColor: "#1a1a1a", color: "#fff", padding: "0.95rem 1.6rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px", pointerEvents: "auto" }}>
                  Start a project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Magnetic>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)" }}>Scroll to explore ↓</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ha-pillars { width: 100% !important; padding-right: clamp(1.5rem,5vw,6rem) !important; background: rgba(255,255,255,0.82); backdrop-filter: blur(2px); }
        }
      `}</style>
    </section>
  );
}
