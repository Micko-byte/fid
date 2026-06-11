"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="feature"
      style={{
        backgroundColor: "#FAF8F3",
        color: "#1a1a1a",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(6rem, 12vw, 10rem)",
        paddingBottom: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}
      >
        <div className="fb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,7rem)", alignItems: "center" }}>

          {/* LEFT: editorial text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", marginBottom: "clamp(1.5rem,3vw,2.5rem)", fontWeight: 500 }}
            >
              The FID approach
            </motion.p>

            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 400, textTransform: "uppercase", color: "#1a1a1a", fontSize: "clamp(2.4rem,5.5vw,5.5rem)", lineHeight: 0.96, letterSpacing: "-0.03em", maxWidth: "14ch", textWrap: "balance" } as React.CSSProperties}
            >
              We treat communication as{" "}
              <em style={{ fontStyle: "normal", fontWeight: 600, color: "#750006" }}>influence</em>
              {" "}— not a{" "}
              <strong style={{ fontWeight: 600, color: "#D98038" }}>function.</strong>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "1px", background: "rgba(26,26,26,0.15)", marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(2rem,5vw,4rem)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: "rgba(26,26,26,0.62)", fontSize: "clamp(0.95rem,1.3vw,1.15rem)", lineHeight: 1.65, fontFamily: "var(--font-body)", maxWidth: "48ch", marginBottom: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              Every engagement begins with insight, is guided by strategy, executed with precision and evaluated for impact. We build reputation, credibility and cultural relevance for the organisations shaping Africa&apos;s future.
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
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap", transition: "color 0.3s, gap 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#1a1a1a"; e.currentTarget.style.gap = "0.9rem"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#750006"; e.currentTarget.style.gap = "0.55rem"; }}
                >
                  {link.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: real photo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#ece7df" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/editorial/crowd-audience.jpg" alt="Audience engagement" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Offset accent square */}
            <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", width: "42%", aspectRatio: "1/1", backgroundColor: "#750006", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(0.7rem,1.5vw,1rem)", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,242,236,0.85)", textAlign: "center", padding: "0.5rem" }}>Nairobi<br />· Africa</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .fb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
