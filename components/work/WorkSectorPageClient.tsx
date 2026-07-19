"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Images } from "@phosphor-icons/react";
import Footer from "@/components/Footer";
import { getPlatformsForWorkSector, getProjectsForWorkSector, getWorkSectorMeta, type WorkSectorSlug } from "@/components/lib/work-sectors";
import { projectGalleryImages } from "@/lib/work-gallery";
import PressLinks from "@/components/articles/PressLinks";
import { STOCK } from "@/lib/stock-photos";

/* Projects with no photos of their own used to all fall back to meta.cover, so
   several panels in a sector showed the *same* picture as you scrolled (Luxury
   Body Spa and RukyBeau, for one). Each sector gets a pool of topic-appropriate
   stock so those panels can be filled with distinct images instead. */
const SECTOR_STOCK: Partial<Record<WorkSectorSlug, string[]>> = {
  lifestyle: (STOCK.beauty ?? []).map((s) => s.src),
  hospitality: (STOCK.hospitality ?? []).map((s) => s.src),
  government: (STOCK.government ?? []).map((s) => s.src),
  corporate: (STOCK.corporate ?? []).map((s) => s.src),
  finance: (STOCK.corporate ?? []).map((s) => s.src),
  "retail-fashion": (STOCK.digital ?? []).map((s) => s.src),
  healthcare: (STOCK.about ?? []).map((s) => s.src),
  "social-impact": (STOCK.pressConf ?? []).map((s) => s.src),
  "sports-tourism": (STOCK.experiential ?? []).map((s) => s.src),
  "culture-entertainment": (STOCK.experiential ?? []).map((s) => s.src),
  "owned-ips": (STOCK.experiential ?? []).map((s) => s.src),
};

/* Guarantee every panel in a sector shows a different image. */
function dedupeEntryImages(list: Entry[], sector: WorkSectorSlug): Entry[] {
  const pool = SECTOR_STOCK[sector] ?? [];
  const used = new Set<string>();
  let p = 0;
  return list.map((e) => {
    if (e.image && !used.has(e.image)) {
      used.add(e.image);
      return e;
    }
    while (p < pool.length && used.has(pool[p])) p += 1;
    const replacement = pool[p];
    if (!replacement) return e; // nothing left to swap in — keep as-is
    used.add(replacement);
    return { ...e, image: replacement };
  });
}

// Press campaigns that belong to each sector page.
// Thrive Hospitality venues — each gets its own panel with its own identity.
const cld = (id: string) => `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/${id}`;
const seq = (dir: string, prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/photos/projects/${dir}/${prefix}-${String(i + 1).padStart(2, "0")}.jpg`);

const GLAM_GALLERY = [...seq("glam-hotel", "glam-h", 8), cld("glam-rooftop-01")];
// Café NBO: the two venue interiors already on Cloudinary + the launch shoot.
const CAFENBO_GALLERY = [cld("cafenbo-01"), cld("cafenbo-02"), ...seq("cafe-nbo", "cafenbo-l", 8)];
// Kingfisher Nest: the Drive folder is The Perch launch — The Perch is its restaurant.
const KINGFISHER_GALLERY = [cld("kingfisher-01"), cld("kingfisher-02"), ...seq("kingfisher", "kingfisher-p", 8)];

const THRIVE_VENUES: Record<string, { logo?: string; logoDark?: boolean; image: string; inset?: string; gallery?: string[] }> = {
  "Café NBO": { logo: "/logos/cafe-nbo.png", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/cafenbo-01", inset: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/cafenbo-02", gallery: CAFENBO_GALLERY },
  "Glam Hotel – Westlands": { logo: "/logos/thrive-hospitality.png", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/glam-hotel", inset: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/glam-rooftop-01", gallery: GLAM_GALLERY },
  "Social 8": { logo: "/logos/social8.png", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/social8-01" },
  "Chaii Republic": { logo: "/logos/chaii-republic.png", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/chaii-02", inset: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/chaii-03" },
  "Kingfisher Nest Hotel": { logo: "/logos/kingfisher-nest.png", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/kingfisher-01", inset: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,w_1800,c_limit/FID/kingfisher-02", gallery: KINGFISHER_GALLERY },
};

const SECTOR_PRESS: Partial<Record<WorkSectorSlug, string[]>> = {
  hospitality: ["chaii-republic", "cafe-nbo", "glam-hotel", "the-perch"],
  "owned-ips": ["suhba-series"],
  lifestyle: ["allso-beauty"],
};

const EASE = [0.16, 1, 0.3, 1] as const;

function toSrc(src: string) {
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/${src.replace(/^public\//, "")}`;
}

