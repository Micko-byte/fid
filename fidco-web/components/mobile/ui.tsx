"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

type Tone = "dark" | "light";

const ink = (tone: Tone) => (tone === "dark" ? "#f5f2ec" : "#1c1c1c");
const line = (tone: Tone) =>
  tone === "dark" ? "rgba(245,242,236,0.32)" : "rgba(28,28,28,0.22)";

/* ── Outlined "Explore" pill ───────────────────────────────── */
export function ExplorePill({
  href = "#",
  label = "Explore",
  tone = "dark",
}: {
  href?: string;
  label?: string;
  tone?: Tone;
}) {
  return (
    <Link
      href={href}
      style={{
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.7rem 1.5rem",
        borderRadius: "999px",
        border: `1px solid ${line(tone)}`,
        fontFamily: "var(--font-body)",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: ink(tone),
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

/* ── Section head: title left, Explore pill right ──────────── */
export function MobileSectionHead({
  title,
  href,
  label = "Explore",
  tone = "dark",
}: {
  title: string;
  href?: string;
  label?: string;
  tone?: Tone;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "clamp(2rem, 8vw, 3rem)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: ink(tone),
          margin: 0,
        }}
      >
        {title}
      </h2>
      {href && <ExplorePill href={href} label={label} tone={tone} />}
    </div>
  );
}

/* ── Eyebrow label ─────────────────────────────────────────── */
export function MobileEyebrow({ children, tone = "dark", color = "#d98038" }: { children: ReactNode; tone?: Tone; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.66rem",
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
        opacity: tone === "dark" ? 1 : 0.95,
      }}
    >
      {children}
    </span>
  );
}

/* ── Horizontal slider with counter + circular arrow ───────── */
export function MobileSlider({
  children,
  tone = "dark",
}: {
  children: ReactNode[];
  tone?: Tone;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = children.length;

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  const next = () => {
    const el = scroller.current;
    if (!el) return;
    const target = (index + 1) % total;
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scroller}
        onScroll={onScroll}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: "0",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          marginInline: "-1px",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 100%",
              minWidth: "100%",
              scrollSnapAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* counter + arrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "clamp(1.4rem, 5vw, 2rem)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            color: tone === "dark" ? "rgba(245,242,236,0.6)" : "rgba(28,28,28,0.55)",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "999px",
            border: "none",
            background: "#d98038",
            color: "#260000",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowRight size={22} weight="bold" />
        </button>
      </div>

      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

/* ── Radial dial graphic (rotating spoked ring + centered icon/label) ── */
export function RadialDial({
  label,
  tone = "dark",
  dots = [],
  size = 240,
  icon,
  spin = 70,
  dir = 1,
  photo,
}: {
  label: string;
  tone?: Tone;
  dots?: string[];
  size?: number;
  icon?: ReactNode;
  spin?: number;
  dir?: 1 | -1;
  photo?: string;
}) {
  const R = 100;
  const cx = 120;
  const cy = 120;
  const ticks = 96;
  const tickColor = tone === "dark" ? "rgba(245,242,236,0.34)" : "rgba(28,28,28,0.28)";

  const spokes = Array.from({ length: ticks }, (_, i) => {
    const a = (i / ticks) * Math.PI * 2;
    const long = i % 8 === 0;
    return {
      x1: cx + Math.cos(a) * R,
      y1: cy + Math.sin(a) * R,
      x2: cx + Math.cos(a) * (R + (long ? 15 : 9)),
      y2: cy + Math.sin(a) * (R + (long ? 15 : 9)),
    };
  });

  const dotNodes = dots.map((c, i) => {
    const a = (i / Math.max(dots.length, 1)) * Math.PI * 2 + 0.6;
    return { c, x: cx + Math.cos(a) * (R + 7), y: cy + Math.sin(a) * (R + 7) };
  });

  const lines = label.split("\n");

  return (
    <div style={{ position: "relative", width: size, height: size, maxWidth: "100%" }}>
      {photo && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "8.33%", left: "8.33%",
            width: "83.33%", height: "83.33%",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(117,0,6,0.55) 0%, rgba(38,0,0,0.7) 100%)", mixBlendMode: "multiply" }} />
        </div>
      )}
      <svg viewBox="0 0 240 240" width={size} height={size} style={{ display: "block", position: "relative" }} aria-hidden>
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: `fid-dial-spin ${spin}s linear infinite`,
            animationDirection: dir === 1 ? "normal" : "reverse",
          }}
        >
          {spokes.map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={tickColor} strokeWidth="0.6" />
          ))}
          {dotNodes.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="4.5" fill={d.c} />
          ))}
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.45rem",
          textAlign: "center",
          pointerEvents: "none",
          padding: "0 14%",
        }}
      >
        {icon && <span style={{ color: "#d98038", display: "inline-flex" }}>{icon}</span>}
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.2, color: ink(tone) }}>
          {lines.map((ln, i) => (
            <span key={i} style={{ display: "block" }}>{ln}</span>
          ))}
        </span>
      </div>

      <style>{`@keyframes fid-dial-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
