"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CornerBrackets from "@/components/ui/CornerBrackets";

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="feature"
      style={{
        backgroundColor: "#1d0202",
        color: "#F5F2EC",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(6rem, 12vw, 10rem)",
        paddingBottom: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      {/* Diagonal texture */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(135deg, rgba(217,171,136,0.022) 0 1px, transparent 1px 80px)" }} />

      {/* Top hairline */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "clamp(1.5rem,5vw,6rem)", right: "clamp(1.5rem,5vw,6rem)", height: "1px", background: "rgba(217,171,136,0.18)" }} />

      <div
        ref={ref}
        style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}
      >
        {/* ── Two-column: text left | image right ── */}
        <div className="fb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,7rem)", alignItems: "center" }}>

          {/* ─ LEFT: editorial text ─ */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}
            >
              The FID approach
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 300, textTransform: "uppercase", color: "#F5F2EC", fontSize: "clamp(2.4rem,5.5vw,6rem)", lineHeight: 0.92, letterSpacing: "-0.03em", maxWidth: "14ch", textWrap: "balance" } as React.CSSProperties}
            >
              We treat communication as{" "}
              <em style={{ fontStyle: "normal", fontWeight: 600, color: "#D9AB88" }}>influence</em>
              {" "}— not a{" "}
              <strong style={{ fontWeight: 600, color: "#D98038" }}>function.</strong>
            </motion.h2>

            {/* Hairline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "1px", background: "rgba(217,171,136,0.2)", marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(2rem,5vw,4rem)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: "rgba(245,242,236,0.62)", fontSize: "clamp(0.95rem,1.3vw,1.15rem)", lineHeight: 1.65, fontFamily: "var(--font-body)", maxWidth: "48ch", marginBottom: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              Every brief begins with insight and ends in measurable impact. We build reputation, credibility and cultural relevance for the organisations shaping Africa&apos;s future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                { label: "Explore our expertise", href: "/#services" },
                { label: "See our work", href: "/#work" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D9AB88", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap", transition: "color 0.3s, gap 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#F5F2EC"; e.currentTarget.style.gap = "0.9rem"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#D9AB88"; e.currentTarget.style.gap = "0.55rem"; }}
                >
                  {link.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* ─ RIGHT: large editorial image placeholder ─ */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            {/* Main plate */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                backgroundColor: "#2c0808",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(217,171,136,0.1)",
              }}
            >
              {/* Grain */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />

              {/* Horizontal lines */}
              {[25, 50, 75].map((pct) => (
                <div key={pct} style={{ position: "absolute", left: 0, right: 0, top: `${pct}%`, height: "1px", background: "rgba(217,171,136,0.07)" }} />
              ))}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", background: "rgba(217,171,136,0.07)" }} />

              {/* Big label */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.5rem,3vw,2.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(217,171,136,0.3)" }}>FID &amp; Co. / Campaign Work</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(217,171,136,0.2)" }}>2024–2026</span>
                </div>

                <div>
                  <p style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 300, fontSize: "clamp(4rem,8vw,9rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "rgba(217,171,136,0.07)", textTransform: "uppercase", marginBottom: "2rem" }}>
                    FID
                  </p>
                  <div style={{ borderTop: "1px solid rgba(217,171,136,0.12)", paddingTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(217,171,136,0.35)" }}>Strategic Communications</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "rgba(217,171,136,0.25)" }}>→</span>
                  </div>
                </div>
              </div>

              {/* Ambient glow */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 40% 55%, rgba(217,128,56,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
              {/* Corner brackets */}
              <CornerBrackets color="rgba(255,255,255,0.45)" size={28} weight={1.5} inset={14} />
            </div>

            {/* Small offset accent plate */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "-1.5rem",
                width: "42%",
                aspectRatio: "1/1",
                backgroundColor: "#750006",
                border: "1px solid rgba(217,171,136,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(0.7rem,1.5vw,1rem)", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,242,236,0.5)", textAlign: "center", padding: "0.5rem" }}>Nairobi<br />· Africa</span>
              <CornerBrackets color="rgba(255,255,255,0.4)" size={16} weight={1.5} inset={8} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: "clamp(1.5rem,5vw,6rem)", right: "clamp(1.5rem,5vw,6rem)", height: "1px", background: "rgba(217,171,136,0.12)" }} />

      <style>{`
        @media (max-width: 900px) {
          .fb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
