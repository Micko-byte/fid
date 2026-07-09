"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { WORK_SECTORS, getWorkSectorCount } from "@/components/lib/work-sectors";

const EASE = [0.16, 1, 0.3, 1] as const;

const mod = (n: number, m: number) => ((n % m) + m) % m;

/* Letter-stagger reveal for the giant display lines */
function RevealLine({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", ...style }} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "112%", rotate: 4 }}
          whileInView={{ y: "0%", rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* Collage tile with its own parallax speed */
function ParallaxTile({
  src,
  alt,
  speed,
  progress,
  style,
}: {
  src: string;
  alt: string;
  speed: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  style: React.CSSProperties;
}) {
  const y = useTransform(progress, [0, 1], [speed * 60, speed * -60]);
  return (
    <motion.div style={{ position: "absolute", y, ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", display: "block", filter: "saturate(0.9) contrast(1.05) brightness(0.92)" }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "10px", background: "linear-gradient(180deg, rgba(24,10,6,0.12), rgba(24,10,6,0.4))" }} />
    </motion.div>
  );
}

export default function WorkExplore() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<null | { src: string; rect: DOMRect; href: string }>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const active = WORK_SECTORS[index];
  const count = WORK_SECTORS.length;
  const go = useCallback((dir: 1 | -1) => setIndex((i) => mod(i + dir, count)), [count]);
  const [paused, setPaused] = useState(false);

  // auto-cycle — the work keeps changing instead of waiting for a press
  useEffect(() => {
    if (paused || leaving) return;
    const t = setInterval(() => go(1), 4600);
    return () => clearInterval(t);
  }, [paused, leaving, go]);

  // keyboard navigation on the carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Shared-image transition: the card image travels DIRECTLY from its position
  // here to its hero position on the sector page — no fullscreen in between.
  // We hand the source rect to the destination, which animates rect -> hero.
  const openSector = () => {
    const el = featuredRef.current;
    const rect = el?.getBoundingClientRect();
    try {
      sessionStorage.setItem(
        "fid-sector-entrance",
        JSON.stringify({ slug: active.slug, rect: rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height } : null })
      );
    } catch {}
    if (el && rect) {
      // hold a static clone at the card position so there's no flash while routing
      setLeaving({ src: active.cover, rect, href: `/work/${active.slug}` });
    }
    router.push(`/work/${active.slug}`);
  };

  useEffect(() => {
    if (!leaving) return;
    // failsafe — if navigation ever fails, never leave the overlay stranded
    const rescue = setTimeout(() => setLeaving(null), 2500);
    return () => clearTimeout(rescue);
  }, [leaving]);

  // collage tiles drawn from the other sectors' covers
  const tiles = [
    { i: mod(index + 1, count), speed: 1.4, style: { left: "1.5vw", top: "6%", width: "clamp(140px,16vw,250px)", height: "clamp(180px,22vw,330px)", zIndex: 1 } },
    { i: mod(index + 2, count), speed: 0.7, style: { left: "3vw", bottom: "4%", width: "clamp(120px,13vw,210px)", height: "clamp(120px,14vw,220px)", zIndex: 1 } },
    { i: mod(index + 3, count), speed: 1.1, style: { right: "2vw", top: "10%", width: "clamp(130px,15vw,240px)", height: "clamp(170px,20vw,320px)", zIndex: 1 } },
    { i: mod(index + 4, count), speed: 0.5, style: { right: "4vw", bottom: "6%", width: "clamp(140px,16vw,260px)", height: "clamp(120px,13vw,210px)", zIndex: 1 } },
    { i: mod(index + 5, count), speed: 1.8, style: { left: "30vw", top: "2%", width: "clamp(110px,12vw,190px)", height: "clamp(90px,10vw,160px)", zIndex: 1 } },
  ];

  // headline drifts slower than the collage — type sits over the cards
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -80]);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-nav-dark
      aria-label="Explore our work"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #452a19 0%, #2e120a 22%, #1a0605 52%, #0d0303 100%)",
        padding: "clamp(6rem,12vh,9rem) 0 clamp(5rem,10vh,8rem)",
      }}
    >
      {/* single soft warm glow at the top — clean falloff like the reference */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 72% 44% at 50% 0%, rgba(196,132,84,0.28) 0%, transparent 66%)" }} />

      {/* faint hairline arc, like the reference's sweeping line */}
      <svg aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }}>
        <path d="M -60 240 Q 720 620 1500 120" stroke="rgba(245,242,236,0.5)" strokeWidth="1" fill="none" />
      </svg>

      {/* parallax collage */}
      {tiles.map((t) => (
        <ParallaxTile
          key={`${t.i}-${WORK_SECTORS[t.i].slug}`}
          src={WORK_SECTORS[t.i].cover}
          alt={WORK_SECTORS[t.i].title}
          speed={t.speed}
          progress={scrollYProgress}
          style={t.style}
        />
      ))}

      {/* giant stacked display type — collage slides beneath it */}
      <motion.div style={{ position: "relative", zIndex: 2, textAlign: "center", y: titleY, pointerEvents: "none" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#f0e4d4", margin: 0, lineHeight: 0.86, letterSpacing: "-0.02em" }}>
          <RevealLine text="Explore" style={{ fontSize: "clamp(4.2rem, 13vw, 12rem)" }} />
          <br />
          <RevealLine text="Work" delay={0.28} style={{ fontSize: "clamp(4.2rem, 13vw, 12rem)", marginLeft: "clamp(2rem,10vw,10rem)", opacity: 0.92 }} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem,2.2vw,1.7rem)", color: "#f5f2ec", margin: "clamp(1.2rem,3vh,2rem) 0 0", lineHeight: 1.3 }}
        >
          Not everything
          <br />
          is visible
        </motion.p>
      </motion.div>

      {/* featured carousel — centre card, round arrows, n/11 counter */}
      <div className="section-shell" style={{ position: "relative", zIndex: 3, marginTop: "clamp(2.5rem,6vh,4.5rem)", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "min(760px, 92vw)" }}>
          <div
            ref={featuredRef}
            onClick={openSector}
            role="link"
            aria-label={`Open ${active.title}`}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openSector()}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: "6px", overflow: "hidden", cursor: "pointer", boxShadow: "0 50px 130px rgba(0,0,0,0.6)" }}
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={active.slug}
                src={active.cover}
                alt={active.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.9, ease: "easeInOut" }, scale: { duration: 5.4, ease: "linear" } }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AnimatePresence>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18,8,4,0.14) 0%, rgba(18,8,4,0.04) 45%, rgba(18,8,4,0.62) 100%)", pointerEvents: "none" }} />

            {/* place name — letters rise in one by one, like the reference type */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.slug}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
                style={{ position: "absolute", left: "clamp(1.2rem,3vw,2.2rem)", bottom: "clamp(1rem,3vw,1.8rem)", fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem,3.4vw,2.8rem)", fontStyle: "italic", color: "#f5f2ec", margin: 0, letterSpacing: "0.01em", textShadow: "0 4px 30px rgba(0,0,0,0.5)", maxWidth: "70%", lineHeight: 1.12 }}
              >
                {active.title.split(" ").map((word, wi, words) => (
                  <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", whiteSpace: "pre" }}>
                    {(wi < words.length - 1 ? word + " " : word).split("").map((ch, ci) => (
                      <motion.span
                        key={ci}
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.7, delay: 0.15 + (wi * 4 + ci) * 0.022, ease: EASE }}
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.p>
            </AnimatePresence>

            {/* counter */}
            <span style={{ position: "absolute", right: "clamp(1.2rem,3vw,2rem)", bottom: "clamp(1rem,3vw,1.6rem)", fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem,2.4vw,1.9rem)", color: "rgba(245,242,236,0.92)", fontStyle: "italic" }}>
              {index + 1}/{count}
            </span>

            {/* project count tag */}
            <span style={{ position: "absolute", left: "clamp(1.2rem,3vw,2.2rem)", top: "clamp(1rem,2.6vw,1.6rem)", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,242,236,0.8)", fontWeight: 700 }}>
              {getWorkSectorCount(active.slug)} {getWorkSectorCount(active.slug) === 1 ? "project" : "projects"}
            </span>

            {/* press hint */}
            <span className="wex-hint" style={{ position: "absolute", right: "clamp(1.2rem,3vw,2rem)", top: "clamp(1rem,2.6vw,1.6rem)", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,242,236,0.9)", fontWeight: 700 }}>
              Press to view the work
            </span>
          </div>

          {/* round arrows overlapping the card centre, like the reference */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "flex", gap: "0.9rem", zIndex: 4 }}>
            {([["prev", -1, ArrowLeft], ["next", 1, ArrowRight]] as const).map(([label, dir, Icon]) => (
              <button
                key={label}
                aria-label={label === "prev" ? "Previous sector" : "Next sector"}
                onClick={(e) => { e.stopPropagation(); go(dir); }}
                style={{ width: "clamp(52px,7vw,74px)", height: "clamp(52px,7vw,74px)", borderRadius: "999px", border: "1px solid rgba(245,242,236,0.28)", background: "rgba(14,6,3,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", color: "#f5f2ec", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s, transform 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(117,0,6,0.75)"; e.currentTarget.style.transform = "scale(1.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(14,6,3,0.55)"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <Icon size={22} weight="regular" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* copy block — adapted from the reference's rhythm, FID's own words */}
      <div className="section-shell" style={{ position: "relative", zIndex: 2, marginTop: "clamp(4rem,9vh,7rem)", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.9rem,4.4vw,3.6rem)", color: "#f0e4d4", lineHeight: 1.06, letterSpacing: "-0.01em", margin: 0 }}
        >
          Proof across public,
          <br />
          private and cultural life
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(245,242,236,0.62)", maxWidth: "44ch", margin: "1.6rem auto 0" }}
        >
          There are {count} sectors in operation at the moment, each engagement shaped
          by insight, strategy and cultural context across 8+ African markets.
          The work speaks where it matters — in public perception, stakeholder trust
          and market position.
        </motion.p>
      </div>

      {/* static clone held at the card position while routing — the destination
          page animates it from this exact rect into its hero */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              left: leaving.rect.left,
              top: leaving.rect.top,
              width: leaving.rect.width,
              height: leaving.rect.height,
              borderRadius: 6,
              zIndex: 90,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={leaving.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .wex-hint { animation: wex-pulse 2.2s ease-in-out infinite; }
        @keyframes wex-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wex-hint { animation: none; }
        }
      `}</style>
    </section>
  );
}
