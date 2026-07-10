"use client";

import { useRef, useState, useCallback, useEffect, type CSSProperties } from "react";

type Falloff = "linear" | "smooth" | "sharp";

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

export default function LineSidebar({
  items = [],
  accentColor = "#d98038",
  textColor = "#f5f2ec",
  markerColor = "rgba(245,242,236,0.4)",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 22,
  falloff = "smooth",
  markerLength = 44,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.4,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = "",
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(defaultActive);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const els = itemRefs.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }
    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const els = itemRefs.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <nav
      className={`line-sidebar ${className}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: showMarker ? `calc(${markerLength}px + ${markerGap}px)` : undefined,
        } as CSSProperties
      }
    >
      <ul ref={listRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className="ls-list">
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => handleClick(index, label)}
            className="ls-item"
          >
            {showMarker && <span aria-hidden="true" className={`ls-marker${scaleTick ? " ls-marker-scale" : ""}`} />}
            <span className="ls-label">
              {showIndex && <span className="ls-index">{String(index + 1).padStart(2, "0")}</span>}
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>

      <style>{`
        .ls-list { margin: 0; padding: 1rem 0; list-style: none; display: flex; flex-direction: column; gap: var(--item-gap); }
        .ls-item { position: relative; cursor: pointer; }
        .ls-item::before { content: ""; position: absolute; inset: -6px -48px; }
        .ls-marker {
          position: absolute;
          left: calc(-1 * var(--marker-length) - var(--marker-gap));
          top: 50%;
          height: 1px;
          width: var(--marker-length);
          transform-origin: left;
          background-color: color-mix(in srgb, var(--accent-color) calc(var(--effect,0) * 100%), var(--marker-color));
          transform: translateY(-50%) scaleX(calc(0.7 + var(--effect,0) * 0.5));
        }
        .ls-label {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          line-height: 1.2;
          font-family: var(--font-heading);
          font-weight: 700;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--accent-color) calc(var(--effect,0) * 100%), var(--text-color));
          font-size: var(--font-size);
          transform: translateX(calc(var(--effect,0) * var(--max-shift)));
        }
        .ls-index {
          margin-right: 0.6rem;
          font-family: var(--font-body);
          font-size: 0.5em;
          letter-spacing: 0.16em;
          opacity: calc(0.5 + var(--effect,0) * 0.5);
        }
        @media (prefers-reduced-motion: reduce) {
          .ls-marker, .ls-label { transition: none; }
        }
      `}</style>
    </nav>
  );
}
