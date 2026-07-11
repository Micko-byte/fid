"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { WorkSectorSlug } from "@/components/lib/work-sectors";

const EASE = [0.16, 1, 0.3, 1] as const;

type Chapter = {
  slug: WorkSectorSlug;
  num: string;
  title: string;
  short: string;
  accent: string;
  works: string[];
  images: { src: string; alt: string }[];
};

/* All 11 blurb categories, with the example works beside each — images are
   the real photos we hold; placeholders are flagged to the client. */
const CHAPTERS: Chapter[] = [
  {
    slug: "government",
    num: "01",
    title: "Government & Public Institutions",
    short: "Government",
    accent: "#750006",
    works: ["Africa Urban Forum 2026", "National Minorities Day", "Utamaduni Day", "Bomas of Kenya"],
    images: [
      { src: "/photos/projects/auf-2026.jpg", alt: "Africa Urban Forum 2026 at KICC" },
      { src: "/photos/projects/national-minorities-day.jpg", alt: "National Minorities Day" },
    ],
  },
  {
    slug: "retail-fashion",
    num: "02",
    title: "Retail & Fashion",
    short: "Retail",
    accent: "#b5397a",
    works: ["Woolworths Kenya", "LC Waikiki Africa", "2nu Boutique"],
    images: [{ src: "/photos/projects/lc-waikiki-influencer.jpg", alt: "LC Waikiki influencer campaign" }],
  },
  {
    slug: "corporate",
    num: "03",
    title: "Manufacturing & Corporate",
    short: "Corporate",
    accent: "#d98038",
    works: ["Kansai Plascon", "Chloride Exide"],
    images: [
      { src: "/photos/projects/kansai-plascon-launch.jpg", alt: "Kansai Plascon — Colours of Victory" },
      { src: "/photos/projects/kansai-gor-mahia.jpg", alt: "Kansai Plascon x Gor Mahia" },
    ],
  },
  {
    slug: "hospitality",
    num: "04",
    title: "Hospitality & Destination Brands",
    short: "Hospitality",
    accent: "#1f6b4a",
    works: ["Café NBO", "Glam Hotel", "Social 8", "Chaii Republic", "Kingfisher Nest"],
    images: [
      { src: "/photos/projects/glam-hotel.jpg", alt: "Glam Hotel Westlands" },
      { src: "/photos/projects/thrive-hospitality/glam-02.jpg", alt: "Thrive Hospitality experience" },
    ],
  },
  {
    slug: "sports-tourism",
    num: "05",
    title: "Sports, Tourism & Mass Audiences",
    short: "Sports",
    accent: "#0f766e",
    works: ["WRC Safari Rally", "Gor Mahia FC"],
    images: [
      { src: "/photos/projects/kansai-gor-mahia.jpg", alt: "Gor Mahia launch" },
      { src: "/photos/editorial/crowd-audience.jpg", alt: "Mass audience event" },
    ],
  },
  {
    slug: "healthcare",
    num: "06",
    title: "Healthcare & Medical Institutions",
    short: "Healthcare",
    accent: "#2f6f8f",
    works: ["Gertrude's Children's Hospital Foundation", "Columbia Africa Healthcare"],
    images: [
      { src: "/photos/projects/columbia-building.jpg", alt: "Columbia Africa Healthcare" },
      { src: "/photos/projects/healthcare-storytelling.jpg", alt: "Healthcare storytelling" },
    ],
  },
  {
    slug: "social-impact",
    num: "07",
    title: "Social Impact & Multilateral",
    short: "Social Impact",
    accent: "#7a5c2e",
    works: ["The Amahoro Coalition & UNHCR"],
    images: [{ src: "/photos/projects/africa-forum-displacement.jpg", alt: "Africa Forum on Displacements" }],
  },
  {
    slug: "finance",
    num: "08",
    title: "Finance, Investment & Advisory",
    short: "Finance",
    accent: "#1c1c1c",
    works: ["Elysium Capital Partners"],
    images: [{ src: "/photos/projects/elysium-finance.jpg", alt: "Elysium Capital" }],
  },
  {
    slug: "lifestyle",
    num: "09",
    title: "Beauty, Wellness & Lifestyle",
    short: "Beauty",
    accent: "#b5397a",
    works: ["Allso Beauty", "Abyan Salon & Spa", "Luxury Body Spa", "Medigah London Hair", "RukyBeau"],
    images: [
      { src: "/photos/projects/allso-launch.jpg", alt: "Allso Beauty launch" },
      { src: "/photos/projects/abyan-salon/DSC08749.webp", alt: "Abyan Salon & Spa" },
    ],
  },
  {
    slug: "culture-entertainment",
    num: "10",
    title: "Culture & Entertainment",
    short: "Culture",
    accent: "#8a5cf0",
    works: ["Talanta Afrika Festival"],
    images: [
      { src: "/photos/projects/cultural-dancers.jpg", alt: "Cultural performance" },
      { src: "/photos/editorial/cultural-festival.jpg", alt: "Festival atmosphere" },
    ],
  },
  {
    slug: "owned-ips",
    num: "11",
    title: "Owned Experiences & Cultural IPs",
    short: "Owned IPs",
    accent: "#260000",
    works: ["The Tribe Vibe", "Suhba Series", "The Capital Room"],
    images: [
      { src: "/photos/projects/tribe-vibe.jpg", alt: "The Tribe Vibe" },
      { src: "/photos/platforms/suhba-series/suhba-01.jpg", alt: "Suhba Series" },
    ],
  },
];

