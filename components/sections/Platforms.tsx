"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Buildings, ChatsCircle, MusicNotes } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle / Music / Culture / Community",
    href: "/platforms/the-tribe-vibe",
    desc: "FID & Co.'s flagship experiential lifestyle platform, bringing together music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    num: "01",
    image: "/photos/projects/tribe-vibe.jpg",
    logo: "/logos/tribe-vibe.png" as string | undefined,
    logoDark: false,
    accent: "#d98038",
    Icon: MusicNotes,
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations / Modern Identity / Thoughtful Experiences",
    href: "/platforms/suhba-series",
    desc: "An intimate conversation platform created to foster meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    num: "02",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01",
    logo: "/logos/suhba-series.png" as string | undefined,
    logoDark: false,
    accent: "#8a6a52",
    Icon: ChatsCircle,
  },
  {
    name: "The Capital Room",
    tag: "Leadership / Business / Influence / African Perspectives",
    href: "/platforms/the-capital-room",
    desc: "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets, bringing together founders, executives and changemakers.",
    num: "03",
    image: "/photos/editorial/podcast-set.jpg",
    logo: "/logos/capital-room.png" as string | undefined,
    logoDark: true,
    accent: "#750006",
    Icon: Buildings,
  },
];
function PlatformCopyCard({ p, inView }: { p: (typeof platforms)[number]; inView: boolean }) {
  return (
    <motion.article
      className="platform-copy-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE }}
      style={{
        borderRadius: "30px",
        background: "#fbfaf8",
        border: "1px solid rgba(117,0,6,0.08)",
        boxShadow: "0 22px 46px rgba(38,0,0,0.06)",
        padding: "clamp(1.6rem,3vw,2.4rem)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.66rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(28,28,28,0.55)",
            fontWeight: 700,
          }}
        >
          ({p.num}) Owned platform
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.66rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: p.accent,
            fontWeight: 800,
          }}
        >
          FID-owned IP
        </span>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.04, ease: EASE }}
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 900,
          fontSize: "clamp(2.2rem,4vw,4.8rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: "#1c1c1c",
          maxWidth: "10ch",
          margin: 0,
        }}
      >
        {p.name}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          lineHeight: 1.65,
          color: "#1c1c1c",
          fontWeight: 500,
          marginTop: "1.25rem",
          maxWidth: "42ch",
        }}
      >
        {p.desc}
      </motion.p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginTop: "1.4rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.55rem 0.8rem",
            borderRadius: "999px",
            background: "rgba(217,128,56,0.12)",
            color: p.accent,
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          {p.tag}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
        style={{ marginTop: "1.6rem" }}
      >
        <Link
          href={p.href}
          data-cursor="Explore"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.74rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: p.accent,
            textDecoration: "none",
            borderBottom: `1px solid ${p.accent}`,
            paddingBottom: "0.3rem",
          }}
        >
          Explore platform <ArrowUpRight size={16} weight="bold" />
        </Link>
      </motion.div>
    </motion.article>
  );
}

