"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import Tilt from "@/components/motion/Tilt";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import { InstitutionsGraphic } from "@/components/graphics/AbstractGraphics";
import VariableProximity from "@/components/ui/VariableProximity";

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

const sectorOrder = [
  "Government & Public Institutions",
  "Retail & Fashion",
  "Manufacturing & Corporate Brands",
  "Hospitality, Lifestyle & Destination Brands",
  "Healthcare & Medical Institutions",
  "Social Impact & Multilateral Partnerships",
  "Sports & Tourism",
];

const shortLabel: Record<string, string> = {
  "Government & Public Institutions": "Government",
  "Retail & Fashion": "Retail & Fashion",
  "Manufacturing & Corporate Brands": "Manufacturing",
  "Hospitality, Lifestyle & Destination Brands": "Hospitality",
  "Healthcare & Medical Institutions": "Healthcare",
  "Social Impact & Multilateral Partnerships": "Social Impact",
  "Sports & Tourism": "Sports & Tourism",
};

function FeaturedProject({ p }: { p: Project }) {
  const a = assets[p.slug] ?? {};

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: "clamp(2.4rem, 5vw, 4rem)" }}
    >
      <Link
        href={`/work/${p.slug}`}
        className="work-card work-featured"
        data-cursor="View"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.95fr",
          gap: "clamp(1.4rem, 3vw, 2.8rem)",
          alignItems: "center",
          textDecoration: "none",
          background: "rgba(247,236,196,0.28)",
          border: "1px solid rgba(26,26,26,0.06)",
          padding: "clamp(1rem, 2vw, 1.35rem)",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
        }}
      >
        <Tilt
          className="work-card-media"
          style={{
            position: "relative",
            aspectRatio: "16/10",
            overflow: "hidden",
            backgroundColor: "#ece7df",
            borderRadius: "10px",
          }}
        >
          {a.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={a.image}
              alt={p.client}
              loading="lazy"
              className="work-card-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: p.color ?? "#2a0508",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading,'Oswald')",
                  fontWeight: 600,
                  fontSize: "3rem",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                }}
              >
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
                backgroundColor: "rgba(247,236,196,0.88)",
                padding: "0.45rem 0.7rem",
                height: "40px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid rgba(91,14,20,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "120px", objectFit: "contain" }} />
            </div>
          )}
          <span
            style={{
              position: "absolute",
              bottom: "0.7rem",
              right: "0.9rem",
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontWeight: 700,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            01
          </span>
          <span aria-hidden className="wc-frame" />
          <span aria-hidden className="wc-corner wc-tl" />
          <span aria-hidden className="wc-corner wc-tr" />
          <span aria-hidden className="wc-corner wc-bl" />
          <span aria-hidden className="wc-corner wc-br" />
        </Tilt>

        <div className="work-featured-body" style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.66rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#5B0E14",
              marginBottom: "0.35rem",
            }}
          >
            <span style={{ width: "20px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
            Featured - {shortLabel[p.sector] ?? p.sector}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.5)" }}>
            {p.years}
          </p>
          <h3
            className="work-card-title"
            style={{
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3.2vw, 2.8rem)",
              color: "#1a1a1a",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {p.client}
          </h3>
          <p style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(1rem,1.5vw,1.25rem)", color: "#5B0E14", lineHeight: 1.25 }}>
            {p.title}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(26,26,26,0.62)", maxWidth: "46ch" }}>
            {p.impact}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              fontWeight: 500,
              marginTop: "0.4rem",
            }}
            className="work-featured-cta"
          >
            Read the story
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function StoryRow({ p, index }: { p: Project; index: number }) {
  const a = assets[p.slug] ?? {};
  const reverse = index % 2 === 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/work/${p.slug}`}
        className="work-card work-story"
        data-cursor="View"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "clamp(1.4rem, 3vw, 2.5rem)",
          alignItems: "center",
          textDecoration: "none",
          padding: "clamp(1rem, 2vw, 1.2rem)",
          borderRadius: "12px",
          border: "1px solid rgba(26,26,26,0.06)",
          background: "rgba(247,236,196,0.18)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ order: reverse ? 2 : 1, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.66rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#5B0E14",
              marginBottom: "0.15rem",
            }}
          >
            <span style={{ width: "18px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
            {shortLabel[p.sector] ?? p.sector} - {p.years}
          </p>
          <h3
            className="work-card-title"
            style={{
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontWeight: 700,
              fontSize: "clamp(1.35rem, 2.2vw, 1.95rem)",
              color: "#1a1a1a",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {p.client}
          </h3>
          <p style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(1rem,1.4vw,1.15rem)", color: "#5B0E14", lineHeight: 1.25 }}>
            {p.title}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(26,26,26,0.62)", maxWidth: "44ch" }}>
            {p.impact}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              fontWeight: 500,
              marginTop: "0.2rem",
            }}
            className="work-featured-cta"
          >
            Read the story
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <Tilt
          className="work-card-media"
          style={{
            position: "relative",
            order: reverse ? 1 : 2,
            aspectRatio: "16/10",
            overflow: "hidden",
            backgroundColor: "#ece7df",
            borderRadius: "10px",
          }}
        >
          {a.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={a.image}
              alt={p.client}
              loading="lazy"
              className="work-card-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: p.color ?? "#2a0508",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading,'Oswald')",
                  fontWeight: 600,
                  fontSize: "2rem",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                }}
              >
                {p.client.split(" ")[0]}
              </span>
            </div>
          )}
          {a.logo && (
            <div
              style={{
                position: "absolute",
                top: "0.8rem",
                left: "0.8rem",
                backgroundColor: "rgba(247,236,196,0.88)",
                padding: "0.45rem 0.7rem",
                height: "38px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid rgba(91,14,20,0.08)",
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
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontWeight: 700,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {String(index + 2).padStart(2, "0")}
          </span>
          <span aria-hidden className="wc-frame" />
          <span aria-hidden className="wc-corner wc-tl" />
          <span aria-hidden className="wc-corner wc-tr" />
          <span aria-hidden className="wc-corner wc-bl" />
          <span aria-hidden className="wc-corner wc-br" />
        </Tilt>
      </Link>
    </motion.div>
  );
}

export default function WorkIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string>("All");

  const tabs = useMemo(() => {
    const present = sectorOrder.filter((s) => projects.some((p) => p.sector === s));
    return ["All", ...present];
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.sector === active)),
    [active]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section
      id="work"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f7ecc4",
        paddingTop: "clamp(5.5rem,12vw,11rem)",
        paddingBottom: "clamp(5.5rem,12vw,11rem)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "clamp(3rem,7vw,6rem)",
          right: "-7%",
          width: "min(42vw, 520px)",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="work-deco-graphic"
      >
        <InstitutionsGraphic />
      </div>

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
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "clamp(1.4rem,2.5vw,1.8rem)",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
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
                color: "#5B0E14",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
              Our work - by industry
            </motion.span>

            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading,'Oswald')",
                fontWeight: 600,
                fontSize: "clamp(2.2rem,5vw,4rem)",
                color: "#1a1a1a",
                marginTop: "0.8rem",
                lineHeight: 1,
              }}
            >
              <VariableProximity
                label="Work across 10+ industries."
                containerRef={ref as import("react").MutableRefObject<HTMLElement | null>}
                radius={120}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 500, 'opsz' 16"
                toFontVariationSettings="'wght' 900, 'opsz' 42"
                style={{
                  fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  fontSize: "clamp(2.2rem,5vw,4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem,1.4vw,1.12rem)",
                lineHeight: 1.6,
                color: "rgba(26,26,26,0.6)",
                marginTop: "1.1rem",
                maxWidth: "60ch",
              }}
            >
              From national moments to brand launches - strategic communication that moves audiences and shapes perception across Africa.
            </motion.p>
          </div>

          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.74rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.6)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#5B0E14")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.6)")}
          >
            All case studies
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            borderBottom: "1px solid rgba(26,26,26,0.1)",
            paddingBottom: "1.6rem",
            marginBottom: "clamp(2.5rem,5vw,3.8rem)",
            marginTop: "clamp(1.6rem,3vw,2.4rem)",
          }}
        >
          {tabs.map((t) => {
            const on = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.74rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  padding: "0.55rem 1.1rem",
                  borderRadius: "999px",
                  cursor: "pointer",
                  border: `1px solid ${on ? "#5B0E14" : "rgba(26,26,26,0.18)"}`,
                  backgroundColor: on ? "#5B0E14" : "transparent",
                  color: on ? "#fff" : "rgba(26,26,26,0.7)",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {t === "All" ? "All work" : shortLabel[t] ?? t}
              </button>
            );
          })}
        </motion.div>

        <div style={{ minHeight: "200px" }}>
          <AnimatePresence mode="popLayout">
            {featured && <FeaturedProject key={`feat-${featured.slug}`} p={featured} />}
          </AnimatePresence>

          {rest.length > 0 && (
            <motion.div layout className="work-grid" style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.5vw, 1.5rem)" }}>
              <AnimatePresence mode="popLayout">
                {rest.map((p, i) => (
                  <StoryRow key={p.slug} p={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <AfricanFootprint />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-deco-graphic { opacity: 0.2 !important; width: 60vw !important; right: -20% !important; }
        }
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card:hover .work-card-title { color: #5B0E14 !important; }
        .work-featured:hover .work-featured-cta { color: #5B0E14 !important; }
        .work-story:hover .work-card-img { transform: scale(1.05); }
        .work-story:hover .work-card-title { color: #5B0E14 !important; }

        .wc-frame { position: absolute; inset: 0; z-index: 4; pointer-events: none; opacity: 0;
          padding: 2px; border-radius: 2px;
          background: conic-gradient(from var(--wc-a, 0deg), transparent 0 55%, #F1E194 70%, #5B0E14 85%, transparent 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          transition: opacity 0.45s ease; }
        .work-card:hover .wc-frame { opacity: 1; animation: wc-spin 2.8s linear infinite; }
        @keyframes wc-spin { to { --wc-a: 360deg; } }

        .wc-corner { position: absolute; width: 10px; height: 10px; z-index: 5; pointer-events: none;
          border-color: #F1E194; opacity: 0; transition: opacity 0.35s ease, width 0.35s ease, height 0.35s ease; }
        .work-card:hover .wc-corner { opacity: 1; width: 18px; height: 18px; }
        .wc-tl { top: 7px; left: 7px; border-top: 2px solid; border-left: 2px solid; }
        .wc-tr { top: 7px; right: 7px; border-top: 2px solid; border-right: 2px solid; }
        .wc-bl { bottom: 7px; left: 7px; border-bottom: 2px solid; border-left: 2px solid; }
        .wc-br { bottom: 7px; right: 7px; border-bottom: 2px solid; border-right: 2px solid; }

        @media (max-width: 900px) {
          .work-featured { grid-template-columns: 1fr !important; gap: 1.6rem !important; }
          .work-featured .work-card-media { aspect-ratio: 16/10 !important; }
          .work-story { grid-template-columns: 1fr !important; }
          .work-story > .work-card-media { order: 1 !important; }
          .work-story > div { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}
