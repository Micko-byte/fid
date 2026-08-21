"use client";

import type { CSSProperties } from "react";

interface BrandWordmarkProps {
  variant?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
}

export default function BrandWordmark({ variant = "dark", className = "", style }: BrandWordmarkProps) {
  const ink = variant === "dark" ? "#750006" : "#f5f2ec";

  return (
    <svg
      viewBox="0 0 980 180"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
      aria-label="Insight. Strategy. Impact."
      role="img"
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ink}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "88px",
          fontWeight: 700,
          letterSpacing: "0.07em",
        }}
      >
        Insight. Strategy. Impact.
      </text>
    </svg>
  );
}
