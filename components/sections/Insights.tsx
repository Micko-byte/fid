"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";

const articles = [
  { title: "The rise of creator-led marketing in Africa", date: "May 2026", img: "/photos/projects/lc-waikiki-influencer.jpg", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Why experiential marketing builds cultural relevance", date: "April 2026", img: "/photos/projects/tribe-vibe.jpg", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Entering African markets: why local insight matters", date: "March 2026", img: "/photos/projects/africa-forum-displacement.jpg", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "AI, fashion and the future of content production in Africa", date: "February 2026", img: "/photos/projects/allso-beauty.jpg", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Communicating at scale: lessons from national campaigns", date: "January 2026", img: "/photos/projects/national-minorities-day.jpg", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "How hospitality brands build lifestyle relevance", date: "December 2025", img: "/photos/editorial/cultural-festival.jpg", href: "https://www.linkedin.com/company/fid-pr/" },
];

export default function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 350, damping: 30 });
  const py = useSpring(my, { stiffness: 350, damping: 30 });

  const onMove = (e: React.MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };

  return (
    <section id="insights" style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)", position: "relative" }} onMouseMove={onMove}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        {/* Header with section number tag */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#742F14" }}>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>(06)</span>
              <span style={{ width: "26px", height: "1px", background: "#742F14", opacity: 0.6 }} /> Our Thinking
            </motion.span>
            <motion.h2 initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }} animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}} transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.4rem,6vw,5rem)", color: "#1a1a1a", marginTop: "0.8rem", letterSpacing: "-0.02em", lineHeight: 0.95, textTransform: "uppercase" }}>
              Perspectives &amp;<br />Intelligence
            </motion.h2>
          </div>
          <Link href="/insights" style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.5)", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#742F14")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.5)")}>
            All articles →
          </Link>
        </div>

        {/* Rows */}
        <div>
          {articles.map((a, i) => (
            <motion.a key={i} href={a.href} target="_blank" rel="noopener noreferrer" data-cursor="Read"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "clamp(1.3rem,2.6vw,2.1rem) 0", borderTop: "1px solid rgba(116,47,20,0.18)", textDecoration: "none", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1rem,2vw,2rem)", position: "relative", zIndex: 1 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(26,26,26,0.4)", flexShrink: 0, width: "5.5rem" }}>{a.date}</span>
                <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(1.2rem,2.6vw,2.1rem)", lineHeight: 1.04, letterSpacing: "-0.01em", color: hovered === i ? "#742F14" : "#1a1a1a", transition: "color 0.3s, transform 0.4s", transform: hovered === i ? "translateX(12px)" : "translateX(0)", textTransform: "uppercase" }}>
                  {a.title}
                </h3>
              </div>
              <ArrowUpRight size={20} weight="light" color={hovered === i ? "#742F14" : "rgba(26,26,26,0.3)"} style={{ flexShrink: 0, transition: "transform 0.3s, color 0.3s", transform: hovered === i ? "translate(3px,-3px)" : "none" }} />
            </motion.a>
          ))}
          <div style={{ borderTop: "1px solid rgba(116,47,20,0.18)" }} />
        </div>
      </div>

      {/* Cursor-following image preview */}
      <motion.div aria-hidden style={{ position: "fixed", top: 0, left: 0, x: px, y: py, translateX: "-50%", translateY: "-50%", zIndex: 60, width: "260px", height: "320px", pointerEvents: "none", overflow: "hidden", borderRadius: "3px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)", opacity: hovered !== null ? 1 : 0, scale: hovered !== null ? 1 : 0.85, transition: "opacity 0.3s, scale 0.3s" }}>
        {articles.map((a, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={i} src={a.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: hovered === i ? 1 : 0, transition: "opacity 0.3s" }} />
        ))}
      </motion.div>
    </section>
  );
}