function PlatformArtStack({
  p,
  reverse,
  inView,
}: {
  p: (typeof platforms)[number];
  reverse: boolean;
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const direction = reverse ? -1 : 1;
  const layers = [
    {
      inset: "14% 16% 8% 0%",
      x: -24 * direction,
      y: 18,
      rotate: -9 * direction,
      scale: 0.92,
      opacity: 0.18,
      z: 1,
      border: "1px solid rgba(117,0,6,0.08)",
      shade: "linear-gradient(180deg, rgba(117,0,6,0.18), rgba(28,28,28,0.42))",
    },
    {
      inset: "7% 0% 14% 10%",
      x: 20 * direction,
      y: -12,
      rotate: 7 * direction,
      scale: 0.96,
      opacity: 0.32,
      z: 2,
      border: "1px solid rgba(217,128,56,0.16)",
      shade: "linear-gradient(180deg, rgba(38,0,0,0.08), rgba(38,0,0,0.28))",
    },
    {
      inset: "0",
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      z: 3,
      border: "1px solid rgba(255,255,255,0.55)",
      shade: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(28,28,28,0.1))",
    },
  ] as const;

  return (
    <div
      className="platform-art"
      style={{
        position: "relative",
        minHeight: "clamp(340px, 44vw, 680px)",
        isolation: "isolate",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          position: "absolute",
          inset: "10% 6% 0 8%",
          borderRadius: "34px",
          background: "linear-gradient(145deg, rgba(117,0,6,0.16), rgba(217,128,56,0.1))",
          filter: "blur(1px)",
        }}
      />
      {layers.map((layer, idx) => (
        <motion.div
          key={idx}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x: layer.x * 0.5,
                  y: layer.y * 0.5,
                  rotate: layer.rotate * 0.5,
                  scale: layer.scale - 0.04,
                }
          }
          animate={
            inView
              ? {
                  opacity: layer.opacity,
                  x: layer.x,
                  y: layer.y,
                  rotate: layer.rotate,
                  scale: layer.scale,
                }
              : {}
          }
          transition={{ duration: 0.9, delay: idx * 0.08, ease: EASE }}
          style={{
            position: "absolute",
            inset: layer.inset,
            zIndex: layer.z,
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(38,0,0,0.14)",
            border: layer.border,
            backgroundColor: "#260000",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.05)",
              filter:
                idx === 2
                  ? "saturate(1.03) contrast(1.05)"
                  : "saturate(0.8) contrast(0.92) brightness(0.84)",
            }}
          />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: layer.shade, pointerEvents: "none" }} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
        style={{
          position: "absolute",
          left: "1rem",
          top: "1rem",
          zIndex: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          borderRadius: "999px",
          background: "rgba(245,242,236,0.92)",
          color: "#1c1c1c",
          border: "1px solid rgba(117,0,6,0.12)",
          padding: "0.5rem 0.8rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.66rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontWeight: 800,
        }}
      >
        Layered frame
      </motion.div>
    </div>
  );
}

function PlatformRow({
  p,
  i,
  onActive,
}: {
  p: (typeof platforms)[number];
  i: number;
  onActive: (i: number) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { amount: 0.35 });
  const reverse = i % 2 === 1;

  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE }}
      className="ip-row"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.5rem,4vw,3.2rem)", alignItems: "center", marginTop: "clamp(2rem,4vw,3.5rem)" }}
    >
      <div style={{ order: reverse ? 2 : 1 }}>
        <PlatformCopyCard p={p} inView={inView} />
      </div>
      <div style={{ order: reverse ? 1 : 2 }}>
        <PlatformArtStack p={p} reverse={reverse} inView={inView} />
      </div>
    </motion.div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <section ref={sectionRef} id="platforms" className="fid-section section-light platforms-section" style={{ paddingBottom: 0 }}>
      <div aria-hidden className="platforms-bg-word">CULTURE</div>
      <div ref={ref} className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        {/* centered typographic interlude, like the reference's white intro */}
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
            and brand experience
            <br />
            on our terms.
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

        {/* numbered index strip */}
        <div style={{ borderTop: "1px solid rgba(28,28,28,0.1)", paddingTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.4rem 2rem", justifyContent: "center" }}>
          {platforms.map((p, i) => (
            <span
              key={p.name}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: i === active ? p.accent : "rgba(28,28,28,0.5)", fontWeight: i === active ? 700 : 600, transition: "color 0.3s" }}
            >
              ({p.num}) {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* layered cards that stay light and responsive, without scroll-jank */}
      <div style={{ marginTop: "clamp(2rem,4vw,3rem)", position: "relative", zIndex: 1 }}>
        {platforms.map((p, i) => (
          <PlatformRow key={p.name} p={p} i={i} onActive={onActive} />
        ))}
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
          letter-spacing: 0;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .platforms-head {
          display: block;
          margin-bottom: clamp(2rem, 5vw, 4rem);
        }
        .platforms-head .type-eyebrow {
          color: #d98038;
        }
        .platforms-title {
          margin: 1rem auto 0;
          max-width: 16ch;
          font-family: var(--font-heading);
          font-size: clamp(3rem, 7vw, 6.6rem);
          line-height: 0.88;
          font-weight: 900;
          letter-spacing: -0.05em;
          text-transform: none;
          color: #1c1c1c;
          text-wrap: balance;
        }
        .platforms-intro {
          max-width: 52ch;
          color: #1c1c1c;
          margin: 0 auto;
        }
        @media (max-width: 980px) {
          .platforms-head {
            grid-template-columns: 1fr;
          }
          .platforms-title {
            max-width: 14ch;
            font-size: clamp(2.6rem, 12vw, 4.8rem);
          }
          .platforms-intro {
            max-width: 54ch;
          }
          .ip-row {
            grid-template-columns: 1fr !important;
          }
          .platform-art {
            min-height: clamp(250px, 74vw, 440px) !important;
          }
          .platform-copy-card {
            padding: 1.4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
