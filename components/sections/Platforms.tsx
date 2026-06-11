"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle • Music • Culture • Community",
    href: "#contact",
    desc: "FID & Co.'s flagship experiential lifestyle platform, bringing together music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    num: "01",
    image: "/photos/projects/tribe-vibe.jpg",
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations • Modern Identity • Thoughtful Experiences",
    href: "#contact",
    desc: "An intimate conversation platform created to foster meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    num: "02",
    image: "/photos/editorial/cultural-festival.jpg",
  },
  {
    name: "The Capital Room",
    tag: "Leadership • Business • Influence • African Perspectives",
    href: "#contact",
    desc: "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets — bringing together founders, executives and changemakers.",
    num: "03",
    image: "/photos/editorial/podcast-set.jpg",
  },
];

function PlatformPlate({ p, inView, i }: { p: typeof platforms[0]; inView: boolean; i: number }) {
  const reverse = i % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="platform-card"
      style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(1.5rem,4vw,4rem)", alignItems: "center",
        paddingTop: "clamp(2.5rem,5vw,4rem)", paddingBottom: "clamp(2.5rem,5vw,4rem)",
        borderTop: "1px solid rgba(26,26,26,0.1)",
      }}
    >
      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", order: reverse ? 2 : 1 }} className="plat-text">
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "rgba(117,0,6,0.55)", flexShrink: 0 }}>{p.num}</span>
          <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.6rem,3.2vw,2.6rem)", color: "#1a1a1a", letterSpacing: "-0.01em", lineHeight: 1.04 }}>
            {p.name}
          </h3>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.06em", color: "#750006", lineHeight: 1.4, textTransform: "uppercase" }}>{p.tag}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)", maxWidth: "42ch" }}>{p.desc}</p>
        <a
          href={p.href}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#750006", textDecoration: "none", marginTop: "0.5rem", fontWeight: 600, transition: "gap 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.gap = "0.85rem"; }}
          onMouseLeave={e => { e.currentTarget.style.gap = "0.5rem"; }}
        >
          Partner with us
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>

      {/* Image */}
      <div style={{ position: "relative", order: reverse ? 1 : 2 }}>
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#ece7df" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="platforms" style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
        >
          <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
          Owned platforms &amp; cultural IPs
        </motion.span>

        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#1a1a1a", letterSpacing: "-0.02em", textWrap: "balance", marginTop: "1rem", maxWidth: "22ch", marginBottom: "clamp(1rem,3vw,2rem)" } as React.CSSProperties}
        >
          Culture, conversation and brand experience — on our terms.
        </motion.h2>

        <div>
          {platforms.map((p, i) => (
            <PlatformPlate key={i} p={p} inView={inView} i={i} />
          ))}
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .platform-card { grid-template-columns: 1fr !important; }
          .platform-card .plat-text { order: 2 !important; }
          .platform-card > div:last-child { order: 1 !important; }
        }
      `}</style>
    </section>
  );
}
