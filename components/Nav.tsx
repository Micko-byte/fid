"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Expertise", href: "/#services" },
  { label: "Work",      href: "/#work" },
  { label: "About",     href: "/#about" },
  { label: "Insights",  href: "/#insights" },
  { label: "Contact",   href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 8000,
          transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s, padding 0.4s",
          borderBottom: scrolled ? "1px solid rgba(217,171,136,0.09)" : "1px solid transparent",
          background: scrolled ? "rgba(29,2,2,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1320px", margin: "0 auto",
            padding: "0 clamp(1.5rem, 5vw, 6rem)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: scrolled ? "66px" : "84px",
            transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Logo chip */}
          <Link href="/" aria-label="FID &amp; Co. — home" style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                background: "#F5F2EC",
                padding: "7px 11px",
                borderRadius: "3px",
                display: "inline-flex",
                alignItems: "center",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s",
                boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
              }}
              className="nav-logo-chip"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-fid.svg" alt="FID &amp; Co." style={{ height: "19px", width: "auto", display: "block" }} />
            </span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "2.6rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-item"
                style={{
                  fontSize: "0.82rem", letterSpacing: "0.04em", color: "#D9AB88",
                  position: "relative", padding: "0.4rem 0",
                  transition: "color 0.3s", textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#D9AB88")}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              style={{
                fontSize: "0.8rem", letterSpacing: "0.08em",
                padding: "0.85em 1.7em", background: "#750006",
                color: "#F5F2EC", position: "relative", overflow: "hidden",
                textDecoration: "none", display: "inline-block",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#8a0a10")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#750006")}
            >
              Book us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-burger-btn"
            style={{ color: "#F5F2EC", background: "none", border: "none", cursor: "pointer", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: "26px", height: "26px" }}>
              <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 8500, backgroundColor: "#1d0202",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6rem clamp(1.5rem,5vw,6rem)", borderBottom: "1px solid rgba(217,171,136,0.09)" }}>
              <span style={{ background: "#F5F2EC", padding: "7px 11px", borderRadius: "3px", display: "inline-flex" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-fid.svg" alt="FID &amp; Co." style={{ height: "18px" }} />
              </span>
              <button onClick={() => setMenuOpen(false)} style={{ color: "#D9AB88", background: "none", border: "none", cursor: "pointer", width: "34px", height: "34px" }} aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: "26px", height: "26px" }}>
                  <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.4rem", padding: "0 clamp(1.5rem,5vw,6rem)" }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-heading, 'Oswald')",
                      fontSize: "clamp(2.2rem, 9vw, 3.6rem)",
                      color: "#F5F2EC", lineHeight: 1.15, fontWeight: 500,
                      display: "block", textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D98038")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div style={{ padding: "2rem clamp(1.5rem,5vw,6rem)", borderTop: "1px solid rgba(217,171,136,0.09)", color: "rgba(217,171,136,0.7)", fontSize: "0.8rem" }}>
              info@fidco.africa · +254 797 690 609
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-logo-chip:hover { transform: translateY(-1px) !important; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-burger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-burger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
