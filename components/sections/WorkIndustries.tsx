"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import Tilt from "@/components/motion/Tilt";

// Map each project slug -> real client logo + project photo
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

// Industry filter order (only those with case studies shown as tabs)
const sectorOrder = [
  "Government & Public Institutions",
  "Retail & Fashion",
  "Manufacturing & Corporate Brands",
  "Hospitality, Lifestyle & Destination Brands",
  "Healthcare & Medical Institutions",
  "Social Impact & Multilateral Partnerships",
  "Sports & Tourism",
];

// Shorter labels for the filter chips
const shortLabel: Record<string, string> = {
  "Government & Public Institutions": "Government",
  "Retail & Fashion": "Retail & Fashion",
  "Manufacturing & Corporate Brands": "Manufacturing",
  "Hospitality, Lifestyle & Destination Brands": "Hospitality",
  "Healthcare & Medical Institutions": "Healthcare",
  "Social Impact & Multilateral Partnerships": "Social Impact",
  "Sports & Tourism": "Sports & Tourism",
};

const flags = [
  { name: "Kenya", code: "ke" },
  { name: "Uganda", code: "ug" },
  { name: "Rwanda", code: "rw" },
  { name: "Ethiopia", code: "et" },
  { name: "South Sudan", code: "ss" },
  { name: "Zambia", code: "zm" },
  { name: "Ghana", code: "gh" },
  { name: "Tanzania", code: "tz" },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const a = assets[p.slug] ?? {};
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${p.slug}`} className="work-card" data-cursor="View" style={{ display: "block", textDecoration: "none" }}>
        <Tilt className="work-card-media" style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#ece7df", marginBottom: "1.1rem" }}>
          {a.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={a.image} alt={p.client} loading="lazy" className="work-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, backgroundColor: p.color ?? "#2a0508", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "2rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>{p.client.split(" ")[0]}</span>
            </div>
          )}
          {a.logo && (
            <div style={{ position: "absolute", top: "0.8rem", left: "0.8rem", backgroundColor: "#fff", padding: "0.5rem 0.7rem", height: "38px", display: "flex", alignItems: "center", borderRadius: "2px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "110px", objectFit: "contain" }} />
            </div>
          )}
          <span style={{ position: "absolute", bottom: "0.7rem", right: "0.9rem", fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "1rem", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.4)", transform: "translateZ(30px)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </Tilt>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B0E14", marginBottom: "0.4rem" }}>
          {shortLabel[p.sector] ?? p.sector} · {p.years}
        </p>
        <h3 className="work-card-title" style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.1rem,1.6vw,1.4rem)", color: "#1a1a1a", lineHeight: 1.12, letterSpacing: "-0.01em", textTransform: "uppercase", transition: "color 0.3s" }}>
          {p.client}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(26,26,26,0.55)", marginTop: "0.5rem", maxWidth: "40ch" }}>
          {p.title}
        </p>
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

  return (
    <section id="work" style={{ backgroundColor: "#f7ecc4", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "clamp(1.8rem,3.5vw,2.5rem)" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14" }}
            >
              <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
              Our work · by industry
            </motion.span>
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.2rem,5vw,4rem)", color: "#1a1a1a", marginTop: "0.8rem", lineHeight: 1 }}
            >
              Work across 10+ industries.
            </motion.h2>
          </div>

          <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,26,0.6)", fontWeight: 500, whiteSpace: "nowrap", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#5B0E14")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.6)")}
          >
            All case studies
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>

        {/* Industry filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", borderBottom: "1px solid rgba(26,26,26,0.1)", paddingBottom: "1.6rem", marginBottom: "clamp(2rem,4vw,3rem)" }}
        >
          {tabs.map((t) => {
            const on = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 500,
                  letterSpacing: "0.04em",
                  padding: "0.55rem 1.1rem", borderRadius: "999px", cursor: "pointer",
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

        {/* Filtered grid */}
        <motion.div layout className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1.5rem,3vw,2.5rem)", minHeight: "200px" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* African footprint + flags */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "clamp(3rem,6vw,5rem)", backgroundColor: "#2a0508", borderLeft: "3px solid #F1E194", padding: "clamp(2rem,4vw,3.4rem)" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#F1E194" }}>
            <span style={{ width: "26px", height: "1px", background: "#F1E194", opacity: 0.7 }} />
            African footprint
          </span>
          <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, color: "#F5F2EC", fontSize: "clamp(1.5rem,3vw,2.3rem)", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "24ch", margin: "1rem 0 1.6rem" }}>
            8+ markets across East &amp; Southern Africa — and beyond.
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
            {flags.map((c) => (
              <span key={c.code} style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", border: "1px solid rgba(217,171,136,0.22)", padding: "0.45rem 0.85rem", borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(245,242,236,0.85)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://flagcdn.com/w40/${c.code}.png`} alt={`${c.name} flag`} width={22} height={15} loading="lazy" style={{ width: "22px", height: "15px", objectFit: "cover", borderRadius: "1px", flexShrink: 0 }} />
                {c.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card:hover .work-card-title { color: #5B0E14 !important; }
        @media (max-width: 900px) { .work-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .work-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
