"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";

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

// Sector display order
const sectorOrder = [
  "Government & Public Institutions",
  "Retail & Fashion",
  "Manufacturing & Corporate Brands",
  "Hospitality, Lifestyle & Destination Brands",
  "Healthcare & Medical Institutions",
  "Social Impact & Multilateral Partnerships",
  "Sports & Tourism",
];

function groupBySector(items: Project[]) {
  const map = new Map<string, Project[]>();
  for (const p of items) {
    if (!map.has(p.sector)) map.set(p.sector, []);
    map.get(p.sector)!.push(p);
  }
  // ordered
  const ordered: Array<{ sector: string; items: Project[] }> = [];
  for (const s of sectorOrder) if (map.has(s)) ordered.push({ sector: s, items: map.get(s)! });
  for (const [s, v] of map) if (!sectorOrder.includes(s)) ordered.push({ sector: s, items: v });
  return ordered;
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const a = assets[p.slug] ?? {};
  return (
    <Link
      href={`/work/${p.slug}`}
      className="work-card"
      style={{ display: "block", textDecoration: "none", position: "relative" }}
    >
      {/* Image */}
      <div
        className="work-card-media"
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          backgroundColor: "#ece7df",
          marginBottom: "1.1rem",
        }}
      >
        {a.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={a.image}
            alt={p.client}
            loading="lazy"
            className="work-card-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, backgroundColor: p.color ?? "#260000", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "2rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>{p.client.split(" ")[0]}</span>
          </div>
        )}

        {/* White logo chip */}
        {a.logo && (
          <div style={{ position: "absolute", top: "0.8rem", left: "0.8rem", backgroundColor: "#fff", padding: "0.5rem 0.7rem", height: "38px", display: "flex", alignItems: "center", borderRadius: "2px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "110px", objectFit: "contain" }} />
          </div>
        )}

        {/* Number */}
        <span style={{ position: "absolute", bottom: "0.7rem", right: "0.9rem", fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "1rem", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Caption */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", marginBottom: "0.4rem" }}>
        {p.years}
      </p>
      <h3 className="work-card-title" style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.1rem,1.6vw,1.4rem)", color: "#1a1a1a", lineHeight: 1.12, letterSpacing: "-0.01em", textTransform: "uppercase", transition: "color 0.3s" }}>
        {p.client}
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(26,26,26,0.55)", marginTop: "0.5rem", maxWidth: "40ch" }}>
        {p.title}
      </p>
    </Link>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const grouped = groupBySector(projects);
  let runningIndex = 0;

  return (
    <section id="work" style={{ backgroundColor: "#FAF8F3", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
            >
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
              Selected work · by sector
            </motion.span>
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.2rem,5vw,4rem)", color: "#1a1a1a", marginTop: "0.8rem", lineHeight: 1 }}
            >
              Our Work
            </motion.h2>
          </div>

          <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,26,0.6)", fontWeight: 500, whiteSpace: "nowrap", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.6)")}
          >
            All case studies
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>

        {/* Sector groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem,6vw,5rem)" }}>
          {grouped.map((group, gi) => (
            <motion.div
              key={group.sector}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Sector label */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid rgba(26,26,26,0.13)", paddingTop: "1rem", marginBottom: "1.8rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1rem,1.5vw,1.25rem)", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  {group.sector}
                </h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(26,26,26,0.4)" }}>
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              {/* Cards */}
              <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1.5rem,3vw,2.5rem)" }}>
                {group.items.map((p) => {
                  const idx = runningIndex++;
                  return <ProjectCard key={p.slug} p={p} index={idx} />;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card:hover .work-card-title { color: #750006 !important; }
        @media (max-width: 900px) { .work-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .work-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
