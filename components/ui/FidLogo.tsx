import type { CSSProperties } from "react";

interface FidLogoProps {
  /** "dark" = logo on light/cream bg (black mark). "light" = logo on dark/red bg (cream mark). */
  variant?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
}

/**
 * FID & Co. logo (2026 redesign). Vector, so it stays sharp at the 260px-tall
 * footer banner where the old PNG visibly pixelated. Two colourways — black for
 * light backgrounds, cream for dark. Height is driven by the caller; width auto.
 *
 * A maroon colourway sits alongside these at /brand/fid-logo-maroon.svg if the
 * mark should go back to brand maroon on light backgrounds.
 */
export default function FidLogo({ variant = "dark", className = "", style }: FidLogoProps) {
  const src = variant === "dark" ? "/brand/fid-logo-black.svg" : "/brand/fid-logo-cream.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="FID & Co."
      className={className}
      style={{ display: "block", width: "auto", ...style }}
    />
  );
}
