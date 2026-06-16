"use client";

import { useRef, type MutableRefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@/components/ui/Button";
import CircularText from "@/components/ui/CircularText";
import TextType from "@/components/ui/TextType";
import VariableProximity from "@/components/ui/VariableProximity";

const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });

const HEADING_TEXT = "We shape communication into influence.";

const BLOBS = [
  { size: 540, x: "2%", y: "10%", color: "rgba(116,47,20,0.08)", dur: 24, dx: 28, dy: 24 },
  { size: 440, x: "62%", y: "4%", color: "rgba(252,156,68,0.12)", dur: 30, dx: -26, dy: 32 },
  { size: 360, x: "72%", y: "56%", color: "rgba(116,47,20,0.06)", dur: 28, dx: 20, dy: -26 },
];

const singleWordVariants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 28, opacity: 0 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0vh", "-5vh"]);
  const graphicY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const graphicScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 8% 14%, rgba(116,47,20,0.12), transparent 22%), radial-gradient(circle at 84% 10%, rgba(252,156,68,0.16), transparent 20%), linear-gradient(180deg, #FFFFFF 0%, #f4e3b7 100%)",
      }}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{ x: [0, b.dx, 0], y: [0, b.dy, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            filter: "blur(70px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 45%, rgba(252,156,68,0.16), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <SplashCursor />
      </div>

      <motion.div
        style={{
          y: contentY,
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(6.5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vh, 5rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
          alignItems: "center",
          gap: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div
          className="hero-copy"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#742F14",
              marginBottom: "clamp(1.25rem, 2.5vh, 2rem)",
            }}
          >
            Insight. Strategy. Impact.
          </motion.p>

          <motion.h1
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
            }}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontWeight: 500,
              fontSize: "clamp(3rem, 6.8vw, 7.2rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
              color: "#1a1a1a",
              textTransform: "uppercase",
              maxWidth: "12ch",
              textWrap: "balance",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 0.22em",
              margin: 0,
            }}
          >
            <VariableProximity
              label={HEADING_TEXT}
              containerRef={sectionRef as MutableRefObject<HTMLElement | null>}
              radius={180}
              falloff="gaussian"
              fromFontVariationSettings="'wght' 300, 'opsz' 16"
              toFontVariationSettings="'wght' 900, 'opsz' 54"
              style={{
                fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
                fontWeight: 500,
                lineHeight: 0.88,
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                color: "#1a1a1a",
              }}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            style={{
              marginTop: "clamp(1.25rem, 2.5vh, 2rem)",
              maxWidth: "44ch",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.2vw, 1.18rem)",
              lineHeight: 1.6,
              color: "rgba(26,26,26,0.72)",
            }}
          >
            FID &amp; Co. is a full-service strategic communications and brand
            experience firm - building credibility and cultural relevance for the
            brands and institutions shaping Africa.
          </motion.p>

          <div style={{ marginTop: "1rem" }}>
            <TextType
              text="Follow the work in motion."
              as="p"
              className="hero-type-line"
              typingSpeed={42}
              pauseDuration={1500}
              deletingSpeed={18}
              cursorCharacter="✦"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: "easeOut" }}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "clamp(2rem, 4vh, 3rem)",
            }}
          >
            <Button href="/#contact" variant="primary" magnetic cursor="Let's talk">
              Start a project
            </Button>
            <Button href="/#work" variant="outline">
              See our work
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="hero-graphic"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            y: graphicY,
            scale: graphicScale,
            position: "relative",
            width: "100%",
            height: "min(84vh, 860px)",
            justifySelf: "end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "8% 2% 2% 2%",
              borderRadius: "28px",
              background:
                "radial-gradient(circle at 30% 20%, rgba(116,47,20,0.26), transparent 28%), radial-gradient(circle at 78% 18%, rgba(252,156,68,0.22), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.04))",
              boxShadow: "0 36px 90px rgba(92,60,44,0.08)",
            }}
          />
          <Image
            src="/illustrations/hero-landscape.png"
            alt="FID & Co. - influence through strategic communication"
            fill
            priority
            sizes="(max-width: 960px) 90vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center", mixBlendMode: "multiply" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.16) 36%, rgba(255,255,255,0.56) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              padding: "0.7rem 0.9rem",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#742F14",
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              border: "1px solid rgba(116,47,20,0.12)",
            }}
          >
            Story-led opening
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "1rem",
              bottom: "1rem",
              width: "clamp(170px, 18vw, 250px)",
              aspectRatio: "1",
              color: "#742F14",
            }}
          >
            <CircularText text="STORY*IN MOTION*STORY*IN MOTION*" reverse onHover="speedUp" className="text-[#742F14]" />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "7%",
              border: "1px solid rgba(116,47,20,0.14)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        .hero-type-line {
          font-family: var(--font-body);
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #742F14;
        }
        @media (max-width: 960px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: clamp(6rem, 14vh, 8rem) !important;
          }
          .hero-copy {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-copy h1 {
            justify-content: center !important;
            max-width: 16ch !important;
            font-size: clamp(2.8rem, 12vw, 5rem) !important;
          }
          .hero-graphic {
            height: min(54vh, 520px) !important;
            justify-self: center !important;
            order: -1;
          }
        }
        @media (max-width: 480px) {
          .hero-copy h1 { font-size: clamp(2.4rem, 13vw, 3.6rem) !important; }
          .hero-graphic { height: 340px !important; }
        }
      `}</style>
    </section>
  );
}