function projectImages(slug: string) {
  return projectGalleryImages[slug] ?? [];
}

type Entry = {
  key: string;
  title: string;
  eyebrow: string;
  years?: string;
  body: string;
  bullets: string[];
  image: string;
  inset?: string;
  logo?: string;
  logoDark?: boolean;
  href?: string;
  gallery: string[];
};

/* Full-screen gallery lightbox — opened from a work's "View Gallery" button. */
function Lightbox({ images, title, start, onClose }: { images: string[]; title: string; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const prev = useCallback(() => setI((n) => (n - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setI((n) => (n + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
      onClick={onClose}
      className="lb-root"
      role="dialog" aria-modal="true" aria-label={`${title} gallery`}
    >
      {/* brand diamond lattice over the deep-current ground */}
      <div aria-hidden className="lb-pattern brand-pattern-light" />
      <div aria-hidden className="lb-glow" />

      {/* minimal chrome — just the close control */}
      <button onClick={onClose} aria-label="Close gallery" className="lb-close">
        <X size={17} weight="bold" />
      </button>

      {/* stage: the image carries the screen */}
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button onClick={prev} aria-label="Previous" className="lb-nav lb-nav-prev"><ArrowLeft size={19} weight="bold" /></button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          key={i} src={images[i]} alt={`${title} — image ${i + 1}`}
          initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: EASE }}
          className="lb-img"
        />
        {images.length > 1 && (
          <button onClick={next} aria-label="Next" className="lb-nav lb-nav-next"><ArrowRight size={19} weight="bold" /></button>
        )}
      </div>

      {/* caption rail pinned to the base, like an editorial plate */}
      <div className="lb-foot" onClick={(e) => e.stopPropagation()}>
        <div className="lb-meta">
          <span className="lb-title">{title}</span>
          <span className="lb-count">{String(i + 1).padStart(2, "0")} <em>/</em> {String(images.length).padStart(2, "0")}</span>
        </div>
        {images.length > 1 && (
          <div className="lb-thumbs">
            {images.map((src, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`View image ${idx + 1}`}
                className={`lb-thumb ${idx === i ? "lb-thumb-on" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .lb-root {
          position: fixed; inset: 0; z-index: 1000; display: flex; flex-direction: column;
          background: linear-gradient(160deg, #1a0000 0%, #260000 100%);
        }
        .lb-pattern { position: absolute; inset: 0; opacity: 0.55; pointer-events: none; }
        .lb-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 55% at 88% 10%, rgba(217,128,56,0.16) 0%, transparent 58%),
            radial-gradient(ellipse 45% 45% at 5% 95%, rgba(117,0,6,0.4) 0%, transparent 55%);
        }
        .lb-close {
          position: absolute; top: clamp(1rem,2.5vw,1.7rem); right: clamp(1rem,3vw,2.2rem); z-index: 3;
          width: 42px; height: 42px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(245,242,236,0.28); background: rgba(38,0,0,0.35);
          color: #f5f2ec; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); transition: background 0.25s, border-color 0.25s;
        }
        .lb-close:hover { background: #750006; border-color: #750006; }

        .lb-stage {
          position: relative; z-index: 2; flex: 1; min-height: 0;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(3.2rem,7vh,5rem) clamp(1rem,5vw,4.5rem) clamp(0.5rem,2vh,1rem);
        }
        .lb-img {
          max-width: 100%; max-height: 74vh; object-fit: contain;
          border-radius: 2px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,242,236,0.08);
        }
        .lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
          width: clamp(40px,4.5vw,50px); height: clamp(40px,4.5vw,50px); border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(245,242,236,0.22); background: rgba(38,0,0,0.3);
          color: #f5f2ec; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .lb-nav:hover { background: #750006; border-color: #750006; }
        .lb-nav-prev { left: clamp(0.5rem,2vw,1.6rem); }
        .lb-nav-next { right: clamp(0.5rem,2vw,1.6rem); }

        .lb-foot {
          position: relative; z-index: 2;
          padding: 0 clamp(1.2rem,5vw,4.5rem) clamp(1.2rem,3vh,2.2rem);
          display: flex; flex-direction: column; gap: clamp(0.7rem,1.6vh,1rem);
        }
        .lb-meta {
          display: flex; align-items: baseline; justify-content: space-between; gap: 1.5rem;
          border-top: 1px solid rgba(245,242,236,0.16); padding-top: clamp(0.7rem,1.6vh,1rem);
        }
        .lb-title {
          font-family: var(--font-heading); font-weight: 700;
          font-size: clamp(1rem,2vw,1.5rem); letter-spacing: -0.01em; color: #f5f2ec;
        }
        .lb-count {
          font-family: var(--font-body); font-size: 0.78rem; letter-spacing: 0.18em;
          color: rgba(245,242,236,0.6); font-weight: 700; white-space: nowrap;
        }
        .lb-count em { font-style: normal; color: #d98038; margin: 0 0.15em; }

        .lb-thumbs { display: flex; gap: 0.45rem; overflow-x: auto; padding-bottom: 2px; }
        .lb-thumbs::-webkit-scrollbar { height: 3px; }
        .lb-thumbs::-webkit-scrollbar-thumb { background: rgba(245,242,236,0.25); border-radius: 999px; }
        .lb-thumb {
          flex: 0 0 auto; width: 62px; height: 44px; border-radius: 2px; overflow: hidden;
          padding: 0; background: none; cursor: pointer; position: relative;
          border: none; box-shadow: inset 0 0 0 1px rgba(245,242,236,0.18);
          opacity: 0.42; transition: opacity 0.25s, box-shadow 0.25s;
        }
        .lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lb-thumb:hover { opacity: 0.8; }
        .lb-thumb-on { opacity: 1; box-shadow: inset 0 0 0 2px #d98038; }

        @media (max-width: 640px) {
          .lb-img { max-height: 62vh; }
          .lb-nav { display: none; }
        }
      `}</style>
    </motion.div>
  );
}

/* One scrolling editorial panel — reports itself active when centred */
function Panel({
  entry,
  i,
  accent,
  onActive,
  onOpenGallery,
}: {
  entry: Entry;
  i: number;
  accent: string;
  onActive: (i: number) => void;
  onOpenGallery: (images: string[], title: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });

  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  const logoBadge = entry.logo ? (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.6rem 0.9rem",
        borderRadius: "12px",
        background: entry.logoDark ? "#1c1c1c" : "#fff",
        border: "1px solid rgba(28,28,28,0.08)",
        marginTop: "1.6rem",
        boxShadow: "0 10px 30px rgba(38,0,0,0.07)",
      }}
    >
      <img src={entry.logo} alt={`${entry.title} logo`} loading="lazy" style={{ height: "30px", maxWidth: "120px", objectFit: "contain" }} />
    </span>
  ) : null;

  return (
    <div
      ref={ref}
      id={`wsp-panel-${entry.key}`}
      className="wsp-panel"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(4rem,10vh,7rem) clamp(1.5rem,4.5vw,4rem)",
        background: i % 2 ? "#efe8dc" : "#f5f2ec",
        position: "relative",
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.26em", color: "rgba(28,28,28,0.45)", fontWeight: 600 }}
      >
        ({String(i + 1).padStart(2, "0")})
      </motion.span>

      {/* mobile-only main image (the sticky pane hides on small screens) */}
      <img src={entry.image} alt={entry.title} loading="lazy" className="wsp-inline-img" style={{ display: "none", width: "100%", maxWidth: "460px", aspectRatio: "4/3", objectFit: "cover", borderRadius: "10px", margin: "1.4rem 0 0" }} />

      {entry.logo && entry.href ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <Link href={entry.href} aria-label={`Open ${entry.title}`} style={{ textDecoration: "none", display: "inline-block" }}>
            {logoBadge}
          </Link>
        </motion.div>
      ) : entry.logo ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {logoBadge}
        </motion.div>
      ) : null}

      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.9rem,3.6vw,3.2rem)", lineHeight: 1.04, letterSpacing: "-0.015em", color: "#1c1c1c", margin: "1.6rem 0 0", maxWidth: "18ch", textTransform: "uppercase" }}
      >
        {entry.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: accent, fontWeight: 700, margin: "1rem 0 0" }}
      >
        {entry.eyebrow}
        {entry.years ? ` · ${entry.years}` : ""}
      </motion.p>

      {entry.inset && (
        <motion.img
          src={entry.inset}
          alt=""
          loading="lazy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{ width: "min(240px, 52vw)", aspectRatio: "1/1", objectFit: "cover", borderRadius: "6px", marginTop: "1.8rem", boxShadow: "0 18px 50px rgba(38,0,0,0.14)" }}
        />
      )}

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
        style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(28,28,28,0.72)", maxWidth: "52ch", margin: "1.8rem 0 0" }}
      >
        {entry.body}
      </motion.p>

      {entry.bullets.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.08em", lineHeight: 2, color: "rgba(28,28,28,0.5)", maxWidth: "56ch", margin: "1.6rem 0 0", textTransform: "uppercase" }}
        >
          {entry.bullets.slice(0, 4).join("  ·  ")}
        </motion.p>
      )}

      {entry.gallery.length >= 2 && (
        <motion.button
          type="button"
          onClick={() => onOpenGallery(entry.gallery, entry.title)}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
          whileHover={{ y: -2 }}
          style={{
            marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "0.6rem",
            fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700,
            color: "#f5f2ec", background: accent, border: "none", borderRadius: "999px",
            padding: "0.85rem 1.5rem", cursor: "pointer", boxShadow: `0 12px 30px ${accent}44`,
          }}
        >
          <Images size={16} weight="bold" />
          View gallery
          <span style={{ opacity: 0.7 }}>({entry.gallery.length})</span>
        </motion.button>
      )}
    </div>
  );
}

