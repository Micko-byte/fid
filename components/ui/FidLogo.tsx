import type { CSSProperties } from "react";

interface FidLogoProps {
  /** "dark" = logo on light/cream bg (maroon mark). "light" = logo on dark/red bg (cream mark). */
  variant?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
}

/**
 * FID & Co. logo (2026 redesign). Two colourways — maroon for light backgrounds,
 * cream for dark backgrounds. Height is driven by the caller's style; width auto.
 */
export default function FidLogo({ variant = "dark", className = "", style }: FidLogoProps) {
  const src = variant === "dark" ? "/brand/fid-logo-maroon.png" : "/brand/fid-logo-cream.png";
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
