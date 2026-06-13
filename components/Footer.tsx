"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import ScrollVelocity from "@/components/ui/ScrollVelocity";

const SERVICES = ["Strategic Communications", "Media Management", "Influencer & Creator", "Digital Strategy", "Experiential Marketing", "Owned Platforms"];

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["-4%", "3%"]);

  return (
    <footer ref={ref} style={{ backgroundColor: "#1a0306", color: "#F5F2EC", position: "relative", overflow: "hidden" }}>
      {/* subtle animated gold wash */}
      <motion.div aria-hidden animate={{ opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(60% 50% at 80% 0%, rgba(241,225,148,0.08) 0%, transparent 55%), radial-gradient(60% 50% at 10% 100%, rgba(241,225,148,0.05) 0%, transparent 55%)" }} />

      {/* ── Services scroll-velocity strip ── */}
      <div style={{ position: "relative", zIndex: 2, overflow: "hidden", borderBottom: "1px solid rgba(241,225,148,0.12)", paddingTop: "clamp(4rem,9vw,7rem)", paddingBottom: "1.6rem", color: "#F1E194" }}>
        <ScrollVelocity
          texts={[SERVICES.join("  ✦  ") + "  ✦"]}
          velocity={55}
          numCopies={4}
          className="footer-vel"
        />
      </div>

      {/* ── Columns ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(3rem,6vw,4.5rem)" }}>
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(2rem,5vw,4rem)" }}>
          <div className="ft-brand">
            <Link href="/" aria-label="FID & Co." style={{ display: "inline-flex", alignItems: "center", background: "#F5F2EC", padding: "12px 18px", borderRadius: "4px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fid-logo.png" alt="FID & Co. — Insight. Strategy. Impact." style={{ height: "52px", width: "auto", display: "block" }} />
            </Link>
            <p style={{ color: "rgba(245,242,236,0.6)", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: "34ch", marginTop: "1.2rem", fontFamily: "var(--font-body)" }}>
              Strategic Communications &amp; Brand Experiences Across Africa.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F1E194", marginBottom: "1.4rem", fontWeight: 500, fontFamily: "var(--font-body)" }}>Navigation</h5>
            {[{ label: "Expertise", href: "/#services" }, { label: "Work", href: "/#work" }, { label: "About", href: "/#about" }, { label: "Events", href: "/events" }, { label: "Insights", href: "/#insights" }, { label: "Contact", href: "/#contact" }].map((l) => (
              <Link key={l.label} href={l.href} style={{ display: "block", color: "rgba(245,242,236,0.75)", fontSize: "0.9rem", marginBottom: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F1E194")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.75)")}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F1E194", marginBottom: "1.4rem", fontWeight: 500, fontFamily: "var(--font-body)" }}>Connect</h5>
            <a href="tel:+254797690609" style={{ display: "block", color: "rgba(245,242,236,0.75)", fontSize: "0.9rem", marginBottom: "0.8rem", textDecoration: "none" }}>+254 797 690 609</a>
            <a href="https://www.fidco.africa" style={{ display: "block", color: "rgba(245,242,236,0.75)", fontSize: "0.9rem", marginBottom: "1.2rem", textDecoration: "none" }}>www.fidco.africa</a>
            {[{ name: "Instagram", href: "https://instagram.com/fidpr/" }, { name: "Facebook", href: "https://facebook.com/profile.php?id=100070330230678" }, { name: "YouTube", href: "https://youtube.com/@FIDPR" }].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "rgba(245,242,236,0.6)", fontSize: "0.78rem", letterSpacing: "0.04em", marginRight: "1rem", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F1E194")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.6)")}>
                {s.name}<ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", paddingTop: "2.4rem", marginTop: "clamp(3rem,6vw,5rem)", borderTop: "1px solid rgba(241,225,148,0.1)" }}>
          <p style={{ color: "rgba(245,242,236,0.4)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>© {year} FID &amp; Co. All rights reserved.</p>
          <p style={{ color: "rgba(245,242,236,0.4)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>Nairobi · Kenya · Africa</p>
        </div>
      </div>

      {/* ── Giant kinetic wordmark ── */}
      <motion.div aria-hidden style={{ x: wordX, position: "relative", zIndex: 1, textAlign: "center", fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(5rem,24vw,22rem)", lineHeight: 0.74, letterSpacing: "-0.04em", color: "#F5F2EC", whiteSpace: "nowrap", marginTop: "0.5rem", userSelect: "none" }}>
        FID &amp; CO.
      </motion.div>

      <style>{`
        .footer-vel { font-family: var(--font-heading,'Oswald'); font-weight: 600; text-transform: uppercase; font-size: clamp(1.1rem,2.2vw,1.7rem); letter-spacing: 0.02em; }
        @media (max-width:768px){ .ft-grid{ grid-template-columns:1fr 1fr !important; } .ft-brand{ grid-column:1 / -1; } }
      `}</style>
    </footer>
  );
}
