"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { pressArticles } from "@/components/lib/articles";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PressLinks — "In the press" coverage for work/platform pages, shown as a grid
 * of preview cards (thumbnail + source + headline), each linking out to the
 * original article, video or social post.
 */
export default function PressLinks({
  campaigns,
  tone = "light",
}: {
  campaigns: string[];
  tone?: "light" | "dark";
}) {
  const items = pressArticles.filter((a) => campaigns.includes(a.campaignSlug));
  if (!items.length) return null;

  const dark = tone === "dark";
  const ink = dark ? "#f5f2ec" : "#1c1c1c";
  const dim = dark ? "rgba(245,242,236,0.6)" : "rgba(28,28,28,0.55)";
  const rule = dark ? "rgba(245,242,236,0.14)" : "rgba(38,0,0,0.1)";
  const cardBg = dark ? "rgba(245,242,236,0.04)" : "#ffffff";
  const cardBorder = dark ? "rgba(245,242,236,0.12)" : "rgba(38,0,0,0.08)";

  const groups = [...new Set(items.map((a) => a.campaign))];

  return (
    <section aria-label="Press coverage" className="section-shell" style={{ paddingTop: "clamp(2.5rem,5vw,4rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", borderTop: `1px solid ${rule}`, paddingTop: "1.6rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,2.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: ink, margin: 0 }}
        >
          In the press
        </motion.h2>
        <Link href="/articles" style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#750006", textDecoration: "none", borderBottom: "1px solid #750006", paddingBottom: "0.2rem" }}>
          All articles →
        </Link>
      </div>

      {groups.map((g) => {
        const rows = items.filter((a) => a.campaign === g);
        return (
          <div key={g} style={{ marginTop: "clamp(1.6rem,3vw,2.4rem)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: "0 0 1rem" }}>
              {g} · {rows.length} {rows.length === 1 ? "story" : "stories"}
            </p>
            <div className="press-grid">
              {rows.map((a, i) => (
                <motion.a
                  key={a.url}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.05, ease: EASE }}
                  style={{ display: "flex", flexDirection: "column", background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "14px", overflow: "hidden", textDecoration: "none" }}
                >
                  <div className="press-thumb" style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#260000" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: "0.6rem", left: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#260000", background: "rgba(245,242,236,0.92)", padding: "0.3rem 0.6rem", borderRadius: "999px" }}>
                      {a.source}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.9rem 1rem 1.1rem" }}>
                    <span className="press-title" style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.4, color: ink, fontWeight: 500 }}>
                      {a.title}
                    </span>
                    <ArrowUpRight size={15} weight="bold" color="#750006" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        .press-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.9rem, 1.6vw, 1.4rem);
        }
        .press-card { transition: transform 0.28s ease, box-shadow 0.28s ease; }
        .press-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(38,0,0,0.16); }
        .press-card .press-thumb img { transition: transform 0.5s ease; }
        .press-card:hover .press-thumb img { transform: scale(1.06); }
        .press-card .press-title { transition: color 0.25s; }
        .press-card:hover .press-title { color: #750006; }
        @media (max-width: 900px) { .press-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .press-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
