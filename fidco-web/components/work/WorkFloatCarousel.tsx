"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SealCheck, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { animate } from "animejs";

const EASE = [0.16, 1, 0.3, 1] as const;

type FloatCard = {
  slug: string;
  sector: string;
  handle: string;
  logo?: string;
  image: string;
  headline: string;
  copy: string;
  accent: string;
};

// Flagship works — each rendered as a floating "social card".
const CARDS: FloatCard[] = [
  {
    slug: "government",
    sector: "Government",
    handle: "Executive Office of the President",
    logo: "/logos/executive-office-president.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/national-minorities-day",
    headline: "Communication that carries a nation.",
    copy: "Creative and communications agency for Kenya's National Minorities Day — delivered with sensitivity, accuracy and national impact.",
    accent: "#750006",
  },
  {
    slug: "retail-fashion",
    sector: "Retail & Fashion",
    handle: "LC Waikiki Africa",
    logo: "/logos/lc-waikiki.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/lc-waikiki-influencer",
    headline: "Fashion storytelling across Africa.",
    copy: "Official digital and communications agency across Sub-Saharan markets — locally resonant, globally aligned.",
    accent: "#b5397a",
  },
  {
    slug: "corporate",
    sector: "Corporate",
    handle: "Kansai Plascon Kenya",
    logo: "/logos/kansai-plascon.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-gor-mahia",
    headline: "Colour, community and craft.",
    copy: "From the Gor Mahia partnership launch to Official Communications Partner — shaping spaces and lifestyles across Kenya.",
    accent: "#d98038",
  },
  {
    slug: "hospitality",
    sector: "Hospitality",
    handle: "Thrive Hospitality Group",
    logo: "/logos/thrive-hospitality.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/glam-hotel",
    headline: "Venues become destinations.",
    copy: "Café NBO, Glam Hotel, Social 8, Chaii Republic, Kingfisher Nest — each launched as a distinct lifestyle destination.",
    accent: "#1f6b4a",
  },
  {
    slug: "social-impact",
    sector: "Social Impact",
    handle: "UNHCR & The Amahoro Coalition",
    logo: "/logos/unhcr.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/africa-forum-displacement",
    headline: "Dialogue with continental reach.",
    copy: "Communications and media engagement for the Africa Forum on Displacements in Accra — visibility across multiple African markets.",
    accent: "#7a5c2e",
  },
  {
    slug: "healthcare",
    sector: "Healthcare",
    handle: "Columbia Africa Healthcare",
    logo: "/logos/columbia-africa.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/columbia-building",
    headline: "Care, communicated clearly.",
    copy: "Translating complex healthcare services into clear, reassuring narratives across Kenya's leading hospital network.",
    accent: "#2f6f8f",
  },
  {
    slug: "lifestyle",
    sector: "Beauty & Lifestyle",
    handle: "Allso Beauty",
    logo: "/logos/allso-beauty.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/allso-beauty-cover",
    headline: "A beauty brand's first impression.",
    copy: "Brand launch and experiential campaign introducing Allso Beauty to Kenya's style-conscious audience.",
    accent: "#b5397a",
  },
  {
    slug: "owned-ips",
    sector: "Owned IPs",
    handle: "Suhba Series by FID PR",
    logo: "/logos/suhba-series.png",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01",
    headline: "Curated conversation, modern identity.",
    copy: "An intimate platform for dialogue around identity, leadership, wellbeing and modern African experiences.",
    accent: "#260000",
  },
];

const mod = (n: number, m: number) => ((n % m) + m) % m;

