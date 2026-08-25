"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

/**
 * BrandBand — the 2026 brand "cover": maroon field, faint constellation texture,
 * the FID & Co. logo + tagline, and the gold Africa constellation anchored to the
 * lower-right. Sits just above the footer as a closing brand statement.
 */
export default function BrandBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="FID & Co. — Insight. Strategy. Impact."
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #3a0509 0%, #260000 60%, #1c0304 100%)",
        color: "#f5f2ec",
      }}
    >
      {/* faint constellation texture across the field */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/brand/pattern-constellation-gold.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.14,
          pointerEvents: "none",
        }}
      />

      {/* gold Africa constellation, lower-right */}
      <motion.img
        aria-hidden
        src="/brand/africa-constellation-gold.png"
        alt=""
        initial={{ opacity: 0, scale: 0.94 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="brand-band-africa"
        style={{ position: "absolute", right: "clamp(-2rem, 2vw, 3rem)", bottom: "-6%", width: "clamp(240px, 42vw, 620px)", pointerEvents: "none" }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "clamp(4rem, 9vw, 8rem) clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <motion.img
          src="/brand/fid-logo-cream.png"
          alt="FID & Co."
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "clamp(46px, 6vw, 76px)", width: "auto", display: "block" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.8rem, 1.3vw, 1rem)", letterSpacing: "0.34em", textTransform: "uppercase", color: "#d98038", fontWeight: 600, margin: "1.2rem 0 0" }}
        >
          Insight. Strategy. Impact.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(2rem, 4.6vw, 3.6rem)", lineHeight: 1.02, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#f5f2ec", margin: "clamp(1.6rem, 3vw, 2.4rem) 0 0", maxWidth: "16ch" }}
        >
          Strategic communications across Africa.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "clamp(1.8rem, 3vw, 2.6rem)" }}
        >
          <Link
            href="/#contact"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#260000", background: "#d98038", padding: "0.95rem 1.7rem", borderRadius: "999px", textDecoration: "none", transition: "transform 0.25s, background 0.25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#e8924a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#d98038"; }}
          >
            Start a conversation <ArrowUpRight size={16} weight="bold" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .brand-band-africa { opacity: 0.5 !important; right: -10% !important; bottom: -4% !important; }
        }
      `}</style>
    </section>
  );
}
