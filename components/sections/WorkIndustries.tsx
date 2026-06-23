"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/components/lib/projects";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import { IndustryIcon } from "@/components/graphics/BrandIcons";
import { TextRoll } from "@/components/core/text-roll";
import { projectGalleryImages } from "@/lib/work-gallery";

const assets: Record<string, { logo?: string; image?: string }> = {
  "national-minorities-day": { logo: "/logos/executive-office-president.png", image: "/photos/projects/national-minorities-day.jpg" },
  "africa-urban-forum-2026": { logo: "/logos/executive-office-president.png", image: "/photos/projects/cultural-dancers.jpg" },
  "utamaduni-day": { logo: "/logos/state-dept-culture.png", image: "/photos/projects/utamaduni-day.jpg" },
  "lc-waikiki-africa": { logo: "/logos/lc-waikiki.png", image: "/photos/projects/lc-waikiki-influencer.jpg" },
  "kansai-plascon": { logo: undefined, image: "/photos/projects/kansai-gor-mahia.jpg" },
  "thrive-hospitality-group": { logo: "/logos/thrive-hospitality.png", image: "/photos/projects/cosmo-market.jpg" },
  "africa-forum-on-displacements": { logo: "/logos/unhcr.png", image: "/photos/projects/africa-forum-displacement.jpg" },
  "columbia-africa-healthcare": { logo: "/logos/columbia-africa.png", image: "/photos/projects/columbia-building.jpg" },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/* Image slideshow — cycles through gallery images every 3.5s */
function CardSlideshow({ slug, fallback, color }: { slug: string; fallback?: string; color?: string }) {
  const gallery = projectGalleryImages[slug];
  const images = gallery && gallery.length > 0
    ? gallery.map(img => img.src)
    : fallback ? [fallback] : [];

  const [idx, setIdx] = useState(0);
  const [errored, setErrored] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (images.length <= 1) return;
    const iv = setInterval(() => {
      setIdx(prev => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(iv);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div style={{ position: "absolute", inset: 0, background: color ?? "#260000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "2rem", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
          FID
        </span>
      </div>
    );
  }

  const validIdx = errored.has(idx) ? images.findIndex((_, i) => !errored.has(i)) : idx;
  const src = images[validIdx < 0 ? 0 : validIdx];

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={idx}
        src={src}
        alt=""
        loading="lazy"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1.04 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        onError={() => setErrored(prev => new Set(prev).add(idx))}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
      />
    </AnimatePresence>
  );
}

/* Slide progress dots */
function SlideDots({ slug, idx }: { slug: string; idx: number }) {
  const gallery = projectGalleryImages[slug];
  if (!gallery || gallery.length <= 1) return null;
  const count = Math.min(gallery.length, 8);
  return (
    <div style={{ display: "flex", gap: "4px", position: "absolute", bottom: "0.85rem", left: "1.1rem", zIndex: 3 }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ width: i === idx % count ? "18px" : "5px", height: "3px", borderRadius: "2px", background: i === idx % count ? "#d98038" : "rgba(255,255,255,0.4)", transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s" }} />
      ))}
    </div>
  );
}

function MosaicCard({ p, index, variant }: { p: Project; index: number; variant: "lg" | "sm" }) {
  const a = assets[p.slug] ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const spring = { type: "spring", stiffness: 200, damping: 26, mass: 0.6 } as const;

  const gallery = projectGalleryImages[p.slug];
  const imgCount = gallery?.length ?? 0;

  useEffect(() => {
    if (imgCount <= 1) return;
    const iv = setInterval(() => setSlideIdx(prev => (prev + 1) % imgCount), 3500);
    return () => clearInterval(iv);
  }, [imgCount]);

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
        className="work-mosaic-link"
        style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "14px", cursor: "pointer" }}
      >
        {/* Background color */}
        <div style={{ position: "absolute", inset: 0, background: p.color ?? "#260000" }} />

        {/* Slideshow */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <CardSlideshow slug={p.slug} fallback={a.image} color={p.color} />
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

        {a.logo && (
          <div style={{ position: "absolute", top: "1rem", left: "1.1rem", zIndex: 2, backgroundColor: "rgba(245,242,236,0.92)", padding: "0.4rem 0.6rem", height: "34px", display: "flex", alignItems: "center", borderRadius: "7px", backdropFilter: "blur(6px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "96px", objectFit: "contain" }} />
          </div>
        )}

        {/* Slide progress dots */}
        <SlideDots slug={p.slug} idx={slideIdx} />

        {/* Caption panel */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, padding: variant === "lg" ? "clamp(1.3rem,2.2vw,2rem)" : "1.1rem 1.2rem", paddingBottom: imgCount > 1 ? "2.2rem" : undefined, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d98038", fontWeight: 600 }}>
            <IndustryIcon sector={p.sector} size={15} strokeWidth={1.6} />
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
            <span
              className="work-mosaic-cta"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#f5f2ec", fontWeight: 700, marginTop: "0.2rem" }}
            >
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
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "0.8rem", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", color: "#1c1c1c", lineHeight: 1 }}
            >
              <TextRoll style={{ color: "#1c1c1c" }}>Stories shaped by culture, institutions and public attention.</TextRoll>
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

        {/* Mosaic grid */}
        <div className="work-mosaic">
          {projects.map((p, index) => (
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
