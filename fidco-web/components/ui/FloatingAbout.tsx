"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info, X, ArrowRight } from "@phosphor-icons/react";

/**
 * Floating "Who we are" button — present on every page, opens a centred panel
 * with FID & Co.'s positioning, philosophy and differentiators (Farida's own
 * write-up). Isaac's brief from the review: a small persistent button that
 * surfaces the company information from anywhere, without leaving the page.
 */

const PILLARS = [
  ["Strategic Thinking", "The broader business, cultural and reputational environment organisations operate in."],
  ["Cultural Intelligence", "Campaigns designed with African social dynamics, local narratives and cultural trends at the centre."],
  ["Integrated Delivery", "PR, digital storytelling, influencer engagement and experiential — translated into real audience engagement."],
  ["Regional Perspective", "Cross-border campaigns and partnerships across East and Southern Africa."],
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FloatingAbout() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating trigger — bottom-left, clear of the WhatsApp FAB on the right */}
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="Who we are — about FID & Co."
        style={{
          position: "fixed",
          bottom: "clamp(1.1rem, 3vw, 2rem)",
          left: "clamp(1.1rem, 3vw, 2rem)",
          zIndex: 90,
          display: "inline-flex",
          alignItems: "center",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            position: "relative",
            width: "60px",
            height: "60px",
            borderRadius: "999px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #750006 0%, #4d0004 100%)",
            color: "#f5f2ec",
            boxShadow: hover
              ? "0 14px 36px rgba(117,0,6,0.42), 0 6px 14px rgba(0,0,0,0.25)"
              : "0 10px 28px rgba(117,0,6,0.3), 0 4px 10px rgba(0,0,0,0.2)",
            border: "1px solid rgba(245,242,236,0.16)",
            transform: hover ? "translateY(-3px) scale(1.04)" : "translateY(0)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s",
          }}
        >
          <Info size={30} weight="fill" />
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#f5f2ec",
            background: "rgba(13,6,6,0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(245,242,236,0.12)",
            borderRadius: "999px",
            paddingLeft: hover ? "1.5rem" : "0",
            paddingRight: hover ? "1.1rem" : "0",
            height: "44px",
            display: "inline-flex",
            alignItems: "center",
            marginLeft: hover ? "-1.4rem" : "0",
            maxWidth: hover ? "200px" : "0",
            opacity: hover ? 1 : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            order: 2,
            transition: "max-width 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, padding 0.4s, margin 0.4s",
          }}
        >
          Who we are
        </span>
      </button>

      {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            role="dialog" aria-modal="true" aria-label="About FID & Co."
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "clamp(1rem, 4vw, 2.5rem)",
              background: "rgba(18,8,4,0.66)", backdropFilter: "blur(6px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="brand-pattern-light"
              style={{
                position: "relative",
                width: "min(560px, 100%)",
                maxHeight: "88vh",
                overflowY: "auto",
                borderRadius: "20px",
                padding: "clamp(1.8rem, 4vw, 2.8rem)",
                background:
                  "linear-gradient(160deg, #2e0703 0%, #260000 55%, #180404 100%)",
                border: "1px solid rgba(217,128,56,0.2)",
                boxShadow: "0 40px 110px rgba(38,0,0,0.5)",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  position: "absolute", top: "1rem", right: "1rem",
                  width: "38px", height: "38px", borderRadius: "999px",
                  background: "rgba(245,242,236,0.08)", border: "1px solid rgba(245,242,236,0.22)",
                  color: "#f5f2ec", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <X size={16} weight="bold" />
              </button>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: 0 }}>
                Who we are
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f5f2ec", margin: "0.8rem 0 0", maxWidth: "20ch" }}>
                A strategic communications partner for organisations <em style={{ fontStyle: "italic", color: "#d98038" }}>shaping Africa</em>.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(245,242,236,0.72)", margin: "1.1rem 0 0" }}>
                FID &amp; Co. is a full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region.
              </p>

              <div style={{ borderTop: "1px solid rgba(245,242,236,0.14)", margin: "1.6rem 0 1.3rem", paddingTop: "1.3rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.4, color: "#f5f2ec", margin: 0 }}>
                  &ldquo;Communication is not noise — it is intentional, contextual and powerful.&rdquo;
                </p>
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: "0 0 0.9rem" }}>
                What sets us apart
              </p>
              <div style={{ display: "grid", gap: "0.9rem" }}>
                {PILLARS.map(([title, body]) => (
                  <div key={title}>
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.98rem", fontWeight: 700, color: "#f5f2ec", margin: 0 }}>{title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.55, color: "rgba(245,242,236,0.62)", margin: "0.2rem 0 0" }}>{body}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                style={{
                  marginTop: "1.8rem", display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#260000", background: "#f5f2ec", borderRadius: "999px", padding: "0.8rem 1.4rem", textDecoration: "none",
                }}
              >
                Read the full story <ArrowRight size={15} weight="bold" />
              </Link>
            </motion.div>
          </motion.div>
      )}
    </>
  );
}