export default function WorkSectorPageClient({ sector }: { sector: WorkSectorSlug }) {
  const router = useRouter();
  const meta = getWorkSectorMeta(sector);
  const projects = getProjectsForWorkSector(sector);
  const platforms = getPlatformsForWorkSector(sector);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);
  const [gallery, setGallery] = useState<{ images: string[]; title: string } | null>(null);
  const onOpenGallery = useCallback((images: string[], title: string) => setGallery({ images, title }), []);

  // Entrance — the shared image travels from its card position on the previous
  // page directly into the hero slot here (no fullscreen in between).
  type Rect = { left: number; top: number; width: number; height: number };
  const [entrance, setEntrance] = useState<null | { from: Rect; target: Rect }>(null);
  useEffect(() => {
    let payload: { slug: string; rect: Rect | null } | null = null;
    try {
      const raw = sessionStorage.getItem("fid-sector-entrance");
      if (raw) {
        sessionStorage.removeItem("fid-sector-entrance");
        payload = JSON.parse(raw);
      }
    } catch {}
    if (!payload || payload.slug !== sector || !payload.rect) return;
    const from = payload.rect;
    requestAnimationFrame(() => {
      const el = heroImgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setEntrance({ from, target: { left: r.left, top: r.top, width: r.width, height: r.height } });
    });
  }, [sector]);

  useEffect(() => {
    if (!entrance) return;
    const t = setTimeout(() => setEntrance(null), 1400);
    return () => clearTimeout(t);
  }, [entrance]);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/work");
  };

  if (!meta) return null;

  const rawEntries: Entry[] = [
    ...projects.flatMap((p): Entry[] => {
      // Thrive expands into one panel per venue, each with its own logo/photos.
      if (p.slug === "thrive-hospitality-group" && p.properties?.length) {
        return p.properties.map((prop) => {
          const v = THRIVE_VENUES[prop.name] ?? { image: meta.cover };
          return {
            key: `thrive-${prop.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
            title: prop.name,
            eyebrow: "Thrive Hospitality Group",
            years: p.years,
            body: prop.desc,
            bullets: [],
            image: v.image,
            inset: v.inset,
            logo: v.logo,
            logoDark: v.logoDark,
            gallery: v.gallery ?? [v.image, v.inset].filter((s): s is string => Boolean(s)),
          };
        });
      }
      const imgs = projectImages(p.slug);
      return [{
        key: p.slug,
        title: p.client,
        eyebrow: p.title,
        years: p.years,
        body: p.body || p.desc,
        bullets: p.scope,
        image: imgs[0] ? toSrc(imgs[0].src) : meta.cover,
        inset: imgs[1] ? toSrc(imgs[1].src) : undefined,
        logo: p.logo,
        logoDark: p.logoDark,
        gallery: imgs.map((im) => toSrc(im.src)),
      }];
    }),
    ...platforms.map((pl) => ({
      key: pl.slug,
      title: pl.name,
      eyebrow: pl.tagline,
      body: pl.intro || pl.shortDesc,
      bullets: pl.highlights,
      image: pl.image,
      inset: undefined,
      logo: pl.slug === "suhba-series" ? "/logos/suhba-series.png" : undefined,
      gallery: (pl.gallery ?? []).map(toSrc),
    })),
  ];

  const entries = dedupeEntryImages(rawEntries, sector);

  const activeEntry = entries[Math.min(active, entries.length - 1)];
  const heroImage = meta.cover || entries[0]?.image || "";

  return (
    <main style={{ minHeight: "100vh", background: "#f5f2ec", color: "#1c1c1c" }}>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(1rem,2.5vw,1.5rem) 0 0" }}>
        <div className="section-shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", position: "relative", zIndex: 1 }}>
          <button
            onClick={goBack}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#750006", background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.45rem", fontWeight: 700 }}
          >
            <ArrowLeft size={14} weight="bold" />
            Back
          </button>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,28,28,0.45)" }}>
            FID &amp; Co. · Work
          </span>
        </div>

        <div className="section-shell" style={{ position: "relative", zIndex: 1, marginTop: "clamp(2rem,5vw,3rem)" }}>
          <div ref={heroRef} style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(1.5rem, 4vw, 3rem)", alignItems: "center" }} className="sector-hero-grid">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.28em", textTransform: "uppercase", color: meta.accent, margin: "0 0 1rem", fontWeight: 700 }}
              >
                {entries.length} {entries.length === 1 ? "engagement" : "engagements"}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#1c1c1c", margin: 0, maxWidth: "11ch" }}
              >
                {meta.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "rgba(28,28,28,0.68)", maxWidth: "50ch", margin: "1.2rem 0 0" }}
              >
                {meta.intro}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                style={{ transformOrigin: "left", height: "3px", width: "72px", background: meta.accent, borderRadius: "999px", marginTop: "1.8rem" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              style={{ position: "relative" }}
            >
              <div ref={heroImgRef} style={{ position: "relative", minHeight: "clamp(280px, 38vw, 520px)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 70px rgba(38,0,0,0.15)" }}>
                <img src={heroImage} alt={meta.title} loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(38,0,0,0.18) 0%, rgba(38,0,0,0.34) 44%, ${meta.accent}cc 100%)` }} />
                <div style={{ position: "absolute", left: "1.2rem", bottom: "1.2rem", right: "1.2rem", color: "#f5f2ec" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0, maxWidth: "12ch" }}>
                    {meta.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* numbered index strip, like the reference */}
        <div className="section-shell" style={{ marginTop: "clamp(2.5rem,5vw,4rem)", borderTop: "1px solid rgba(28,28,28,0.1)", paddingTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.4rem 2rem" }}>
          {entries.map((e, i) => (
            <button
              key={e.key}
              onClick={() => document.getElementById(`wsp-panel-${e.key}`)?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: i === active ? meta.accent : "rgba(28,28,28,0.5)", fontWeight: i === active ? 700 : 600, transition: "color 0.3s" }}
            >
              ({String(i + 1).padStart(2, "0")}) {e.title}
            </button>
          ))}
        </div>
      </section>

      {/* split-screen editorial — sticky media left, scrolling panels right */}
      <section className="wsp-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: "clamp(2rem,4vw,3rem)" }}>
        <div className="wsp-sticky" style={{ position: "relative" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#1c1208" }}>
            <AnimatePresence mode="sync">
              <motion.img
                key={activeEntry?.key ?? "none"}
                src={activeEntry?.image}
                alt={activeEntry?.title ?? ""}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.8, ease: "easeInOut" }, scale: { duration: 4.5, ease: "linear" } }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AnimatePresence>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18,8,4,0.2) 0%, transparent 40%, rgba(18,8,4,0.55) 100%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "clamp(1.2rem,3vw,2.4rem)", bottom: "clamp(1.2rem,3.5vh,2.4rem)", right: "clamp(1.2rem,3vw,2.4rem)" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeEntry?.key ?? "none"}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem,2.4vw,2.1rem)", fontStyle: "italic", color: "#f5f2ec", margin: 0, textShadow: "0 4px 26px rgba(0,0,0,0.5)" }}
                >
                  ({String(active + 1).padStart(2, "0")}) {activeEntry?.title}
                </motion.p>
              </AnimatePresence>
              <div style={{ height: "2px", width: "56px", background: meta.accent, marginTop: "0.8rem", borderRadius: "999px" }} />
            </div>
          </div>
        </div>

        <div>
          {entries.map((entry, i) => (
            <Panel key={entry.key} entry={entry} i={i} accent={meta.accent} onActive={onActive} onOpenGallery={onOpenGallery} />
          ))}
        </div>
      </section>

      <section className="section-shell" style={{ padding: "clamp(2rem,4vw,3rem) 0 clamp(4rem, 8vw, 6rem)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid rgba(117,0,6,0.12)", paddingTop: "1.4rem" }}>
          <Link href="/work" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 700 }}>
            <ArrowLeft size={14} weight="bold" />
            All sectors
          </Link>
          <Link href="/#contact" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 700 }}>
            Work with us
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </section>

      {/* entrance overlay — the cover travels from the card's position on the
          previous page straight into the hero slot. FLIP: outer scales while
          the inner image counter-scales — GPU-only, no distortion. */}
      {entrance && (() => {
        const sx = entrance.from.width / entrance.target.width;
        const sy = entrance.from.height / entrance.target.height;
        return (
          <motion.div
            initial={{ x: entrance.from.left - entrance.target.left, y: entrance.from.top - entrance.target.top, scaleX: sx, scaleY: sy }}
            animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1 }}
            transition={{ duration: 1.05, ease: EASE }}
            onAnimationComplete={() => setEntrance(null)}
            style={{
              position: "fixed",
              left: entrance.target.left,
              top: entrance.target.top,
              width: entrance.target.width,
              height: entrance.target.height,
              transformOrigin: "top left",
              borderRadius: 16,
              zIndex: 80,
              overflow: "hidden",
              pointerEvents: "none",
              willChange: "transform",
            }}
          >
            <motion.div
              initial={{ scaleX: 1 / sx, scaleY: 1 / sy }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ duration: 1.05, ease: EASE }}
              style={{ width: "100%", height: "100%", transformOrigin: "top left", willChange: "transform" }}
            >
              <img src={heroImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(38,0,0,0.18) 0%, rgba(38,0,0,0.34) 44%, ${meta.accent}cc 100%)` }} />
            </motion.div>
          </motion.div>
        );
      })()}

      {SECTOR_PRESS[sector] ? <PressLinks campaigns={SECTOR_PRESS[sector]!} /> : null}

      {gallery && (
        <Lightbox images={gallery.images} title={gallery.title} start={0} onClose={() => setGallery(null)} />
      )}

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .sector-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .wsp-split {
            grid-template-columns: 1fr !important;
          }
          .wsp-sticky {
            display: none !important;
          }
          .wsp-inline-img {
            display: block !important;
          }
          .wsp-panel {
            min-height: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}
