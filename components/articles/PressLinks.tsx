"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { pressArticles } from "@/components/lib/articles";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PressLinks — compact "In the press" list for work/platform pages.
 * Renders the coverage belonging to the given campaign slugs, grouped by
 * campaign, each row linking out to the original article.
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
  const dim = dark ? "rgba(245,242,236,0.55)" : "rgba(28,28,28,0.55)";
  const rule = dark ? "rgba(245,242,236,0.14)" : "rgba(38,0,0,0.1)";

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
          All coverage
        </Link>
      </div>

      {groups.map((g) => {
        const rows = items.filter((a) => a.campaign === g);
        return (
          <div key={g} style={{ marginTop: "clamp(1.6rem,3vw,2.4rem)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: "0 0 0.8rem" }}>
              {g} · {rows.length} {rows.length === 1 ? "story" : "stories"}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {rows.map((a, i) => (
                <motion.li
                  key={a.url}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: EASE }}
                  style={{ borderBottom: `1px solid ${rule}` }}
                >
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-row"
                    style={{ display: "flex", alignItems: "baseline", gap: "1rem", padding: "0.85rem 0", textDecoration: "none" }}
                  >
                    <span style={{ flexShrink: 0, width: "110px", fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: dim, fontWeight: 700 }}>
                      {a.source}
                    </span>
                    <span className="press-title" style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-body)", fontSize: "clamp(0.88rem,1.1vw,0.98rem)", lineHeight: 1.5, color: ink, fontWeight: 500 }}>
                      {a.title}
                    </span>
                    <ArrowUpRight size={14} weight="bold" color="#750006" style={{ flexShrink: 0, transform: "translateY(2px)" }} />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}

      <style>{`
        .press-row .press-title { transition: color 0.25s; }
        .press-row:hover .press-title { color: #750006 !important; }
        @media (max-width: 640px) {
          .press-row { flex-wrap: wrap; }
          .press-row > span:first-child { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
