"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const platforms = [
  {
    name: "The Tribe Vibe",
    num: "01",
    tag: "Lifestyle · Music · Culture · Community",
    href: "/platforms/the-tribe-vibe",
    desc: "FID & Co.'s flagship experiential lifestyle platform — music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    image: "/photos/projects/tribe-vibe.jpg",
    logo: "/logos/tribe-vibe.png",
    logoDark: false,
    accent: "#d98038",
  },
  {
    name: "Suhba Series",
    num: "02",
    tag: "Curated Conversations · Modern Identity",
    href: "/platforms/suhba-series",
    desc: "An intimate conversation platform fostering meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01",
    logo: "/logos/suhba-series.png",
    logoDark: false,
    accent: "#8a6a52",
  },
  {
    name: "The Capital Room",
    num: "03",
    tag: "Leadership · Business · African Perspectives",
    href: "/platforms/the-capital-room",
    desc: "A conversation-led platform on leadership, entrepreneurship and the realities of building within African markets — founders, executives and changemakers.",
    image: "/photos/editorial/podcast-set.jpg",
    logo: "/logos/capital-room.png",
    logoDark: true,
    accent: "#750006",
  },
];

/* Letters rise out of a clipped line as the tile scrolls in.
   The in-view watcher sits on the WRAPPER, not the letters: IntersectionObserver
   clips a target against its ancestors' overflow, and the letters start
   translated below this overflow:hidden box — observing them directly means
   they read as 0% visible and never animate. */
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

function PlatformTile({ p, i }: { p: (typeof platforms)[number]; i: number }) {
  // First tile spans the full row, like the reference's hero project.
  const wide = i === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: (i % 2) * 0.08, ease: EASE }}
      className={wide ? "ip-tile ip-tile-wide" : "ip-tile"}
    >
      <Link href={p.href} className="ip-card" data-cursor="Explore" style={{ textDecoration: "none", display: "block" }}>
        <div className="ip-media" style={{ position: "relative", overflow: "hidden", borderRadius: "6px", aspectRatio: wide ? "16 / 8" : "4 / 3", background: "#1c1208" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ip-img" src={p.image} alt={p.name} loading="lazy" />
          <div className="ip-scrim" />

          <span className="ip-num">({p.num})</span>

          <span className="ip-logo" style={{ background: p.logoDark ? "#1c1c1c" : "#f5f2ec" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.logo} alt={`${p.name} logo`} loading="lazy" style={{ height: wide ? "48px" : "38px", maxWidth: "170px", objectFit: "contain" }} />
          </span>

          <span className="ip-view">
            Explore platform <ArrowUpRight size={15} weight="bold" />
          </span>
        </div>

        {/* caption below the media, like the reference */}
        <div style={{ paddingTop: "1.1rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: wide ? "clamp(1.9rem,3.6vw,3.1rem)" : "clamp(1.5rem,2.4vw,2.1rem)", lineHeight: 1.02, letterSpacing: "-0.01em", color: "#1c1c1c", margin: 0, fontWeight: 700 }}>
            <LetterRise text={p.name} />
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: p.accent, fontWeight: 700, margin: "0.6rem 0 0" }}>
            {p.tag}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(28,28,28,0.66)", margin: "0.9rem 0 0", maxWidth: wide ? "62ch" : "44ch" }}>
            {p.desc}
          </p>
        </div>
      </Link>
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
            These are not filler event pages. They are FID-owned audience platforms designed for cultural relevance, commercial partnership and repeatable brand moments.
          </motion.p>
        </div>

        {/* media-tile grid */}
        <div className="ip-grid">
          {platforms.map((p, i) => (
            <PlatformTile key={p.name} p={p} i={i} />
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(2rem, 4vw, 3.5rem) clamp(1.2rem, 2.4vw, 2rem);
        }
        .ip-tile-wide { grid-column: 1 / -1; }

        /* media motion — zoom + lift on hover, reveal the CTA */
        .ip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.85s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease;
          filter: saturate(0.94) contrast(1.04);
        }
        .ip-card:hover .ip-img { transform: scale(1.09); filter: saturate(1.06) contrast(1.05); }
        .ip-scrim {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(13,5,5,0.28) 0%, rgba(13,5,5,0) 42%, rgba(13,5,5,0.6) 100%);
          transition: opacity 0.5s ease;
        }
        .ip-card:hover .ip-scrim { opacity: 0.82; }
        .ip-media { transition: box-shadow 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .ip-card:hover .ip-media { box-shadow: 0 34px 90px rgba(38,0,0,0.28); transform: translateY(-6px); }

        .ip-num {
          position: absolute; top: 1rem; right: 1.2rem; z-index: 2;
          font-family: var(--font-body); font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.22em; color: rgba(245,242,236,0.9);
        }
        .ip-logo {
          position: absolute; top: 1rem; left: 1.2rem; z-index: 2;
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.6rem 0.85rem; border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.28);
          transform: translateY(0) scale(1);
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ip-card:hover .ip-logo { transform: translateY(-2px) scale(1.07); }

        .ip-view {
          position: absolute; left: 1.2rem; bottom: 1.1rem; z-index: 2;
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: var(--font-body); font-size: 0.7rem; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase; color: #f5f2ec;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .ip-card:hover .ip-view { opacity: 1; transform: translateY(0); }

        @media (max-width: 860px) {
          .ip-grid { grid-template-columns: 1fr; }
          .ip-tile-wide { grid-column: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ip-img, .ip-media, .ip-logo, .ip-view { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
