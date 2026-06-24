"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
type Country = { name: string; code: string };

const countries: Country[] = [
  { name: "Kenya",       code: "KE" },
  { name: "Uganda",      code: "UG" },
  { name: "Rwanda",      code: "RW" },
  { name: "Ethiopia",    code: "ET" },
  { name: "South Sudan", code: "SS" },
  { name: "Zambia",      code: "ZM" },
  { name: "Ghana",       code: "GH" },
  { name: "Tanzania",    code: "TZ" },
];

const ROOT_W = 239.05701;
const ROOT_H = 217.31789;

function injectDefs(svg: string, active: string | null): string {
  const defs = `<defs>
    <pattern id="fid-dot" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="1.8" cy="1.8" r="0.7" fill="rgba(117,0,6,0.28)"/>
    </pattern>
    <pattern id="fid-dot-hi" x="0" y="0" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="0.9" fill="#d9ab88"/>
    </pattern>
  </defs>`;

  // Inject defs right after opening svg tag
  let result = svg.replace(/(<svg[^>]*>)/, `$1${defs}`);

  // Inject viewBox + responsive attrs
  result = result
    .replace(/<svg\b([^>]*)>/, `<svg$1 viewBox="0 0 ${ROOT_W} ${ROOT_H}" preserveAspectRatio="xMidYMid meet">`)
    .replace(/width="[^"]*"/, 'width="100%"')
    .replace(/height="[^"]*"/, 'height="100%"');

  return result;
}

function buildCss(active: string | null): string {
  const base = `
    .af-map svg { width:100% !important; height:100% !important; display:block; }
    .af-map svg path {
      fill: url(#fid-dot);
      stroke: rgba(117,0,6,0.18);
      stroke-width: 0.3;
      transition: fill 0.55s ease;
    }
  `;
  if (!active) return base;
  return base + `.af-map svg path#${active} { fill: url(#fid-dot-hi); stroke: #750006; stroke-width: 0.5; }`;
}

export default function AfricanFootprint() {
  const [svgMarkup, setSvgMarkup]   = useState("");
  const [active, setActive]         = useState<string | null>(null);
  const [pinned, setPinned]         = useState<string | null>(null);
  const mapHostRef                  = useRef<HTMLDivElement>(null);

  const activeCode    = pinned ?? active;
  const activeCountry = countries.find(c => c.code === activeCode) ?? null;

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/africa.svg", { cache: "force-cache" });
      const raw = await res.text();
      if (!mounted) return;
      setSvgMarkup(injectDefs(raw, null));
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="af-footprint" style={{ marginTop: "clamp(3rem,6vw,5rem)", paddingTop: 0 }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto clamp(2.4rem,5vw,3.6rem)" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d9ab88", marginBottom: "0.9rem" }}>
          African footprint
        </span>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#1c1c1c", fontSize: "clamp(1.9rem,3.6vw,3rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", textWrap: "balance" } as React.CSSProperties}>
          8+ markets across East &amp; Southern Africa — and beyond.
        </h3>
      </div>

      <div className="af-grid" style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.15fr) minmax(0,0.85fr)", gap: "clamp(2rem,5vw,4rem)", alignItems: "center" }}>

        {/* Map */}
        <div
          ref={mapHostRef}
          className="af-map"
          style={{ position: "relative", minHeight: "clamp(320px,44vw,520px)" }}
        >
          {svgMarkup && (
            <div dangerouslySetInnerHTML={{ __html: svgMarkup }} style={{ width: "100%", height: "100%" }} />
          )}

          {/* Dither CSS targeting active path */}
          <style>{buildCss(activeCode)}</style>

          {/* Floating country label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountry?.code ?? "none"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", left: "1rem", bottom: "1rem", padding: "0.55rem 1rem", borderRadius: "999px", backgroundColor: activeCountry ? "#d9ab88" : "rgba(245,242,236,0.82)", color: activeCountry ? "#260000" : "rgba(28,28,28,0.45)", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase", border: "1px solid rgba(117,0,6,0.16)", backdropFilter: "blur(8px)" }}
            >
              {activeCountry ? activeCountry.name : "All markets"}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Country buttons */}
        <div className="af-flags" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "0.7rem" }}>
          {countries.map((country, i) => {
            const isActive = activeCode === country.code;
            return (
              <motion.button
                key={country.code}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                onMouseEnter={() => setActive(country.code)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setPinned(p => p === country.code ? null : country.code)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  border: `1px solid ${isActive ? "#d9ab88" : "rgba(117,0,6,0.16)"}`,
                  backgroundColor: isActive ? "rgba(217,171,136,0.14)" : "#f5f2ec",
                  padding: "0.55rem 0.85rem", borderRadius: "999px",
                  fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: isActive ? 700 : 500,
                  color: "#1c1c1c", textAlign: "left", cursor: "pointer",
                  transition: "border-color 0.3s, background 0.3s, font-weight 0.2s",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={`${country.name} flag`}
                  width={22} height={15} loading="lazy"
                  style={{ width: "22px", height: "15px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
                />
                {country.name}
                {isActive && (
                  <motion.span
                    layoutId="country-active-pill"
                    style={{ position: "absolute", inset: 0, borderRadius: "999px", background: "rgba(217,171,136,0.08)", pointerEvents: "none" }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .af-grid  { grid-template-columns: 1fr !important; }
          .af-map   { min-height: 340px !important; }
        }
        @media (max-width: 560px) {
          .af-flags { grid-template-columns: 1fr !important; }
          .af-map   { min-height: 280px !important; }
        }
      `}</style>
    </section>
  );
}
