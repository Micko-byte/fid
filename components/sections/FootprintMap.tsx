"use client";

import { useEffect, useRef, useState } from "react";
// Static: a runtime import() of a stylesheet rejects and would abort the
// whole async block before the map is ever constructed.
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap } from "maplibre-gl";

/**
 * African footprint, on real satellite imagery.
 *
 * MapLibre GL is ~280KB gzipped, so it is imported dynamically and only once
 * the section is actually near the viewport — the homepage bundle is unchanged
 * for anyone who never scrolls this far.
 *
 * Markers are commercial hubs rather than constitutional capitals: this section
 * claims where the work happens, and Dodoma / Bloemfontein would claim the
 * wrong thing.
 */

export interface Market {
  country: string;
  city: string;
  lng: number;
  lat: number;
}

export const MARKETS: Market[] = [
  { country: "Kenya", city: "Nairobi", lng: 36.8172, lat: -1.2864 },
  { country: "Uganda", city: "Kampala", lng: 32.5825, lat: 0.3476 },
  { country: "Rwanda", city: "Kigali", lng: 30.0619, lat: -1.9441 },
  { country: "Ethiopia", city: "Addis Ababa", lng: 38.7469, lat: 9.032 },
  { country: "South Sudan", city: "Juba", lng: 31.5713, lat: 4.8594 },
  { country: "Zambia", city: "Lusaka", lng: 28.3228, lat: -15.3875 },
  { country: "Ghana", city: "Accra", lng: -0.187, lat: 5.6037 },
  { country: "Tanzania", city: "Dar es Salaam", lng: 39.2083, lat: -6.7924 },
  { country: "South Africa", city: "Johannesburg", lng: 28.0473, lat: -26.2041 },
];

const HOME = MARKETS[0]; // Nairobi — every route departs from here

const MAROON = "#750006";
const GOLD = "#D9A94A";

/** Great-circle-ish arc between two points, bowed so routes don't sit flat. */
function arc(from: Market, to: Market, bend = 0.22, steps = 64): [number, number][] {
  const pts: [number, number][] = [];
  const dx = to.lng - from.lng;
  const dy = to.lat - from.lat;
  // perpendicular offset, scaled by distance, gives the lift
  const nx = -dy;
  const ny = dx;
  const mx = (from.lng + to.lng) / 2 + nx * bend;
  const my = (from.lat + to.lat) / 2 + ny * bend;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const u = 1 - t;
    // quadratic bezier through the lifted midpoint
    pts.push([
      u * u * from.lng + 2 * u * t * mx + t * t * to.lng,
      u * u * from.lat + 2 * u * t * my + t * t * to.lat,
    ]);
  }
  return pts;
}

