"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

const SERVICES = ["Strategic Communications", "Media Management", "Influencer & Creator", "Digital Strategy", "Experiential Marketing", "Owned Platforms"];

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["-4%", "3%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.07]);
  const track = [...SERVICES, ...SERVICES];

  return (
    <footer ref={ref} style={{ backgroundColor: "#1a0306", color: "#F5F2EC", position: "relative", overflow: "hidden" }}>
      {/* subtle animated gold wash */}
      <motion.div aria-hidden animate={{ opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(60% 50% at 80% 0%, rgba(241,225,148,0.08) 0%, transparent 55%), radial-gradient(60% 50% at 10% 100%, rgba(241,225,148,0.05) 0%, transparent 55%)" }} />

      {/* ── Big CTA ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(5rem,11vw,9rem)" }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#F1E194" }}
        >
          <span style={{ width: "24px", height: "1px", background: "#F1E194", opacity: 0.7 }} /> Let&apos;s build something meaningful
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.6rem,7vw,6rem)", lineHeight: 0.96, letterSpacing: "-0.03em", color: "#F5F2EC", margin: "1.5rem 0 2.4rem", maxWidth: "16ch", textTransform: "uppercase" }}
        >
          Let&apos;s shape what comes next.
        </motion.h2>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button href="/#contact" variant="primary" magnetic cursor="Let's talk">Start a project</Button>
          <Button href="mailto:info@fidco.africa" variant="ghost" arrow={false} external>
            <span style={{ color: "#F1E194" }}>info@fidco.africa</span>
          </Button>
        </div>
      </div>

      {/* ── Services marquee ── */}
      <div style={{ position: "relative", zIndex: 2, overflow: "hidden", borderTop: "1px solid rgba(241,225,148,0.12)", borderBottom: "1px solid rgba(241,225,148,0.12)", margin: "clamp(4rem,8vw,7rem) 0 0", padding: "1.4rem 0" }}>
        <div className="ft-marq" style={{ display: "flex", width: "max-content" }}>
          {track.map((s, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1.4rem", padding: "0 1.6rem", fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(1.1rem,2vw,1.6rem)", letterSpacing: "0.02em", textTransform: "uppercase", color: i % 2 ? "#F1E194" : "rgba(245,242,236,0.85)", whiteSpace: "nowrap" }}>
              {s}<span style={{ width: "6px", height: "6px", transform: "rotate(45deg)", border: "1px solid #F1E194", opacity: 0.5 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── Columns ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(3rem,6vw,4.5rem)" }}>
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(2rem,5vw,4rem)" }}>
          <div className="ft-brand">
            <Link href="/" aria-label="FID & Co." style={{ display: "inline-flex", alignItems: "center", background: "#F5F2EC", padding: "11px 16px", borderRadius: "3px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-fid.svg" alt="FID & Co." style={{ height: "30px", width: "auto", display: "block" }} />
            </Link>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "#F1E194", marginTop: "0.8rem" }}>Insight. Strategy. Impact.</p>
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
      <motion.div aria-hidden style={{ x: wordX, opacity: wordOpacity, position: "relative", zIndex: 1, textAlign: "center", fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(5rem,23vw,21rem)", lineHeight: 0.78, letterSpacing: "-0.04em", color: "#F1E194", whiteSpace: "nowrap", marginTop: "1rem", userSelect: "none" }}>
        FID &amp; CO.
      </motion.div>

      <style>{`
        .ft-marq { animation: ft-marq-move 30s linear infinite; }
        @keyframes ft-marq-move { to { transform: translateX(-50%); } }
        @media (max-width:768px){ .ft-grid{ grid-template-columns:1fr 1fr !important; } .ft-brand{ grid-column:1 / -1; } }
      `}</style>
    </footer>
  );
}
