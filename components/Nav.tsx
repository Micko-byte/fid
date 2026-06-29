"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FidLogo from "@/components/ui/FidLogo";

const navLinks = [
  { label: "Expertise", href: "/#services" },
  { label: "Work",      href: "/#work" },
  { label: "Events",    href: "/events" },
  { label: "About",     href: "/#about" },
  { label: "Insights",  href: "/#insights" },
  { label: "Contact",   href: "/#contact" },
];

export default function Nav() {
  const navRef   = useRef<HTMLElement>(null);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [onDark,    setOnDark]    = useState(true); // hero is dark at the top
  const [hideNav,   setHideNav]   = useState(false); // hide over the footer

  useEffect(() => {
    type LenisLike = {
      scroll: number;
      on: (e: string, cb: () => void) => void;
      off: (e: string, cb: () => void) => void;
    };
    const getY = () => {
      const l = (window as unknown as { __lenis?: LenisLike }).__lenis;
      return l ? l.scroll : window.scrollY;
    };
    const onScroll = () => setScrolled(getY() > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    let lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    let poll: ReturnType<typeof setInterval> | null = null;
    if (lenis) {
      lenis.on("scroll", onScroll);
    } else {
      poll = setInterval(() => {
        lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
        if (lenis) { lenis.on("scroll", onScroll); if (poll) clearInterval(poll); poll = null; }
      }, 100);
      setTimeout(() => { if (poll) clearInterval(poll); }, 3000);
    }
    onScroll();

    // ── Adapt logo + taglines to the section behind the nav ──
    // Dark sections flip the nav to its light (cream) logo + text.
    const darkSections = document.querySelectorAll<HTMLElement>(
      "#services, #contact, [data-nav-dark], .section-red, .section-dark, footer"
    );
    const observers = Array.from(darkSections).map((section) => {
      const obs = new IntersectionObserver(
        ([entry]) => setOnDark(entry.isIntersecting),
        { rootMargin: "-72px 0px -92% 0px", threshold: 0 }
      );
      obs.observe(section);
      return obs;
    });

    // Hide the header once the footer reaches the upper part of the screen,
    // so the page never shows the header logo + the big footer logo at once.
    const footer = document.querySelector("footer");
    let footerObs: IntersectionObserver | null = null;
    if (footer) {
      footerObs = new IntersectionObserver(
        ([entry]) => setHideNav(entry.isIntersecting),
        { rootMargin: "0px 0px -55% 0px", threshold: 0 }
      );
      footerObs.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (poll) clearInterval(poll);
      if (lenis) lenis.off("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
      footerObs?.disconnect();
    };
  }, []);

  // Glass header. Light (cream) logo + text over dark sections (hero, services,
  // contact, footer); primary (crimson) logo + dark text over light sections.
  const lightText = onDark;

  const navBg = onDark
    ? (scrolled ? "rgba(38,0,0,0.42)" : "rgba(38,0,0,0.26)")
    : (scrolled ? "rgba(245,242,236,0.72)" : "rgba(245,242,236,0.55)");
  const navBorder = lightText
    ? "1px solid rgba(217,128,56,0.26)"
    : "1px solid rgba(117,0,6,0.12)";

  return (
    <>
      {/* ── Floating pill nav ── */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: "1.1rem",
          left: "50%",
          transform: `translateX(-50%) translateY(${hideNav ? "-180%" : "0"})`,
          opacity: hideNav ? 0 : 1,
          pointerEvents: hideNav ? "none" : "auto",
          zIndex: 8000,
          width: "min(calc(100% - 1.5rem), 1240px)",
          maxWidth: "calc(100vw - 1.5rem)",
          boxSizing: "border-box",
          borderRadius: "20px",
          background: navBg,
          backdropFilter: "blur(22px) saturate(1.3)",
          border: navBorder,
          boxShadow: lightText
            ? "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(217,128,56,0.15)"
            : "0 10px 36px rgba(38,0,0,0.10)",
          transition: "background 0.5s, box-shadow 0.5s, transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(1.2rem,3vw,2.4rem)",
            height: "78px",
          }}
        >
          {/* ── Logo + tagline ── */}
          <Link href="/" aria-label="FID & Co. — home" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", textDecoration: "none" }}>
            <FidLogo
              variant={lightText ? "light" : "dark"}
              style={{
                height: "46px",
                width: "auto",
              }}
            />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.48rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: lightText ? "rgba(217,128,56,0.9)" : "rgba(117,0,6,0.7)",
              fontWeight: 600,
              lineHeight: 1,
              transition: "color 0.4s",
              whiteSpace: "nowrap",
            }}>
              Insight · Strategy · Impact
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                  color: lightText ? "rgba(245,242,236,0.82)" : "#1c1c1c",
                  padding: "0.3rem 0",
                  transition: "color 0.25s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d98038")}
                onMouseLeave={(e) => (e.currentTarget.style.color = lightText ? "rgba(245,242,236,0.82)" : "#1c1c1c")}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#contact"
              style={{
                fontSize: "0.76rem",
                letterSpacing: "0.08em",
                fontWeight: 700,
                padding: "0.75em 1.6em",
                background: lightText ? "#d98038" : "#750006",
                color: lightText ? "#260000" : "#f5f2ec",
                textDecoration: "none",
                borderRadius: "999px",
                boxShadow: lightText ? "0 6px 18px rgba(217,128,56,0.35)" : "0 6px 18px rgba(117,0,6,0.3)",
                transition: "background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#260000";
                e.currentTarget.style.color = "#f5f2ec";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = lightText ? "#d98038" : "#750006";
                e.currentTarget.style.color = lightText ? "#260000" : "#f5f2ec";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book us
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="nav-burger-btn"
            style={{ color: lightText ? "#d98038" : "#750006", background: "none", border: "none", cursor: "pointer", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "24px", height: "24px" }}>
              <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 8500,
              backgroundColor: "#f5f2ec",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem clamp(1.5rem,5vw,3rem)", borderBottom: "1px solid rgba(117,0,6,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <FidLogo variant="dark" style={{ height: "40px", width: "auto" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.48rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(117,0,6,0.6)", fontWeight: 600 }}>
                  Insight · Strategy · Impact
                </span>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ color: "#260000", background: "none", border: "none", cursor: "pointer" }} aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "26px", height: "26px" }}>
                  <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.2rem", padding: "0 clamp(1.5rem,5vw,3rem)" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem,8vw,3.2rem)",
                      color: "#1c1c1c",
                      lineHeight: 1.2,
                      fontWeight: 700,
                      display: "block",
                      textDecoration: "none",
                      padding: "0.3rem 0",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1c1c1c")}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: navLinks.length * 0.06 + 0.08 }}
                style={{ marginTop: "2rem" }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    background: "#750006", color: "#f5f2ec",
                    fontFamily: "var(--font-body)", fontWeight: 700,
                    fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "1rem 2rem", borderRadius: "999px", textDecoration: "none",
                  }}
                >
                  Book us
                </Link>
              </motion.div>
            </div>

            <div style={{ padding: "1.6rem clamp(1.5rem,5vw,3rem)", borderTop: "1px solid rgba(117,0,6,0.1)", color: "rgba(117,0,6,0.65)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
              info@fidco.africa · +254 797 690 609
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 901px) { .nav-burger-btn { display: none !important; } }
        @media (max-width: 900px) { .nav-links-desktop { display: none !important; } }
      `}</style>
    </>
  );
}
