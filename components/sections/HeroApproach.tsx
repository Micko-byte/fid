"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import BrandMark from "@/components/graphics/BrandMark";
import CornerBrackets from "@/components/ui/CornerBrackets";
import OrbitalRings from "@/components/graphics/OrbitalRings";

const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });
const GridMotion = dynamic(() => import("@/components/ui/GridMotion"), { ssr: false });

const GRID_ITEMS = Array.from({ length: 28 }, (_, i) => `/photos/cinematic/c${String((i % 12) + 1).padStart(2, "0")}.jpg`);

export default function HeroApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const panelY = useTransform(scrollYProgress, [0, 1], ["0vh", "5vh"]);
  const panelScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  const copyY = useTransform(scrollYProgress, [0, 0.7], ["0vh", "-4vh"]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [1, 0.9, 0.78]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "165vh",
        background:
          "radial-gradient(circle at 12% 18%, rgba(91,14,20,0.12), transparent 24%), radial-gradient(circle at 88% 14%, rgba(241,225,148,0.14), transparent 22%), linear-gradient(180deg, #f7ecc4 0%, #f4e3b7 100%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to bottom, rgba(26,26,26,0.03) 0, rgba(26,26,26,0.03) 1px, transparent 1px, transparent 88px), linear-gradient(to right, rgba(26,26,26,0.02) 0, rgba(26,26,26,0.02) 1px, transparent 1px, transparent 88px)",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          background: "linear-gradient(180deg, transparent, rgba(26,26,26,0.18), transparent)",
          opacity: 0.7,
        }}
      />
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <motion.div
          aria-hidden="true"
          style={{
            opacity: backdropOpacity,
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(247,236,196,0.96) 0%, rgba(247,236,196,0.82) 36%, rgba(247,236,196,0.3) 64%, rgba(247,236,196,0.06) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "10%",
              width: "68vw",
              height: "68vw",
              maxWidth: "900px",
              maxHeight: "900px",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(241,225,148,0.16), transparent 62%)",
              filter: "blur(12px)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, mixBlendMode: "screen" }}>
            <SplashCursor />
          </div>
        </motion.div>

        <div
          className="hero-shell"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "clamp(1rem, 2.8vw, 3rem) clamp(0rem, 0vw, 0rem)",
            display: "grid",
            alignItems: "center",
          }}
        >
          <div
            className="hero-content"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              gap: "clamp(1rem, 2vw, 2.5rem)",
              alignItems: "center",
              minHeight: "78vh",
              paddingLeft: "clamp(1rem, 2.8vw, 3rem)",
              paddingRight: "0",
            }}
          >
            <motion.div
              className="hero-copy"
              style={{
                y: copyY,
                maxWidth: "40rem",
                justifySelf: "start",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingTop: "clamp(1rem, 4vh, 5rem)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#5B0E14",
                  marginBottom: "1.3rem",
                }}
              >
                Insight. Strategy. Impact.
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-heading,'Oswald')",
                  fontWeight: 300,
                  fontSize: "clamp(3.2rem, 7vw, 7rem)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.055em",
                  color: "#1a1a1a",
                  textTransform: "uppercase",
                  maxWidth: "9.5ch",
                  textWrap: "balance",
                }}
              >
                We shape communication into influence.
              </h1>

              <p
                style={{
                  marginTop: "1.25rem",
                  maxWidth: "36ch",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "rgba(26,26,26,0.78)",
                }}
              >
                A more deliberate stage for the brand: editorial type, breathing room, and a moving visual that feels framed rather than full-screen.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
                <Button href="/#contact" variant="primary" magnetic cursor="Let's talk">
                  Start a project
                </Button>
                <Button href="/#work" variant="outline">
                  See our work
                </Button>
              </div>

              <div
                style={{
                  marginTop: "clamp(1.5rem, 3vw, 2.25rem)",
                  width: "100%",
                  maxWidth: "34rem",
                  padding: "1rem",
                  border: "1px solid rgba(26,26,26,0.12)",
                  backgroundColor: "rgba(245,242,236,0.72)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 14px 40px rgba(26,3,6,0.08)",
                  position: "relative",
                }}
              >
                <CornerBrackets color="rgba(91,14,20,0.42)" size={18} weight={1.25} inset={8} />
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <BrandMark size={64} spin={false} color="#1a1a1a" accent="#5B0E14" />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#5B0E14",
                        marginBottom: "0.45rem",
                      }}
                    >
                      Ready for launch
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.92rem",
                        lineHeight: 1.55,
                        color: "rgba(26,26,26,0.7)",
                        maxWidth: "28ch",
                      }}
                    >
                      Campaign systems, editorial assets, and launch kits shaped for institutions, brands, and cultural moments.
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "0.6rem",
                    marginTop: "0.95rem",
                  }}
                >
                  {["Strategy", "Production", "Amplification"].map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "0.6rem 0.7rem",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(26,26,26,0.08)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.66rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(26,26,26,0.7)",
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-media"
              style={{
                y: panelY,
                scale: panelScale,
                transformOrigin: "center center",
                justifySelf: "end",
                width: "100%",
                maxWidth: "820px",
              }}
              >
              <div
                className="hero-media-box"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "5 / 4",
                  overflow: "hidden",
                  borderTop: "1px solid rgba(26,26,26,0.12)",
                  borderRight: "1px solid rgba(26,26,26,0.12)",
                  borderBottom: "1px solid rgba(26,26,26,0.12)",
                  backgroundColor: "#f1e5c9",
                  boxShadow: "0 30px 80px rgba(26,3,6,0.08)",
                }}
              >
                <GridMotion items={GRID_ITEMS} gradientColor="#ece2c9" />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    width: "clamp(110px, 13vw, 160px)",
                    aspectRatio: "1",
                    padding: "0.85rem",
                    backgroundColor: "rgba(245,242,236,0.86)",
                    border: "1px solid rgba(26,26,26,0.1)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5B0E14" }}>
                    Narrative map
                  </div>
                  <div style={{ display: "grid", placeItems: "center", minHeight: 0, flex: 1 }}>
                    <div style={{ width: "100%", height: "100%", opacity: 0.9 }}>
                      <OrbitalRings color="#5B0E14" opacity={0.18} className="absolute inset-0 w-full h-full" />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(247,236,196,0.0) 0%, rgba(247,236,196,0.1) 30%, rgba(247,236,196,0.35) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "1rem",
                    bottom: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.6rem 0.85rem",
                    backgroundColor: "rgba(245,242,236,0.92)",
                    color: "#5B0E14",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Moving grid
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "10%",
                    border: "1px solid rgba(241,225,148,0.14)",
                    pointerEvents: "none",
                  }}
                />
                <CornerBrackets color="rgba(91,14,20,0.24)" size={20} weight={1.4} inset={12} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-shell { padding-right: 0 !important; }
          .hero-content { grid-template-columns: 1fr !important; min-height: auto !important; padding-left: clamp(1rem, 4vw, 2rem) !important; }
          .hero-copy { justify-self: center !important; text-align: center !important; align-items: center !important; padding-top: 0 !important; }
          .hero-media { justify-self: center !important; max-width: 100% !important; margin-top: 1.5rem !important; }
          .hero-media-box {
            aspect-ratio: 16 / 10 !important;
            border-left: 1px solid rgba(26,26,26,0.12) !important;
            max-height: 270px !important;
          }
          .hero-copy h1 { font-size: clamp(2.8rem, 13vw, 4.6rem) !important; line-height: 0.86 !important; max-width: 9ch !important; }
          .hero-copy p { max-width: 30ch !important; }
        }
      `}</style>
    </section>
  );
}
