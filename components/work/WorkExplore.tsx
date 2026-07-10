"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { WORK_SECTORS, getWorkSectorCount } from "@/components/lib/work-sectors";

const EASE = [0.16, 1, 0.3, 1] as const;

const mod = (n: number, m: number) => ((n % m) + m) % m;

type LayerCard = {
  sector: (typeof WORK_SECTORS)[number];
  active: boolean;
  width: string;
  top: string;
  left?: string;
  right?: string;
  transform: string;
  zIndex: number;
  opacity: number;
};

function WorkCard({
  card,
  onClick,
  onKeyDown,
  innerRef,
}: {
  card: LayerCard;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={innerRef}
      role={card.active ? "link" : undefined}
      tabIndex={card.active ? 0 : -1}
      aria-label={card.active ? `Open ${card.sector.title}` : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: card.opacity }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: "absolute",
        top: card.top,
        left: card.left,
        right: card.right,
        width: card.width,
        transform: card.transform,
        transformOrigin: "center",
        zIndex: card.zIndex,
        aspectRatio: "4 / 5.35",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: card.active ? "0 42px 110px rgba(31, 12, 7, 0.28)" : "0 24px 60px rgba(31, 12, 7, 0.16)",
        cursor: card.active ? "pointer" : "default",
        border: card.active ? "1px solid rgba(117,0,6,0.18)" : "1px solid rgba(117,0,6,0.08)",
        background: "#f6efe6",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={card.sector.slug}
          src={card.sector.cover}
          alt={card.sector.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AnimatePresence>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(24,10,6,0.02) 0%, rgba(24,10,6,0.08) 42%, rgba(24,10,6,0.84) 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, padding: "1rem 1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.8rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.82)", fontWeight: 700 }}>
            {getWorkSectorCount(card.sector.slug)} {getWorkSectorCount(card.sector.slug) === 1 ? "project" : "projects"}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.78)", fontWeight: 700 }}>
            {card.active ? "Open" : "Layer"}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: 0 }}>
            {card.active ? "Selected work" : "Sector"}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: card.active ? "clamp(1.6rem, 3vw, 2.6rem)" : "clamp(1rem, 2vw, 1.4rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#f5f2ec",
              margin: "0.35rem 0 0",
              maxWidth: "14ch",
              fontWeight: 900,
            }}
          >
            {card.sector.title}
          </h3>
          {card.active ? (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", lineHeight: 1.6, color: "rgba(245,242,236,0.78)", maxWidth: "30ch", margin: "0.8rem 0 0" }}>
              {card.sector.intro}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkExplore() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<null | { src: string; rect: DOMRect; href: string }>(null);
  const [paused, setPaused] = useState(false);

  const active = WORK_SECTORS[index];
  const count = WORK_SECTORS.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => mod(i + dir, count)), [count]);

  useEffect(() => {
    if (paused || leaving) return;
    const t = setInterval(() => go(1), 5200);
    return () => clearInterval(t);
  }, [paused, leaving, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

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
      setLeaving({ src: active.cover, rect, href: `/work/${active.slug}` });
    }
    router.push(`/work/${active.slug}`);
  };

  useEffect(() => {
    if (!leaving) return;
    const rescue = setTimeout(() => setLeaving(null), 2500);
    return () => clearTimeout(rescue);
  }, [leaving]);

  const cards: LayerCard[] = [
    {
      sector: WORK_SECTORS[mod(index + 3, count)],
      active: false,
      width: "clamp(170px, 24vw, 280px)",
      top: "62%",
      left: "0%",
      transform: "translateY(-50%) rotate(-8deg)",
      zIndex: 0,
      opacity: 0.24,
    },
    {
      sector: WORK_SECTORS[mod(index + 2, count)],
      active: false,
      width: "clamp(220px, 30vw, 360px)",
      top: "18%",
      left: "2%",
      transform: "rotate(-10deg)",
      zIndex: 1,
      opacity: 0.5,
    },
    {
      sector: WORK_SECTORS[mod(index + 1, count)],
      active: false,
      width: "clamp(210px, 28vw, 340px)",
      top: "4%",
      right: "3%",
      transform: "rotate(8deg)",
      zIndex: 2,
      opacity: 0.56,
    },
    {
      sector: active,
      active: true,
      width: "clamp(270px, 36vw, 460px)",
      top: "12%",
      left: "18%",
      transform: "rotate(0deg)",
      zIndex: 3,
      opacity: 1,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="work"
      data-nav-dark
      aria-label="Explore our work"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f7f0e5 0%, #f1e2d0 48%, #ead6bf 100%)",
        padding: "clamp(5.5rem, 11vh, 8rem) 0 clamp(5rem, 10vh, 7rem)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 72% 44% at 50% 0%, rgba(217,128,56,0.18) 0%, transparent 64%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-6%",
          top: "8%",
          width: "36rem",
          height: "36rem",
          background: "radial-gradient(circle, rgba(117,0,6,0.08) 0%, rgba(117,0,6,0) 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-8%",
          bottom: "-8%",
          width: "28rem",
          height: "28rem",
          background: "radial-gradient(circle, rgba(38,0,0,0.08) 0%, rgba(38,0,0,0) 70%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="section-shell work-layout"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)",
          alignItems: "center",
          gap: "clamp(2rem, 5vw, 4rem)",
        }}
      >
        <div style={{ position: "relative" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#750006",
              margin: 0,
              fontWeight: 700,
            }}
          >
            Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(4rem, 11vw, 9.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              textTransform: "uppercase",
              color: "#1d120e",
              margin: "0.45rem 0 0",
              fontWeight: 900,
            }}
          >
            OUR
            <br />
            WORK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.96rem",
              lineHeight: 1.82,
              color: "rgba(29,18,14,0.72)",
              maxWidth: "38ch",
              margin: "1.5rem 0 0",
            }}
          >
            A fresher, lighter showcase of the stories we build across public, private and cultural life, with layered images and no scroll-heavy effects.
          </motion.p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "1.5rem", maxWidth: "34rem" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(29,18,14,0.55)", fontWeight: 700 }}>
              {index + 1}/{count}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(29,18,14,0.55)", fontWeight: 700 }}>
              Press to view the work
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.85rem", marginTop: "1.4rem" }}>
            {([["prev", -1, ArrowLeft], ["next", 1, ArrowRight]] as const).map(([label, dir, Icon]) => (
              <button
                key={label}
                aria-label={label === "prev" ? "Previous sector" : "Next sector"}
                onClick={() => go(dir)}
                style={{
                  width: "clamp(52px, 7vw, 72px)",
                  height: "clamp(52px, 7vw, 72px)",
                  borderRadius: "999px",
                  border: "1px solid rgba(117,0,6,0.12)",
                  background: "rgba(245,242,236,0.82)",
                  boxShadow: "0 14px 30px rgba(31,12,7,0.08)",
                  color: "#750006",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                  e.currentTarget.style.background = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "rgba(245,242,236,0.82)";
                }}
              >
                <Icon size={22} weight="regular" />
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            minHeight: "clamp(540px, 64vw, 780px)",
            padding: "clamp(1rem, 2vw, 1.4rem)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "10% 7% 8%",
              borderRadius: "34px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 100%)",
              filter: "blur(0px)",
              transform: "rotate(-1deg)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "14% 12% 12%",
              borderRadius: "34px",
              border: "1px solid rgba(117,0,6,0.08)",
              background: "rgba(255,255,255,0.28)",
              transform: "rotate(1.5deg)",
            }}
          />

          {cards.map((card, cardIndex) => (
            <WorkCard
              key={`${cardIndex}-${card.sector.slug}`}
              card={card}
              innerRef={card.active ? featuredRef : undefined}
              onClick={card.active ? openSector : undefined}
              onKeyDown={card.active ? (e) => e.key === "Enter" && openSector() : undefined}
            />
          ))}
        </div>
      </div>

      <div className="section-shell" style={{ position: "relative", zIndex: 2, marginTop: "clamp(2rem, 5vh, 3.5rem)" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.45rem, 3vw, 2.2rem)",
            color: "#1d120e",
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            maxWidth: "28ch",
          }}
        >
          Proof across public,
          <br />
          private and cultural life.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            lineHeight: 1.78,
            color: "rgba(29,18,14,0.68)",
            maxWidth: "48ch",
            margin: "1rem 0 0",
          }}
        >
          There are {count} sectors in operation at the moment, each engagement shaped by insight, strategy and cultural context across 8+ African markets.
        </motion.p>
      </div>

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
        @media (max-width: 980px) {
          .work-layout {
            grid-template-columns: 1fr !important;
          }
          .work-layout > div:last-child {
            min-height: clamp(440px, 92vw, 620px) !important;
          }
        }
      `}</style>
    </section>
  );
}
