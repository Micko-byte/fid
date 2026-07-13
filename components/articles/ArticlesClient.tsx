"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import Footer from "@/components/Footer";
import { pressArticles, CAMPAIGNS, type PressArticle } from "@/components/lib/articles";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Featured story — the strongest national-press piece leads the page */
const FEATURED_URL = "https://www.standardmedia.co.ke/business/enterprise/article/2001528799/chaii-republic-unveils-cultural-tea-hub-in-nairobi";

function ArticleCard({ a, i }: { a: PressArticle; i: number }) {
  return (
    <motion.a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pa-card"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: EASE }}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div className="pa-media" style={{ position: "relative", overflow: "hidden", borderRadius: "4px", aspectRatio: "16 / 10", background: "#e7ddcd" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt={a.title} loading="lazy" referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <span className="pa-read">
          Read at {a.source} <ArrowUpRight size={13} weight="bold" />
        </span>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#750006", fontWeight: 700, margin: "1rem 0 0" }}>
        {a.source} · {a.campaign}
      </p>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem,1.6vw,1.4rem)", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#1c1c1c", margin: "0.5rem 0 0", fontWeight: 700 }}>
        {a.title}
      </h3>
    </motion.a>
  );
}

export default function ArticlesClient() {
  const [filter, setFilter] = useState<string>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const featured = pressArticles.find((a) => a.url === FEATURED_URL) ?? pressArticles[0];
  const rest = pressArticles.filter((a) => a !== featured);
  const shown = filter === "all" ? rest : rest.filter((a) => a.campaignSlug === filter);

  return (
    <main style={{ background: "#f5f2ec", color: "#1c1c1c", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section className="section-shell" style={{ paddingTop: "clamp(7rem,15vh,10rem)", paddingBottom: "clamp(2rem,4vw,3rem)" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", fontWeight: 700, margin: 0 }}
        >
          In the press
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.6rem,6.5vw,5.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "1rem 0 0", maxWidth: "16ch" }}
        >
          The work, as the press told it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "rgba(28,28,28,0.66)", maxWidth: "52ch", margin: "1.3rem 0 0" }}
        >
          {pressArticles.length}+ stories across Kenyan and regional media — launches,
          reopenings and cultural platforms delivered by FID &amp; Co.
        </motion.p>
      </section>

      {/* ── Featured story, meyers-style split ── */}
      <section className="section-shell" style={{ paddingBottom: "clamp(3rem,6vw,5rem)" }}>
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pa-card pa-featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(1.5rem,4vw,3.5rem)", alignItems: "center", textDecoration: "none", color: "inherit", background: "#fbfaf8", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(38,0,0,0.06)" }}
        >
          <div className="pa-media" style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 10", background: "#e7ddcd" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.image} alt={featured.title} referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "clamp(1.5rem,3vw,2.5rem)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#750006", fontWeight: 700, margin: 0 }}>
              Featured · {featured.source}
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,2.8vw,2.4rem)", lineHeight: 1.12, letterSpacing: "-0.01em", margin: "1rem 0 0", fontWeight: 800 }}>
              {featured.title}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(28,28,28,0.62)", margin: "1rem 0 0" }}>
              {featured.campaign} — one of {pressArticles.length} placements secured across national and lifestyle press.
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#750006", borderBottom: "1px solid #750006", paddingBottom: "0.25rem" }}>
              Read the article <ArrowUpRight size={14} weight="bold" />
            </span>
          </div>
        </motion.a>
      </section>

      {/* ── Campaign filters ── */}
      <section className="section-shell" style={{ paddingBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(28,28,28,0.5)", fontWeight: 700, margin: "0 0 1rem", borderTop: "1px solid rgba(38,0,0,0.1)", paddingTop: "1.4rem" }}>
          What we&apos;re in the news for
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {[{ slug: "all", name: "All coverage" }, ...CAMPAIGNS].map((c) => {
            const on = filter === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setFilter(c.slug)}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.03em",
                  padding: "0.55rem 1.15rem", borderRadius: "999px", cursor: "pointer",
                  border: on ? "1px solid #750006" : "1px solid rgba(38,0,0,0.18)",
                  background: on ? "#750006" : "transparent",
                  color: on ? "#f5f2ec" : "rgba(28,28,28,0.7)",
                  transition: "background 0.25s, color 0.25s, border-color 0.25s",
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Article grid ── */}
      <section className="section-shell" style={{ paddingBottom: "clamp(4rem,8vw,6rem)" }}>
        <motion.div ref={gridRef} layout className="pa-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(1.6rem,3vw,2.6rem) clamp(1.2rem,2vw,1.8rem)" }}>
          <AnimatePresence mode="popLayout">
            {shown.map((a, i) => (
              <motion.div key={a.url} layout exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease: EASE }}>
                <ArticleCard a={a} i={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram trail */}
        <div style={{ marginTop: "clamp(3rem,6vw,4.5rem)", borderTop: "1px solid rgba(38,0,0,0.1)", paddingTop: "1.6rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(28,28,28,0.6)", margin: 0 }}>
            More coverage, reels and behind-the-scenes on Instagram.
          </p>
          <a
            href="https://instagram.com/fidpr/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f5f2ec", background: "#750006", padding: "0.8rem 1.4rem", borderRadius: "999px", textDecoration: "none" }}
          >
            <InstagramLogo size={17} weight="fill" /> @fidpr
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        .pa-media img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease; filter: saturate(0.96); }
        .pa-card:hover .pa-media img { transform: scale(1.06); filter: saturate(1.05); }
        .pa-media { transition: box-shadow 0.45s ease; }
        .pa-card:hover .pa-media { box-shadow: 0 24px 60px rgba(38,0,0,0.18); }
        .pa-read {
          position: absolute; left: 0.9rem; bottom: 0.8rem; z-index: 2;
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: var(--font-body); font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase; color: #f5f2ec;
          background: rgba(13,5,5,0.62); border-radius: 999px; padding: 0.45rem 0.85rem;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .pa-card:hover .pa-read { opacity: 1; transform: translateY(0); }
        @media (max-width: 980px) {
          .pa-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .pa-featured { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .pa-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pa-media img, .pa-read { transition: none; }
        }
      `}</style>
    </main>
  );
}
