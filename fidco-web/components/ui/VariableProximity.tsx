"use client";

import { forwardRef, useMemo, useRef, useEffect, type MutableRefObject, type CSSProperties } from "react";

function useAnimationFrame(cb: () => void) {
  useEffect(() => {
    let id: number;
    const loop = () => { cb(); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [cb]);
}

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const pos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const update = (x: number, y: number) => {
      if (containerRef?.current) { const r = containerRef.current.getBoundingClientRect(); pos.current = { x: x - r.left, y: y - r.top }; }
      else pos.current = { x, y };
    };
    const mm = (e: MouseEvent) => update(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => { const t = e.touches[0]; update(t.clientX, t.clientY); };
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm);
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("touchmove", tm); };
  }, [containerRef]);
  return pos;
}

interface Props {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const {
    label,
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 900, 'opsz' 40",
    containerRef, radius = 120, falloff = "gaussian", className = "", style,
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouse = useMousePositionRef(containerRef);
  const last = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const parsed = useMemo(() => {
    const parse = (s: string) => new Map(s.split(",").map((p) => p.trim()).map((p) => { const [n, v] = p.split(" "); return [n.replace(/['"]/g, ""), parseFloat(v)] as [string, number]; }));
    const f = parse(fromFontVariationSettings); const t = parse(toFontVariationSettings);
    return Array.from(f.entries()).map(([axis, fromValue]) => ({ axis, fromValue, toValue: t.get(axis) ?? fromValue }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const dist = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const fall = (d: number) => {
    const n = Math.min(Math.max(1 - d / radius, 0), 1);
    if (falloff === "exponential") return n ** 2;
    if (falloff === "gaussian") return Math.exp(-((d / (radius / 2)) ** 2) / 2);
    return n;
  };

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const { x, y } = mouse.current;
    if (last.current.x === x && last.current.y === y) return;
    last.current = { x, y };
    const cr = containerRef.current.getBoundingClientRect();
    letterRefs.current.forEach((lr) => {
      if (!lr) return;
      const r = lr.getBoundingClientRect();
      const cx = r.left + r.width / 2 - cr.left;
      const cy = r.top + r.height / 2 - cr.top;
      const d = dist(mouse.current.x, mouse.current.y, cx, cy);
      if (d >= radius) { lr.style.fontVariationSettings = fromFontVariationSettings; return; }
      const fv = fall(d);
      lr.style.fontVariationSettings = parsed.map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * fv}`).join(", ");
    });
  });

  const words = label.split(" ");
  let idx = 0;
  return (
    <span ref={ref} className={className} style={{ display: "inline", ...style }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((ch) => {
            const i = idx++;
            return (
              <span key={i} ref={(el) => { letterRefs.current[i] = el; }} style={{ display: "inline-block", fontVariationSettings: fromFontVariationSettings }} aria-hidden="true">{ch}</span>
            );
          })}
          {wi < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});
VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
