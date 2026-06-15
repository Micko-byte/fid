"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const COUNTRY_ACCENTS: Record<string, string> = {
  KE: "#F1E194",
  UG: "#79C57B",
  RW: "#86C5F4",
  ET: "#DFA85C",
  SS: "#D98A5B",
  ZM: "#9CCB8E",
  GH: "#E89C72",
  TZ: "#8FBDEB",
};

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
      <div
        className="af-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(320px, 1.1fr)",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "center",
          padding: "clamp(2rem, 4vw, 4rem)",
          background:
            "radial-gradient(circle at 18% 20%, rgba(241,225,148,0.08), transparent 26%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.05), transparent 22%), linear-gradient(180deg, #2a0508 0%, #180304 100%)",
          border: "1px solid rgba(241,225,148,0.12)",
          boxShadow: "0 30px 90px rgba(26,3,6,0.18)",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#F1E194",
            }}
          >
            <span style={{ width: "26px", height: "1px", background: "#F1E194", opacity: 0.7 }} />
            African footprint
          </span>

          <h3
            style={{
              fontFamily: "var(--font-heading,'Oswald')",
              fontWeight: 500,
              color: "#F5F2EC",
              fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: "18ch",
              margin: "1rem 0 0.9rem",
            }}
          >
            8+ markets across East &amp; Southern Africa — and beyond.
          </h3>

          <div
            className="af-flags"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "0.7rem",
              maxWidth: "30rem",
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
                    border: `1px solid ${activeState ? "rgba(241,225,148,0.65)" : "rgba(255,255,255,0.14)"}`,
                    backgroundColor: activeState ? "rgba(241,225,148,0.12)" : "rgba(255,255,255,0.03)",
                    padding: "0.55rem 0.8rem",
                    borderRadius: "999px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "rgba(245,242,236,0.92)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition:
                      "transform 0.35s ease, border-color 0.35s ease, background-color 0.35s ease, color 0.35s ease",
                    backdropFilter: "blur(6px)",
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
                      boxShadow: activeState ? "0 0 0 4px rgba(241,225,148,0.1)" : "none",
                      flexShrink: 0,
                    }}
                  />
                  {country.name}
                </button>
              );
            })}
          </div>
        </div>

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
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            border: "1px solid rgba(241,225,148,0.14)",
            overflow: "hidden",
            cursor: activeCode ? "zoom-out" : "default",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "8%",
              borderRadius: "999px",
              border: "1px solid rgba(241,225,148,0.18)",
              boxShadow: "0 0 120px rgba(241,225,148,0.08)",
              pointerEvents: "none",
              opacity: activeCode ? 0.7 : 0.3,
              animation: activeCode ? "af-pulse 6s ease-in-out infinite" : "none",
            }}
          />

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
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : null}
          </div>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "auto 12% 12% auto",
              width: "28%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              border: "1px solid rgba(241,225,148,0.26)",
              filter: "blur(0.2px)",
              pointerEvents: "none",
              opacity: activeCode ? 0.5 : 0.22,
              animation: activeCode ? "af-pulse 8s ease-in-out infinite" : "none",
            }}
          />

          <div
            key={activeCountry?.code ?? "all"}
            style={{
              position: "absolute",
              left: "1rem",
              bottom: "1rem",
              padding: "0.65rem 0.9rem",
              borderRadius: "999px",
              backgroundColor: "rgba(245,242,236,0.9)",
              color: "#2a0508",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              border: "1px solid rgba(241,225,148,0.24)",
            }}
          >
            {activeCountry ? activeCountry.name : "Full map"}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes af-pulse {
          0%, 100% { transform: scale(0.98); opacity: 0.25; }
          50% { transform: scale(1.04); opacity: 0.6; }
        }
        @media (max-width: 900px) {
          .af-grid { grid-template-columns: 1fr !important; }
          .af-map { min-height: 340px !important; }
        }
        @media (max-width: 560px) {
          .af-flags { grid-template-columns: 1fr !important; }
          .af-map { min-height: 280px !important; }
          .af-grid { padding: clamp(1.25rem, 5vw, 2rem) !important; }
        }
        .af-map svg {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        .af-map svg path {
          fill: rgba(245,242,236,0.16);
          stroke: rgba(245,242,236,0.3);
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
          filter: drop-shadow(0 0 10px rgba(241,225,148,0.28));
          stroke: rgba(255,255,255,0.92);
        }
        .af-map[data-active="KE"] svg path#KE { fill: ${COUNTRY_ACCENTS.KE}; }
        .af-map[data-active="UG"] svg path#UG { fill: ${COUNTRY_ACCENTS.UG}; }
        .af-map[data-active="RW"] svg path#RW { fill: ${COUNTRY_ACCENTS.RW}; }
        .af-map[data-active="ET"] svg path#ET { fill: ${COUNTRY_ACCENTS.ET}; }
        .af-map[data-active="SS"] svg path#SS { fill: ${COUNTRY_ACCENTS.SS}; }
        .af-map[data-active="ZM"] svg path#ZM { fill: ${COUNTRY_ACCENTS.ZM}; }
        .af-map[data-active="GH"] svg path#GH { fill: ${COUNTRY_ACCENTS.GH}; }
        .af-map[data-active="TZ"] svg path#TZ { fill: ${COUNTRY_ACCENTS.TZ}; }
      `}</style>
    </section>
  );
}
