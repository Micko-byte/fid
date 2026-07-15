"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FidLogo from "@/components/ui/FidLogo";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Card geometry, in vh — the whole reel is driven off these. */
const CARD = 34;
const GAP = 2.4;
const STEP = CARD + GAP;

type Slide = { slug: string; title: string; client: string; image: string; sector: string };

/* All 11 sectors — one slide each, mirroring the /work page. */
const SLIDES: Slide[] = [
  { sector: "government", slug: "government", title: "Government & Public Institutions", client: "Africa Urban Forum 2026", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/auf-2026" },
  { sector: "retail-fashion", slug: "retail-fashion", title: "Retail & Fashion", client: "LC Waikiki Africa", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/lc-waikiki-influencer" },
  { sector: "corporate", slug: "corporate", title: "Manufacturing & Corporate", client: "Kansai Plascon", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-plascon-launch" },
  { sector: "hospitality", slug: "hospitality", title: "Hospitality & Destination Brands", client: "Thrive Hospitality Group", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/glam-hotel" },
  { sector: "sports-tourism", slug: "sports-tourism", title: "Sports, Tourism & Mass Audiences", client: "Gor Mahia FC", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-gor-mahia" },
  { sector: "healthcare", slug: "healthcare", title: "Healthcare & Medical Institutions", client: "Columbia Africa", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/columbia-building" },
  { sector: "social-impact", slug: "social-impact", title: "Social Impact & Multilateral", client: "UNHCR & The Amahoro Coalition", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/africa-forum-displacement" },
  { sector: "finance", slug: "finance", title: "Finance, Investment & Advisory", client: "Elysium Capital Partners", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/elysium-finance" },
  { sector: "lifestyle", slug: "lifestyle", title: "Beauty, Wellness & Lifestyle", client: "Allso Beauty", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/allso-launch" },
  { sector: "culture-entertainment", slug: "culture-entertainment", title: "Culture & Entertainment", client: "Talanta Afrika Festival", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/cultural-dancers" },
  { sector: "owned-ips", slug: "owned-ips", title: "Owned Experiences & Cultural IPs", client: "Tribe Vibe · Suhba · Capital Room", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/tribe-vibe" },
];

export default function WorkReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inExperience, setInExperience] = useState(false);
  const n = SLIDES.length;

  // Scroll progress is read straight off the section's own rect each frame.
  // Deliberately not framer's useScroll / GSAP ScrollTrigger: both rely on the
  // scroll listener chain, which Lenis smooth-scroll intercepts here — the
  // reason earlier scroll effects silently never ran.
  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;
    let lastInside = false;
    const tick = () => {
      const sec = sectionRef.current;
      const reel = reelRef.current;
      if (sec && reel) {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

        // Header retracts once the section reaches the top of the viewport and
        // slides back after the last slide (Owned IPs) — the reel's own logo
        // hands over to the returning header.
        const inside = rect.top <= 1 && rect.bottom > vh * 0.6;
        if (inside !== lastInside) {
          lastInside = inside;
          setInExperience(inside);
          document.body.classList.toggle("fid-hide-nav", inside);
        }

        const startPx = ((50 - CARD / 2) / 100) * vh;
        const travelPx = (((n - 1) * STEP) / 100) * vh;
        reel.style.transform = `translate(-50%, ${startPx - p * travelPx}px)`;
        reel.dataset.p = p.toFixed(3);

        const i = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
        if (i !== lastIdx) {
          lastIdx = i;
          setIndex(i);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("fid-hide-nav");
    };
  }, [n]);

  const active = SLIDES[index];

  return (
    <section
      ref={sectionRef}
      id="work"
      data-nav-dark
      aria-label="Selected work"
      style={{ position: "relative", height: `${n * 85}vh`, background: "#0d0505" }}
    >
      {/* pinned viewport */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* full-bleed background of the active project */}
        <AnimatePresence mode="sync">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.9, ease: "easeInOut" }, scale: { duration: 6, ease: "linear" } }}
            style={{ position: "absolute", inset: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt="" aria-hidden style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,5,5,0.55)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(13,5,5,0.7) 0%, transparent 28%, transparent 72%, rgba(13,5,5,0.7) 100%)" }} />

        {/* minimal topbar — the reel's logo takes over while the header is
            retracted, and fades out as the header merges back after Owned IPs */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "clamp(1rem,2.5vw,1.5rem) clamp(1.5rem,5vw,4rem)",
            opacity: inExperience ? 1 : 0,
            transform: inExperience ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: inExperience ? "auto" : "none",
          }}
        >
          <Link href="/" aria-label="FID & Co. home" style={{ display: "block", lineHeight: 0 }}>
            <FidLogo variant="light" style={{ height: "clamp(24px,3.4vw,34px)", width: "auto" }} />
          </Link>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.24em", color: "#f5f2ec", fontWeight: 700 }}>
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>

        {/* side titles — project left, client right */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(1.5rem,5vw,4.5rem)", pointerEvents: "none" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={`l-${active.slug}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="wr-side"
              style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "clamp(1.1rem,2.1vw,2rem)", color: "#f5f2ec", margin: 0, maxWidth: "22%", lineHeight: 1.2, textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
            >
              {active.title}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`r-${active.slug}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
              className="wr-side"
              style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "clamp(1.1rem,2.1vw,2rem)", color: "#f5f2ec", margin: 0, maxWidth: "22%", lineHeight: 1.2, textAlign: "right", textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
            >
              {active.client}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* centre reel — the column of media cards */}
        <div
          ref={reelRef}
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translate(-50%, 33vh)",
            width: "clamp(190px, 21vw, 290px)",
            display: "flex",
            flexDirection: "column",
            gap: `${GAP}vh`,
            zIndex: 4,
            willChange: "transform",
          }}
        >
          {SLIDES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/work/${s.sector}`}
              aria-label={`${s.title} — ${s.client}`}
              style={{
                display: "block",
                height: `${CARD}vh`,
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(245,242,236,0.35)",
                boxShadow: i === index ? "0 30px 80px rgba(0,0,0,0.6)" : "0 14px 40px rgba(0,0,0,0.4)",
                opacity: i === index ? 1 : 0.55,
                transform: i === index ? "scale(1)" : "scale(0.93)",
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
                background: "#1c1208",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.client} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,5,5,0.05) 40%, rgba(13,5,5,0.85) 100%)" }} />
              <span style={{ position: "absolute", left: "0.9rem", right: "0.9rem", bottom: "0.85rem", fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,242,236,0.9)", fontWeight: 700 }}>
                {s.client}
              </span>
            </Link>
          ))}
        </div>

        {/* bottom bar — CTA */}
        {/* floating CTA over the full-bleed image */}
        <div style={{ position: "absolute", bottom: "clamp(1.2rem,3.5vh,2.2rem)", left: 0, right: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <Link
            href="/work"
            style={{ pointerEvents: "auto", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "#f5f2ec", textDecoration: "none", background: "rgba(13,5,5,0.5)", border: "1px solid rgba(245,242,236,0.35)", borderRadius: "999px", padding: "0.75rem 1.5rem", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            View all work
          </Link>
        </div>
      </div>

      <style>{`
        /* site header retracts while the reel owns the viewport, then slides
           back in after the last slide — the reel's logo hands over to it */
        .brand-nav-container {
          transition: box-shadow 0.3s, transform 0.3s, top 0.55s cubic-bezier(0.16,1,0.3,1) !important;
        }
        body.fid-hide-nav .brand-nav-container {
          top: -150px !important;
        }
        @media (max-width: 860px) {
          .wr-side { display: none !important; }
        }
      `}</style>
    </section>
  );
}
