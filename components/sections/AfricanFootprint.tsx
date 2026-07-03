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

function injectDefs(svg: string): string {
  const defs = `<defs>
    <pattern id="fid-dot" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.85" fill="rgba(117,0,6,0.22)"/>
    </pattern>
    <pattern id="fid-dot-hi" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.05" fill="#d98038"/>
    </pattern>
  </defs>`;

  let result = svg.replace(/(<svg[^>]*>)/, `$1${defs}`);
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
      stroke: rgba(117,0,6,0.16);
      stroke-width: 0.28;
      transition: fill 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1), filter 0.45s ease;
      transform-box: fill-box;
      transform-origin: center;
    }
  `;
  if (!active) return base;
  return base + `
    .af-map svg path#${active} {
      fill: url(#fid-dot-hi);
      stroke: #750006;
      stroke-width: 0.55;
      transform: scale(1.06);
      filter: drop-shadow(0 0 3px rgba(217,128,56,0.55));
    }`;
}

export default function AfricanFootprint() {
  const [svgMarkup, setSvgMarkup] = useState("");
  const [active, setActive]       = useState<string | null>(null);
  const [pinned, setPinned]       = useState<string | null>(null);

  const activeCode    = pinned ?? active;
  const activeCountry = countries.find(c => c.code === activeCode) ?? null;

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/africa.svg", { cache: "force-cache" });
      const raw = await res.text();
      if (!mounted) return;
      setSvgMarkup(injectDefs(raw));
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="af-footprint" style={{ marginTop: "clamp(3rem,6vw,5rem)", paddingTop: 0 }}>

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto clamp(2rem,4vw,3rem)" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d9ab88", marginBottom: "0.9rem" }}>
          African footprint
        </span>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#1c1c1c", fontSize: "clamp(1.9rem,3.6vw,3rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", textWrap: "balance" } as React.CSSProperties}>
          8+ markets across East &amp; Southern Africa — and beyond.
        </h3>
      </div>

      {/* Map — full width, compact height */}
      <div
        className="af-map"
        style={{ position: "relative", width: "100%", maxWidth: "680px", margin: "0 auto", height: "clamp(260px,38vw,440px)" }}
      >
        {svgMarkup && (
          <div dangerouslySetInnerHTML={{ __html: svgMarkup }} style={{ width: "100%", height: "100%" }} />
        )}
        <style>{buildCss(activeCode)}</style>

        {/* Active country pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCountry?.code ?? "none"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            style={{
              position: "absolute", left: "1rem", bottom: "0.8rem",
              padding: "0.45rem 1rem", borderRadius: "999px",
              backgroundColor: activeCountry ? "#750006" : "rgba(245,242,236,0.85)",
              color: activeCountry ? "#f5f2ec" : "rgba(28,28,28,0.45)",
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase",
              border: `1px solid ${activeCountry ? "rgba(117,0,6,0.5)" : "rgba(117,0,6,0.16)"}`,
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
          >
            {activeCountry && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://flagcdn.com/w40/${activeCountry.code.toLowerCase()}.png`}
                alt="" width={18} height={12}
                style={{ width: "18px", height: "12px", objectFit: "cover", borderRadius: "2px" }}
              />
            )}
            {activeCountry ? activeCountry.name : "All markets"}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Country pills — compact row below map */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1.2rem", maxWidth: "680px", margin: "1.2rem auto 0" }}>
        {countries.map((country, i) => {
          const isActive = activeCode === country.code;
          return (
            <motion.button
              key={country.code}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onMouseEnter={() => setActive(country.code)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setPinned(p => p === country.code ? null : country.code)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                border: `1px solid ${isActive ? "#750006" : "rgba(117,0,6,0.18)"}`,
                backgroundColor: isActive ? "#750006" : "rgba(245,242,236,0.7)",
                padding: "0.38rem 0.75rem", borderRadius: "999px",
                fontFamily: "var(--font-body)", fontSize: "0.74rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#f5f2ec" : "#1c1c1c",
                cursor: "pointer",
                transition: "border-color 0.25s, background 0.25s, color 0.25s",
                boxShadow: isActive ? "0 4px 14px rgba(117,0,6,0.22)" : "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={18} height={12} loading="lazy"
                style={{ width: "18px", height: "12px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
              />
              {country.name}
            </motion.button>
          );
        })}
      </div>

    </section>
  );
}
