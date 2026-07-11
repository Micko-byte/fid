"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { platforms as platformData } from "@/components/lib/platforms";

const EASE = [0.16, 1, 0.3, 1] as const;

function LetterRise({ text }: { text: string }) {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={{ hidden: { y: "115%" }, show: { y: "0%" } }}
          transition={{ duration: 0.7, delay: 0.08 + i * 0.028, ease: EASE }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function PlatformTile({ p, i }: { p: (typeof platformData)[number]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: (i % 3) * 0.08, ease: EASE }}
      className="ip-tile"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ip-card">
        {/* atmospheric image — preview only, revealed on hover */}
        <div className={`ip-media ${hovered ? "ip-media-on" : ""}`} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ip-img" src={p.image} alt="" loading="lazy" />
          <div className="ip-scrim" />
        </div>

        <span className="ip-num">({p.num})</span>

        {/* logo is the entry point — tap to open the dedicated platform page */}
        <Link
          href={`/platforms/${p.slug}`}
          className="ip-logo-link"
          data-cursor="Explore"
          aria-label={`Open ${p.name} — view platform`}
        >
          <span className="ip-logo" style={{ background: p.logoDark ? "#1c1c1c" : "#f5f2ec" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.logo} alt={`${p.name} logo`} loading="lazy" />
          </span>
          <span className="ip-logo-cta">
            View platform <ArrowUpRight size={14} weight="bold" />
          </span>
        </Link>

        <div className="ip-copy">
          <h3>
            <LetterRise text={p.name} />
          </h3>
          <p className="ip-tag" style={{ color: p.accent }}>
            {p.tagline}
          </p>
          <p className="ip-desc">{p.shortDesc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="platforms" className="fid-section section-light platforms-section">
      <div aria-hidden className="platforms-bg-word">CULTURE</div>
      <div ref={ref} className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        <div className="platforms-head" style={{ textAlign: "center" }}>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="type-eyebrow"
            style={{ color: "#750006", display: "inline-block" }}
          >
            Owned platforms &amp; cultural IPs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            className="platforms-title"
            style={{ margin: "1.4rem auto 0" }}
          >
            Culture, conversation
            <br />
            &amp; brand experience <em style={{ fontStyle: "italic", fontWeight: 500, textTransform: "none" }}>on our terms.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="type-body platforms-intro"
            style={{ margin: "1.8rem auto 0" }}
          >
            These are not filler event pages. They are FID-owned audience platforms designed for cultural relevance, commercial partnership and repeatable brand moments. Select a logo to explore each platform.
          </motion.p>
        </div>

        <div className="ip-grid">
          {platformData.map((p, i) => (
            <PlatformTile key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        .platforms-section {
          background: #f5f2ec;
          color: #1c1c1c;
          isolation: isolate;
        }
        .platforms-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23750006' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M0 40 L40 0 L80 40 L40 80 Z'/%3E%3Cpath d='M10 40 L40 10 L70 40 L40 70 Z'/%3E%3Cpath d='M20 40 L40 20 L60 40 L40 60 Z'/%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: -2;
        }
        .platforms-bg-word {
          position: absolute;
          left: -0.08em;
          top: clamp(1rem, 3vw, 2rem);
          z-index: -1;
          font-family: var(--font-heading);
          font-size: clamp(6rem, 18vw, 18rem);
          font-weight: 900;
          line-height: 0.8;
          color: rgba(117,0,6,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .platforms-head { display: block; margin-bottom: clamp(2.5rem, 6vw, 4.5rem); }
        .platforms-title {
          margin: 1rem auto 0;
          max-width: 22ch;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 0.94;
          font-weight: 800;
          text-transform: uppercase;
          color: #1c1c1c;
          text-wrap: balance;
        }
        .platforms-intro { max-width: 52ch; color: rgba(28,28,28,0.7); margin: 0 auto; }

        .ip-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1.2rem, 2.4vw, 2rem);
        }

        .ip-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-height: clamp(380px, 42vw, 480px);
          padding: clamp(1.8rem, 3vw, 2.4rem) clamp(1.2rem, 2vw, 1.6rem) clamp(1.4rem, 2.5vw, 2rem);
          border-radius: 12px;
          border: 1px solid rgba(117,0,6,0.1);
          background: rgba(255,255,255,0.42);
          overflow: hidden;
          transition: box-shadow 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease;
        }
        .ip-tile:hover .ip-card {
          box-shadow: 0 28px 80px rgba(38,0,0,0.14);
          transform: translateY(-5px);
          border-color: rgba(117,0,6,0.18);
        }

        .ip-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .ip-media-on {
          opacity: 1;
          transform: scale(1);
        }
        .ip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.92) contrast(1.04);
        }
        .ip-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(245,242,236,0.72) 0%, rgba(245,242,236,0.55) 38%, rgba(245,242,236,0.88) 100%);
        }

        .ip-num {
          position: relative;
          z-index: 2;
          font-family: var(--font-body);
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(28,28,28,0.45);
          margin-bottom: auto;
        }

        .ip-logo-link {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          margin: clamp(1rem, 3vh, 2rem) 0;
        }
        .ip-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.75rem, 1.4vw, 1rem) clamp(1rem, 2vw, 1.4rem);
          border-radius: 14px;
          box-shadow: 0 14px 40px rgba(38,0,0,0.14);
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease;
        }
        .ip-logo img {
          height: clamp(36px, 4.5vw, 48px);
          max-width: min(200px, 28vw);
          object-fit: contain;
          display: block;
        }
        .ip-logo-link:hover .ip-logo,
        .ip-logo-link:focus-visible .ip-logo {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 20px 50px rgba(38,0,0,0.2);
        }
        .ip-logo-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #750006;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .ip-logo-link:hover .ip-logo-cta,
        .ip-logo-link:focus-visible .ip-logo-cta {
          opacity: 1;
          transform: translateY(0);
        }

        .ip-copy {
          position: relative;
          z-index: 2;
          margin-top: auto;
        }
        .ip-copy h3 {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 2.2vw, 1.85rem);
          line-height: 1.04;
          letter-spacing: -0.01em;
          color: #1c1c1c;
          margin: 0;
          font-weight: 700;
        }
        .ip-tag {
          font-family: var(--font-body);
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0.55rem 0 0;
        }
        .ip-desc {
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.65;
          color: rgba(28,28,28,0.62);
          margin: 0.75rem 0 0;
          max-width: 36ch;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 980px) {
          .ip-grid { grid-template-columns: 1fr; gap: 1rem; }
          .ip-card { min-height: 0; padding: 1.5rem 1.2rem 1.3rem; }
          .ip-media { opacity: 0.35; }
          .ip-media-on { opacity: 0.5; }
          .ip-logo-cta { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ip-img, .ip-card, .ip-logo, .ip-logo-cta, .ip-media { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
