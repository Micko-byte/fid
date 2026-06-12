"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Lightbulb, Target, ChartLineUp } from "@phosphor-icons/react";
import Magnetic from "@/components/motion/Magnetic";
import BrandMark from "@/components/graphics/BrandMark";
import SplitReveal from "@/components/motion/SplitReveal";

const PILLARS = [
  { word: "Insight", num: "01", Icon: Lightbulb, desc: "Deep audience intelligence that uncovers what truly drives perception, behaviour and decision-making.", lines: ["Audience Analysis", "Cultural Mapping", "Media Landscape", "Stakeholder Research"] },
  { word: "Strategy", num: "02", Icon: Target, desc: "Purposeful planning that connects brand truth to cultural moment — across every channel and market.", lines: ["Narrative Development", "Channel Architecture", "Campaign Blueprinting", "Market Positioning"] },
  { word: "Impact", num: "03", Icon: ChartLineUp, desc: "Measurable results: earned attention, shifted reputation and enduring cultural relevance.", lines: ["Earned Coverage", "Reputation Shift", "Audience Growth", "Legacy Building"] },
];

export default function HeroApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pillar, setPillar] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Lockup choreography: centered+large in hero → small, docked right during Approach
  const lockScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0.46]);
  const lockX = useTransform(scrollYProgress, [0.2, 0.4], ["0vw", "25vw"]);
  // Parallax depth layers
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const ghostRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const heroFade = useTransform(scrollYProgress, [0, 0.14, 0.22], [1, 1, 0]);
  const approachFade = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p < 0.4) { setPillar(0); return; }
    const t = (p - 0.4) / 0.6;
    setPillar(t < 0.34 ? 0 : t < 0.67 ? 1 : 2);
  });

  return (
    <section ref={sectionRef} id="hero" style={{ position: "relative", height: "360vh", backgroundColor: "#F1E194" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", color: "#1a1a1a", background: "linear-gradient(135deg, #F1E194 0%, #f7ecc4 55%, #efd98a 100%)" }}>

        {/* ── Parallax depth: drifting wine glow ── */}
        <motion.div aria-hidden style={{ y: glowY, position: "absolute", inset: "-10% 0", pointerEvents: "none", background: "radial-gradient(60% 50% at 22% 18%, rgba(91,14,20,0.32) 0%, transparent 55%), radial-gradient(55% 45% at 88% 88%, rgba(91,14,20,0.22) 0%, transparent 50%)" }} />

        {/* ── Parallax depth: giant ghost brand diamond ── */}
        <motion.div aria-hidden style={{ y: ghostY, rotate: ghostRotate, position: "absolute", top: "50%", left: "50%", width: "min(120vh,1100px)", height: "min(120vh,1100px)", x: "-50%", marginTop: "-50vh", opacity: 0.06, pointerEvents: "none" }}>
          <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden>
            <path d="M60 2 L118 60 L60 118 L2 60 Z" fill="none" stroke="#5B0E14" strokeWidth="0.5" />
            <path d="M60 22 L98 60 L60 98 L22 60 Z" fill="none" stroke="#5B0E14" strokeWidth="0.5" />
            <path d="M60 42 L78 60 L60 78 L42 60 Z" fill="none" stroke="#5B0E14" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* film grain */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")` }} />

        {/* ── Top kicker (hero phase) ── */}
        <motion.div style={{ opacity: heroFade, position: "absolute", top: 0, left: 0, right: 0, zIndex: 5, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(6.5rem,13vh,8rem)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#5B0E14" }}>
            <span style={{ width: "22px", height: "1px", background: "#5B0E14", opacity: 0.7 }} /> Strategic Communications
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(26,26,26,0.45)" }}>Nairobi · Africa</span>
        </motion.div>

        {/* ── Left: Our Approach pillars (approach phase) ── */}
        <motion.div className="ha-pillars" style={{ opacity: approachFade, position: "absolute", top: 0, bottom: 0, left: 0, width: "52%", zIndex: 4, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "2rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>Our Approach</span>
          {PILLARS.map((p, i) => {
            const active = pillar === i;
            const Icon = p.Icon;
            return (
              <div key={i} style={{ borderTop: "1px solid rgba(91,14,20,0.15)", paddingTop: "clamp(0.8rem,1.6vw,1.4rem)", paddingBottom: "clamp(0.8rem,1.6vw,1.4rem)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.22em", color: active ? "#5B0E14" : "rgba(26,26,26,0.25)" }}>{p.num}</span>
                  <motion.span animate={{ scale: active ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} style={{ display: "inline-flex" }}>
                    <Icon size={24} weight={active ? "fill" : "light"} color={active ? "#5B0E14" : "rgba(26,26,26,0.2)"} />
                  </motion.span>
                  <h2 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: active ? 600 : 300, fontSize: "clamp(1.6rem,3vw,2.8rem)", color: active ? "#1a1a1a" : "rgba(26,26,26,0.18)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.98, transition: "color 0.5s, font-weight 0.3s" }}>{p.word}</h2>
                </div>
                <motion.div initial={false} animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(26,26,26,0.62)", maxWidth: "34ch", marginTop: "0.8rem", paddingLeft: "2.1rem" }}>{p.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem 1rem", marginTop: "0.9rem", paddingLeft: "2.1rem" }}>
                    {p.lines.map((l, li) => (<span key={li} style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(26,26,26,0.5)" }}>— {l}</span>))}
                  </div>
                </motion.div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(91,14,20,0.15)" }} />
        </motion.div>

        {/* ── Brand lockup (persists, docks right) ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <motion.div style={{ x: lockX, scale: lockScale, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.4rem", transformOrigin: "center" }}>
            <BrandMark size={92} color="#5B0E14" accent="#1a1a1a" spin />
            <h1 style={{ margin: 0, fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(3.5rem,12vw,11rem)", lineHeight: 0.86, letterSpacing: "-0.03em", color: "#5B0E14", textTransform: "uppercase", textShadow: "0 1px 0 rgba(255,255,255,0.25)" }}>
              <SplitReveal as="span" by="char" stagger={0.05} style={{ display: "inline-block" }}>FID</SplitReveal>
              <span style={{ color: "#1a1a1a" }}> &amp; Co.</span>
            </h1>
            <motion.p style={{ opacity: heroFade, margin: 0, fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(0.95rem,2vw,1.7rem)", letterSpacing: "0.06em", color: "#5B0E14" }}>
              Insight. Strategy. Impact.
            </motion.p>
          </motion.div>
        </div>

        {/* ── Bottom lede + CTAs (hero phase) ── */}
        <motion.div style={{ opacity: heroFade, position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingBottom: "clamp(2.5rem,6vh,4rem)" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <p style={{ maxWidth: "42ch", color: "rgba(26,26,26,0.7)", fontSize: "clamp(0.95rem,1.3vw,1.15rem)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
              A full-service strategic communications and brand experience firm operating across Kenya and Africa.
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <Magnetic strength={14}>
                <Link href="/#contact" data-cursor="Let's talk" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", backgroundColor: "#5B0E14", color: "#F1E194", padding: "0.95rem 1.6rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px", pointerEvents: "auto" }}>
                  Start a project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Magnetic>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(91,14,20,0.6)" }}>Scroll to explore ↓</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ha-pillars { width: 100% !important; padding-right: clamp(1.5rem,5vw,6rem) !important; background: rgba(247,236,196,0.82); backdrop-filter: blur(2px); }
        }
      `}</style>
    </section>
  );
}
