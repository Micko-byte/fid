"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, InstagramLogo, FacebookLogo, YoutubeLogo, Phone, Globe } from "@phosphor-icons/react";
import FidLogo from "@/components/ui/FidLogo";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["-4%", "3%"]);

  return (
    <footer ref={ref} className="section-red" data-nav-dark style={{ backgroundColor: "#750006", color: "#f5f2ec", position: "relative", overflow: "hidden", borderTop: "3px solid #260000" }}>
      {/* ── Columns ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(4rem,8vw,6rem)" }}>
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(2rem,5vw,4rem)" }}>
          <div className="ft-brand">
            <Link href="/" aria-label="FID & Co." style={{ display: "inline-flex", flexDirection: "column", gap: "6px", textDecoration: "none" }}>
              <FidLogo variant="light" style={{ height: "68px", width: "auto" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,242,236,0.7)", fontWeight: 600, whiteSpace: "nowrap" }}>
                Insight · Strategy · Impact
              </span>
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
            <a href="tel:+254797690609" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "0.8rem", textDecoration: "none" }}>
              <Phone size={15} weight="light" color="#d98038" />+254 797 690 609
            </a>
            <a href="https://www.fidco.africa" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "1.4rem", textDecoration: "none" }}>
              <Globe size={15} weight="light" color="#d98038" />www.fidco.africa
            </a>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { Icon: InstagramLogo, href: "https://instagram.com/fidpr/", label: "Instagram" },
                { Icon: FacebookLogo, href: "https://facebook.com/profile.php?id=100070330230678", label: "Facebook" },
                { Icon: YoutubeLogo, href: "https://youtube.com/@FIDPR", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: "38px", height: "38px", border: "1px solid rgba(245,242,236,0.2)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", color: "rgba(245,242,236,0.6)", textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d98038"; e.currentTarget.style.borderColor = "#d98038"; e.currentTarget.style.color = "#260000"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(245,242,236,0.2)"; e.currentTarget.style.color = "rgba(245,242,236,0.6)"; }}>
                  <Icon size={18} weight="light" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", paddingTop: "2.4rem", marginTop: "clamp(3rem,6vw,5rem)", borderTop: "1px solid rgba(245,242,236,0.15)" }}>
          <p style={{ color: "rgba(245,242,236,0.5)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>© {year} FID &amp; Co. All rights reserved.</p>
          <p style={{ color: "rgba(245,242,236,0.5)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>Nairobi · Kenya · Africa</p>
        </div>
      </div>

      {/* ── Giant kinetic wordmark (subtle, on orange) ── */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <motion.div aria-hidden style={{ x: wordX, position: "relative", zIndex: 1, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(4rem,15vw,14rem)", lineHeight: 0.82, letterSpacing: 0, color: "rgba(245,242,236,0.22)", whiteSpace: "nowrap", marginTop: "clamp(1.5rem,4vw,3rem)", paddingBottom: "0.15em", userSelect: "none", WebkitTextStroke: "1px rgba(245,242,236,0.32)" }}>
          FID &amp; CO.
        </motion.div>
      </div>

      <style>{`
        @media (max-width:768px){ .ft-grid{ grid-template-columns:1fr 1fr !important; } .ft-brand{ grid-column:1 / -1; } }
      `}</style>
    </footer>
  );
}
