"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      style={{
        // extends the "Our Expertise" section's red halfway down this section as a
        // solid block (hard edge, no fade), then solid white for the rest of the CTA
        background: "linear-gradient(to bottom, #750006 0%, #750006 50%, #FFFFFF 50%, #FFFFFF 100%)",
        color: "#0f0f0f",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(2.5rem, 5vw, 4rem)",
        paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
      }}
    >
      {/* pattern on the red half — brand diamond-line texture */}
      <div
        aria-hidden="true"
        className="brand-pattern-light"
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", opacity: 0.7, pointerEvents: "none" }}
      />

      <div
        ref={ref}
        style={{
          position: "relative", zIndex: 1,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "clamp(0.75rem, 2.5vw, 2rem)",
          paddingRight: "clamp(0.75rem, 2.5vw, 2rem)",
        }}
      >
        {/* video — sized to the video's own 16:9 ratio so there's no letterboxing,
            and capped to viewport height so the whole frame reads on one screen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="cta-video-frame"
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 40px 90px rgba(15,15,15,0.18)",
            backgroundColor: "#0f0f0f",
            aspectRatio: "16 / 9",
            height: "min(80vh, 760px)",
            width: "auto",
            maxWidth: "100%",
          }}
        >
          <video
            src="/videos/cta-book.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
          />

          {/* buttons only — bottom-left, below where the video's own baked-in headline sits */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              position: "absolute",
              left: "6%",
              bottom: "10%",
              display: "flex",
              gap: "0.85rem",
              flexWrap: "wrap",
              zIndex: 2,
            }}
          >
            <a
              href="/#contact"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0.75em 1.5em", fontSize: "0.76rem", letterSpacing: "0.08em",
                backgroundColor: "#750006", color: "#FFFFFF",
                borderRadius: "12px",
                fontFamily: "var(--font-body)", textDecoration: "none",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#260000"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#750006"; }}
            >
              Book us
            </a>
            <a
              href="mailto:info@fidco.africa"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0.75em 1.5em", fontSize: "0.76rem", letterSpacing: "0.08em",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(15,15,15,0.15)", color: "#0f0f0f",
                borderRadius: "12px",
                fontFamily: "var(--font-body)", textDecoration: "none",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(15,15,15,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(15,15,15,0.15)"; }}
            >
              info@fidco.africa
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .cta-video-frame {
            height: auto !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
