"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import CornerBrackets from "@/components/ui/CornerBrackets";

const stats = [
  { value: "15+", count: 15, suffix: "+", label: "Years" },
  { value: "10+", count: 10, suffix: "+", label: "Industries" },
  { value: "8+",  count: 8,  suffix: "+", label: "Markets" },
  { value: "100+", count: 100, suffix: "+", label: "Campaigns" },
];

// Editorial image placeholder data
const imagePlates = [
  { bg: "#260000", strip: "#3a0000", label: "Strategy Session", year: "2025" },
  { bg: "#1d2b1f", strip: "#243324", label: "Campaign Work", year: "2024" },
  { bg: "#1a1a2e", strip: "#22223b", label: "Brand Launch", year: "2026" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#260000",
        color: "#F5F2EC",
        paddingTop: "clamp(5.5rem, 12vw, 11rem)",
        paddingBottom: "clamp(5.5rem, 12vw, 11rem)",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* ── Two-column: text left | image right ── */}
        <div className="about-grid">

          {/* LEFT: existing text content */}
          <div>
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7, flexShrink: 0 }} />
              Who we are
            </motion.span>

            {/* Statement */}
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')",
                fontWeight: 500, color: "#F5F2EC",
                fontSize: "clamp(2rem, 4.6vw, 3.9rem)",
                lineHeight: 1.04, letterSpacing: "-0.025em",
                maxWidth: "18ch", textWrap: "balance", marginTop: "1.6rem",
              } as React.CSSProperties}
            >
              A communications partner built for influence at{" "}
              <em style={{ fontStyle: "normal", color: "#D98038" }}>scale</em>.
            </motion.h2>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem,1.2vw,1.05rem)",
                lineHeight: 1.7, color: "rgba(245,242,236,0.55)",
                maxWidth: "40ch", marginTop: "1.8rem",
              }}
            >
              FID &amp; Co. is a full-service communications firm headquartered in Nairobi. We help organisations across Africa build reputation, navigate public discourse and earn the influence that drives lasting growth.
            </motion.p>

            {/* Animated hairline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "1px", background: "rgba(217,171,136,0.18)", marginTop: "2.5rem" }}
            />

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                marginTop: "0",
              }}
              className="about-stats"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "1.8rem 1.6rem",
                    borderTop: "1px solid rgba(217, 171, 136, 0.18)",
                    borderLeft: i === 0 ? "none" : "1px solid rgba(217,171,136,0.09)",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 500,
                    color: "#D98038", fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                    lineHeight: 0.9, letterSpacing: "-0.03em",
                  }}>
                    <CountUp value={s.value} duration={1.8} />
                  </div>
                  <div style={{
                    fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(217,171,136,0.45)", marginTop: "0.8rem", fontFamily: "var(--font-body)",
                  }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: stacked image plates */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="about-img-col"
            style={{ position: "relative" }}
          >
            {/* Logo badge top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", top: "-1.4rem", right: "-1rem", zIndex: 10,
                width: "clamp(72px,8vw,100px)", height: "clamp(72px,8vw,100px)",
                backgroundColor: "#750006",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "0.2rem",
                border: "1px solid rgba(217,171,136,0.18)",
              }}
            >
              <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(1rem,1.8vw,1.4rem)", color: "#F5F2EC", letterSpacing: "-0.02em", lineHeight: 1 }}>FID</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.45rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.5)" }}>&amp; Co.</span>
            </motion.div>

            {/* Main tall plate */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden", backgroundColor: "#2c0808" }}>
              {/* Grain */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")` }} />
              {/* Grid lines */}
              {[25, 50, 75].map(p => <div key={p} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: "1px", background: "rgba(217,171,136,0.07)" }} />)}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", background: "rgba(217,171,136,0.07)" }} />
              {/* Content */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.4rem,2.5vw,2rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(217,171,136,0.3)" }}>Who We Are</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", color: "rgba(217,171,136,0.2)" }}>2026</span>
                </div>
                {/* Big ghost number */}
                <div>
                  <p style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 300, fontSize: "clamp(5rem,12vw,11rem)", lineHeight: 0.85, color: "rgba(217,171,136,0.07)", letterSpacing: "-0.04em", textTransform: "uppercase" }}>FID</p>
                  <div style={{ borderTop: "1px solid rgba(217,171,136,0.1)", paddingTop: "0.9rem", marginTop: "0.4rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(217,171,136,0.35)" }}>Communications</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(217,171,136,0.2)", marginTop: "0.25rem" }}>Nairobi · Africa</p>
                    </div>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", color: "rgba(217,171,136,0.25)" }}>→</span>
                  </div>
                </div>
              </div>
              {/* Ambient glow */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 40% 55%, rgba(217,128,56,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
              <CornerBrackets color="rgba(255,255,255,0.42)" size={26} weight={1.5} inset={14} />
            </div>

            {/* Two small plates below */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginTop: "0.8rem" }}>
              {[
                { bg: "#1d2b1f", label: "Strategy", sub: "Pan-Africa" },
                { bg: "#1a1a2e", label: "Impact", sub: "15+ yrs" },
              ].map((plate, pi) => (
                <div key={pi} style={{ aspectRatio: "4/3", backgroundColor: plate.bg, position: "relative", overflow: "hidden" }}>
                  <CornerBrackets color="rgba(255,255,255,0.28)" size={14} weight={1.2} inset={8} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
                  {[33, 66].map(p => <div key={p} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: "1px", background: "rgba(217,171,136,0.06)" }} />)}
                  <div style={{ position: "absolute", inset: 0, padding: "0.9rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(217,171,136,0.28)" }}>FID &amp; Co.</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "0.9rem", color: "rgba(245,242,236,0.45)", textTransform: "uppercase", letterSpacing: "0.02em" }}>{plate.label}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "rgba(217,171,136,0.3)", marginTop: "0.2rem" }}>{plate.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 7vw, 7rem);
          align-items: start;
        }
        .about-stats { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-img-col { display: none; }
        }
        @media (max-width: 768px) {
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
