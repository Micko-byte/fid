"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BrandMark from "@/components/graphics/BrandMark";
import GradientHeading from "@/components/ui/GradientHeading";
import OrbitalRings from "@/components/graphics/OrbitalRings";
import BorderGlow from "@/components/ui/BorderGlow";
import CornerBrackets from "@/components/ui/CornerBrackets";
import { FileText, Wrench, RocketLaunch } from "@phosphor-icons/react";
import HoverIcon from "@/components/ui/HoverIcon";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      className="section-red"
      style={{
        backgroundColor: "#750006",
        color: "#f5f2ec",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(4.5rem, 9vw, 8rem)",
        paddingBottom: "clamp(4.5rem, 9vw, 8rem)",
      }}
    >
      {/* Diagonal texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 64px)",
        }}
      />

      {/* Concentric rings (radar) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)",
          width: "min(54vw, 720px)", height: "min(54vw, 720px)", pointerEvents: "none",
          WebkitMaskImage: "radial-gradient(closest-side, #000 60%, transparent 100%)",
          maskImage: "radial-gradient(closest-side, #000 60%, transparent 100%)",
          opacity: 0.7,
        }}
      >
        {[0, 14, 28, 42].map((inset, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              inset: `${inset}%`,
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      <div
        ref={ref}
        className="cta-layout"
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "1320px", margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
          alignItems: "end",
          gap: "clamp(2rem, 5vw, 4rem)",
        }}
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading)", fontWeight: 500,
              color: "#f5f2ec",
              fontSize: "clamp(2.6rem, 6.5vw, 5.6rem)",
              lineHeight: 0.96, letterSpacing: "-0.025em",
              maxWidth: "15ch",
            } as React.CSSProperties}
          >
            Let&apos;s build something{" "}
            <GradientHeading
              as="span"
              gradient="linear-gradient(135deg, #d9ab88 0%, #d98038 45%, #f5f2ec 100%)"
              style={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}
            >
              meaningful.
            </GradientHeading>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flexShrink: 0, marginTop: "1.6rem" }}
          >
            <a
              href="/#contact"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0.85em 1.7em", fontSize: "0.8rem", letterSpacing: "0.08em",
                backgroundColor: "#f5f2ec", color: "#750006",
                borderRadius: "14px",
                fontFamily: "var(--font-body)", textDecoration: "none",
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#260000"; e.currentTarget.style.color = "#f5f2ec"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f2ec"; e.currentTarget.style.color = "#750006"; }}
            >
              Book us
            </a>
            <a
              href="mailto:info@fidco.africa"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0.85em 1.7em", fontSize: "0.8rem", letterSpacing: "0.08em",
                backgroundColor: "transparent",
                border: "1px solid rgba(245,242,236,0.45)", color: "#f5f2ec",
                borderRadius: "14px",
                fontFamily: "var(--font-body)", textDecoration: "none",
                transition: "border-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,236,0.9)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,236,0.45)"; }}
            >
              info@fidco.africa
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ minHeight: "280px" }}
        >
          <BorderGlow
            animated
            borderRadius={14}
            backgroundColor="rgba(245,242,236,0.05)"
            colors={["#d98038", "#d9ab88", "#f5f2ec"]}
            fillOpacity={0.22}
            className="cta-visual"
            style={{ height: "100%" }}
          >
            <div
              style={{
                position: "relative",
                minHeight: "280px",
                padding: "1.2rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-10% -8% auto auto",
                  width: "min(92%, 480px)",
                  height: "min(92%, 480px)",
                  opacity: 0.45,
                }}
              >
                <OrbitalRings color="#d98038" opacity={0.18} className="absolute inset-0 w-full h-full" />
              </div>
              <CornerBrackets color="rgba(245,242,236,0.45)" size={24} weight={1.4} inset={12} />

              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.66rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#d9ab88",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Next step
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#f5f2ec",
                      maxWidth: "10ch",
                    }}
                  >
                    Share your brief and we&apos;ll shape the route.
                  </p>
                </div>
                <BrandMark size={64} spin={false} color="#f5f2ec" accent="#d9ab88" />
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "0.7rem",
                  marginTop: "1rem",
                }}
              >
                {[
                  { label: "Brief", copy: "Tell us the mission.", Icon: FileText },
                  { label: "Build", copy: "We map the idea.", Icon: Wrench },
                  { label: "Launch", copy: "We get it moving.", Icon: RocketLaunch },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "0.85rem 0.8rem",
                      backgroundColor: "rgba(245,242,236,0.06)",
                      border: "1px solid rgba(245,242,236,0.12)",
                      borderRadius: "14px",
                    }}
                  >
                    <div style={{ marginBottom: "0.5rem" }}>
                      <HoverIcon icon={item.Icon} size={40} weight="light" hoverWeight="fill" rotate={-6} color="#d9ab88" />
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#d9ab88",
                        marginBottom: "0.45rem",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        lineHeight: 1.45,
                        color: "rgba(245,242,236,0.8)",
                      }}
                    >
                      {item.copy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cta-visual { min-height: 240px !important; }
          .cta-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .cta-visual { min-height: 220px !important; }
        }
      `}</style>
    </section>
  );
}
