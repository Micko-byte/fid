"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Parallax from "@/components/motion/Parallax";
import SplitText from "@/components/ui/SplitText";
import CircularText from "@/components/ui/CircularText";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { CultureGraphic } from "@/components/graphics/AbstractGraphics";

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle • Music • Culture • Community",
    href: "/platforms/the-tribe-vibe",
    desc: "FID & Co.'s flagship experiential lifestyle platform, bringing together music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    num: "01",
    image: "/photos/projects/tribe-vibe.jpg",
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations • Modern Identity • Thoughtful Experiences",
    href: "/platforms/suhba-series",
    desc: "An intimate conversation platform created to foster meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    num: "02",
    image: "/photos/editorial/cultural-festival.jpg",
  },
  {
    name: "The Capital Room",
    tag: "Leadership • Business • Influence • African Perspectives",
    href: "/platforms/the-capital-room",
    desc: "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets — bringing together founders, executives and changemakers.",
    num: "03",
    image: "/photos/editorial/podcast-set.jpg",
  },
];

function PlatformPlate({ p, i }: { p: typeof platforms[0]; i: number }) {
  const reverse = i % 2 === 1;
  const isSuhba = p.name === "Suhba Series";
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-18%" });
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="platform-card"
      style={{
        position: "sticky", top: `calc(96px + ${i * 22}px)`,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(1.5rem,4vw,4rem)", alignItems: "center",
        padding: "clamp(2rem,4vw,3.2rem)",
        marginBottom: "clamp(2rem,4vw,3rem)",
        backgroundColor: "rgba(251,243,214,0.72)",
        border: "1px solid rgba(91,14,20,0.12)",
        borderRadius: "10px",
        boxShadow: "0 -8px 40px rgba(91,14,20,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", order: reverse ? 2 : 1 }} className="plat-text">
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "rgba(117,0,6,0.55)", flexShrink: 0 }}>{p.num}</span>
          <Link href={p.href} style={{ textDecoration: "none", color: "inherit" }}>
            <h3 className="plat-title" style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', fontWeight: 700, fontSize: "clamp(1.6rem,3.2vw,2.6rem)", color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.04, transition: "color 0.3s" }}>
              {p.name}
            </h3>
          </Link>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.06em", color: "#5B0E14", lineHeight: 1.4, textTransform: "uppercase" }}>{p.tag}</p>
        {isSuhba && (
          <div style={{ marginTop: "0.3rem", marginBottom: "0.3rem" }}>
            <ScrollVelocity
              texts={["Curated Conversations ★ Modern Identity ★ Thoughtful Experiences ★"]}
              velocity={30}
              numCopies={2}
              className="plat-suhba-vel"
            />
          </div>
        )}
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)", maxWidth: "42ch" }}>{p.desc}</p>
        <Link
          href={p.href}
          data-cursor="Explore"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5B0E14", textDecoration: "none", marginTop: "0.5rem", fontWeight: 600, transition: "gap 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.gap = "0.85rem"; }}
          onMouseLeave={e => { e.currentTarget.style.gap = "0.5rem"; }}
        >
          Explore {p.name}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>

      {/* Image */}
      <Link href={p.href} data-cursor="Explore" style={{ position: "relative", order: reverse ? 1 : 2, display: "block", textDecoration: "none" }}>
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "linear-gradient(135deg, rgba(91,14,20,0.08), rgba(241,225,148,0.16))", position: "relative" }}>
          <Parallax speed={0.12} style={{ width: "100%", height: "116%", marginTop: "-8%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", mixBlendMode: "multiply" }} className="plat-img" />
          </Parallax>
          {isSuhba && (
            <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "clamp(150px, 16vw, 210px)", aspectRatio: "1", color: "#5B0E14", pointerEvents: "none" }}>
              <CircularText text="CURATED*CONVERSATIONS*MODERN*IDENTITY*THOUGHTFUL*EXPERIENCES*" reverse onHover="speedUp" className="text-[#5B0E14]" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="platforms" style={{ position: "relative", overflow: "hidden", backgroundColor: "#f7ecc4", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}>
      {/* Cultural-IP abstract graphic — large decorative element */}
      <div aria-hidden="true" style={{ position: "absolute", top: "clamp(2rem,6vw,5rem)", right: "-6%", width: "min(46vw, 560px)", opacity: 0.5, pointerEvents: "none", zIndex: 0 }} className="plat-deco-graphic">
        <CultureGraphic />
      </div>
      <div ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14" }}
        >
          <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
          Owned platforms &amp; cultural IPs
        </motion.span>

        <SplitText
          tag="h2"
          text="Culture, conversation and brand experience — on our terms."
          splitType="words"
          delay={40}
          duration={0.9}
          from={{ opacity: 0, y: 50 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="left"
          style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', fontWeight: 700, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#1a1a1a", letterSpacing: "-0.03em", marginTop: "1rem", maxWidth: "22ch", marginBottom: "clamp(1rem,3vw,2rem)" }}
        />

        <div>
          {platforms.map((p, i) => (
            <PlatformPlate key={i} p={p} i={i} />
          ))}
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }} />
        </div>
      </div>

      <style>{`
        .platform-card a:hover .plat-title { color: #5B0E14; }
        .platform-card a:hover .plat-img { transform: scale(1.05); }
        .plat-suhba-vel { font-family: var(--font-body); font-size: 0.64rem; letter-spacing: 0.24em; text-transform: uppercase; color: #5B0E14; }
        @media (max-width: 900px) {
          .plat-deco-graphic { opacity: 0.22 !important; width: 60vw !important; right: -18% !important; }
        }
        @media (max-width: 768px) {
          .platform-card { grid-template-columns: 1fr !important; }
          .platform-card .plat-text { order: 2 !important; }
          .platform-card > a:last-child { order: 1 !important; }
        }
      `}</style>
    </section>
  );
}
