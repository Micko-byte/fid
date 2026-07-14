"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Country = { name: string; code: string };

const countries: Country[] = [
  { name: "Kenya", code: "KE" },
  { name: "Uganda", code: "UG" },
  { name: "Rwanda", code: "RW" },
  { name: "Ethiopia", code: "ET" },
  { name: "South Sudan", code: "SS" },
  { name: "Zambia", code: "ZM" },
  { name: "Ghana", code: "GH" },
  { name: "Tanzania", code: "TZ" },
  { name: "South Africa", code: "ZA" },
];

const ROOT_W = 239.05701;
const ROOT_H = 217.31789;

function injectDefs(svg: string): string {
  const defs = `<defs>
    <linearGradient id="fid-map-wash" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5f2ec" />
      <stop offset="48%" stop-color="#f7e7db" />
      <stop offset="100%" stop-color="#f0c9ae" />
    </linearGradient>
    <pattern id="fid-dot" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.95" fill="rgba(117,0,6,0.22)"/>
      <circle cx="5" cy="5" r="0.7" fill="rgba(217,128,56,0.15)"/>
    </pattern>
    <pattern id="fid-dot-hi" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.05" fill="#d98038"/>
    </pattern>
    <filter id="fid-grain" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.05" />
      </feComponentTransfer>
    </filter>
  </defs>`;

  let result = svg.replace(/(<svg[^>]*>)/, `$1${defs}`);
  result = result
    .replace(/<svg\b([^>]*)>/, `<svg$1 viewBox="0 0 ${ROOT_W} ${ROOT_H}" preserveAspectRatio="xMidYMid meet">`)
    .replace(/width="[^"]*"/, 'width="100%"')
    .replace(/height="[^"]*"/, 'height="100%"');
  return result;
}

function buildCss(active: string | null, marketCodes: string[]): string {
  const marketSelector = marketCodes.map((c) => `.af-map svg path#${c}`).join(",\n    ");
  const marketRule = `
    ${marketSelector} {
      fill: #e08a35;
      stroke: #260000;
      stroke-width: 0.45;
    }
    ${marketSelector.replaceAll(",", ":hover,")}:hover {
      fill: #f0a050;
      stroke: #f5f2ec;
      transform: scale(1.08);
      filter: drop-shadow(0 0 10px rgba(240,160,80,0.7));
    }`;
  const base = `
    .af-shell {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      border: 1px solid rgba(217,128,56,0.18);
      background:
        radial-gradient(ellipse 70% 55% at 30% 20%, rgba(117,0,6,0.55) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 78% 78%, rgba(217,128,56,0.16) 0%, transparent 55%),
        linear-gradient(160deg, #2e0703 0%, #260000 45%, #180404 100%);
      box-shadow: 0 40px 110px rgba(38,0,0,0.35);
    }
    .af-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 120% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.35) 100%);
      pointer-events: none;
    }
    .af-shell::after { content: none; }
    .af-map { width:100% !important; height:100% !important; display:block; position:relative; z-index:1; }
    .af-map svg {
      width:100% !important; height:100% !important; display:block;
      shape-rendering: geometricPrecision;
      overflow: visible;
    }
    /* non-market countries — soft cream landmass floating on deep current */
    .af-map svg path {
      fill: rgba(245,242,236,0.18);
      stroke: rgba(245,242,236,0.45);
      stroke-width: 0.4;
      transition: fill 0.3s ease, stroke 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), filter 0.3s ease;
      transform-box: fill-box;
      transform-origin: center;
      cursor: pointer;
    }
    .af-map svg path:hover {
      fill: rgba(217,128,56,0.6);
      stroke: #f5f2ec;
      stroke-width: 0.6;
      transform: scale(1.06);
      filter: drop-shadow(0 0 6px rgba(217,128,56,0.55));
    }
    .af-map-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 62% 40%, rgba(217,128,56,0.14), transparent 46%);
      pointer-events: none;
      z-index: 0;
    }
  `;
  if (!active) return base + marketRule;
  return base + marketRule + `
    .af-map svg path#${active} {
      fill: #f5f2ec;
      stroke: #d98038;
      stroke-width: 0.7;
      transform: scale(1.07);
      filter: drop-shadow(0 0 12px rgba(245,242,236,0.55));
    }`;
}

