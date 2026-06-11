"use client";

import { useRef, useEffect, useState } from "react";

const FRAME_COUNT = 121;
const frameSrc = (i: number) => `/herologo/f${String(i).padStart(3, "0")}.jpg`;

interface LogoRevealProps {
  fps?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Plays the 121-frame "FID & Co." logo-reveal sequence on a canvas, once,
 * then holds the final frame. Reduced-motion: shows the final frame instantly.
 */
export default function LogoReveal({ fps = 30, onComplete, className, style }: LogoRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let raf = 0;
    let last = 0;
    let frame = 0;
    let cancelled = false;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width, ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      // contain
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw = cw, dh = ch, dx = 0, dy = 0;
      if (ir > cr) { dh = cw / ir; dy = (ch - dh) / 2; }
      else { dw = ch * ir; dx = (cw - dw) / 2; }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const play = (t: number) => {
      if (cancelled) return;
      if (!last) last = t;
      const elapsed = t - last;
      if (elapsed > 1000 / fps) {
        last = t;
        draw(frame);
        frame++;
        if (frame >= FRAME_COUNT) {
          draw(FRAME_COUNT - 1);
          setDone(true);
          onComplete?.();
          return;
        }
      }
      raf = requestAnimationFrame(play);
    };

    // preload
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loaded++;
        if (loaded === 1) draw(0); // show first frame asap
        if (loaded === FRAME_COUNT && !cancelled) {
          if (reduce) { draw(FRAME_COUNT - 1); setDone(true); onComplete?.(); }
          else raf = requestAnimationFrame(play);
        }
      };
      images.push(img);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [fps, onComplete]);

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative", ...style }} data-logo-done={done}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