type LenisLike = { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };

export default function WorkSectorsScroll() {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [railOn, setRailOn] = useState(false);

  // One rAF loop drives everything off real rects (Lenis-proof): active
  // chapter, image parallax, nav retraction and the rail's visibility.
  useEffect(() => {
    let raf = 0;
    let lastActive = -1;
    let lastRail = false;
    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap) {
        const wr = wrap.getBoundingClientRect();
        const vh = window.innerHeight;

        // rail + nav retraction while the scroll experience owns the viewport
        const inside = wr.top < vh * 0.5 && wr.bottom > vh * 0.5;
        if (inside !== lastRail) {
          lastRail = inside;
          setRailOn(inside);
          document.body.classList.toggle("fid-hide-nav", inside);
        }

        // active chapter = the one whose centre is nearest the viewport centre
        let best = 0;
        let bestDist = Infinity;
        chapterRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - vh / 2);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
          // image parallax — drifts within the chapter
          const iw = imgWrapRefs.current[i];
          if (iw) {
            const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
            iw.style.transform = `translateY(${p * -34}px)`;
          }
        });
        if (best !== lastActive) {
          lastActive = best;
          setActive(best);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("fid-hide-nav");
    };
  }, []);

  const jumpTo = useCallback((i: number) => {
    const el = chapterRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(y, {});
    else window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", background: "#f5f2ec" }}>
      {/* right-edge sector index — appears while inside the experience */}
      <div
        aria-label="Sector index"
        className="wss-rail"
        style={{
          position: "fixed",
          right: "clamp(0.6rem,1.6vw,1.6rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.55rem",
          opacity: railOn ? 1 : 0,
          pointerEvents: railOn ? "auto" : "none",
          transition: "opacity 0.45s ease",
        }}
      >
        {CHAPTERS.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.slug}
              onClick={() => jumpTo(i)}
              aria-label={c.title}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: on ? 800 : 600,
                color: on ? c.accent : "rgba(28,28,28,0.4)",
                transition: "color 0.3s",
              }}
            >
              <span style={{ opacity: on ? 1 : 0 }} className="wss-rail-label">{c.short}</span>
              <span style={{ width: on ? "26px" : "14px", height: "2px", background: on ? c.accent : "rgba(28,28,28,0.3)", borderRadius: "999px", transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s" }} />
            </button>
          );
        })}
      </div>

      {CHAPTERS.map((c, i) => (
        <div
          key={c.slug}
          ref={(el) => {
            chapterRefs.current[i] = el;
          }}
          className="wss-chapter"
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
            alignItems: "center",
            gap: "clamp(1.5rem,4vw,4rem)",
            padding: "clamp(4rem,10vh,7rem) clamp(1.5rem,6vw,6rem)",
            borderTop: i ? "1px solid rgba(38,0,0,0.08)" : "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ghost number */}
          <span aria-hidden style={{ position: "absolute", right: "clamp(2rem,8vw,8rem)", top: "clamp(0.5rem,3vh,2rem)", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(6rem,16vw,15rem)", lineHeight: 1, color: "rgba(117,0,6,0.05)", userSelect: "none", pointerEvents: "none" }}>
            {c.num}
          </span>

          {/* copy */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.26em", textTransform: "uppercase", color: c.accent, fontWeight: 700, margin: 0 }}
            >
              ({c.num}) Sector
            </motion.p>
            <Link href={`/work/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <motion.h2
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease: EASE }}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", fontSize: "clamp(2rem,4.4vw,3.9rem)", lineHeight: 0.94, letterSpacing: "-0.02em", color: "#1c1c1c", margin: "1.1rem 0 0", maxWidth: "13ch" }}
              >
                {c.title}
              </motion.h2>
            </Link>

            {/* the works, listed beside the category */}
            <ul style={{ listStyle: "none", padding: 0, margin: "1.8rem 0 0", display: "grid", gap: "0.55rem" }}>
              {c.works.map((w, wi) => (
                <motion.li
                  key={w}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: 0.1 + wi * 0.07, ease: EASE }}
                  style={{ display: "flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem,1.1vw,1rem)", color: "rgba(28,28,28,0.78)", fontWeight: 600 }}
                >
                  <span style={{ width: "18px", height: "1px", background: c.accent, flexShrink: 0 }} />
                  {w}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <Link
                href={`/work/${c.slug}`}
                data-cursor="Explore"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, textDecoration: "none", borderBottom: `1px solid ${c.accent}`, paddingBottom: "0.3rem" }}
              >
                Open sector <ArrowUpRight size={15} weight="bold" />
              </Link>
            </motion.div>
          </div>

          {/* images — offset pair drifting with the scroll */}
          <div
            ref={(el) => {
              imgWrapRefs.current[i] = el;
            }}
            style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: c.images.length > 1 ? "1fr 0.8fr" : "1fr", gap: "clamp(0.9rem,1.8vw,1.4rem)", alignItems: "start", willChange: "transform", cursor: "pointer" }}
            onClick={() => router.push(`/work/${c.slug}`)}
            role="link"
            aria-label={`Open ${c.title}`}
          >
            {c.images.map((img, ii) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: ii * 0.12, ease: EASE }}
                className="wss-img"
                style={{ position: "relative", overflow: "hidden", borderRadius: "6px", aspectRatio: ii === 0 ? "4 / 4.6" : "4 / 3.4", marginTop: ii === 1 ? "clamp(2rem,7vh,5rem)" : 0, background: "#1c1208", boxShadow: "0 26px 70px rgba(38,0,0,0.18)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,5,5,0.08) 55%, rgba(13,5,5,0.42) 100%)", pointerEvents: "none" }} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        /* nav retracts while the sector scroll owns the viewport */
        body.fid-hide-nav .brand-nav-container {
          top: -140px !important;
        }
        .brand-nav-container { transition: box-shadow 0.3s, transform 0.3s, top 0.5s cubic-bezier(0.16,1,0.3,1) !important; }

        .wss-img img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .wss-chapter:hover .wss-img img { transform: scale(1.05); }
        .wss-rail-label { transition: opacity 0.3s; }
        .wss-rail button:hover .wss-rail-label { opacity: 1 !important; }

        @media (max-width: 900px) {
          .wss-chapter { grid-template-columns: 1fr !important; }
          .wss-rail { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wss-img img { transition: none; }
        }
      `}</style>
    </div>
  );
}
