"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { STOCK } from "@/lib/stock-photos";

const EASE = [0.16, 1, 0.3, 1] as const;

const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_900/FID/${id}`;

type Item = {
  slug: string; client: string; sector: string; label: string;
  image: string; logo?: string;
};

const ITEMS: Item[] = [
  { slug: "africa-urban-forum-2026", client: "Africa Urban Forum", sector: "Government", label: "Continental convening — 2026", image: cl("auf-01"), logo: "/logos/executive-office-president.png" },
  { slug: "africa-forum-on-displacements", client: "UNHCR", sector: "Government", label: "Africa Forum on Displacements", image: STOCK.pressConf?.[0]?.src ?? "", logo: "/logos/unhcr.png" },
  { slug: "kansai-plascon", client: "Kansai Plascon", sector: "Corporate", label: "Gor Mahia partnership launch", image: cl("kansai-01") },
  { slug: "lc-waikiki-africa", client: "LC Waikiki", sector: "Corporate", label: "Retail brand communications", image: STOCK.corporate?.[0]?.src ?? "", logo: "/logos/lc-waikiki.png" },
  { slug: "thrive-hospitality-group", client: "Chaii Republic", sector: "Hospitality", label: "Brand launch experience", image: "/photos/projects/thrive-hospitality/glam-01.jpg", logo: "/logos/thrive-hospitality.png" },
  { slug: "columbia-africa-healthcare", client: "Columbia Africa", sector: "Healthcare", label: "Healthcare brand & outreach", image: STOCK.about?.[0]?.src ?? "", logo: "/logos/columbia-africa.png" },
  { slug: "allso-beauty", client: "Allso Beauty", sector: "Lifestyle", label: "Campaign & influencer strategy", image: cl("allso-01") },
  { slug: "national-minorities-day", client: "State Dept. of Culture", sector: "Government", label: "National observance activation", image: STOCK.government?.[0]?.src ?? "", logo: "/logos/state-dept-culture.png" },
  // Owned IPs / platforms
  { slug: "the-tribe-vibe", client: "The Tribe Vibe", sector: "Owned IPs", label: "Lifestyle · music · culture platform", image: "/photos/projects/tribe-vibe.jpg" },
  { slug: "suhba-series", client: "Suhba Series", sector: "Owned IPs", label: "Curated conversation platform", image: STOCK.strategy?.[0]?.src ?? "" },
  { slug: "the-capital-room", client: "The Capital Room", sector: "Owned IPs", label: "Leadership & business platform", image: "/photos/editorial/podcast-set.jpg" },
];

const OWNED = new Set(["the-tribe-vibe", "suhba-series", "the-capital-room"]);
const hrefFor = (slug: string) => (OWNED.has(slug) ? `/platforms/${slug}` : `/work/${slug}`);

const FILTERS = ["All", "Government", "Corporate", "Hospitality", "Healthcare", "Lifestyle", "Owned IPs"];

const CLIENT_LOGOS = [
  "executive-office-president", "state-dept-culture", "unhcr", "lc-waikiki",
  "wrc-safari-rally", "columbia-africa", "thrive-hospitality", "bomas-of-kenya",
  "amahoro-coalition", "elysium-capital", "2nu-kollexion", "medigah-london-hair",
];

export default function WorkExpandGallery() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? ITEMS : ITEMS.filter((i) => i.sector === filter);

  return (
    <section
      id="work"
      data-nav-dark
      aria-label="Selected work showcase"
      style={{ background: "#750006", padding: "clamp(5rem, 10vw, 8rem) 0", overflow: "hidden", position: "relative" }}
    >
      {/* Ambient glow — matches the "Our Expertise" section's treatment */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 50% at 50% 30%, rgba(217,128,56,0.20) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 60%, rgba(117,0,6,0.35) 0%, transparent 72%)" }} />
      <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.8 }} />

      {/* Header — Trusted by / Proof (combined with the work) */}
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

        {/* Client logo strip — the "trusted by" proof.
            Logos are opaque flattened PNGs (no transparency), so a white-filter
            trick just paints a solid box; give them a light chip instead. */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(0.8rem,1.6vw,1.2rem)", marginTop: "clamp(2rem,4vw,3rem)", paddingTop: "clamp(1.6rem,3vw,2.2rem)", borderTop: "1px solid rgba(245,242,236,0.14)" }}>
          {CLIENT_LOGOS.map((name) => (
            <span
              key={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "48px",
                padding: "0 0.35rem",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#f5f2ec",
                flexShrink: 0,
              }}
            >
              <img
                src={`/logos/${name}.png`}
                alt={name.replace(/-/g, " ")}
                loading="lazy"
                style={{
                  height: "48px",
                  width: "auto",
                  maxWidth: "160px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="section-shell" style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em",
                padding: "0.55rem 1.2rem", borderRadius: "999px", cursor: "pointer",
                border: active ? "1px solid #d98038" : "1px solid rgba(245,242,236,0.22)",
                background: active ? "#d98038" : "transparent",
                color: active ? "#260000" : "rgba(245,242,236,0.7)",
                transition: "background 0.25s, color 0.25s, border-color 0.25s",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        <motion.div layout className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(1rem, 2vw, 1.5rem)" }}>
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Link href={hrefFor(item.slug)} className="work-card" style={{ display: "block", position: "relative", aspectRatio: "4/5", borderRadius: "14px", overflow: "hidden", textDecoration: "none", background: "#1c1c1c" }}>
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
                  {/* brand duotone grade + bottom scrim */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.15) 0%, rgba(38,0,0,0) 30%, rgba(38,0,0,0.9) 100%)", pointerEvents: "none" }} />
                  <div className="work-card-tint" style={{ position: "absolute", inset: 0, background: "rgba(117,0,6,0.22)", mixBlendMode: "multiply", pointerEvents: "none", opacity: 0, transition: "opacity 0.4s ease" }} />

                  {/* logo — opaque (non-transparent) PNG, so it needs a light chip
                      rather than a white-filter, or it renders as a blank box */}
                  {item.logo && (
                    <div style={{ position: "absolute", top: "0.9rem", left: "0.9rem", zIndex: 2, display: "inline-flex", alignItems: "center", padding: "0.5rem 0.7rem", borderRadius: "10px", background: "#f5f2ec" }}>
                      <img src={item.logo} alt={`${item.client} logo`} loading="lazy" style={{ height: "22px", maxWidth: "88px", objectFit: "contain" }} />
                    </div>
                  )}

                  {/* caption */}
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(1.1rem,2vw,1.5rem)", zIndex: 2 }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d98038", margin: "0 0 0.4rem" }}>{item.sector}</p>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.05, color: "#f5f2ec", margin: "0 0 0.25rem" }}>{item.client}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(245,242,236,0.6)", margin: 0, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      {item.label} <ArrowUpRight size={12} weight="bold" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .work-card-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); will-change: transform; }
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card:hover .work-card-tint { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
