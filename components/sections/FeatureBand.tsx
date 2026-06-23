"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

const HeroOrb = dynamic(() => import("@/components/3d/HeroOrb"), { ssr: false });

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  // On load, start the hero video at 1.4s and loop it (1.4s → end → 1.4s).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const LOOP_START = 1.4;

    const start = () => {
      el.currentTime = LOOP_START;
      el.play().catch(() => {});
    };
    const onEnded = () => {
      el.currentTime = LOOP_START;
      el.play().catch(() => {});
    };
    const onTimeUpdate = () => {
      if (el.currentTime < LOOP_START) el.currentTime = LOOP_START;
    };

    if (el.readyState >= 1) start();
    else el.addEventListener("loadedmetadata", start, { once: true });
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#f5f2ec",
        color: "#1c1c1c",
        position: "relative",
        overflow: "hidden",
        paddingTop: "var(--section-y-hero)",
        paddingBottom: "var(--section-y)",
      }}
    >
      {/* Brand background overlays */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 88% 20%, rgba(217,128,56,0.12) 0%, transparent 58%), radial-gradient(ellipse 50% 50% at 10% 85%, rgba(117,0,6,0.07) 0%, transparent 55%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(135deg, rgba(117,0,6,0.025) 0 1px, transparent 1px 72px)", zIndex: 0 }} />
      {/* 3D floating orb — background decoration */}
      <HeroOrb />
      <div
        ref={ref}
        className="section-shell"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="fb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,7rem)", alignItems: "center" }}>

          {/* LEFT: editorial text — slide-up-fade-in on mount */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="type-eyebrow"
              style={{ color: "#750006", marginBottom: "1rem" }}
            >
              The FID approach
            </motion.p>

            {/* Decorative SVG line divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", marginBottom: "clamp(1.2rem,2.5vw,2rem)" }}
            >
              <svg width="80" height="6" viewBox="0 0 80 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="3" x2="52" y2="3" stroke="#750006" strokeWidth="1.5" />
                <circle cx="60" cy="3" r="2.5" fill="none" stroke="#750006" strokeWidth="1" />
                <line x1="64" y1="3" x2="80" y2="3" stroke="#750006" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
            </motion.div>

            <motion.h2
              data-skew
              initial={{ opacity: 0, y: 52 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="type-h2"
              style={{ maxWidth: "20ch", margin: 0, color: "#1c1c1c" }}
            >
              We treat communication as influence, not a function.
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "1px", background: "rgba(28,28,28,0.15)", marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(2rem,5vw,4rem)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="type-body"
              style={{ color: "#1c1c1c", maxWidth: "48ch", marginBottom: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              Every engagement begins with insight, is guided by strategy, executed with precision and evaluated for impact. We build reputation, credibility and cultural relevance for the organisations shaping Africa&apos;s future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              <Button href="/#services" variant="primary" magnetic cursor="Expertise">Explore our expertise</Button>
              <Button href="/#work" variant="outline">See our work</Button>
            </motion.div>
          </div>

          {/* RIGHT: animation slot + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 48, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(1.4rem,3vw,2.2rem)", justifyContent: "center" }}
          >
            {/* Hero animation — loops 1.4s → end */}
            <div style={{ position: "relative", width: "100%" }}>
              <video
                ref={videoRef}
                src="/illustrations/hero-influence-animated.mp4"
                muted
                autoPlay
                playsInline
                preload="auto"
                aria-label="Influence through strategic communication — animated"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px" }}
              />
            </div>

            {/* CTA — orange, matches the header / footer accent */}
            <div
              style={{
                background: "#d98038",
                borderRadius: "10px",
                padding: "clamp(2rem,3.5vw,3rem)",
                color: "#260000",
                boxShadow: "0 20px 55px rgba(38,0,0,0.15)",
              }}
            >
              <p className="type-eyebrow" style={{ opacity: 0.8, marginBottom: "0.9rem" }}>
                Next step
              </p>
              <h3 className="type-h3" style={{ margin: 0 }}>
                Let&apos;s build something meaningful.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.5, color: "#260000", opacity: 0.85, marginTop: "0.9rem" }}>
                Share your brief and we&apos;ll shape the route.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2rem", marginTop: "1.8rem" }}>
                <Link
                  href="/#contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#260000", color: "#f5f2ec", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.95rem 1.8rem", borderRadius: "999px", textDecoration: "none", transition: "transform 0.2s" }}
                  onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                  onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Book us
                </Link>
                <a href="mailto:info@fidco.africa" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.92rem", color: "#260000", textDecoration: "none", borderBottom: "1px solid rgba(38,0,0,0.4)" }}>
                  info@fidco.africa
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes fb-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .fb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
