"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Lightbulb, Target, ChartLineUp } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

const PILLARS = [
  { word: "Insight", num: "01", Icon: Lightbulb, desc: "Deep audience intelligence that uncovers what truly drives perception, behaviour and decision-making.", lines: ["Audience Analysis", "Cultural Mapping", "Media Landscape", "Stakeholder Research"] },
  { word: "Strategy", num: "02", Icon: Target, desc: "Purposeful planning that connects brand truth to cultural moment — across every channel and market.", lines: ["Narrative Development", "Channel Architecture", "Campaign Blueprinting", "Market Positioning"] },
  { word: "Impact", num: "03", Icon: ChartLineUp, desc: "Measurable results: earned attention, shifted reputation and enduring cultural relevance.", lines: ["Earned Coverage", "Reputation Shift", "Audience Growth", "Legacy Building"] },
];

const PHOTOS = Array.from({ length: 12 }, (_, i) => `/photos/cinematic/c${String(i + 1).padStart(2, "0")}.jpg`);
const POSITIONS = ["center 30%", "center center", "left center", "right center", "center 70%"];

/* Fast cinematic photo montage */
function Montage() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTOS.length), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#1a0306" }}>
      {PHOTOS.map((src, i) => (
        <motion.div key={i}
          animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1.07 : 1 }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 1.1, ease: "linear" } }}
          style={{ position: "absolute", inset: 0, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: POSITIONS[i % POSITIONS.length], willChange: "opacity, transform" }}
        />
      ))}
    </div>
  );
}

export default function HeroApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pillar, setPillar] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Full-bleed image → docks to a right-side framed panel as Our Approach scrolls in
  const clip = useTransform(scrollYProgress, [0.12, 0.4], ["inset(0% 0% 0% 0%)", "inset(14% 5% 14% 52%)"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const scrimFade = useTransform(scrollYProgress, [0, 0.2, 0.32], [1, 1, 0]);
  const approachFade = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p < 0.4) { setPillar(0); return; }
    const t = (p - 0.4) / 0.6;
    setPillar(t < 0.34 ? 0 : t < 0.67 ? 1 : 2);
  });

  return (
    <section ref={sectionRef} id="hero" style={{ position: "relative", height: "360vh", backgroundColor: "#f7ecc4" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", color: "#1a1a1a", backgroundColor: "#f7ecc4" }}>

        {/* Cinematic media — full-bleed, then clips to a right panel */}
        <motion.div style={{ clipPath: clip, WebkitClipPath: clip, position: "absolute", inset: 0, zIndex: 1 }}>
          <Montage />
          {/* legibility scrim (hero phase only) */}
          <motion.div style={{ opacity: scrimFade, position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,3,6,0.45) 0%, rgba(26,3,6,0.15) 40%, rgba(26,3,6,0.8) 100%)" }} />
        </motion.div>

        {/* Approach pillars (left, on scroll) */}
        <motion.div className="ha-pillars" style={{ opacity: approachFade, position: "absolute", top: 0, bottom: 0, left: 0, width: "50%", zIndex: 4, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "2rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>Our Approach</span>
          {PILLARS.map((p, i) => {
            const active = pillar === i; const Icon = p.Icon;
            return (
              <div key={i} style={{ borderTop: "1px solid rgba(26,26,26,0.12)", paddingTop: "clamp(0.8rem,1.6vw,1.4rem)", paddingBottom: "clamp(0.8rem,1.6vw,1.4rem)" }}>
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
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.12)" }} />
        </motion.div>

        {/* Hero copy (over the full-bleed image) */}
        <motion.div style={{ opacity: heroFade, position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(6.5rem,13vh,8rem)", paddingBottom: "clamp(2.5rem,6vh,4rem)", pointerEvents: "none" }}>
          {/* kicker */}
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#F1E194" }}>
              <span style={{ width: "22px", height: "1px", background: "#F1E194", opacity: 0.8 }} /> Insight. Strategy. Impact.
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(245,242,236,0.7)" }}>Nairobi · Africa</span>
          </div>

          {/* headline + lede + CTA (exact docx wording) */}
          <div style={{ maxWidth: "20ch" }}>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.6rem,6.5vw,6rem)", lineHeight: 0.98, letterSpacing: "-0.025em", color: "#F5F2EC", textTransform: "uppercase", textShadow: "0 2px 30px rgba(0,0,0,0.35)", textWrap: "balance" } as React.CSSProperties}>
              A strategic communications partner for organisations shaping Africa.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.3vw,1.18rem)", lineHeight: 1.6, color: "rgba(245,242,236,0.85)", maxWidth: "52ch", marginTop: "1.6rem" }}>
              A full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginTop: "2.2rem", pointerEvents: "auto" }}>
              <Button href="/#contact" variant="primary" magnetic cursor="Let's talk">Start a project</Button>
              <Button href="/#work" variant="outline">See our work</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ha-pillars { width: 100% !important; padding-right: clamp(1.5rem,5vw,6rem) !important; background: rgba(247,236,196,0.9); backdrop-filter: blur(2px); }
        }
      `}</style>
    </section>
  );
}
