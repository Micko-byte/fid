"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/components/lib/projects";
import Tilt from "@/components/motion/Tilt";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import { IndustryIcon } from "@/components/graphics/BrandIcons";
import { TextRoll } from "@/components/core/text-roll";

const assets: Record<string, { logo?: string; image?: string }> = {
  "national-minorities-day": { logo: "/logos/executive-office-president.png", image: "/photos/projects/national-minorities-day.jpg" },
  "africa-urban-forum-2026": { logo: "/logos/executive-office-president.png", image: "/photos/projects/cultural-dancers.jpg" },
  "utamaduni-day": { logo: "/logos/state-dept-culture.png", image: "/photos/projects/utamaduni-day.jpg" },
  "lc-waikiki-africa": { logo: "/logos/lc-waikiki.png", image: "/photos/projects/lc-waikiki-influencer.jpg" },
  "kansai-plascon": { logo: undefined, image: "/photos/projects/kansai-gor-mahia.jpg" },
  "thrive-hospitality-group": { logo: "/logos/thrive-hospitality.png", image: "/photos/projects/cosmo-market.jpg" },
  "africa-forum-on-displacements": { logo: "/logos/unhcr.png", image: "/photos/projects/africa-forum-displacement.jpg" },
  "columbia-africa-healthcare": { logo: "/logos/columbia-africa.png", image: "/photos/projects/columbia-building.jpg" },
  "wrc-safari-rally": { logo: "/logos/wrc-safari-rally.png", image: "/photos/projects/healthcare-storytelling.jpg" },
};

const storyOrder = [
  "national-minorities-day",
  "lc-waikiki-africa",
  "thrive-hospitality-group",
  "columbia-africa-healthcare",
  "wrc-safari-rally",
];

const storyLeads = storyOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean) as Project[];

function StoryChapter({ p, index }: { p: Project; index: number }) {
  const a = assets[p.slug] ?? {};
  const reversed = index % 2 === 1;
  const note =
    index === 0
      ? "A national moment framed with accuracy and scale."
      : index === 1
        ? "Culture translated into a public-facing visual language."
        : index === 2
          ? "Multi-market brand storytelling with consistency across audiences."
          : index === 3
            ? "Distinct launches with distinct atmospheres."
            : "Regional and multilateral messaging with clarity.";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)",
        gap: "clamp(1.4rem, 3vw, 3rem)",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(1.4rem, 2.6vw, 2.2rem)",
        borderRadius: "16px",
        border: "1px solid rgba(28,28,28,0.06)",
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
      }}
      className="work-chapter"
    >
      {/* Giant watermark chapter number */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-0.3em",
          [reversed ? "left" : "right"]: "0.2em",
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: "clamp(7rem, 16vw, 14rem)",
          lineHeight: 0.8,
          color: "rgba(117,0,6,0.06)",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* Accent bar that grows on hover */}
      <span aria-hidden="true" className="work-chapter-accent" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "#750006", transform: "scaleY(0)", transformOrigin: "top", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", zIndex: 1 }} />

      <div style={{ order: reversed ? 2 : 1, position: "relative", zIndex: 2 }}>
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.64rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#750006",
            marginBottom: "0.8rem",
          }}
        >
          <span style={{ display: "inline-flex", color: "#750006" }}>
            <IndustryIcon sector={p.sector} size={18} strokeWidth={1.5} />
          </span>
          Chapter {String(index + 1).padStart(2, "0")} - {p.sector}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: "clamp(1.45rem, 2.5vw, 2.3rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#1c1c1c",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          {p.client}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.22,
            color: "#750006",
            marginTop: "0.85rem",
            maxWidth: "22ch",
          }}
        >
          {p.title}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            lineHeight: 1.7,
            color: "#1c1c1c",
            maxWidth: "48ch",
            marginTop: "1rem",
          }}
        >
          {p.impact}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            lineHeight: 1.6,
            color: "#1c1c1c",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            marginTop: "1.2rem",
            maxWidth: "36ch",
          }}
        >
          {note}
        </p>

        <Link
          href={`/work/${p.slug}`}
          data-cursor="View"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#1c1c1c",
            textDecoration: "none",
            marginTop: "1.4rem",
            fontWeight: 600,
          }}
        >
          Read the story
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <Tilt
        className="work-chapter-media"
        style={{
          position: "relative",
          order: reversed ? 1 : 2,
          aspectRatio: "16/10",
          overflow: "hidden",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(117,0,6,0.08), rgba(217,128,56,0.16))",
        }}
      >
        {a.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={a.image}
            alt={p.client}
            loading="lazy"
            className="work-card-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)", mixBlendMode: "multiply" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, backgroundColor: p.color ?? "#260000", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "2rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
              {p.client.split(" ")[0]}
            </span>
          </div>
        )}

        {a.logo && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              backgroundColor: "rgba(255,255,255,0.88)",
              padding: "0.45rem 0.7rem",
              height: "38px",
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              border: "1px solid rgba(117,0,6,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "110px", objectFit: "contain" }} />
          </div>
        )}

        <span
          style={{
            position: "absolute",
            bottom: "0.7rem",
            right: "0.9rem",
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: "1rem",
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </Tilt>
    </motion.article>
  );
}

