"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle · Music · Culture",
    href: "#contact",
    desc: "A platform at the intersection of African youth culture, music and contemporary lifestyle — building community through curated experiences.",
    num: "01",
    // plate colours
    plateBg: "#1a1409",
    plateAccent: "#D98038",
    plateStrip: "#2a1f0a",
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations · Identity · Wellbeing",
    href: "#contact",
    desc: "Intimate dialogue at the crossroads of identity, mental wellbeing and modern African womanhood. Conversations that shift culture.",
    num: "02",
    plateBg: "#0d1a16",
    plateAccent: "#4caf82",
    plateStrip: "#112219",
  },
  {
    name: "The Capital Room",
    tag: "Leadership · Business · African Perspectives",
    href: "#contact",
    desc: "A high-table forum connecting Africa's emerging business leaders, investors and changemakers with the ideas shaping the continent's economy.",
    num: "03",
    plateBg: "#0d0d1a",
    plateAccent: "#7b8fcc",
    plateStrip: "#111128",
  },
];

function PlatformPlate({ p, inView, i }: { p: typeof platforms[0]; inView: boolean; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.12 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="platform-card"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.5rem,3vw,2.5rem)", alignItems: "center", paddingTop: "clamp(2rem,4vw,3rem)", paddingBottom: "clamp(2rem,4vw,3rem)", borderTop: "1px solid rgba(217,171,136,0.12)" }}
    >
      {/* Left: text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(217,171,136,0.35)", flexShrink: 0 }}>{p.num}</span>
          <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.4rem,2.8vw,2.2rem)", color: "#F5F2EC", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
            {p.name}
          </h3>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.06em", color: "rgba(217,171,136,0.5)", lineHeight: 1.4 }}>{p.tag}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", lineHeight: 1.65, color: "rgba(245,242,236,0.48)", maxWidth: "36ch" }}>{p.desc}</p>
        <a
          href={p.href}
          className="plat-link"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#750006", textDecoration: "none", marginTop: "0.4rem", transition: "color 0.3s, gap 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#D98038"; e.currentTarget.style.gap = "0.85rem"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#750006"; e.currentTarget.style.gap = "0.5rem"; }}
        >
          Partner
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>

      {/* Right: editorial image placeholder */}
      <div style={{ position: "relative" }}>
        {/* Main plate */}
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            backgroundColor: p.plateBg,
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(217,171,136,0.08)",
          }}
        >
          {/* Grain */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")` }} />
          {/* Grid lines */}
          {[33, 66].map(pct => <div key={pct} style={{ position: "absolute", left: 0, right: 0, top: `${pct}%`, height: "1px", background: "rgba(217,171,136,0.06)" }} />)}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", background: "rgba(217,171,136,0.05)" }} />

          {/* Content inside plate */}
          <div style={{ position: "absolute", inset: 0, padding: "clamp(1rem,2vw,1.4rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(217,171,136,0.22)" }}>FID &amp; Co.</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "rgba(217,171,136,0.15)" }}>2026</span>
            </div>

            {/* Ghost name */}
            <div>
              <p style={{
                fontFamily: "var(--font-heading,'Oswald')", fontWeight: 300,
                fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 0.88,
                letterSpacing: "-0.03em", textTransform: "uppercase",
                color: `${p.plateAccent}18`,
              }}>
                {p.name.split(" ")[0]}
              </p>
              {/* Colour accent strip */}
              <div style={{ width: "32px", height: "2px", backgroundColor: p.plateAccent, opacity: 0.5, marginTop: "0.8rem" }} />
              <div style={{ borderTop: "1px solid rgba(217,171,136,0.08)", marginTop: "0.8rem", paddingTop: "0.7rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(217,171,136,0.25)" }}>{p.tag.split(" · ")[0]}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "rgba(217,171,136,0.18)" }}>{p.num}</span>
              </div>
            </div>
          </div>

          {/* Ambient glow using accent colour */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 30% 60%, ${p.plateAccent}0d 0%, transparent 65%)`, pointerEvents: "none" }} />
        </div>

        {/* Small offset accent badge */}
        <div style={{
          position: "absolute", bottom: "-0.8rem", right: "-0.8rem",
          width: "clamp(44px,6vw,64px)", height: "clamp(44px,6vw,64px)",
          backgroundColor: p.plateAccent, opacity: 0.18,
        }} />
      </div>
    </motion.div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="platforms" style={{ backgroundColor: "#260000", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038" }}
        >
          <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7 }} />
          Owned platforms
        </motion.span>

        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#F5F2EC", letterSpacing: "-0.02em", textWrap: "balance", marginTop: "1rem", maxWidth: "20ch", marginBottom: "clamp(1rem,3vw,2rem)" } as React.CSSProperties}
        >
          Culture, conversation and brand experience — on our terms.
        </motion.h2>

        {/* Platform rows */}
        <div>
          {platforms.map((p, i) => (
            <PlatformPlate key={i} p={p} inView={inView} i={i} />
          ))}
          <div style={{ borderTop: "1px solid rgba(217,171,136,0.12)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .platform-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
