"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import TextType from "@/components/ui/TextType";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import { TextRoll } from "@/components/core/text-roll";

const logos = [
  "/logos/executive-office-president.png",
  "/logos/lc-waikiki.png",
  "/logos/unhcr.png",
  "/logos/columbia-africa.png",
  "/logos/state-dept-culture.png",
  "/logos/chloride-exide.png",
  "/logos/thrive-hospitality.png",
  "/logos/amahoro-coalition.png",
  "/logos/bomas-of-kenya.png",
  "/logos/wrc-safari-rally.png",
  "/logos/elysium-capital.png",
  "/logos/medigah-london-hair.png",
  "/logos/abyan-salon-spa.png",
  "/logos/2nu-kollexion.png",
];

export default function BrandFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(4.5rem,9vw,7rem)",
        paddingBottom: "clamp(4.5rem,9vw,7rem)",
        backgroundColor: "#FFFFFF",
      }}
    >

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "820px",
          margin: "0 auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          marginBottom: "clamp(2.5rem,5vw,3.5rem)",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#750006",
          }}
        >
          <span style={{ width: "24px", height: "1px", background: "#750006", opacity: 0.7 }} /> Trusted by
        </motion.span>

        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
            fontWeight: 700,
            fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
            color: "#1c1c1c",
            marginTop: "0.9rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            textTransform: "uppercase",
          }}
        >
          <TextRoll>Governments, global brands &amp; institutions.</TextRoll>
        </motion.h2>
      </div>

      <div style={{ position: "relative", zIndex: 2, color: "rgba(117,0,6,0.18)", marginBottom: "clamp(2rem,4vw,3rem)" }}>
        <TextType text="Follow the work in motion." as="p" className="bf-type" typingSpeed={42} pauseDuration={1400} deletingSpeed={18} cursorCharacter="✦" />
        <ScrollVelocity texts={["Government • Retail • Hospitality • Healthcare • Finance • Culture • Sport •"]} velocity={45} numCopies={3} className="bf-vel" />
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <InfiniteSlider gap={24} speed={40} speedOnHover={20}>
          {logos.map((src, i) => (
            <div key={i} className="bf-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <style>{`
        .bf-type {
          text-align: center;
          margin-bottom: 0.75rem;
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #750006;
        }
        .bf-vel { font-family: '"Nohemi", var(--font-heading, "Oswald")'; font-weight: 700; text-transform: uppercase; font-size: clamp(2rem,5vw,4rem); letter-spacing: -0.01em; }
        .bf-strip { animation-name: bf-move; animation-timing-function: linear; animation-iteration-count: infinite; }
        .bf-rev { animation-name: bf-move-rev; }
        @keyframes bf-move { to { transform: translateX(-50%); } }
        @keyframes bf-move-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .bf-strip:hover { animation-play-state: paused; }
        .bf-chip {
          flex-shrink: 0;
          height: clamp(64px,7.5vw,88px);
          width: clamp(160px,17vw,210px);
          margin: 0 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.72);
          border-radius: 8px;
          padding: 0.9rem 1.3rem;
          box-shadow: 0 6px 20px rgba(117,0,6,0.08);
          border: 1px solid rgba(117,0,6,0.08);
          backdrop-filter: blur(10px);
          transition: transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .35s;
        }
        .bf-chip img { max-width: 100%; max-height: 100%; object-fit: contain; opacity: 1; image-rendering: auto; }
        .bf-chip:hover { transform: translateY(-6px) scale(1.05); box-shadow: 0 16px 36px rgba(117,0,6,0.2); }
      `}</style>
    </section>
  );
}