function GlassCard({ card, variant, onClick }: { card: FloatCard; variant: "center" | "side"; onClick?: () => void }) {
  const isCenter = variant === "center";
  return (
    <div
      onClick={onClick}
      style={{
        width: isCenter ? "clamp(290px, 30vw, 400px)" : "clamp(230px, 24vw, 330px)",
        borderRadius: "20px",
        border: "1px solid rgba(245,242,236,0.55)",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        overflow: "hidden",
        boxShadow: isCenter ? "0 40px 110px rgba(20,8,4,0.55)" : "0 24px 70px rgba(20,8,4,0.4)",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* glass header — logo badge + handle + verified check */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 0.9rem" }}>
        <span style={{ width: "30px", height: "30px", borderRadius: "999px", background: "#f5f2ec", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(245,242,236,0.6)" }}>
          {card.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={card.logo} alt="" style={{ width: "22px", height: "22px", objectFit: "contain" }} />
          ) : (
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", color: "#750006" }}>F</span>
          )}
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, color: "#f5f2ec", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {card.handle}
        </span>
        <SealCheck size={14} weight="fill" color="#d98038" style={{ flexShrink: 0 }} />
      </div>

      {/* inset image */}
      <div style={{ position: "relative", margin: "0 8px 8px", borderRadius: "14px", overflow: "hidden", aspectRatio: "4 / 5.4", background: "#1c1c1c" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt={card.headline} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.12) 0%, rgba(38,0,0,0) 40%, rgba(28,18,12,0.88) 100%)" }} />

        {/* sector tag */}
        <span style={{ position: "absolute", top: "0.8rem", right: "0.9rem", fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.85)", fontWeight: 700 }}>
          {card.sector}
        </span>

        {/* caption */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "1rem 1.1rem 1.1rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: isCenter ? "1.35rem" : "1.1rem", lineHeight: 1.12, letterSpacing: "-0.01em", color: "#f5f2ec", margin: "0 0 0.55rem" }}>
            {card.headline}
          </p>
          {isCenter && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", lineHeight: 1.55, color: "rgba(245,242,236,0.75)", margin: 0 }}>
              {card.copy}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkFloatCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const active = CARDS[index];
  const prev = CARDS[mod(index - 1, CARDS.length)];
  const next = CARDS[mod(index + 1, CARDS.length)];

  const go = useCallback((dir: 1 | -1) => setIndex((i) => mod(i + dir, CARDS.length)), []);

  // auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5200);
    return () => clearInterval(t);
  }, [paused, go]);

  // anime.js — slow perpetual float on the whole card stage (replicates the reel's drift)
  useEffect(() => {
    if (!stageRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = animate(stageRef.current, {
      translateY: [-7, 7],
      duration: 4200,
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });
    return () => {
      anim.cancel();
    };
  }, []);

  return (
    <section
      aria-label="Selected work showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", height: "clamp(620px, 92vh, 900px)", overflow: "hidden", background: "#241610" }}
    >
      {/* ambient backdrop — the active card's image, blurred, crossfading */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ position: "absolute", inset: "-6%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={active.image} alt="" aria-hidden style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(34px) brightness(0.62) saturate(0.9)", transform: "scale(1.08)" }} />
        </motion.div>
      </AnimatePresence>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(24,12,8,0.55) 0%, rgba(24,12,8,0.12) 45%, rgba(24,12,8,0.66) 100%)" }} />

      {/* heading */}
      <div className="section-shell" style={{ position: "absolute", top: "clamp(2.2rem,5vh,4rem)", left: 0, right: 0, zIndex: 3, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d98038", margin: "0 0 0.7rem" }}>
          Selected work
        </p>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.9rem, 4vw, 3.2rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "#f5f2ec", margin: 0 }}>
          Proof across public, private and cultural life.
        </h1>
      </div>

      {/* card stage — side cards peek from the edges, like the reference reel */}
      <div ref={stageRef} style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* prev — peeking, left edge */}
        <motion.div
          key={`prev-${prev.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.7 }}
          className="wfc-side"
          style={{ position: "absolute", left: "clamp(-140px, -6vw, -40px)", top: "54%", transform: "translateY(-50%) scale(0.92)" }}
          onClick={() => go(-1)}
        >
          <GlassCard card={prev} variant="side" />
        </motion.div>

        {/* next — peeking, right edge */}
        <motion.div
          key={`next-${next.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.7 }}
          className="wfc-side"
          style={{ position: "absolute", right: "clamp(-140px, -6vw, -40px)", top: "46%", transform: "translateY(-50%) scale(0.92)" }}
          onClick={() => go(1)}
        >
          <GlassCard card={next} variant="side" />
        </motion.div>

        {/* center card */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, x: 90, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -90, scale: 0.94 }}
            transition={{ duration: 0.75, ease: EASE }}
            style={{ position: "relative", zIndex: 2, marginTop: "clamp(3rem,7vh,5rem)" }}
          >
            <Link href={`/work/${active.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <GlassCard card={active} variant="center" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div style={{ position: "absolute", bottom: "clamp(1.4rem,4vh,2.6rem)", left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: "1.1rem" }}>
        <button aria-label="Previous" onClick={() => go(-1)} style={{ width: "42px", height: "42px", borderRadius: "999px", border: "1px solid rgba(245,242,236,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "#f5f2ec", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <CaretLeft size={18} weight="bold" />
        </button>
        <div style={{ display: "flex", gap: "0.45rem" }}>
          {CARDS.map((c, i) => (
            <button
              key={c.slug}
              aria-label={c.handle}
              onClick={() => setIndex(i)}
              style={{ width: i === index ? "22px" : "7px", height: "7px", borderRadius: "999px", border: "none", cursor: "pointer", background: i === index ? c.accent === "#260000" ? "#d98038" : c.accent : "rgba(245,242,236,0.4)", transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s" }}
            />
          ))}
        </div>
        <button aria-label="Next" onClick={() => go(1)} style={{ width: "42px", height: "42px", borderRadius: "999px", border: "1px solid rgba(245,242,236,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "#f5f2ec", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .wfc-side { display: none; }
        }
      `}</style>
    </section>
  );
}
