"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { getWorkSectorMeta, getProjectsForWorkSector, type WorkSectorSlug } from "@/components/lib/work-sectors";
import { getProjectGallery } from "@/lib/work-gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

// The 11 sectors, in order, with a short pill label.
const SECTORS: { slug: WorkSectorSlug; short: string }[] = [
  { slug: "government", short: "Government" },
  { slug: "retail-fashion", short: "Retail" },
  { slug: "corporate", short: "Corporate" },
  { slug: "hospitality", short: "Hospitality" },
  { slug: "sports-tourism", short: "Sports" },
  { slug: "healthcare", short: "Healthcare" },
  { slug: "social-impact", short: "Social Impact" },
  { slug: "finance", short: "Finance" },
  { slug: "lifestyle", short: "Beauty" },
  { slug: "culture-entertainment", short: "Culture" },
  { slug: "owned-ips", short: "Owned IPs" },
];

function SectorCard({ slug, short, index }: { slug: WorkSectorSlug; short: string; index: number }) {
  const meta = getWorkSectorMeta(slug);
  const projects = getProjectsForWorkSector(slug);
  const flagship = projects[0];
  if (!meta) return null;

  // Collage — the flagship's gallery, else the sector cover.
  const gallery = flagship ? getProjectGallery(flagship).map((g) => g.src) : [];
  const images = (gallery.length ? gallery : [meta.cover]).slice(0, 3);

  const kicker = `${flagship?.years ?? "FID & Co."} · ${meta.title.toUpperCase()}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="wse-card"
    >
      {/* ── Left: the write-up ── */}
      <div className="wse-text">
        <p className="wse-kicker">{kicker}</p>
        <span className="wse-pill" style={{ borderColor: `${meta.accent}55`, color: meta.accent }}>{short}</span>

        <h2 className="wse-title">{flagship ? flagship.client : meta.title}</h2>
        {flagship?.title && <p className="wse-sub">{flagship.title}</p>}
        {flagship?.desc && <p className="wse-desc">{flagship.desc}</p>}
        {flagship?.scope?.length ? <p className="wse-meta">{flagship.scope.slice(0, 3).join(" · ")}</p> : null}

        <div className="wse-cta">
          {flagship && (
            <Link href={`/work?p=${flagship.slug}`} className="wse-btn wse-btn--solid">
              Open case study <ArrowUpRight size={15} weight="bold" />
            </Link>
          )}
          <Link href={`/work/${slug}`} className="wse-btn wse-btn--ghost">
            Open sector
          </Link>
        </div>
      </div>

      {/* ── Right: image collage ── */}
      <div className={`wse-collage wse-collage--${images.length}`}>
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src + i} src={src} alt="" loading="lazy" />
        ))}
      </div>
    </motion.article>
  );
}

export default function WorkSectorEditorial() {
  return (
    <section style={{ background: "#efe9df", padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem) clamp(4rem, 8vw, 7rem)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(1.4rem, 3vw, 2.2rem)" }}>
        {SECTORS.map((s, i) => (
          <SectorCard key={s.slug} slug={s.slug} short={s.short} index={i} />
        ))}
      </div>

      <style>{`
        .wse-card {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(1.2rem, 2.5vw, 2.4rem);
          align-items: center;
          background: #f5f2ec;
          border: 1px solid rgba(38,0,0,0.08);
          border-radius: 22px;
          padding: clamp(1.4rem, 3vw, 2.6rem);
          box-shadow: 0 20px 60px rgba(38,0,0,0.06);
        }
        .wse-text { min-width: 0; }
        .wse-kicker {
          font-family: var(--font-body); font-size: 0.66rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(28,28,28,0.55); font-weight: 700; margin: 0;
        }
        .wse-pill {
          display: inline-block; margin-top: 0.9rem; font-family: var(--font-body);
          font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700;
          border: 1px solid; border-radius: 999px; padding: 0.34rem 0.8rem;
        }
        .wse-title {
          font-family: var(--font-heading); font-weight: 600; font-size: clamp(1.8rem, 3.6vw, 3rem);
          line-height: 1.02; letter-spacing: -0.02em; text-transform: uppercase; color: #1c1c1c;
          margin: 1rem 0 0; max-width: 18ch;
        }
        .wse-sub {
          font-family: var(--font-body); font-size: 0.9rem; letter-spacing: 0.02em;
          color: rgba(28,28,28,0.55); margin: 0.7rem 0 0; text-transform: uppercase; font-weight: 600;
        }
        .wse-desc {
          font-family: var(--font-body); font-size: clamp(0.92rem, 1.2vw, 1.02rem); line-height: 1.65;
          color: rgba(28,28,28,0.72); margin: 1.1rem 0 0; max-width: 52ch;
        }
        .wse-meta {
          font-family: var(--font-body); font-size: 0.8rem; line-height: 1.5;
          color: rgba(28,28,28,0.5); margin: 1rem 0 0; max-width: 46ch;
        }
        .wse-cta { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.8rem; }
        .wse-btn {
          display: inline-flex; align-items: center; gap: 0.45rem; font-family: var(--font-body);
          font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
          padding: 0.85rem 1.4rem; border-radius: 999px; text-decoration: none; transition: transform 0.25s, background 0.25s;
        }
        .wse-btn:hover { transform: translateY(-2px); }
        .wse-btn--solid { background: #750006; color: #f5f2ec; }
        .wse-btn--solid:hover { background: #260000; }
        .wse-btn--ghost { background: transparent; color: #1c1c1c; border: 1px solid rgba(28,28,28,0.25); }
        .wse-btn--ghost:hover { border-color: #750006; color: #750006; }

        .wse-collage {
          display: grid; gap: 10px; height: clamp(260px, 30vw, 420px);
          grid-template-columns: 1.25fr 0.75fr; grid-template-rows: 1fr 1fr;
        }
        .wse-collage img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; display: block; }
        .wse-collage--3 img:nth-child(1) { grid-row: 1 / 3; }
        .wse-collage--2 { grid-template-columns: 1.25fr 0.75fr; grid-template-rows: 1fr; }
        .wse-collage--2 img:nth-child(1) { grid-row: 1; }
        .wse-collage--1 { grid-template-columns: 1fr; grid-template-rows: 1fr; }

        @media (max-width: 820px) {
          .wse-card { grid-template-columns: 1fr; }
          .wse-collage { order: -1; height: clamp(220px, 55vw, 320px); }
        }
      `}</style>
    </section>
  );
}
