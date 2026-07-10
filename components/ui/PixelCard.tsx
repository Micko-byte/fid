"use client";

import { useEffect, useRef } from "react";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer();
    else this.size += this.sizeStep;
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    if (this.isReverse) this.size -= this.speed;
    else this.size += this.speed;
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  const throttle = 0.001;
  if (value <= 0 || reducedMotion) return 0;
  if (value >= 100) return 100 * throttle;
  return value * throttle;
}

/* Brand variant — Deep Current, Crimson, Amber, Sand */
const VARIANTS = {
  brand: { gap: 5, speed: 45, colors: "#750006,#d98038,#d9ab88,#f5f2ec", noFocus: true },
  amber: { gap: 6, speed: 60, colors: "#d98038,#d9ab88,#f5f2ec", noFocus: true },
} as const;

interface PixelCardProps {
  variant?: keyof typeof VARIANTS;
  gap?: number;
  speed?: number;
  colors?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Drive the effect from a parent (e.g. the card's own hover) */
  active?: boolean;
  children?: React.ReactNode;
}

export default function PixelCard({ variant = "brand", gap, speed, colors, className = "", style, active, children }: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(0);

  const cfg = VARIANTS[variant] ?? VARIANTS.brand;
  const finalGap = gap ?? cfg.gap;
  const finalSpeed = speed ?? cfg.speed;
  const finalColors = colors ?? cfg.colors;

  useEffect(() => {
    timePreviousRef.current = performance.now();
    // matchMedia is read inside the effect — never during render (SSR safe)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initPixels = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (!width || !height) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;

      const colorsArray = finalColors.split(",");
      const pxs: Pixel[] = [];
      for (let x = 0; x < width; x += finalGap) {
        for (let y = 0; y < height; y += finalGap) {
          const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), reducedMotion ? 0 : distance));
        }
      }
      pixelsRef.current = pxs;
    };

    initPixels();
    const observer = new ResizeObserver(initPixels);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [finalGap, finalSpeed, finalColors]);

  useEffect(() => {
    if (active === undefined) return;
    const fnName: "appear" | "disappear" = active ? "appear" : "disappear";

    const doAnimate = () => {
      animationRef.current = requestAnimationFrame(doAnimate);
      const timeNow = performance.now();
      const timePassed = timeNow - timePreviousRef.current;
      const timeInterval = 1000 / 60;
      if (timePassed < timeInterval) return;
      timePreviousRef.current = timeNow - (timePassed % timeInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (const pixel of pixelsRef.current) {
        pixel[fnName]();
        if (!pixel.isIdle) allIdle = false;
      }
      if (allIdle && animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };

    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(doAnimate);
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [active]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", isolation: "isolate", ...style }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      {children}
    </div>
  );
}
