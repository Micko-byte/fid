"use client";

import { type ReactNode, type CSSProperties } from "react";

type Variant = "pink" | "green" | "blue" | "red" | "amber" | "brand";

const VARIANTS: Record<Variant, string> = {
  brand:  "linear-gradient(135deg, #750006 0%, #d98038 50%, #d9ab88 100%)",
  red:    "linear-gradient(135deg, #750006 0%, #260000 100%)",
  amber:  "linear-gradient(135deg, #d98038 0%, #750006 100%)",
  pink:   "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  green:  "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
  blue:   "linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%)",
};

interface GradientHeadingProps {
  children: ReactNode;
  variant?: Variant;
  /** Custom gradient — overrides variant */
  gradient?: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
}

export default function GradientHeading({
  children,
  variant = "brand",
  gradient,
  className = "",
  style,
  as: Tag = "h2",
}: GradientHeadingProps) {
  const bg = gradient ?? VARIANTS[variant];

  return (
    <Tag
      className={`gradient-heading ${className}`}
      style={{
        backgroundImage: bg,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        display: "inline-block",
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
