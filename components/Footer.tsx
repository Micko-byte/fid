"use client";

import Link from "next/link";
import BrandMark from "@/components/graphics/BrandMark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#161616", padding: "clamp(3.5rem, 7vw, 5.5rem) 0 2.5rem" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>

        {/* Grid */}
        <div className="footer-grid" style={{ marginBottom: "clamp(3rem, 6vw, 4.5rem)" }}>
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" aria-label="FID &amp; Co." style={{ display: "inline-flex", alignItems: "center", background: "#F5F2EC", padding: "11px 16px", borderRadius: "3px", transition: "transform 0.4s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-fid.svg" alt="FID &amp; Co." style={{ height: "30px", width: "auto", display: "block" }} />
            </Link>
            <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "#D9AB88", marginTop: "0.7rem" }}>
              Insight. Strategy. Impact.
            </div>
            <p style={{ color: "rgba(217,171,136,0.7)", fontSize: "0.85rem", lineHeight: 1.6, maxWidth: "34ch", marginTop: "1.4rem", fontFamily: "var(--font-body)" }}>
              A full-service strategic communications and brand experience firm operating across Kenya and Africa.
            </p>
          </div>

          {/* Nav */}
          <div className="footer-col">
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D98038", marginBottom: "1.5rem", fontWeight: 500, fontFamily: "var(--font-body)" }}>
              Navigation
            </h5>
            {[
              { label: "Expertise", href: "/#services" },
              { label: "Work",      href: "/#work" },
              { label: "About",     href: "/#about" },
              { label: "Insights",  href: "/#insights" },
              { label: "Contact",   href: "/#contact" },
            ].map((l) => (
              <Link key={l.label} href={l.href}
                style={{ display: "block", color: "#D9AB88", fontSize: "0.9rem", marginBottom: "0.85rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#D9AB88")}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D98038", marginBottom: "1.5rem", fontWeight: 500, fontFamily: "var(--font-body)" }}>
              Contact
            </h5>
            <a href="mailto:info@fidco.africa" style={{ display: "block", color: "#D9AB88", fontSize: "0.9rem", marginBottom: "0.85rem", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D9AB88")}>
              info@fidco.africa
            </a>
            <a href="tel:+254797690609" style={{ display: "block", color: "#D9AB88", fontSize: "0.9rem", marginBottom: "0.85rem", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D9AB88")}>
              +254 797 690 609
            </a>
            <p style={{ display: "block", color: "#D9AB88", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}>
              Westlands Business Park<br />3rd Floor Suite 12, Nairobi
            </p>
          </div>
        </div>

        {/* Animated brand mark */}
        <div style={{ display: "flex", justifyContent: "center", padding: "clamp(1.5rem,4vw,3rem) 0 clamp(2rem,4vw,3rem)" }}>
          <BrandMark size={96} color="rgba(245,242,236,0.55)" accent="#D98038" />
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", paddingTop: "2.2rem", borderTop: "1px solid rgba(217,171,136,0.09)" }}>
          <p style={{ color: "rgba(217,171,136,0.45)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
            © {year} FID &amp; Co. All rights reserved. fidco.africa
          </p>
          <div style={{ display: "flex", gap: "1.6rem" }}>
            {[
              { name: "Facebook",  href: "https://facebook.com/profile.php?id=100070330230678" },
              { name: "Instagram", href: "https://instagram.com/fidpr/" },
              { name: "YouTube",   href: "https://youtube.com/@FIDPR" },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(217,171,136,0.45)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(217,171,136,0.45)")}>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; } .footer-brand { grid-column: 1 / -1; } }
      `}</style>
    </footer>
  );
}
