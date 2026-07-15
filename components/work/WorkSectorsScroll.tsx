"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import FidLogo from "@/components/ui/FidLogo";
import type { WorkSectorSlug } from "@/components/lib/work-sectors";

const EASE = [0.16, 1, 0.3, 1] as const;

type PlatformEntry = {
  slug: string;
  name: string;
  logo: string;
  logoDark: boolean;
  image: string;
};

type Chapter = {
  slug: WorkSectorSlug;
  num: string;
  title: string;
  short: string;
  accent: string;
  works: string[];
  images: { src: string; alt: string }[];
  platforms?: PlatformEntry[];
};

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
      { src: "/photos/projects/kingfisher/kingfisher-01.jpg", alt: "The Perch at Kingfisher Nest" },
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
    works: [],
    images: [
      { src: "/photos/projects/tribe-vibe.jpg", alt: "The Tribe Vibe" },
      { src: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01", alt: "Suhba Series" },
    ],
    platforms: [
      {
        slug: "the-tribe-vibe",
        name: "The Tribe Vibe",
        logo: "/logos/tribe-vibe.png",
        logoDark: false,
        image: "/photos/projects/tribe-vibe.jpg",
      },
      {
        slug: "suhba-series",
        name: "Suhba Series",
        logo: "/logos/suhba-series.png",
        logoDark: false,
        image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01",
      },
      {
        slug: "the-capital-room",
        name: "The Capital Room",
        logo: "/logos/capital-room.png",
        logoDark: true,
        image: "/photos/editorial/podcast-set.jpg",
      },
    ],
  },
];

type LenisLike = { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };

