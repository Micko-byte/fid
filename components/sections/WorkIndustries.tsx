"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/components/lib/projects";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import { IndustryIcon } from "@/components/graphics/BrandIcons";
import { projectGalleryImages } from "@/lib/work-gallery";

const assets: Record<string, { logo?: string; image?: string }> = {
  "national-minorities-day":      { logo: "/logos/executive-office-president.png" },
  "africa-urban-forum-2026":      { logo: "/logos/executive-office-president.png" },
  "utamaduni-day":                { logo: "/logos/state-dept-culture.png" },
  "lc-waikiki-africa":            { logo: "/logos/lc-waikiki.png" },
  "kansai-plascon":               { },
  "thrive-hospitality-group":     { logo: "/logos/thrive-hospitality.png" },
  "africa-forum-on-displacements":{ logo: "/logos/unhcr.png" },
  "columbia-africa-healthcare":   { logo: "/logos/columbia-africa.png" },
};

const cardReveal = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1    },
};

/* ── Branded empty-state card for projects without photos ── */
function BrandedCard({ color, client, sector }: { color?: string; client: string; sector: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: color ?? "#260000", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.2rem,2.5vw,2rem)" }}>
      {/* Top: large monogram */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(3rem,5vw,6rem)", lineHeight: 1, color: "rgba(255,255,255,0.07)", letterSpacing: "-0.04em", userSelect: "none" }}>
          FID
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: "0.4rem" }}>
          {sector.split("&")[0].trim()}
        </span>
      </div>
      {/* Centre pattern: grid of small dots */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />
      {/* Bottom: client short name */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.1rem,2vw,1.6rem)", color: "rgba(255,255,255,0.18)", textTransform: "uppercase", lineHeight: 1.1 }}>
          {client}
        </span>
      </div>
    </div>
  );
}

/* ── Hover image swap: CSS-only transition, zero JS animation overhead ── */
function CardImage({ slug, color, client, sector, hovered }: {
  slug: string; color?: string; client: string; sector: string; hovered: boolean;
}) {
  const gallery = projectGalleryImages[slug] ?? [];
  const images  = gallery.map(img => img.src);

  if (images.length === 0) {
    return <BrandedCard color={color} client={client} sector={sector} />;
  }

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={images[0]} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
      {images[1] && (
        <img src={images[1]} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", opacity: hovered ? 1 : 0, transition: "opacity 0.45s ease" }} />
      )}
    </div>
  );
}

