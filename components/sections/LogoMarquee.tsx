"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Real client logos extracted from the company profile
const logos = [
  { src: "/logos/executive-office-president.png", alt: "Executive Office of the President" },
  { src: "/logos/state-dept-culture.png", alt: "State Department for Culture & Heritage" },
  { src: "/logos/lc-waikiki.png", alt: "LC Waikiki" },
  { src: "/logos/unhcr.png", alt: "UNHCR" },
  { src: "/logos/kansai-plascon.png", alt: "Kansai Plascon", fallbackText: "KANSAI PLASCON" },
  { src: "/logos/columbia-africa.png", alt: "Columbia Africa Healthcare" },
  { src: "/logos/chloride-exide.png", alt: "Chloride Exide" },
  { src: "/logos/thrive-hospitality.png", alt: "Thrive Hospitality" },
  { src: "/logos/amahoro-coalition.png", alt: "The Amahoro Coalition" },
  { src: "/logos/bomas-of-kenya.png", alt: "Bomas of Kenya" },
  { src: "/logos/wrc-safari-rally.png", alt: "WRC Safari Rally" },
  { src: "/logos/elysium-capital.png", alt: "Elysium Capital Partners" },
  { src: "/logos/medigah-london-hair.png", alt: "Medigah London Hair" },
  { src: "/logos/abyan-salon-spa.png", alt: "Abyan Salon & Spa" },
  { src: "/logos/2nu-kollexion.png", alt: "2nu Kollexion" },
];

function LogoImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        height: "clamp(60px, 7vw, 84px)",
        width: "clamp(130px, 15vw, 180px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(1.2rem, 3vw, 2.6rem)",
        opacity: 0.62,
        transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.4s",
        filter: "grayscale(100%)",
      }}
      className="logo-cell"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          const parent = img.parentElement;
          if (!parent) return;
          img.style.display = "none";
          const span = document.createElement("span");
          span.textContent = alt;
          span.style.cssText =
            "font-family:var(--font-heading,'Oswald');font-weight:600;font-size:0.8rem;letter-spacing:0.04em;text-transform:uppercase;color:#1a1a1a;text-align:center;line-height:1.1;";
          parent.appendChild(span);
        }}
      />
    </div>
  );
}

export default function LogoMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const track = [...logos, ...logos];

  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
        borderTop: "1px solid rgba(26,26,26,0.07)",
        borderBottom: "1px solid rgba(26,26,26,0.07)",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem,5vw,6rem)",
          paddingRight: "clamp(1.5rem,5vw,6rem)",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#750006",
          }}
        >
          <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
          Trusted by
        </motion.span>
        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading,'Oswald')",
            fontWeight: 600,
            fontSize: "clamp(1.8rem,3.6vw,2.8rem)",
            color: "#1a1a1a",
            marginTop: "0.7rem",
            letterSpacing: "-0.01em",
          }}
        >
          Governments, global brands & institutions.
        </motion.h2>
      </div>

      {/* Marquee track */}
      <div className="logo-marquee" style={{ position: "relative", overflow: "hidden" }}>
        {/* Fade edges */}
        <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "12%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(90deg,#fff,transparent)" }} />
        <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "12%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(270deg,#fff,transparent)" }} />

        <div
          className="logo-track"
          style={{
            display: "flex",
            width: "max-content",
            alignItems: "center",
            animation: "fid-logo-marquee 55s linear infinite",
            willChange: "transform",
          }}
        >
          {track.map((l, i) => (
            <LogoImg key={i} src={l.src} alt={l.alt} />
          ))}
        </div>
      </div>

      <style>{`
        .logo-marquee:hover .logo-track { animation-play-state: paused; }
        .logo-cell:hover { opacity: 1 !important; filter: grayscale(0%) !important; }
        @keyframes fid-logo-marquee { to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
