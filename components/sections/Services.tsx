"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Megaphone, Newspaper, ShareNetwork, ChartLineUp, Confetti } from "@phosphor-icons/react";
import HoverIcon from "@/components/ui/HoverIcon";

/* ── Circle geometry ── */
const SVG_SIZE = 280;
const CX = 140;
const CY = 140;
const R = 118;
const TICK_N = 100;

type Tick = { x1: number; y1: number; x2: number; y2: number; weight: number; opacity: number };

const TICKS: Tick[] = Array.from({ length: TICK_N }, (_, i) => {
  const angle = (i / TICK_N) * 360;
  const rad = (angle * Math.PI) / 180;
  const long = i % 10 === 0;
  const inner = R - (long ? 14 : 8);
  return {
    x1: CX + inner * Math.cos(rad),
    y1: CY + inner * Math.sin(rad),
    x2: CX + R * Math.cos(rad),
    y2: CY + R * Math.sin(rad),
    weight: 0.6,
    opacity: long ? 0.5 : 0.28,
  };
});

function pos(angleDeg: number, r = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

/* ── Service definitions ── */
const SERVICES = [
  {
    num: "01",
    lines: ["Strategic", "Communications"],
    slug: "strategic-communications",
    description: "Reputation, narrative and media relations at scale.",
    Icon: Megaphone,
    cw: {
      speed: 48,
      dots: [
        { angle: 22,  color: "#750006", r: 9 },
        { angle: 88,  color: "#d98038", r: 7 },
        { angle: 152, color: "#f5f2ec", r: 8 },
        { angle: 215, color: "#750006", r: 6 },
        { angle: 278, color: "#d9ab88", r: 9 },
        { angle: 338, color: "#d98038", r: 7 },
      ],
    },
    ccw: {
      speed: 68,
      dots: [
        { angle: 55,  color: "#d9ab88", r: 7 },
        { angle: 180, color: "#f5f2ec", r: 6 },
        { angle: 305, color: "#750006", r: 8 },
      ],
    },
  },
  {
    num: "02",
    lines: ["Media", "Management"],
    slug: "media-management",
    description: "Media planning, buying and performance tracking.",
    Icon: Newspaper,
    cw: {
      speed: 55,
      dots: [
        { angle: 40,  color: "#d98038", r: 8 },
        { angle: 100, color: "#750006", r: 9 },
        { angle: 165, color: "#d9ab88", r: 7 },
        { angle: 230, color: "#f5f2ec", r: 8 },
        { angle: 295, color: "#750006", r: 6 },
        { angle: 355, color: "#d98038", r: 9 },
      ],
    },
    ccw: {
      speed: 75,
      dots: [
        { angle: 75,  color: "#f5f2ec", r: 6 },
        { angle: 195, color: "#d98038", r: 7 },
        { angle: 315, color: "#d9ab88", r: 8 },
      ],
    },
  },
  {
    num: "03",
    lines: ["Digital &", "Influencer"],
    slug: "influencer-creator",
    description: "Creator campaigns and always-on social strategy.",
    Icon: ShareNetwork,
    cw: {
      speed: 62,
      dots: [
        { angle: 10,  color: "#f5f2ec", r: 7 },
        { angle: 72,  color: "#750006", r: 9 },
        { angle: 138, color: "#d98038", r: 8 },
        { angle: 200, color: "#d9ab88", r: 7 },
        { angle: 265, color: "#750006", r: 9 },
        { angle: 325, color: "#d98038", r: 6 },
      ],
    },
    ccw: {
      speed: 80,
      dots: [
        { angle: 45,  color: "#d9ab88", r: 8 },
        { angle: 170, color: "#750006", r: 6 },
        { angle: 290, color: "#f5f2ec", r: 7 },
      ],
    },
  },
  {
    num: "04",
    lines: ["Digital Strategy", "& Social"],
    slug: "digital-strategy",
    description: "Digital-first storytelling and community growth.",
    Icon: ChartLineUp,
    cw: {
      speed: 52,
      dots: [
        { angle: 30,  color: "#d9ab88", r: 8 },
        { angle: 95,  color: "#f5f2ec", r: 7 },
        { angle: 155, color: "#750006", r: 9 },
        { angle: 218, color: "#d98038", r: 8 },
        { angle: 282, color: "#d9ab88", r: 7 },
        { angle: 345, color: "#750006", r: 9 },
      ],
    },
    ccw: {
      speed: 72,
      dots: [
        { angle: 62,  color: "#d98038", r: 7 },
        { angle: 188, color: "#d9ab88", r: 8 },
        { angle: 308, color: "#750006", r: 6 },
      ],
    },
  },
  {
    num: "05",
    lines: ["Experiential", "Marketing"],
    slug: "experiential-marketing",
    description: "Immersive brand moments and live activations.",
    Icon: Confetti,
    cw: {
      speed: 58,
      dots: [
        { angle: 18,  color: "#d98038", r: 9 },
        { angle: 80,  color: "#d9ab88", r: 7 },
        { angle: 142, color: "#750006", r: 8 },
        { angle: 205, color: "#f5f2ec", r: 9 },
        { angle: 268, color: "#d98038", r: 7 },
        { angle: 330, color: "#750006", r: 8 },
      ],
    },
    ccw: {
      speed: 78,
      dots: [
        { angle: 50,  color: "#f5f2ec", r: 7 },
        { angle: 175, color: "#750006", r: 8 },
        { angle: 300, color: "#d9ab88", r: 6 },
      ],
    },
  },
];

/* ── Radar circle ── */
function RadarCircle({
  svc,
  index,
}: {
  svc: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const cwDots  = svc.cw.dots.map(d => ({ ...d, ...pos(d.angle) }));
  const ccwDots = svc.ccw.dots.map(d => ({ ...d, ...pos(d.angle) }));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", flexShrink: 0 }}
      className="radar-wrap"
    >
      <Link
        href={`/services/${svc.slug}`}
        style={{ display: "block", position: "relative", textDecoration: "none" }}
        aria-label={svc.lines.join(" ")}
      >
        <svg
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          width={SVG_SIZE}
          height={SVG_SIZE}
          className="radar-svg"
          aria-hidden="true"
        >
          {/* ── Main ring ── */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="rgba(245,242,236,0.14)"
            strokeWidth="1"
          />

          {/* ── Inner ring echo ── */}
          <circle
            cx={CX} cy={CY} r={R * 0.72}
            fill="none"
            stroke="rgba(245,242,236,0.05)"
            strokeWidth="0.7"
          />

          {/* ── Tick marks ── */}
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={`rgba(245,242,236,${t.opacity})`}
              strokeWidth={t.weight}
              strokeLinecap="round"
            />
          ))}

          {/* ── CW dot group ── */}
          <g
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: `radar-cw-${index} ${svc.cw.speed}s linear infinite`,
            }}
          >
            {cwDots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r={d.r + 3} fill={d.color} opacity={0.18} />
                <circle cx={d.x} cy={d.y} r={d.r} fill={d.color} />
              </g>
            ))}
          </g>

          {/* ── CCW dot group ── */}
          <g
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: `radar-ccw-${index} ${svc.ccw.speed}s linear infinite`,
            }}
          >
            {ccwDots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r={d.r + 2} fill={d.color} opacity={0.2} />
                <circle cx={d.x} cy={d.y} r={d.r} fill={d.color} />
              </g>
            ))}
          </g>

        </svg>

        {/* ── Center: icon + label (HTML overlay, like mobile) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.55rem",
            pointerEvents: "none",
            textAlign: "center",
            padding: "0 24%",
          }}
        >
          <HoverIcon icon={svc.Icon} size={44} weight="light" hoverWeight="fill" scale={1.15} rotate={-6} color="#d98038" />
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.15, color: "rgba(245,242,236,0.95)", letterSpacing: "-0.01em" }}>
            {svc.lines.map((line, li) => (
              <span key={li} style={{ display: "block" }}>{line}</span>
            ))}
          </span>
        </div>

        {/* ── Hover ring glow ── */}
        <span className="radar-ring-glow" aria-hidden="true" />
      </Link>

      {/* ── Keyframe styles per circle ── */}
      <style>{`
        @keyframes radar-cw-${index} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes radar-ccw-${index} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </motion.div>
  );
}

/* ── Section ── */
export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="section-dark"
      data-nav-dark
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#260000",
        paddingTop: "clamp(4rem,9vw,7rem)",
        paddingBottom: "clamp(4rem,9vw,8rem)",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 50% at 50% 30%, rgba(217,128,56,0.20) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 60%, rgba(117,0,6,0.35) 0%, transparent 72%)" }} />
      <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.8 }} />

      {/* ── Header ── */}
      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem,5vw,6rem)",
          paddingRight: "clamp(1.5rem,5vw,6rem)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "2rem",
          marginBottom: "clamp(3rem,7vw,5rem)",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.9rem" }}
          >
            What we do
          </motion.p>
          <motion.h2
            data-skew
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.8rem,6vw,5.2rem)", lineHeight: 0.94, letterSpacing: "-0.03em", color: "#f5f2ec", maxWidth: "12ch", margin: 0 }}
          >
            Our Expertise
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flexShrink: 0, paddingTop: "0.25rem" }}
        >
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.76rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#f5f2ec",
              border: "1px solid rgba(245,242,236,0.3)",
              padding: "0.75rem 1.4rem",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "background 0.3s, border-color 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,242,236,0.1)"; e.currentTarget.style.borderColor = "rgba(245,242,236,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,242,236,0.3)"; }}
          >
            Explore all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </motion.div>
      </div>

      {/* ── Circles row ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowX: "auto",
          overflowY: "visible",
          paddingLeft: "clamp(1rem,3vw,3rem)",
          paddingRight: "clamp(1rem,3vw,3rem)",
          scrollbarWidth: "none",
        }}
        className="radar-row"
      >
        {SERVICES.map((svc, i) => (
          <RadarCircle key={svc.slug} svc={svc} index={i} />
        ))}
      </div>

      {/* ── Descriptors row ── */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "clamp(2.5rem,5vw,4rem) auto 0",
          paddingLeft: "clamp(1.5rem,5vw,6rem)",
          paddingRight: "clamp(1.5rem,5vw,6rem)",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "clamp(1rem,2vw,2rem)",
          position: "relative",
          zIndex: 2,
        }}
        className="radar-desc-grid"
      >
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            style={{ textAlign: "center" }}
          >
            <Link href={`/services/${svc.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.5rem" }}>
                {svc.num}
              </span>
              <span
                style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.45, color: "rgba(245,242,236,0.72)", transition: "color 0.25s" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#f5f2ec")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(245,242,236,0.72)")}
              >
                {svc.description}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        .radar-row { scrollbar-width: none; }
        .radar-row::-webkit-scrollbar { display: none; }
        .radar-wrap { position: relative; }
        .radar-wrap + .radar-wrap { margin-left: clamp(0.8rem, 2vw, 1.5rem); }

        @keyframes radar-hover-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .radar-svg {
          display: block;
          transition: filter 0.5s ease;
        }
        .radar-wrap:hover .radar-svg {
          filter: drop-shadow(0 0 28px rgba(217,128,56,0.35));
          animation: radar-hover-spin 8s linear infinite;
        }

        .radar-ring-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(circle, rgba(117,0,6,0.2) 0%, transparent 70%);
          transition: opacity 0.5s ease;
        }
        .radar-wrap:hover .radar-ring-glow { opacity: 1; }

        @media (max-width: 900px) {
          .radar-row { justify-content: flex-start; padding-bottom: 1rem; }
          .radar-wrap + .radar-wrap { margin-left: 0.6rem; }
          .radar-desc-grid { grid-template-columns: 1fr 1fr !important; }
          .radar-desc-grid > div:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 580px) {
          .radar-desc-grid { grid-template-columns: 1fr !important; }
          .radar-desc-grid > div:last-child { grid-column: auto; }
        }
      `}</style>
    </section>
  );
}