export default function AfricanFootprint() {
  const [svgMarkup, setSvgMarkup] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [pins, setPins] = useState<{ code: string; name: string; x: number; y: number }[]>([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const activeCode = pinned ?? active;
  const activeCountry = countries.find((c) => c.code === activeCode) ?? null;

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/africa.svg", { cache: "force-cache" });
      const raw = await res.text();
      if (!mounted) return;
      setSvgMarkup(injectDefs(raw));
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Standing pins — measure each market's rendered position and place a
  // 3D marker there. Re-measured on resize.
  useEffect(() => {
    if (!svgMarkup) return;
    const measure = () => {
      const host = mapRef.current;
      if (!host) return;
      const hostRect = host.getBoundingClientRect();
      if (!hostRect.width) return;
      const next: { code: string; name: string; x: number; y: number }[] = [];
      for (const c of countries) {
        const path = host.querySelector<SVGPathElement>(`svg path#${c.code}`);
        if (!path) continue;
        const r = path.getBoundingClientRect();
        next.push({
          code: c.code,
          name: c.name,
          x: ((r.left + r.width / 2 - hostRect.left) / hostRect.width) * 100,
          y: ((r.top + r.height / 2 - hostRect.top) / hostRect.height) * 100,
        });
      }
      setPins(next);
    };
    const t = setTimeout(measure, 60);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [svgMarkup]);

  // 3D tilt — the map leans toward the pointer. Coalesced into one rAF so a
  // burst of mousemove events can't thrash React state (the old cause of lag).
  const tiltRaf = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0 });
  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    pending.current = { x: py * -8, y: px * 10 };
    if (tiltRaf.current !== null) return;
    tiltRaf.current = requestAnimationFrame(() => {
      tiltRaf.current = null;
      setTilt(pending.current);
    });
  };
  useEffect(() => () => {
    if (tiltRaf.current !== null) cancelAnimationFrame(tiltRaf.current);
  }, []);

  return (
    <section className="af-footprint" style={{ marginTop: "clamp(3rem,6vw,5rem)", paddingTop: 0 }}>
      <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto clamp(2rem,4vw,3rem)" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d9ab88", marginBottom: "0.9rem" }}>
          African footprint
        </span>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#1c1c1c", fontSize: "clamp(1.9rem,3.6vw,3rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", textWrap: "balance" } as React.CSSProperties}>
          8+ markets across East &amp; Southern Africa and beyond.
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="af-shell"
        onMouseMove={onTilt}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ width: "100%", maxWidth: "740px", margin: "0 auto", height: "clamp(300px,42vw,500px)", perspective: "1100px" }}
      >
        <div
          className="af-map"
          ref={mapRef}
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {svgMarkup && <div dangerouslySetInnerHTML={{ __html: svgMarkup }} style={{ width: "100%", height: "100%" }} />}
          <div className="af-map-glow" />
          <style>{buildCss(activeCode, countries.map((c) => c.code))}</style>

          {/* 3D standing pins on each market */}
          {pins.map((pin, i) => {
            const isOn = activeCode === pin.code;
            return (
              <button
                key={pin.code}
                type="button"
                aria-label={pin.name}
                className="af-pin"
                onMouseEnter={() => setActive(pin.code)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setPinned((p) => (p === pin.code ? null : pin.code))}
                style={{
                  position: "absolute",
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  transform: `translate(-50%, -100%) translateZ(34px) scale(${isOn ? 1.35 : 1})`,
                  transformStyle: "preserve-3d",
                  animationDelay: `${i * 0.09 + 0.2}s`,
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  zIndex: 3,
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <span className="af-pin-head" style={{ background: isOn ? "#d98038" : "#750006" }} />
                <span className="af-pin-stem" />
                <span className="af-pin-ring" />
              </button>
            );
          })}

          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "10% 14%",
              borderRadius: "999px",
              border: "none",
              filter: "blur(0.2px)",
              pointerEvents: "none",
              opacity: 0.7,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCountry?.code ?? "none"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            style={{
              position: "absolute",
              left: "1rem",
              bottom: "0.85rem",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              backgroundColor: activeCountry ? "#750006" : "rgba(245,242,236,0.88)",
              color: activeCountry ? "#f5f2ec" : "rgba(28,28,28,0.52)",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: `1px solid ${activeCountry ? "rgba(117,0,6,0.5)" : "rgba(117,0,6,0.16)"}`,
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {activeCountry && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://flagcdn.com/w40/${activeCountry.code.toLowerCase()}.png`}
                alt=""
                width={18}
                height={12}
                style={{ width: "18px", height: "12px", objectFit: "cover", borderRadius: "2px" }}
              />
            )}
            {activeCountry ? activeCountry.name : "All markets"}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1.2rem", maxWidth: "760px", marginLeft: "auto", marginRight: "auto" }}>
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
              onClick={() => setPinned((p) => (p === country.code ? null : country.code))}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                border: `1px solid ${isActive ? "#750006" : "rgba(117,0,6,0.18)"}`,
                backgroundColor: isActive ? "#750006" : "rgba(245,242,236,0.7)",
                padding: "0.42rem 0.8rem",
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontSize: "0.74rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#f5f2ec" : "#1c1c1c",
                cursor: "pointer",
                transition: "transform 0.22s ease, border-color 0.25s, background 0.25s, color 0.25s",
                boxShadow: isActive ? "0 4px 14px rgba(117,0,6,0.22)" : "none",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={18}
                height={12}
                loading="lazy"
                style={{ width: "18px", height: "12px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
              />
              {country.name}
            </motion.button>
          );
        })}
      </div>

      <style>{`
        @keyframes af-glow {
          0%, 100% { transform: scale(1); opacity: 0.58; }
          50% { transform: scale(1.03); opacity: 0.86; }
        }
        .af-pin {
          opacity: 0;
          animation: af-pin-drop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes af-pin-drop {
          from { opacity: 0; margin-top: -18px; }
          to { opacity: 1; margin-top: 0; }
        }
        .af-pin-head {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 2px solid #260000;
          box-shadow: 0 0 0 1.5px rgba(245,242,236,0.85), 0 4px 12px rgba(0,0,0,0.5);
          transition: background 0.25s;
        }
        .af-pin-stem {
          display: block;
          width: 2px;
          height: 9px;
          margin: -1px auto 0;
          background: linear-gradient(to bottom, #f5f2ec, rgba(245,242,236,0.15));
          border-radius: 0 0 2px 2px;
        }
        .af-pin-ring {
          position: absolute;
          left: 50%;
          bottom: -3px;
          width: 16px;
          height: 6px;
          transform: translateX(-50%);
          border-radius: 999px;
          border: 1px solid rgba(245,242,236,0.5);
          animation: af-ring-pulse 2.4s ease-out infinite;
        }
        @keyframes af-ring-pulse {
          0% { transform: translateX(-50%) scale(0.6); opacity: 0.8; }
          70% { transform: translateX(-50%) scale(1.7); opacity: 0; }
          100% { opacity: 0; }
        }
        .af-pin:hover .af-pin-head { background: #d98038 !important; }
      `}</style>
    </section>
  );
}
