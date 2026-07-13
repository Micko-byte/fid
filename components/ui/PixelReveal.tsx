"use client";

import { useRef, useLayoutEffect, useEffect } from "react";

/**
 * PixelReveal — a grid of coloured "pixel" squares covering the parent,
 * dissolving along a direction with a noisy leading edge.
 *
 * Adapted from the Originkit auto-play component to be *driven*: progress
 * eases toward `active ? 1 : 0`, so a hover can dissolve the cover away and
 * re-assemble it on leave (the founder card's image transition).
 */
export default function PixelReveal({
  active,
  colors = ["#750006", "#d98038", "#d9ab88"],
  gridSize = 14,
  edgeNoise = 0.22,
  speed = 2.6,
  band = 0.2,
  direction = "up",
  style,
}: {
  active: boolean;
  colors?: string[];
  gridSize?: number;
  /** 0..1 — raggedness of the dissolving frontier */
  edgeNoise?: number;
  /** progress units per second (≈1/duration) */
  speed?: number;
  /** 0..1 — thickness of the sweeping pixel band around the frontier */
  band?: number;
  direction?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const gridRef = useRef<{
    cols: number;
    rows: number;
    cellW: number;
    cellH: number;
    cssW: number;
    cssH: number;
    thresholds: Float32Array;
    cellColors: Uint8Array;
  } | null>(null);

  const cfgRef = useRef({ gridSize, edgeNoise, direction, colors, speed, band });
  useEffect(() => {
    cfgRef.current = { gridSize, edgeNoise, direction, colors, speed, band };
  }, [gridSize, edgeNoise, direction, colors, speed, band]);

  const rebuildGrid = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const cssW = Math.max(1, Math.floor(container.clientWidth) || 300);
    const cssH = Math.max(1, Math.floor(container.clientHeight) || 300);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;

    const { gridSize: gs, edgeNoise: eh, direction: dir, colors: cols_ } = cfgRef.current;
    const cols = Math.max(1, Math.ceil(cssW / gs));
    const rows = Math.max(1, Math.ceil(cssH / gs));
    const cellW = cssW / cols;
    const cellH = cssH / rows;
    const thresholds = new Float32Array(cols * rows);
    const cellColors = new Uint8Array(cols * rows);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let base: number;
        if (dir === "up") base = rows === 1 ? 0 : 1 - r / (rows - 1);
        else if (dir === "down") base = rows === 1 ? 0 : r / (rows - 1);
        else if (dir === "left") base = cols === 1 ? 0 : 1 - c / (cols - 1);
        else base = cols === 1 ? 0 : c / (cols - 1);
        thresholds[r * cols + c] = base * (1 - eh) + Math.random() * eh;
        cellColors[r * cols + c] = Math.floor(Math.random() * cols_.length);
      }
    }
    gridRef.current = { cols, rows, cellW, cellH, cssW, cssH, thresholds, cellColors };
  };

  const draw = () => {
    const ctx = ctxRef.current;
    const grid = gridRef.current;
    if (!ctx || !grid) return;
    const { cols, rows, cellW, cellH, cssW, cssH, thresholds, cellColors } = grid;
    ctx.clearRect(0, 0, cssW, cssH);
    const p = progressRef.current;
    // Band mode: pixels exist only while the sweep is in transit, as a ragged
    // curtain around the frontier — both resting states are clean images.
    if (p <= 0.001 || p >= 0.999) return;
    const bw = cfgRef.current.band;
    const palette = cfgRef.current.colors;
    const padW = cellW + 1;
    const padH = cellH + 1;
    for (let r = 0; r < rows; r++) {
      const yBase = r * cellH;
      const rowOff = r * cols;
      for (let c = 0; c < cols; c++) {
        if (Math.abs(thresholds[rowOff + c] - p) < bw) {
          ctx.fillStyle = palette[cellColors[rowOff + c]];
          ctx.fillRect(c * cellW, yBase, padW, padH);
        }
      }
    }
  };

  // Drive progress toward the target each frame — hover in dissolves the
  // cover away; hover out re-assembles it.
  useEffect(() => {
    targetRef.current = active ? 1 : 0;
    if (rafRef.current != null) return; // loop already running
    lastRef.current = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const target = targetRef.current;
      const cur = progressRef.current;
      if (Math.abs(target - cur) < 0.002) {
        progressRef.current = target;
        draw();
        rafRef.current = null;
        return;
      }
      const dirn = target > cur ? 1 : -1;
      progressRef.current = Math.max(0, Math.min(1, cur + dirn * cfgRef.current.speed * dt));
      draw();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [active]);

  useLayoutEffect(() => {
    // reduced motion: skip the pixel cover entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progressRef.current = 1;
      return;
    }
    rebuildGrid();
    // start fully covered only when inactive; keeps first paint correct
    progressRef.current = targetRef.current;
    draw();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      rebuildGrid();
      draw();
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", ...style }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
