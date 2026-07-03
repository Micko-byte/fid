"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { InstagramLogo, FacebookLogo, YoutubeLogo, Phone, Globe } from "@phosphor-icons/react";
import FooterClimb from "@/components/motion/FooterClimb";
import FidLogo from "@/components/ui/FidLogo";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);

  return (
    <footer ref={ref} className="section-red" data-nav-dark style={{ backgroundColor: "#260000", color: "#f5f2ec", position: "relative", overflow: "hidden", borderTop: "3px solid #1c0303" }}>
      {/* ── Sign-off animation: footer's background layer ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <FooterClimb tagline="Insight · Strategy · Impact" />
      </div>

      {/* ── Columns ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", paddingTop: "clamp(6rem,11vw,9rem)" }}>
        <div className="ft-grid" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "clamp(2rem,5vw,4rem)" }}>
          <div>
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", marginBottom: "1.4rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>Navigation</h5>
            {[{ label: "Expertise", href: "/#services" }, { label: "Work", href: "/#work" }, { label: "About", href: "/#about" }, { label: "Events", href: "/events" }, { label: "Insights", href: "/#insights" }, { label: "Contact", href: "/#contact" }].map((l) => (
              <Link key={l.label} href={l.href} style={{ display: "block", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d98038")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.72)")}>
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "right" }}>
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", marginBottom: "1.4rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>Connect</h5>
            <a href="tel:+254797690609" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.6rem", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "0.8rem", textDecoration: "none" }}>
              +254 797 690 609<Phone size={20} weight="bold" color="#d98038" />
            </a>
            <a href="https://www.fidco.africa" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.6rem", color: "rgba(245,242,236,0.72)", fontSize: "0.9rem", marginBottom: "1.4rem", textDecoration: "none" }}>
              www.fidco.africa<Globe size={20} weight="bold" color="#d98038" />
            </a>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              {[
                { Icon: InstagramLogo, href: "https://instagram.com/fidpr/", label: "Instagram" },
                { Icon: FacebookLogo, href: "https://facebook.com/profile.php?id=100070330230678", label: "Facebook" },
                { Icon: YoutubeLogo, href: "https://youtube.com/@FIDPR", label: "YouTube" },
              ].map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  initial={{ opacity: 0, y: 14, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                  style={{ width: "44px", height: "44px", border: "1px solid rgba(245,242,236,0.2)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", color: "rgba(245,242,236,0.6)", textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d98038"; e.currentTarget.style.borderColor = "#d98038"; e.currentTarget.style.color = "#260000"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(245,242,236,0.2)"; e.currentTarget.style.color = "rgba(245,242,236,0.6)"; }}>
                  <Icon size={22} weight="bold" />
                </motion.a>
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

      {/* ── Big logo banner below the footer ── */}
      <div className="bg-brand-texture" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(2.5rem,6vw,4.5rem) clamp(1.5rem,5vw,6rem)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", overflow: "hidden" }}>
        <div aria-hidden className="brand-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
        <FidLogo variant="dark" style={{ position: "relative", zIndex: 1, height: "clamp(120px,20vw,260px)", width: "auto", display: "block" }} />
        <span style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "#750006", fontWeight: 600 }}>
          Insight · Strategy · Impact
        </span>
        <span style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.02em", color: "rgba(28,28,28,0.55)", marginTop: "0.4rem" }}>
          FID &amp; Co. is owned &amp; managed by FID Public Relations Ltd.
        </span>
      </div>

      <style>{`
        @media (max-width:768px){
          .ft-grid{ flex-direction:column !important; }
          .ft-grid > div:last-child{ text-align:left !important; }
          .ft-grid > div:last-child a,
          .ft-grid > div:last-child > div{ justify-content:flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
