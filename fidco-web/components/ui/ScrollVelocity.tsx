"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";

interface VelocityMapping { input: [number, number]; output: [number, number]; }
interface ScrollVelocityProps {
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const update = () => { if (ref.current) setWidth(ref.current.offsetWidth); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);
  return width;
}

function VelocityText({ children, baseVelocity, className, damping, stiffness, numCopies, velocityMapping }: {
  children: React.ReactNode; baseVelocity: number; className?: string; damping?: number; stiffness?: number; numCopies?: number; velocityMapping?: VelocityMapping;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: damping ?? 50, stiffness: stiffness ?? 400 });
  const velocityFactor = useTransform(smoothVelocity, velocityMapping?.input || [0, 1000], velocityMapping?.output || [0, 5], { clamp: false });
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const wrap = (min: number, max: number, v: number) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };
  const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`));
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) dir.current = -1; else if (velocityFactor.get() > 0) dir.current = 1;
    moveBy += dir.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < (numCopies ?? 6); i++) {
    spans.push(<span className={`flex-shrink-0 ${className ?? ""}`} key={i} ref={i === 0 ? copyRef : null}>{children}&nbsp;</span>);
  }
  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>{spans}</motion.div>
    </div>
  );
}

export default function ScrollVelocity({ texts = [], velocity = 100, className = "", damping, stiffness, numCopies, velocityMapping }: ScrollVelocityProps) {
  return (
    <section>
      {texts.map((t, i) => (
        <VelocityText key={i} className={className} baseVelocity={i % 2 !== 0 ? -velocity : velocity} damping={damping} stiffness={stiffness} numCopies={numCopies} velocityMapping={velocityMapping}>
          {t}
        </VelocityText>
      ))}
    </section>
  );
}
