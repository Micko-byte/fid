"use client";

import { useEffect, useRef } from "react";
import { DOTS, EDGES, NAIROBI, COASTLINE_SRC } from "@/components/lib/constellation";

/**
 * The brand constellation, drawn to canvas and lit by a pulse travelling out
 * from Nairobi. Used by the intro loader; it draws once and holds the finished
 * mark, which is the same artwork the nav carries.
 */

/** Distance of each dot from Nairobi, 0 at the origin and 1 at the far corner. */
const WAVE = (() => {
  const hx = DOTS[NAIROBI][0];
  const hy = DOTS[NAIROBI][1];
  const d = DOTS.map((p) => Math.hypot(p[0] - hx, p[1] - hy));
  const max = Math.max(...d);
  return d.map((v) => v / max);
})();

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const TAU = Math.PI * 2;

export default function ConstellationMark({
  size = 150,
  duration = 1500,
  color = "117,0,6",
  className,
}: {
  size?: number;
  duration?: number;
  /** "r,g,b" - the mark is flat colour, alpha carries the animation. */
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(size * dpr);
    cv.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = size * 0.03;
    const span = size - pad * 2;
    const px = (i: number) => pad + DOTS[i][0] * span;
    const py = (i: number) => pad + DOTS[i][1] * span;
    const pr = (i: number) => Math.max(0.7, DOTS[i][2] * span);
    const rgba = (a: number) => `rgba(${color},${a})`;

    // Offscreen buffer for masking the coastline to the leading edge of the wave.
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    let coastReady = false;
    const coast = new Image();
    coast.onload = () => {
      coastReady = true;
    };
    coast.src = COASTLINE_SRC;

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      if (coastReady && offCtx) {
        const reach = clamp01((t - 0.04) / 0.72);
        if (reach > 0) {
          off.width = Math.round(span);
          off.height = Math.round(span);
          offCtx.clearRect(0, 0, off.width, off.height);
          offCtx.drawImage(coast, 0, 0, off.width, off.height);
          const cx = DOTS[NAIROBI][0] * off.width;
          const cy = DOTS[NAIROBI][1] * off.height;
          const g = offCtx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, reach * off.width * 1.45));
          g.addColorStop(0, "rgba(0,0,0,1)");
          g.addColorStop(0.82, "rgba(0,0,0,1)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          offCtx.globalCompositeOperation = "destination-in";
          offCtx.fillStyle = g;
          offCtx.fillRect(0, 0, off.width, off.height);
          offCtx.globalCompositeOperation = "source-over";
          ctx.drawImage(off, pad, pad, span, span);
        }
      }

      const on = DOTS.map((_, i) => clamp01((t - WAVE[i] * 0.62) / 0.26));

      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(0.5, span * 0.0028);
      for (let k = 0; k < EDGES.length; k += 1) {
        const [i, j] = EDGES[k];
        const a = Math.min(on[i], on[j]);
        if (a <= 0.02) continue;
        ctx.strokeStyle = rgba(a * 0.46);
        ctx.beginPath();
        ctx.moveTo(px(i), py(i));
        ctx.lineTo(px(j), py(j));
        ctx.stroke();
      }

      for (let i = 0; i < DOTS.length; i += 1) {
        const a = on[i];
        if (a <= 0.02) continue;
        // the crest of the wave swells each dot briefly as it passes
        const crest = clamp01(1 - Math.abs(t - WAVE[i] * 0.62 - 0.1) / 0.16);
        const r = pr(i) * (1 + crest * 0.7);
        if (crest > 0) {
          ctx.fillStyle = rgba(0.1 * crest);
          ctx.beginPath();
          ctx.arc(px(i), py(i), r * 3, 0, TAU);
          ctx.fill();
        }
        ctx.fillStyle = rgba(Math.min(1, a));
        ctx.beginPath();
        ctx.arc(px(i), py(i), r, 0, TAU);
        ctx.fill();
      }
    }

    // Some embedded webviews never fire requestAnimationFrame; fall back to a
    // timer so the mark still draws rather than sitting on a blank frame.
    const started = performance.now();
    let raf = 0;
    let timer = 0;
    let onTimer = false;
    let fired = false;

    const step = (now: number) => {
      const t = easeOut(clamp01((now - started) / duration));
      draw(t);
      // keep going until the mark is complete *and* the outline has landed,
      // so a slow image load still gets painted into the finished frame
      if (t >= 1 && coastReady) {
        window.clearInterval(timer);
        return;
      }
      if (!onTimer) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame((now) => {
      fired = true;
      step(now);
    });
    const probe = window.setTimeout(() => {
      if (fired) return;
      onTimer = true;
      timer = window.setInterval(() => step(performance.now()), 1000 / 60);
    }, 250);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      window.clearTimeout(probe);
    };
  }, [size, duration, color]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden
      style={{ width: size, height: size, display: "block" }}
    />
  );
}
