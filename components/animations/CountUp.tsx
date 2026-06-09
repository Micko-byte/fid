"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  /** e.g. "15+" or "100+" or "8+" */
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({ value, duration = 1.6, className = "", style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });
  const started = useRef(false);

  // Pull out the numeric part and any suffix ("+", "x", "%", etc.)
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, suffix, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
