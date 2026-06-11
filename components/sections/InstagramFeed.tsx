"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InstagramLogo, Heart, ChatCircle } from "@phosphor-icons/react";

const HANDLE = "fidpr";
const PROFILE = "https://instagram.com/fidpr/";

// Placeholder grid using real campaign imagery — wire to live IG feed (Behold/Elfsight) later
const posts = [
  "/photos/projects/tribe-vibe.jpg",
  "/photos/projects/lc-waikiki-influencer.jpg",
  "/photos/projects/kansai-gor-mahia.jpg",
  "/photos/projects/utamaduni-day.jpg",
  "/photos/projects/africa-forum-displacement.jpg",
  "/photos/editorial/cultural-festival.jpg",
];

function PostTile({ src, i, inView }: { src: string; i: number; inView: boolean }) {
  return (
    <motion.a
      href={PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="ig-tile"
      style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", backgroundColor: "#ece7df", display: "block" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="FID & Co. on Instagram" loading="lazy" className="ig-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
      <div className="ig-overlay" style={{ position: "absolute", inset: 0, background: "rgba(117,0,6,0.78)", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.4rem", opacity: 0, transition: "opacity 0.35s" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600 }}>
          <Heart size={20} weight="fill" /> {120 + i * 37}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600 }}>
          <ChatCircle size={20} weight="fill" /> {8 + i * 3}
        </span>
      </div>
    </motion.a>
  );
}

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(5rem,10vw,9rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "clamp(2rem,4vw,3rem)" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
            >
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
              On the grid
            </motion.span>
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "#1a1a1a", marginTop: "0.7rem", letterSpacing: "-0.01em" }}
            >
              Follow the work in motion.
            </motion.h2>
          </div>

          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", backgroundColor: "#750006", color: "#fff", padding: "0.8rem 1.4rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px", transition: "background 0.25s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8a0007")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#750006")}
          >
            <InstagramLogo size={18} weight="fill" /> @{HANDLE}
          </a>
        </div>

        {/* Grid */}
        <div className="ig-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "clamp(0.5rem,1vw,0.9rem)" }}>
          {posts.map((src, i) => (
            <PostTile key={i} src={src} i={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        .ig-tile:hover .ig-overlay { opacity: 1; }
        .ig-tile:hover .ig-img { transform: scale(1.06); }
        @media (max-width: 900px) { .ig-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 480px) { .ig-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
