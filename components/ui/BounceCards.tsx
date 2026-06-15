"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".card", { scale: 0 }, { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay });
    }, containerRef);

    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (t: string) =>
    /rotate\([\s\S]*?\)/.test(t) ? t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)") : t === "none" ? "rotate(0deg)" : `${t} rotate(0deg)`;

  const getPushedTransform = (base: string, offsetX: number) => {
    const re = /translate\(([-0-9.]+)px\)/;
    const m = base.match(re);
    if (m) return base.replace(re, `translate(${parseFloat(m[1]) + offsetX}px)`);
    return base === "none" ? `translate(${offsetX}px)` : `${base} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const sel = q(`.card-${i}`);
      gsap.killTweensOf(sel);
      const base = transformStyles[i] || "none";
      if (i === hoveredIdx) {
        gsap.to(sel, {
          transform: `${getNoRotationTransform(base)} scale(1.06)`,
          duration: 0.45,
          ease: "back.out(1.6)",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -240 : 240;
        gsap.to(sel, {
          transform: getPushedTransform(base, offsetX),
          duration: 0.45,
          ease: "back.out(1.5)",
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const sel = q(`.card-${i}`);
      gsap.killTweensOf(sel);
      gsap.to(sel, { transform: transformStyles[i] || "none", duration: 0.45, ease: "back.out(1.4)", overwrite: "auto" });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} absolute w-[200px] aspect-square border-[6px] border-white rounded-[24px] overflow-hidden`}
          style={{ boxShadow: "0 8px 24px rgba(91,14,20,0.22)", transform: transformStyles[idx] || "none" }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
}