/**
 * Image-forward mosaic card — the de-gallery treatment. Varied column spans and
 * vertical offsets (set via CSS classes) break the uniform-tile "gallery" feel
 * and give the Atra-style staggered, mixed-size composition.
 */
const cardReveal = {
  // Visible-by-default (opacity stays 1) — a subtle rise/scale settle that can
  // never hide content, even if the scroll-reveal never fires. Demo-safe.
  hidden: { opacity: 1, scale: 0.98, y: 18, filter: "blur(0px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
};

function MosaicCard({ p, index, variant }: { p: Project; index: number; variant: "lg" | "sm" }) {
  const a = assets[p.slug] ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const spring = { type: "spring", stiffness: 200, damping: 26, mass: 0.6 } as const;

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`work-mosaic-card work-mosaic-${variant}`}
      style={{ position: "relative" }}
    >
      <div
        data-cursor="View"
        onClick={() => setIsOpen((v) => !v)}
        className="work-mosaic-link"
        style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "14px", cursor: "pointer" }}
      >
        <div style={{ position: "absolute", inset: 0, background: p.color ?? "#260000" }} />
        {a.image && (
          <motion.img
            src={a.image}
            alt={p.client}
            loading="lazy"
            animate={{ scale: isOpen ? 1.1 : 1, filter: isOpen ? "blur(3px)" : "blur(0px)" }}
            transition={spring}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
          />
        )}
        {/* readable gradient scrim */}
        <motion.div aria-hidden="true" animate={{ opacity: isOpen ? 0.95 : 1 }} style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(117,0,6,0) 28%, rgba(38,0,0,0.9) 100%)" }} />

        {/* index marker */}
        <span style={{ position: "absolute", top: "1rem", right: "1.1rem", fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: variant === "lg" ? "1.4rem" : "1.05rem", color: "rgba(255,255,255,0.55)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {a.logo && (
          <div style={{ position: "absolute", top: "1rem", left: "1.1rem", backgroundColor: "rgba(255,255,255,0.9)", padding: "0.4rem 0.6rem", height: "34px", display: "flex", alignItems: "center", borderRadius: "7px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "96px", objectFit: "contain" }} />
          </div>
        )}

        {/* caption / disclosure panel */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: variant === "lg" ? "clamp(1.3rem,2.2vw,2rem)" : "1.1rem 1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d98038" }}>
            <IndustryIcon sector={p.sector} size={15} strokeWidth={1.6} />
            {p.sector}
          </span>
          <p style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: variant === "lg" ? "clamp(1.6rem,2.6vw,2.5rem)" : "clamp(1.1rem,1.6vw,1.4rem)", maxWidth: "18ch", textTransform: "uppercase", color: "#f5f2ec", lineHeight: 1.1 }}>{p.client}</p>

          {/* disclosure content — reveals on click */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="disclosure"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ margin: "0.4rem 0 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.55, color: "rgba(255,255,255,0.82)", maxWidth: "46ch" }}>
                  {p.impact}
                </p>
                <Link href={`/work/${p.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#260000", background: "#d98038", padding: "0.6rem 1.1rem", borderRadius: "999px", textDecoration: "none" }}>
                  Read the story
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <span className="work-mosaic-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 600, marginTop: "0.2rem" }}>
              Tap to explore
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const lead = storyLeads[0] ?? projects[0];
  // Show ALL remaining projects in the mosaic so the full body of work is visible.
  const rest = projects.filter((p) => p.slug !== lead.slug);

  const leadFacts = useMemo(
    () => [
      "National launches",
      "Regional storytelling",
      "Multi-market campaigns",
      "Cultural and institutional work",
    ],
    []
  );

  if (!lead) return null;

  return (
    <section
      id="work"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f5f2ec",
        paddingTop: "clamp(5.5rem,12vw,11rem)",
        paddingBottom: "clamp(5.5rem,12vw,11rem)",
      }}
    >
      {/* Warm amber glow bottom-left, red glow top-right */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 55% at 0% 100%, rgba(217,128,56,0.12) 0%, transparent 60%), radial-gradient(ellipse 35% 40% at 100% 0%, rgba(117,0,6,0.07) 0%, transparent 55%)" }} />
      <div aria-hidden className="brand-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.45 }} />

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem,5vw,6rem)",
          paddingRight: "clamp(1.5rem,5vw,6rem)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.8rem" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
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
              Our work
            </motion.span>

            <motion.h2
              data-skew
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "0.8rem",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2.4rem,5.5vw,4.4rem)",
                color: "#1c1c1c",
                lineHeight: 1,
              }}
            >
              <TextRoll style={{ color: "#1c1c1c" }}>Stories shaped by culture, institutions and public attention.</TextRoll>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                marginTop: "1rem",
                maxWidth: "60ch",
                marginLeft: "auto",
                marginRight: "auto",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem,1.35vw,1.1rem)",
                lineHeight: 1.65,
                color: "#1c1c1c",
              }}
            >
              Communication is not a gallery of assets. It is a sequence of public moments, each with a purpose, an audience and a point of view. These selected projects show how FID & Co. moves from national observation to cultural platform building, and from brand launches to sustained reputation work.
            </motion.p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.7rem",
              justifyContent: "center",
            }}
          >
            {leadFacts.map((fact) => (
              <div
                key={fact}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1c1c1c",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(117,0,6,0.12)",
                  background: "rgba(255,255,255,0.55)",
                }}
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "left",
            height: "1px",
            background: "rgba(28,28,28,0.1)",
            marginTop: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        />

        {/* All work — asymmetric mosaic of disclosure cards, staggered reveal */}
        <div className="work-mosaic">
          {[lead, ...rest].map((p, index) => (
            <MosaicCard
              key={p.slug}
              p={p}
              index={index}
              variant={index % 4 === 0 || index % 4 === 3 ? "lg" : "sm"}
            />
          ))}
        </div>

        <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <AfricanFootprint />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-deco-graphic { opacity: 0.18 !important; width: 60vw !important; right: -20% !important; }
          .work-chapter { grid-template-columns: 1fr !important; }
          .work-chapter-media { order: 1 !important; aspect-ratio: 16/9 !important; }
          .work-chapter > div { order: 2 !important; }
        }
        .work-chapter { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease; }
        .work-chapter:hover { transform: translateY(-6px); box-shadow: 0 30px 70px rgba(117,0,6,0.14); background: rgba(255,255,255,0.5); }
        .work-chapter:hover .work-card-img { transform: scale(1.06); }
        .work-chapter:hover h3 { color: #750006 !important; }
        .work-chapter:hover .work-chapter-accent { transform: scaleY(1); }

        /* Asymmetric work mosaic — mixed sizes + vertical stagger so it reads as
           an editorial composition, not a uniform gallery grid. */
        .work-mosaic {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: clamp(1rem, 2vw, 1.6rem);
          margin-top: clamp(1.4rem, 3vw, 2.4rem);
          align-items: start;
        }
        .work-mosaic-lg { min-height: clamp(380px, 40vw, 560px); }
        .work-mosaic-sm { min-height: clamp(300px, 30vw, 440px); }
        .work-mosaic-card:nth-child(4n+1) { grid-column: span 7; }
        .work-mosaic-card:nth-child(4n+2) { grid-column: span 5; margin-top: clamp(2.5rem, 5vw, 4.5rem); }
        .work-mosaic-card:nth-child(4n+3) { grid-column: span 5; }
        .work-mosaic-card:nth-child(4n+4) { grid-column: span 7; margin-top: clamp(2.5rem, 5vw, 4.5rem); }
        .work-mosaic-link { box-shadow: 0 18px 50px rgba(117,0,6,0.12); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease; }
        .work-mosaic-link:hover { transform: translateY(-6px); box-shadow: 0 34px 80px rgba(117,0,6,0.22); }
        .work-mosaic-link:hover .work-mosaic-img { transform: scale(1.07); }
        .work-mosaic-link:hover .work-mosaic-cta { color: #d98038; }
        @media (max-width: 900px) {
          .work-mosaic { grid-template-columns: 1fr; }
          .work-mosaic-card:nth-child(n) { grid-column: 1 / -1; margin-top: 0; }
          .work-mosaic-lg, .work-mosaic-sm { min-height: 320px; }
        }
      `}</style>
    </section>
  );
}
