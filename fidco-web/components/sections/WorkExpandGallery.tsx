"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, SealCheck } from "@phosphor-icons/react";
import { animate, stagger } from "animejs";
import { projects } from "@/components/lib/projects";
import { platforms } from "@/components/lib/platforms";
import { WORK_SECTORS, getWorkSectorSlugFromProject, type WorkSectorSlug } from "@/components/lib/work-sectors";
import { projectGalleryImages } from "@/lib/work-gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

// Short chip labels for the blurb categories.
const CHIP_LABEL: Record<WorkSectorSlug, string> = {
  government: "Government",
  "retail-fashion": "Retail & Fashion",
  corporate: "Corporate",
  hospitality: "Hospitality",
  "sports-tourism": "Sports & Tourism",
  healthcare: "Healthcare",
  "social-impact": "Social Impact",
  finance: "Finance",
  lifestyle: "Beauty & Lifestyle",
  "culture-entertainment": "Culture",
  "owned-ips": "Owned IPs",
};

const ACCENT: Record<string, string> = Object.fromEntries(WORK_SECTORS.map((s) => [s.slug, s.accent]));
const COVER: Record<string, string> = Object.fromEntries(WORK_SECTORS.map((s) => [s.slug, s.cover]));

function toSrc(src: string) {
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/${src.replace(/^public\//, "")}`;
}

type Tile = {
  slug: string;
  client: string;
  sectorSlug: WorkSectorSlug;
  label: string;
  image: string;
  logo?: string;
};

// Every client work from the blurb, derived from projects.ts.
const PROJECT_TILES: Tile[] = projects.map((p) => {
  const sectorSlug = getWorkSectorSlugFromProject(p);
  const gallery = projectGalleryImages[p.slug];
  return {
    slug: p.slug,
    client: p.client,
    sectorSlug,
    label: p.title,
    image: gallery?.[0]?.src ? toSrc(gallery[0].src) : COVER[sectorSlug],
    logo: p.logo,
  };
});

// Owned IPs from platforms.ts.
const PLATFORM_TILES: Tile[] = platforms.map((pl) => ({
  slug: pl.slug,
  client: pl.name,
  sectorSlug: "owned-ips" as WorkSectorSlug,
  label: pl.tagline,
  image: pl.image,
  logo: pl.slug === "suhba-series" ? "/logos/suhba-series.png" : undefined,
}));

const ALL_TILES: Tile[] = [...PROJECT_TILES, ...PLATFORM_TILES];

const CLIENT_LOGOS = [
  "executive-office-president", "state-dept-culture", "unhcr", "lc-waikiki",
  "kansai-plascon", "wrc-safari-rally", "columbia-africa", "thrive-hospitality",
  "bomas-of-kenya", "amahoro-coalition", "elysium-capital", "chloride-exide",
  "2nu-kollexion", "medigah-london-hair", "allso-beauty", "abyan-salon-spa",
];

export default function WorkExpandGallery() {
  const [filter, setFilter] = useState<"all" | WorkSectorSlug>("all");
  const shown = filter === "all" ? ALL_TILES : ALL_TILES.filter((t) => t.sectorSlug === filter);
  const gridRef = useRef<HTMLDivElement>(null);

  // anime.js — stagger the client logos in whenever the filter changes.
  useEffect(() => {
    const logos = gridRef.current?.querySelectorAll<HTMLElement>(".work-card-logo");
    if (!logos || !logos.length) return;
    animate(logos, {
      scale: [0.7, 1],
      opacity: [0, 1],
      rotate: [-6, 0],
      delay: stagger(60),
      duration: 620,
      ease: "out(3)",
    });
  }, [filter]);

  return (
    <section id="work" data-nav-dark aria-label="Our work" style={{ background: "#750006", position: "relative" }}>
      {/* ── Body ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "clamp(5rem, 10vw, 8rem) 0" }}>
        {/* Header */}
        <div className="section-shell" style={{ position: "relative", zIndex: 1, marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: EASE }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d98038", margin: "0 0 1rem" }}
          >
            Trusted by
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: EASE }}
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4.6vw, 4rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.025em", color: "#f5f2ec", margin: 0, maxWidth: "20ch" }}
          >
            Proof across public, private and cultural life.
          </motion.h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(245,242,236,0.55)", margin: "1rem 0 0", maxWidth: "48ch" }}>
            Select a sector to see the work — including our owned cultural platforms.
          </p>
        </div>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 50% at 50% 30%, rgba(217,128,56,0.20) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 60%, rgba(117,0,6,0.35) 0%, transparent 72%)" }} />
        <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.8 }} />

        {/* Client logo strip */}
        <div className="section-shell" style={{ position: "relative", zIndex: 1, marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(0.7rem,1.4vw,1rem)", paddingTop: "clamp(1.4rem,2.5vw,2rem)", borderTop: "1px solid rgba(245,242,236,0.14)" }}>
            {CLIENT_LOGOS.map((name) => (
              <span key={name} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "44px", padding: "0 0.8rem", borderRadius: "8px", background: "#f5f2ec" }}>
                <img src={`/logos/${name}.png`} alt={name.replace(/-/g, " ")} loading="lazy" style={{ height: "24px", maxWidth: "92px", objectFit: "contain" }} />
              </span>
            ))}
          </div>
        </div>

        {/* Category chips — the blurb's sectors */}
        <div className="section-shell" style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "0.55rem", marginBottom: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
          {(["all", ...WORK_SECTORS.map((s) => s.slug)] as ("all" | WorkSectorSlug)[]).map((slug) => {
            const active = slug === filter;
            const chip = slug === "all" ? "#d98038" : ACCENT[slug];
            return (
              <button
                key={slug}
                onClick={() => setFilter(slug)}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.04em",
                  padding: "0.5rem 1.1rem", borderRadius: "999px", cursor: "pointer",
                  border: active ? `1px solid ${chip}` : "1px solid rgba(245,242,236,0.22)",
                  background: active ? chip : "transparent",
                  color: active ? "#f5f2ec" : "rgba(245,242,236,0.7)",
                  transition: "background 0.25s, color 0.25s, border-color 0.25s",
                }}
              >
                {slug === "all" ? "All" : CHIP_LABEL[slug]}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="section-shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.div ref={gridRef} layout className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(1rem, 2vw, 1.5rem)" }}>
            <AnimatePresence mode="popLayout">
              {shown.map((item, i) => {
                const accent = ACCENT[item.sectorSlug];
                return (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="work-drift"
                    style={{ animationDelay: `${(i % 5) * -1.3}s` }}
                  >
                    <Link
                      href={`/work/${item.sectorSlug}`}
                      className="work-card"
                      style={{
                        display: "block",
                        position: "relative",
                        borderRadius: "20px",
                        overflow: "hidden",
                        textDecoration: "none",
                        border: "1px solid rgba(245,242,236,0.45)",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "0 26px 70px rgba(20,8,4,0.4)",
                      }}
                      onMouseEnter={(e) => {
                        const logo = e.currentTarget.querySelector(".work-card-logo");
                        if (logo) animate(logo, { scale: [1, 1.16], rotate: [0, -5], duration: 420, ease: "out(3)" });
                      }}
                      onMouseLeave={(e) => {
                        const logo = e.currentTarget.querySelector(".work-card-logo");
                        if (logo) animate(logo, { scale: 1, rotate: 0, duration: 420, ease: "out(3)" });
                      }}
                    >
                      {/* glass header — round logo badge + client handle + verified seal */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 0.9rem" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "999px", background: "#f5f2ec", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, border: `1.5px solid ${accent}` }}>
                          {item.logo ? (
                            <img className="work-card-logo" src={item.logo} alt={`${item.client} logo`} loading="lazy" style={{ width: "22px", height: "22px", objectFit: "contain", transformOrigin: "center" }} />
                          ) : (
                            <span className="work-card-logo" style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, color: accent, display: "inline-block" }}>
                              {item.client.replace(/^The /i, "").charAt(0)}
                            </span>
                          )}
                        </span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, color: "#f5f2ec", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>
                          {item.client}
                        </span>
                        <SealCheck size={14} weight="fill" color="#d98038" style={{ flexShrink: 0 }} />
                        <span style={{ marginLeft: "auto", flexShrink: 0, width: "8px", height: "8px", borderRadius: "999px", background: accent }} />
                      </div>

                      {/* inset image */}
                      <div style={{ position: "relative", margin: "0 8px 8px", borderRadius: "14px", overflow: "hidden", aspectRatio: "4 / 4.9", background: "#1c1c1c" }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.label}
                            loading="lazy"
                            decoding="async"
                            className="work-card-img"
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.92) contrast(1.04)" }}
                          />
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.12) 0%, rgba(38,0,0,0) 38%, rgba(28,14,8,0.92) 100%)", pointerEvents: "none" }} />
                        <div className="work-card-tint" style={{ position: "absolute", inset: 0, background: accent, mixBlendMode: "multiply", pointerEvents: "none", opacity: 0, transition: "opacity 0.4s ease" }} />

                        {/* sector tag */}
                        <span style={{ position: "absolute", top: "0.75rem", right: "0.85rem", zIndex: 2, fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.85)", fontWeight: 700 }}>
                          {CHIP_LABEL[item.sectorSlug]}
                        </span>

                        {/* caption */}
                        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "1rem 1.1rem 1.1rem", zIndex: 2 }}>
                          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.08, color: "#f5f2ec", margin: "0 0 0.3rem" }}>{item.client}</h3>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", lineHeight: 1.5, color: "rgba(245,242,236,0.68)", margin: 0, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                            {item.label} <ArrowUpRight size={12} weight="bold" color="#d98038" />
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        .work-card-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); will-change: transform; }
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card:hover .work-card-tint { opacity: 1 !important; }
        .work-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.4s ease; }
        .work-card:hover { transform: translateY(-6px); box-shadow: 0 36px 90px rgba(20,8,4,0.55); border-color: rgba(245,242,236,0.75); }
        /* slow perpetual float — the reel's drift, staggered per column */
        .work-drift { animation: work-float 6.5s ease-in-out infinite alternate; }
        @keyframes work-float {
          from { transform: translateY(-5px); }
          to { transform: translateY(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-drift { animation: none; }
        }
      `}</style>
    </section>
  );
}
