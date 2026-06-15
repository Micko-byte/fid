"use client";

import { useRef, useCallback, useState, useEffect, type ReactNode, type CSSProperties } from "react";

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  /** HSL values for the glow color, as "H S L" (e.g. "50 76 76" for gold) */
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  /** Array of 3 hex colors for the mesh gradient border */
  colors?: string[];
  fillOpacity?: number;
  style?: CSSProperties;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 50, s: 76, l: 76 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(", ");
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number) { return x * x * x; }

interface AnimateOpts {
  start?: number; end?: number; duration?: number; delay?: number;
  ease?: (t: number) => number; onUpdate: (v: number) => void; onEnd?: () => void;
}
function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: AnimateOpts) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];
function buildMeshGradients(colors: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    out.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  out.push(`linear-gradient(${colors[0]} 0 100%)`);
  return out;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  edgeSensitivity = 30,
  // wine/gold defaults
  glowColor = "50 76 76",                    // gold #F1E194 in HSL
  backgroundColor = "transparent",
  borderRadius = 4,
  glowRadius = 36,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#F1E194", "#D9AB88", "#5B0E14"],
  fillOpacity = 0.4,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  const getCenter = useCallback((el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return [r.width / 2, r.height / 2] as const;
  }, []);

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenter(el);
    const dx = x - cx; const dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenter]);

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenter(el);
    const dx = x - cx; const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return deg;
  }, [getCenter]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if (!animated) return;
    const aStart = 110, aEnd = 465;
    setSweepActive(true); setCursorAngle(aStart);
    animateValue({ duration: 500, onUpdate: (v) => setEdgeProximity(v / 100) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: (v) => setCursorAngle((aEnd - aStart) * (v / 100) + aStart) });
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: (v) => setCursorAngle((aEnd - aStart) * (v / 100) + aStart) });
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0, onUpdate: (v) => setEdgeProximity(v / 100), onEnd: () => setSweepActive(false) });
  }, [animated]);

  const colorSensitivity = edgeSensitivity + 20;
  const visible = isHovered || sweepActive;
  const borderOpacity = visible ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : 0;
  const glowOpacity = visible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map((g) => `${g} border-box`);
  const fillBg = meshGradients.map((g) => `${g} padding-box`);
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;
  const cone = `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;
  const glowCone = `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`bg-relative ${className}`}
      style={{
        position: "relative",
        display: "grid",
        isolation: "isolate",
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: "translate3d(0, 0, 0.01px)",
        ...style,
      }}
    >
      {/* mesh gradient border */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, borderRadius: "inherit", zIndex: -1,
          border: "1px solid transparent",
          background: [
            `linear-gradient(${backgroundColor === "transparent" ? "rgba(0,0,0,0)" : backgroundColor} 0 100%) padding-box`,
            "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
            ...borderBg,
          ].join(", "),
          opacity: borderOpacity,
          maskImage: cone, WebkitMaskImage: cone,
          transition: visible ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out",
        }}
      />

      {/* mesh gradient fill near edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, borderRadius: "inherit", zIndex: -1,
          border: "1px solid transparent",
          background: fillBg.join(", "),
          maskImage: [
            "linear-gradient(to bottom, black, black)",
            "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
            "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
            "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
            "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
            "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
            `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(", "),
          WebkitMaskImage: [
            "linear-gradient(to bottom, black, black)",
            "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
            "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
            "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
            "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
            "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
            `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(", "),
          maskComposite: "subtract, add, add, add, add, add",
          WebkitMaskComposite: "source-out, source-over, source-over, source-over, source-over, source-over",
          opacity: borderOpacity * fillOpacity,
          mixBlendMode: "soft-light",
          transition: visible ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out",
        } as CSSProperties}
      />

      {/* outer glow */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute", inset: `${-glowRadius}px`, pointerEvents: "none", zIndex: 1,
          borderRadius: "inherit",
          maskImage: glowCone, WebkitMaskImage: glowCone,
          opacity: glowOpacity,
          mixBlendMode: "plus-lighter",
          transition: visible ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out",
        } as CSSProperties}
      >
        <span style={{ position: "absolute", inset: `${glowRadius}px`, borderRadius: "inherit", boxShadow: buildBoxShadow(glowColor, glowIntensity) }} />
      </span>

      <div style={{ display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", zIndex: 1, borderRadius: "inherit" }}>
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
