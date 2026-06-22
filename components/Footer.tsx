"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["-4%", "3%"]);

  return (
    <footer ref={ref} style={{ backgroundColor: "#750006", color: "#f5f2ec", position: "relative", overflow: "hidden", borderTop: "3px solid #260000" }}>
      {/* ── Columns ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(4rem,8vw,6rem)" }}>
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(2rem,5vw,4rem)" }}>
          <div className="ft-brand">
            {/* Logo — directly on the orange footer, no background chip */}
            <Link href="/" aria-label="FID & Co." style={{ display: "inline-flex", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fid-logo.png" alt="FID & Co. — Insight. Strategy. Impact." style={{ height: "108px", width: "auto", display: "block" }} />
            </Link>
            <p style={{ color: "rgba(245,242,236,0.72)", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: "34ch", marginTop: "1.2rem", fontFamily: "var(--font-body)" }}>
              Strategic Communications &amp; Brand Experiences Across Africa.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", marginBottom: "1.4rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>Navigation</h5>
            {[{ label: "Expertise", href: "/#services" }, { label: "Work", href: "/#work" }, { label: "About", href: "/#about" }, { label: "Events", href: "/events" }, { label: "Insights", href: "/#insights" }, { label: "Contact", href: "/#contact" }].map((l) => (
              <Link key={l.label} href={l.href} style={{ display: "block", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d98038")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.72)")}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", marginBottom: "1.4rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>Connect</h5>
            <a href="tel:+254797690609" style={{ display: "block", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "0.8rem", textDecoration: "none" }}>+254 797 690 609</a>
            <a href="https://www.fidco.africa" style={{ display: "block", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "1.2rem", textDecoration: "none" }}>www.fidco.africa</a>
            {[{ name: "Instagram", href: "https://instagram.com/fidpr/" }, { name: "Facebook", href: "https://facebook.com/profile.php?id=100070330230678" }, { name: "YouTube", href: "https://youtube.com/@FIDPR" }].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "rgba(245,242,236,0.6)", fontSize: "0.78rem", letterSpacing: "0.04em", marginRight: "1rem", textDecoration: "none", transition: "color 0.3s, transform 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#d98038"; e.currentTarget.style.transform = "scale(1.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,242,236,0.6)"; e.currentTarget.style.transform = "scale(1)"; }}>
                {s.name}<ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", paddingTop: "2.4rem", marginTop: "clamp(3rem,6vw,5rem)", borderTop: "1px solid rgba(245,242,236,0.15)" }}>
          <p style={{ color: "rgba(245,242,236,0.5)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>© {year} FID &amp; Co. All rights reserved.</p>
          <p style={{ color: "rgba(245,242,236,0.5)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>Nairobi · Kenya · Africa</p>
        </div>
      </div>

      {/* ── Giant kinetic wordmark (subtle, on orange) ── */}
      <motion.div aria-hidden style={{ x: wordX, position: "relative", zIndex: 1, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(7rem,30vw,28rem)", lineHeight: 0.72, letterSpacing: 0, color: "rgba(245,242,236,0.1)", whiteSpace: "nowrap", marginTop: "clamp(1.5rem,4vw,3rem)", marginBottom: "-0.08em", userSelect: "none" }}>
        FID &amp; CO.
      </motion.div>

      <style>{`
        @media (max-width:768px){ .ft-grid{ grid-template-columns:1fr 1fr !important; } .ft-brand{ grid-column:1 / -1; } }
      `}</style>
    </footer>
  );
}