export default function FootprintMap() {
  const holder = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const [paths, setPaths] = useState<string[]>([]);

  // only pull the library in when the section is close to view
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near || !holder.current || mapRef.current) return;
    let cancelled = false;
    let raf = 0;

    (async () => {
      try {
      const maplibregl = await import("maplibre-gl"); // v6 has no default export
      if (cancelled || !holder.current) return;

      const map = new maplibregl.Map({
        container: holder.current,
        attributionControl: false,
        dragRotate: false,
        touchZoomRotate: false,
        scrollZoom: false,
        // Start framed on the markets rather than flying there — the camera
        // move left tiles for the old view on screen.
        bounds: [
          [Math.min(...MARKETS.map((m) => m.lng)) - 4, Math.min(...MARKETS.map((m) => m.lat)) - 4],
          [Math.max(...MARKETS.map((m) => m.lng)) + 4, Math.max(...MARKETS.map((m) => m.lat)) + 4],
        ],
        fitBoundsOptions: { padding: 48 },
        style: {
          version: 8,
          sources: {
            sat: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              maxzoom: 17,
              attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
            },
          },
          layers: [
            { id: "bg", type: "background", paint: { "background-color": "#0b1013" } },
            { id: "sat", type: "raster", source: "sat", paint: { "raster-saturation": -0.25, "raster-contrast": 0.08 } },
          ],
        },
      });
      mapRef.current = map;
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

      map.on("load", () => {
        if (cancelled) return;
        // The container is absolutely positioned, so MapLibre can measure it as
        // 0x0 at construction and keep a stale transform — tiles re-request on
        // their own but marker screen positions do not, which puts every pin in
        // the wrong place. Re-measure once loaded, and on any later resize.
        map.resize();
        const ro = new ResizeObserver(() => map.resize());
        if (holder.current) ro.observe(holder.current);
        roRef.current = ro;

        // markers
        MARKETS.forEach((m, i) => {
          const home = i === 0;
          const el = document.createElement("div");
          el.className = "fm-pin" + (home ? " fm-pin--home" : "");
          el.innerHTML = `<span class="fm-dot"></span><span class="fm-label">${m.city}<em>${m.country}</em></span>`;
          new maplibregl.Marker({ element: el, anchor: "center" })
            .setLngLat([m.lng, m.lat])
            .addTo(map);
        });

        const sync = () => {
          if (cancelled) return;
          setPaths(
            MARKETS.slice(1).map((m) =>
              // trim both ends so routes stop short of the pins rather than
              // running under the city labels
              arc(HOME, m)
                .slice(3, -4)
                .map(([lng, lat], idx) => {
                  const pt = map.project([lng, lat]);
                  return `${idx === 0 ? "M" : "L"}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
                })
                .join(" "),
            ),
          );
        };
        sync();
        map.on("move", sync);
        map.on("resize", sync);
        setReady(true);
      });
      } catch (err) {
        // a map that fails should say so, not hang on "Loading" forever
        console.error("[FootprintMap]", err);
        if (!cancelled) setFailed(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      roRef.current?.disconnect();
      roRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [near]);

  return (
    <div
      style={{
        position: "relative", width: "100%", maxWidth: "980px", margin: "0 auto",
        height: "clamp(340px, 46vw, 560px)", borderRadius: "18px", overflow: "hidden",
        border: "1px solid rgba(117,0,6,0.18)", boxShadow: "0 26px 70px rgba(38,0,0,0.22)",
        background: "#0b1013",
      }}
    >
      <div ref={holder} style={{ position: "absolute", inset: 0 }} />

      {/* Routes, drawn over the map rather than as a GeoJSON layer: MapLibre
          parses GeoJSON in a web worker that does not come up under Turbopack,
          so vector sources never finish loading. Projecting to SVG keeps the
          arcs independent of that. */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
      >
        {paths.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="#2b0a0d" strokeWidth={5} strokeLinecap="round" opacity={0.5} />
            <path className="fm-route" d={d} fill="none" stroke={GOLD} strokeWidth={1.9} strokeLinecap="round"
                  style={{ animationDelay: `${i * 0.12}s` }} />
          </g>
        ))}
      </svg>

      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,242,236,0.6)", fontFamily: "var(--font-body)", fontSize: "0.76rem", letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", padding: "1rem" }}>
          {failed ? `Map unavailable — ${failed}` : "Loading map…"}
        </div>
      )}

      {/* vignette, so the imagery sits inside the brand rather than shouting */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(10,6,8,0.55) 100%)" }} />

      <style>{`
        /* MapLibre v6 does not add .maplibregl-marker to a custom element, so
           it never picks up that class's absolute positioning. Without this the
           transform MapLibre sets is applied from each pin's normal flow
           position and every marker lands in the wrong place. */
        .fm-route { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: fm-draw 2s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes fm-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .fm-route { animation: none; stroke-dashoffset: 0; }
        }
        .fm-pin { position: absolute; top: 0; left: 0; display: flex; align-items: center; gap: 7px; cursor: default; will-change: transform; }
        .fm-dot {
          width: 9px; height: 9px; border-radius: 999px; background: ${GOLD};
          box-shadow: 0 0 0 3px rgba(217,169,74,0.28), 0 0 14px rgba(217,169,74,0.7);
          flex: 0 0 auto;
        }
        .fm-pin--home .fm-dot {
          width: 13px; height: 13px; background: #fff;
          box-shadow: 0 0 0 4px rgba(117,0,6,0.55), 0 0 20px rgba(255,255,255,0.8);
          animation: fm-ping 2.6s ease-out infinite;
        }
        @keyframes fm-ping {
          0%   { box-shadow: 0 0 0 4px rgba(117,0,6,0.55), 0 0 0 0 rgba(255,255,255,0.55); }
          70%  { box-shadow: 0 0 0 4px rgba(117,0,6,0.55), 0 0 0 16px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 4px rgba(117,0,6,0.55), 0 0 0 0 rgba(255,255,255,0); }
        }
        .fm-label {
          font-family: var(--font-body); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.06em; color: #fff; white-space: nowrap; line-height: 1.15;
          text-shadow: 0 1px 6px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9);
        }
        .fm-label em {
          display: block; font-style: normal; font-weight: 500; font-size: 0.58rem;
          letter-spacing: 0.14em; text-transform: uppercase; color: ${GOLD}; opacity: 0.95;
        }
        .fm-pin--home .fm-label { font-size: 0.78rem; }
        .maplibregl-ctrl-attrib {
          background: rgba(10,6,8,0.55) !important; backdrop-filter: blur(6px);
          font-size: 9px !important;
        }
        .maplibregl-ctrl-attrib a { color: rgba(245,242,236,0.75) !important; }
        @media (max-width: 620px) {
          .fm-label { font-size: 0.6rem; }
          .fm-label em { font-size: 0.5rem; }
        }
      `}</style>
    </div>
  );
}