export default function WorkSectorsScroll() {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [inExperience, setInExperience] = useState(false);

  useEffect(() => {
    let raf = 0;
    let lastActive = -1;
    let lastInside = false;

    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap) {
        const wr = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const inside = wr.top < vh * 0.15 && wr.bottom > vh * 0.85;

        if (inside !== lastInside) {
          lastInside = inside;
          setInExperience(inside);
          // Retract the site nav while the experience owns the viewport;
          // it slides back once the visitor scrolls past (map, footer).
          document.body.classList.toggle("fid-hide-nav", inside);
        }

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

  const openSector = useCallback(
    (slug: WorkSectorSlug, imgEl: HTMLDivElement | null) => {
      const rect = imgEl?.getBoundingClientRect();
      try {
        sessionStorage.setItem(
          "fid-sector-entrance",
          JSON.stringify({
            slug,
            rect: rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height } : null,
          })
        );
      } catch {}
      router.push(`/work/${slug}`);
    },
    [router]
  );

  const activeChapter = CHAPTERS[active];

  return (
    <div ref={wrapRef} className="wss-root" style={{ position: "relative" }}>
      {/* minimal top bar — replaces the site header on this page */}
      <header
        className="wss-topbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(1rem, 2.5vw, 1.4rem) clamp(1.2rem, 4vw, 2.5rem)",
          pointerEvents: inExperience ? "auto" : "none",
          opacity: inExperience ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      >
        <Link href="/" aria-label="FID & Co. home" style={{ display: "block", lineHeight: 0 }}>
          <FidLogo variant="light" style={{ height: "clamp(22px, 3.2vw, 30px)", width: "auto" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2rem)" }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,242,236,0.72)",
              fontWeight: 700,
            }}
          >
            {activeChapter.num} / {String(CHAPTERS.length).padStart(2, "0")}
          </span>
          <Link
            href="/#contact"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#f5f2ec",
              textDecoration: "none",
              fontWeight: 700,
              borderBottom: "1px solid rgba(245,242,236,0.45)",
              paddingBottom: "0.2rem",
            }}
          >
            Work with us
          </Link>
        </div>
      </header>

      {/* right-edge sector index */}
      <nav
        aria-label="Sector index"
        className="wss-rail"
        style={{
          position: "fixed",
          right: "clamp(0.8rem, 2vw, 1.8rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 65,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.6rem",
          opacity: inExperience ? 1 : 0,
          pointerEvents: inExperience ? "auto" : "none",
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
              aria-current={on ? "true" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: on ? 800 : 600,
                color: on ? "#f5f2ec" : "rgba(245,242,236,0.45)",
                transition: "color 0.3s",
              }}
            >
              <span className="wss-rail-label" style={{ opacity: on ? 1 : 0 }}>
                {c.short}
              </span>
              <span
                style={{
                  width: on ? "28px" : "14px",
                  height: "2px",
                  background: on ? c.accent : "rgba(245,242,236,0.35)",
                  borderRadius: "999px",
                  transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* mobile sector strip */}
      <nav
        aria-label="Sector navigation"
        className="wss-mobile-rail"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 65,
          display: "none",
          padding: "0.75rem clamp(0.8rem, 3vw, 1.2rem) max(0.75rem, env(safe-area-inset-bottom))",
          background: "linear-gradient(180deg, transparent 0%, rgba(13,5,5,0.82) 38%, rgba(13,5,5,0.94) 100%)",
          opacity: inExperience ? 1 : 0,
          pointerEvents: inExperience ? "auto" : "none",
          transition: "opacity 0.45s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            paddingBottom: "0.15rem",
          }}
        >
          {CHAPTERS.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={c.title}
                aria-current={on ? "true" : undefined}
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: on ? 800 : 600,
                  color: on ? "#f5f2ec" : "rgba(245,242,236,0.55)",
                  background: on ? c.accent : "rgba(245,242,236,0.1)",
                  border: `1px solid ${on ? c.accent : "rgba(245,242,236,0.16)"}`,
                  borderRadius: "999px",
                  padding: "0.55rem 0.85rem",
                  cursor: "pointer",
                  transition: "background 0.3s, color 0.3s, border-color 0.3s",
                }}
              >
                {c.short}
              </button>
            );
          })}
        </div>
      </nav>

      {CHAPTERS.map((c, i) => (
        <SectorChapter
          key={c.slug}
          chapter={c}
          index={i}
          isActive={i === active}
          chapterRef={(el) => {
            chapterRefs.current[i] = el;
          }}
          onOpen={openSector}
        />
      ))}

      <style>{`
        /* site nav retracts (slides up) while the experience is active,
           and slides back when the visitor scrolls past it */
        .brand-nav-container {
          transition: box-shadow 0.3s, transform 0.3s, top 0.55s cubic-bezier(0.16,1,0.3,1) !important;
        }
        body.fid-hide-nav .brand-nav-container {
          top: -150px !important;
        }
        .wss-root {
          scroll-snap-type: y proximity;
        }
        .wss-chapter {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        .wss-rail button:hover .wss-rail-label {
          opacity: 1 !important;
        }
        .wss-rail-label {
          transition: opacity 0.3s;
        }
        .wss-bg img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wss-chapter:hover .wss-bg img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .wss-rail {
            display: none !important;
          }
          .wss-mobile-rail {
            display: block !important;
          }
          .wss-chapter {
            min-height: 100svh !important;
            height: auto !important;
          }
          .wss-content {
            grid-template-columns: 1fr !important;
            padding-bottom: calc(5.5rem + env(safe-area-inset-bottom)) !important;
          }
          .wss-works {
            margin-top: 1.2rem;
          }
          .wss-topbar {
            padding-top: max(0.9rem, env(safe-area-inset-top)) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wss-bg img {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

function SectorChapter({
  chapter,
  index,
  isActive,
  chapterRef,
  onOpen,
}: {
  chapter: Chapter;
  index: number;
  isActive: boolean;
  chapterRef: (el: HTMLDivElement | null) => void;
  onOpen: (slug: WorkSectorSlug, el: HTMLDivElement | null) => void;
}) {
  const bgRef = useRef<HTMLDivElement>(null);
  const isOwnedIps = chapter.slug === "owned-ips";
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const heroImage = previewImage ?? chapter.images[0]?.src ?? "";

  return (
    <div
      ref={chapterRef}
      className="wss-chapter"
      style={{
        position: "relative",
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* full-bleed background — fills the entire viewport */}
      <div
        ref={bgRef}
        className="wss-bg"
        role="presentation"
        onClick={isOwnedIps ? undefined : () => onOpen(chapter.slug, bgRef.current)}
        style={{ position: "absolute", inset: 0, zIndex: 0, cursor: isOwnedIps ? "default" : "pointer" }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={heroImage}
            src={heroImage}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: "easeInOut" },
              scale: { duration: isActive ? 8 : 0.9, ease: "linear" },
            }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AnimatePresence>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(13,5,5,0.35) 0%, rgba(13,5,5,0.15) 35%, rgba(13,5,5,0.72) 72%, rgba(13,5,5,0.92) 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, rgba(13,5,5,0.55) 0%, transparent 42%, transparent 68%, rgba(13,5,5,0.4) 100%)`,
          }}
        />
      </div>

      {/* ghost sector number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "clamp(3rem, 12vw, 10rem)",
          top: "clamp(3rem, 12vh, 8rem)",
          fontFamily: "var(--font-heading)",
          fontWeight: 900,
          fontSize: "clamp(5rem, 18vw, 16rem)",
          lineHeight: 1,
          color: "rgba(245,242,236,0.06)",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {chapter.num}
      </span>

      {/* foreground content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "clamp(5rem, 14vh, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(2.5rem, 6vh, 4rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          alignItems: "end",
        }}
        className="wss-content"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: chapter.accent,
              fontWeight: 700,
              margin: 0,
            }}
          >
            ({chapter.num}) Sector
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "#f5f2ec",
              margin: "1rem 0 0",
              maxWidth: "14ch",
              textShadow: "0 4px 40px rgba(0,0,0,0.45)",
            }}
          >
            {chapter.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            style={{ marginTop: "2rem" }}
          >
            {isOwnedIps ? (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(245,242,236,0.72)",
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Select a logo to explore each platform
              </p>
            ) : (
              <button
                type="button"
                onClick={() => onOpen(chapter.slug, bgRef.current)}
                data-cursor="Explore"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#f5f2ec",
                  background: chapter.accent,
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.85rem 1.4rem",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                }}
              >
                Open sector <ArrowUpRight size={15} weight="bold" />
              </button>
            )}
          </motion.div>
        </div>

        {isOwnedIps && chapter.platforms ? (
          <div
            className="wss-platforms"
            style={{
              display: "grid",
              gap: "0.85rem",
              alignSelf: "end",
            }}
          >
            {chapter.platforms.map((pl, pi) => (
              <motion.div
                key={pl.slug}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: 0.08 + pi * 0.06, ease: EASE }}
              >
                <Link
                  href={`/platforms/${pl.slug}`}
                  onMouseEnter={() => setPreviewImage(pl.image)}
                  onMouseLeave={() => setPreviewImage(null)}
                  onFocus={() => setPreviewImage(pl.image)}
                  onBlur={() => setPreviewImage(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    textDecoration: "none",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "12px",
                    background: "rgba(245,242,236,0.1)",
                    border: "1px solid rgba(245,242,236,0.18)",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.5rem 0.7rem",
                      borderRadius: "10px",
                      background: pl.logoDark ? "#1c1c1c" : "#f5f2ec",
                      flexShrink: 0,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pl.logo} alt={`${pl.name} logo`} style={{ height: "28px", maxWidth: "110px", objectFit: "contain" }} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                        color: "#f5f2ec",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {pl.name}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        marginTop: "0.25rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,242,236,0.65)",
                        fontWeight: 700,
                      }}
                    >
                      View platform <ArrowUpRight size={12} weight="bold" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
        <ul
          className="wss-works"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "0.6rem",
            alignSelf: "end",
          }}
        >
          {chapter.works.map((w, wi) => (
            <motion.li
              key={w}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.08 + wi * 0.06, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
                color: "rgba(245,242,236,0.82)",
                fontWeight: 600,
              }}
            >
              <span style={{ width: "20px", height: "1px", background: chapter.accent, flexShrink: 0 }} />
              {w}
            </motion.li>
          ))}
        </ul>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .wss-content {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
