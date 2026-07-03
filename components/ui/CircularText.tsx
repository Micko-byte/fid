"use client";

import { useMemo, useState } from "react";

type HoverMode = "slowDown" | "speedUp" | "pause" | "goBonkers";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: HoverMode;
  reverse?: boolean;
  className?: string;
}

export default function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  reverse = false,
  className = "",
}: CircularTextProps) {
  const letters = useMemo(() => Array.from(text), [text]);
  const [duration, setDuration] = useState(spinDuration);
  const [scale, setScale] = useState(1);

  const handleHoverStart = () => {
    switch (onHover) {
      case "slowDown":
        setDuration(Math.max(8, spinDuration * 2));
        setScale(1);
        break;
      case "speedUp":
        setDuration(Math.max(4, spinDuration / 4));
        setScale(1);
        break;
      case "pause":
        setDuration(999);
        setScale(1);
        break;
      case "goBonkers":
        setDuration(Math.max(2, spinDuration / 20));
        setScale(0.92);
        break;
      default:
        setDuration(spinDuration);
        setScale(1);
    }
  };

  const handleHoverEnd = () => {
    setDuration(spinDuration);
    setScale(1);
  };

  return (
    <div
      className={`relative mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-full ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      style={{
        transform: `scale(${scale})`,
        transition: "transform 0.25s ease",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          animation: `circular-spin ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {letters.map((letter, i) => {
          const step = 360 / letters.length;
          const angle = reverse ? 360 - step * i : step * i;
          const transform = `rotate(${angle}deg) translateY(-92px) rotate(${-angle}deg)`;
          return (
            <span
              key={`${letter}-${i}`}
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                transform,
                transformOrigin: "center center",
                color: "currentColor",
              }}
            >
              {letter === "*" ? "★" : letter}
            </span>
          );
        })}
      </div>

      <style>{`
        @keyframes circular-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
