"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Expertise", href: "/#services" },
  { label: "Work",      href: "/#work" },
  { label: "Events",    href: "/events" },
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
          borderBottom: scrolled ? "1px solid rgba(38,0,0,0.12)" : "1px solid rgba(38,0,0,0.08)",
          background: "#D98139",
          backdropFilter: "blur(20px) saturate(1.3)",
          boxShadow: scrolled ? "0 10px 40px rgba(38,0,0,0.18)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1320px", margin: "0 auto",
            padding: "0 clamp(1.5rem, 5vw, 6rem)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: scrolled ? "80px" : "100px",
            transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Logo — directly on the white header, no background chip */}
          <Link
          href="/"
          aria-label="FID &amp; Co. — home"
          className="nav-logo-chip"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            alignSelf: "center",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <img
            src="/black logo.svg"
            alt="FID &amp; Co. — Insight. Strategy. Impact."
            style={{
              height: scrolled ? "230px" : "280px",
              width: "auto",
              display: "block",
              objectFit: "contain",
              objectPosition: "center",
              transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </Link>

          {/* Desktop links */}
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "2.6rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-item"
                style={{
                  fontSize: "0.82rem", letterSpacing: "0.04em", color: "#1c1c1c", fontWeight: 500,
                  position: "relative", padding: "0.4rem 0",
                  transition: "color 0.3s", textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1c1c1c")}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              style={{
                fontSize: "0.8rem", letterSpacing: "0.08em", fontWeight: 700,
                padding: "0.85em 1.8em", background: "#750006",
                color: "#ffffff", position: "relative", overflow: "hidden",
                textDecoration: "none", display: "inline-block", borderRadius: "var(--button-radius)",
                boxShadow: "0 8px 22px rgba(38,0,0,0.3)",
                transition: "background 0.3s, transform 0.2s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#260000"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(38,0,0,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#750006"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 22px rgba(38,0,0,0.3)"; }}
              onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onPointerUp={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            >
              Book us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-burger-btn"
            style={{ color: "#1c1c1c", background: "none", border: "none", cursor: "pointer", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--button-radius)" }}
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
              position: "fixed", inset: 0, zIndex: 8500, backgroundColor: "#FFFFFF",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6rem clamp(1.5rem,5vw,6rem)", borderBottom: "1px solid rgba(38,0,0,0.12)" }}>
              <span style={{ display: "inline-flex" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/fid-logo.png" alt="FID &amp; Co. — Insight. Strategy. Impact." style={{ height: "38px" }} />
              </span>
              <button onClick={() => setMenuOpen(false)} style={{ color: "#1c1c1c", background: "none", border: "none", cursor: "pointer", width: "34px", height: "34px", borderRadius: "var(--button-radius)" }} aria-label="Close menu">
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
                      color: "#1c1c1c", lineHeight: 1.15, fontWeight: 500,
                      display: "block", textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1c1c1c")}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div style={{ padding: "2rem clamp(1.5rem,5vw,6rem)", borderTop: "1px solid rgba(38,0,0,0.12)", color: "rgba(38,0,0,0.7)", fontSize: "0.8rem" }}>
              info@fidco.africa · +254 797 690 609
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-logo-chip:hover { transform: translateY(-1px) scale(1.04) !important; }
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
