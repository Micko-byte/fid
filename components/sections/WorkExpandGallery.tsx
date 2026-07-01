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
  { slug: "kansai-plascon", client: "Kansai Plascon", sector: "Corporate", label: "Gor Mahia partnership launch", image: cl("kansai-01"), logo: "/logos/chloride-exide.png" },
  { slug: "lc-waikiki-africa", client: "LC Waikiki", sector: "Corporate", label: "Retail brand communications", image: STOCK.corporate?.[0]?.src ?? "", logo: "/logos/lc-waikiki.png" },
  { slug: "thrive-hospitality-group", client: "Chaii Republic", sector: "Hospitality", label: "Brand launch experience", image: "/photos/projects/thrive-hospitality/glam-01.jpg", logo: "/logos/thrive-hospitality.png" },
  { slug: "columbia-africa-healthcare", client: "Columbia Africa", sector: "Healthcare", label: "Healthcare brand & outreach", image: STOCK.about?.[0]?.src ?? "", logo: "/logos/columbia-africa.png" },
  { slug: "allso-beauty", client: "Allso Beauty", sector: "Lifestyle", label: "Campaign & influencer strategy", image: cl("allso-01"), logo: "/logos/abyan-salon-spa.png" },
  { slug: "national-minorities-day", client: "State Dept. of Culture", sector: "Government", label: "National observance activation", image: STOCK.government?.[0]?.src ?? "", logo: "/logos/state-dept-culture.png" },
];

const FILTERS = ["All", "Government", "Corporate", "Hospitality", "Healthcare", "Lifestyle"];

export default function WorkExpandGallery() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? ITEMS : ITEMS.filter((i) => i.sector === filter);

  return (
    <section
      id="work"
      data-nav-dark
      aria-label="Selected work showcase"
      style={{ background: "#260000", padding: "clamp(5rem, 10vw, 8rem) 0", overflow: "hidden", position: "relative" }}
    >
      <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />

      {/* Header */}
      <div className="section-shell" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: EASE }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 0.94, letterSpacing: "-0.025em", color: "#f5f2ec", margin: 0 }}
        >
          Selected <em style={{ fontStyle: "italic", color: "#d98038" }}>Work.</em>
        </motion.h2>
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
                <Link href={`/work/${item.slug}`} className="work-card" style={{ display: "block", position: "relative", aspectRatio: "4/5", borderRadius: "14px", overflow: "hidden", textDecoration: "none", background: "#1c1c1c" }}>
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

                  {/* logo */}
                  {item.logo && (
                    <img src={item.logo} alt={`${item.client} logo`} loading="lazy" style={{ position: "absolute", top: "1rem", left: "1rem", height: "26px", maxWidth: "92px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.9, zIndex: 2 }} />
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