function MosaicCard({ p, index, variant }: { p: Project; index: number; variant: "lg" | "sm" }) {
  const a = assets[p.slug] ?? {};
  const [isOpen, setIsOpen]   = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`work-mosaic-card work-mosaic-${variant}`}
      style={{ position: "relative" }}
    >
      <div
        data-cursor="View"
        onClick={() => setIsOpen(v => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="work-mosaic-link"
        style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "14px", cursor: "pointer" }}
      >
        {/* Background colour */}
        <div style={{ position: "absolute", inset: 0, background: p.color ?? "#260000" }} />

        {/* Hover image swap */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <CardImage slug={p.slug} color={p.color} client={p.client} sector={p.sector} hovered={hovered} />
        </div>

        {/* Gradient scrim */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isOpen ? 0.97 : 1 }}
          style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(38,0,0,0.15) 0%, rgba(38,0,0,0) 35%, rgba(38,0,0,0.88) 100%)", zIndex: 1 }}
        />

        {/* Index marker */}
        <span style={{ position: "absolute", top: "1rem", right: "1.1rem", zIndex: 2, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: variant === "lg" ? "1.4rem" : "1.05rem", color: "rgba(255,255,255,0.6)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Logo — directly on canvas, no white pill */}
        {a.logo && (
          <div style={{ position: "absolute", top: "1rem", left: "1.1rem", zIndex: 2, height: "28px", display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.logo}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "88px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.82 }}
            />
          </div>
        )}

        {/* Caption panel */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, padding: variant === "lg" ? "clamp(1.3rem,2.2vw,2rem)" : "1.1rem 1.2rem", paddingBottom: "2.4rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d98038", fontWeight: 600 }}>
            <IndustryIcon sector={p.sector} size={20} strokeWidth={1.6} />
            {p.sector}
          </span>
          <p style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: variant === "lg" ? "clamp(1.6rem,2.6vw,2.5rem)" : "clamp(1.1rem,1.6vw,1.4rem)", maxWidth: "18ch", textTransform: "uppercase", color: "#f5f2ec", lineHeight: 1.05 }}>
            {p.client}
          </p>

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
                <p style={{ margin: "0.4rem 0 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.55, color: "#f5f2ec", maxWidth: "46ch", fontWeight: 500 }}>
                  {p.impact}
                </p>
                <Link href={`/work/${p.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#260000", background: "#d98038", padding: "0.6rem 1.1rem", borderRadius: "999px", textDecoration: "none" }}>
                  Read the story
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <span className="work-mosaic-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#f5f2ec", fontWeight: 700, marginTop: "0.2rem" }}>
              Tap to explore →
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

  const leadFacts = useMemo(() => [
    "National launches",
    "Regional storytelling",
    "Multi-market campaigns",
    "Cultural and institutional work",
  ], []);

  return (
    <section
      id="work"
      className="section-light"
      style={{ position: "relative", overflow: "hidden", backgroundColor: "#f5f2ec", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 55% at 0% 100%, rgba(217,128,56,0.12) 0%, transparent 60%), radial-gradient(ellipse 35% 40% at 100% 0%, rgba(117,0,6,0.07) 0%, transparent 55%)" }} />
      <div aria-hidden className="brand-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.45 }} />

      <div ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.8rem" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
            >
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
              Our work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "0.8rem", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", color: "#1c1c1c", lineHeight: 1, maxWidth: "22ch", marginLeft: "auto", marginRight: "auto", textWrap: "balance" } as React.CSSProperties}
            >
              Stories shaped by culture, institutions and public attention.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              style={{ marginTop: "1rem", maxWidth: "60ch", marginLeft: "auto", marginRight: "auto", fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.35vw,1.1rem)", lineHeight: 1.65, color: "#1c1c1c", fontWeight: 500 }}
            >
              Communication is not a gallery of assets. It is a sequence of public moments, each with a purpose, an audience and a point of view.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", justifyContent: "center" }}
          >
            {leadFacts.map((fact, i) => (
              <motion.div
                key={fact}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.06 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#1c1c1c", fontWeight: 600, padding: "0.6rem 0.9rem", borderRadius: "999px", border: "1px solid rgba(117,0,6,0.18)", background: "rgba(245,242,236,0.7)" }}
              >
                {fact}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ transformOrigin: "left", height: "1px", background: "rgba(28,28,28,0.14)", marginTop: "clamp(2rem,5vw,3.5rem)", marginBottom: "clamp(2rem,5vw,4rem)" }}
        />

        {/* Mosaic grid — only show projects that have real photos */}
        <div className="work-mosaic">
          {projects.filter(p => (projectGalleryImages[p.slug] ?? []).length > 0).map((p, index) => (
            <MosaicCard key={p.slug} p={p} index={index} variant={index % 4 === 0 || index % 4 === 3 ? "lg" : "sm"} />
          ))}
        </div>

        <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
          <AfricanFootprint />
        </div>
      </div>

      <style>{`
        .work-mosaic {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: clamp(1rem, 2vw, 1.6rem);
          margin-top: clamp(1.4rem, 3vw, 2.4rem);
          align-items: start;
        }
        .work-mosaic-lg { min-height: clamp(400px, 44vw, 600px); }
        .work-mosaic-sm { min-height: clamp(320px, 32vw, 460px); }
        .work-mosaic-card:nth-child(4n+1) { grid-column: span 7; }
        .work-mosaic-card:nth-child(4n+2) { grid-column: span 5; margin-top: clamp(2.5rem, 5vw, 4.5rem); }
        .work-mosaic-card:nth-child(4n+3) { grid-column: span 5; }
        .work-mosaic-card:nth-child(4n+4) { grid-column: span 7; margin-top: clamp(2.5rem, 5vw, 4.5rem); }
        .work-mosaic-link { box-shadow: 0 20px 60px rgba(38,0,0,0.18); transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease; }
        .work-mosaic-link:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 40px 90px rgba(38,0,0,0.28); }
        .work-mosaic-link:hover .work-mosaic-cta { color: #d98038 !important; }
        @media (max-width: 900px) {
          .work-mosaic { grid-template-columns: 1fr; }
          .work-mosaic-card:nth-child(n) { grid-column: 1 / -1; margin-top: 0; }
          .work-mosaic-lg, .work-mosaic-sm { min-height: 340px; }
        }
      `}</style>
    </section>
  );
}
