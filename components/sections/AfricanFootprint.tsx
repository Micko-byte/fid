"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TextRoll } from "@/components/core/text-roll";

type Country = {
  name: string;
  code: string;
};

const countries: Country[] = [
  { name: "Kenya", code: "KE" },
  { name: "Uganda", code: "UG" },
  { name: "Rwanda", code: "RW" },
  { name: "Ethiopia", code: "ET" },
  { name: "South Sudan", code: "SS" },
  { name: "Zambia", code: "ZM" },
  { name: "Ghana", code: "GH" },
  { name: "Tanzania", code: "TZ" },
];

const ROOT_WIDTH = 239.05701;
const ROOT_HEIGHT = 217.31789;

function injectViewBox(svg: string) {
  const withViewBox = svg.replace(
    /<svg\b([^>]*)>/,
    `<svg$1 viewBox="0 0 ${ROOT_WIDTH} ${ROOT_HEIGHT}" preserveAspectRatio="xMidYMid meet">`
  );
  return withViewBox
    .replace(/width="[^"]*"/, 'width="100%"')
    .replace(/height="[^"]*"/, 'height="100%"');
}

export default function AfricanFootprint() {
  const [svgMarkup, setSvgMarkup] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [focus, setFocus] = useState({ x: 0, y: 0, scale: 1 });
  const mapHostRef = useRef<HTMLDivElement>(null);

  const activeCode = pinned ?? hovered;
  const activeCountry = useMemo(
    () => countries.find((country) => country.code === activeCode) ?? null,
    [activeCode]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/africa.svg", { cache: "force-cache" });
      const raw = await res.text();
      if (!mounted) return;
      setSvgMarkup(injectViewBox(raw));
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const updateFocus = () => {
      const host = mapHostRef.current;
      if (!host || !activeCode) {
        setFocus({ x: 0, y: 0, scale: 1 });
        return;
      }

      const svgEl = host.querySelector("svg");
      const target = svgEl?.querySelector(`#${activeCode}`) as SVGGraphicsElement | null;
      if (!svgEl || !target) {
        setFocus({ x: 0, y: 0, scale: 1 });
        return;
      }

      const svgRect = svgEl.getBoundingClientRect();
      const box = target.getBBox();
      const scaleX = svgRect.width / ROOT_WIDTH;
      const scaleY = svgRect.height / ROOT_HEIGHT;
      const scale = Math.min(
        (svgRect.width / (box.width * scaleX)) * 0.74,
        (svgRect.height / (box.height * scaleY)) * 0.74,
        4.8
      );
      const centerX = (box.x + box.width / 2) * scaleX;
      const centerY = (box.y + box.height / 2) * scaleY;
      const tx = -(centerX - svgRect.width / 2) * scale;
      const ty = -(centerY - svgRect.height / 2) * scale;

      setFocus({ x: tx, y: ty, scale });
    };

    updateFocus();

    const resizeObserver = new ResizeObserver(updateFocus);
    if (mapHostRef.current) resizeObserver.observe(mapHostRef.current);
    window.addEventListener("resize", updateFocus);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateFocus);
    };
  }, [activeCode, svgMarkup]);

  return (
    <section className="af-footprint" style={{ marginTop: "clamp(3rem,6vw,5rem)", paddingTop: 0 }}>
      {/* Centered header */}
      <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto clamp(2.4rem,5vw,3.6rem)" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d9ab88", marginBottom: "0.9rem" }}>
          African footprint
        </span>
        <h3 style={{ fontFamily: 'var(--font-heading, var(--font-heading))', fontWeight: 800, color: "#1a1a1a", fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
          <TextRoll>8+ markets across East &amp; Southern Africa — and beyond.</TextRoll>
        </h3>
      </div>

      <div
        className="af-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 1.15fr) minmax(0, 0.85fr)",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "center",
        }}
      >
        <div
          className="af-map"
          ref={mapHostRef}
          data-active={activeCode ?? ""}
          onClick={() => {
            setPinned(null);
            setHovered(null);
          }}
          style={{
            position: "relative",
            minHeight: "clamp(320px, 44vw, 520px)",
            overflow: "hidden",
            cursor: activeCode ? "zoom-out" : "default",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${focus.x}px, ${focus.y}px) scale(${focus.scale})`,
              transformOrigin: "center center",
              transition: "transform 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {svgMarkup ? (
              <div
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : null}
          </div>

          <div
            key={activeCountry?.code ?? "all"}
            style={{
              position: "absolute",
              left: "1rem",
              bottom: "1rem",
              padding: "0.6rem 0.9rem",
              borderRadius: "999px",
              backgroundColor: "#FFFFFF",
              color: "#260000",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              fontWeight: 600,
              textTransform: "uppercase",
              border: "1px solid rgba(92,60,44,0.16)",
            }}
          >
            {activeCountry ? activeCountry.name : "Full map"}
          </div>
        </div>

        <div
          className="af-flags"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0.7rem",
          }}
        >
          {countries.map((country) => {
            const activeState = activeCode === country.code;
            return (
              <button
                key={country.code}
                type="button"
                onMouseEnter={() => setHovered(country.code)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(country.code)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((current) => (current === country.code ? null : country.code))}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  border: `1px solid ${activeState ? "#d9ab88" : "rgba(92,60,44,0.16)"}`,
                  backgroundColor: activeState ? "rgba(217,171,136,0.1)" : "#FFFFFF",
                  padding: "0.55rem 0.8rem",
                  borderRadius: "999px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "transform 0.35s ease, border-color 0.35s ease, background-color 0.35s ease",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={`${country.name} flag`}
                  width={22}
                  height={15}
                  loading="lazy"
                  style={{
                    width: "22px",
                    height: "15px",
                    objectFit: "cover",
                    borderRadius: "1px",
                    flexShrink: 0,
                  }}
                />
                {country.name}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .af-grid { grid-template-columns: 1fr !important; }
          .af-map { min-height: 340px !important; }
        }
        @media (max-width: 560px) {
          .af-flags { grid-template-columns: 1fr !important; }
          .af-map { min-height: 280px !important; }
        }
        .af-map svg {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        .af-map svg path {
          fill: rgba(92,60,44,0.10);
          stroke: rgba(92,60,44,0.28);
          stroke-width: 0.45;
          transition:
            fill 1800ms cubic-bezier(0.22, 1, 0.36, 1),
            stroke 1800ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 1800ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 1800ms cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.95;
        }
        .af-map[data-active="KE"] svg path#KE,
        .af-map[data-active="UG"] svg path#UG,
        .af-map[data-active="RW"] svg path#RW,
        .af-map[data-active="ET"] svg path#ET,
        .af-map[data-active="SS"] svg path#SS,
        .af-map[data-active="ZM"] svg path#ZM,
        .af-map[data-active="GH"] svg path#GH,
        .af-map[data-active="TZ"] svg path#TZ {
          opacity: 1;
          fill: #d9ab88;
          stroke: #750006;
          filter: drop-shadow(0 0 10px rgba(217,171,136,0.35));
        }
      `}</style>
    </section>
  );
}
