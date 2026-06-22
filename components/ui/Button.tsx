"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  cursor?: string;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const WINE = "#750006";
const GOLD = "#d98038";

function styleFor(variant: Variant, size: Size): React.CSSProperties {
  const pad = size === "sm" ? "0.7rem 1.2rem" : "0.95rem 1.6rem";
  const fs = size === "sm" ? "0.72rem" : "0.76rem";
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.6rem",
    fontFamily: "var(--font-body)", fontSize: fs, fontWeight: 600,
    letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
    padding: pad, borderRadius: "2px", cursor: "pointer", whiteSpace: "nowrap",
    transition: "background 0.3s, color 0.3s, border-color 0.3s, gap 0.3s, transform 0.12s cubic-bezier(0.16,1,0.3,1)",
    border: "1px solid transparent",
  };
  if (variant === "primary") return { ...base, backgroundColor: WINE, color: GOLD };
  if (variant === "outline") return { ...base, backgroundColor: "transparent", color: WINE, borderColor: "rgba(117,0,6,0.4)" };
  return { ...base, backgroundColor: "transparent", color: WINE, padding: "0.2rem 0", letterSpacing: "0.14em" };
}

function hoverIn(variant: Variant, el: HTMLElement) {
  el.style.gap = "0.9rem";
  if (variant === "primary") el.style.backgroundColor = "#5e2410";
  if (variant === "outline") { el.style.backgroundColor = WINE; el.style.color = GOLD; el.style.borderColor = WINE; }
  if (variant === "ghost") el.style.color = "#1a1a1a";
}
function hoverOut(variant: Variant, el: HTMLElement) {
  el.style.gap = variant === "ghost" ? "0.6rem" : "0.6rem";
  if (variant === "primary") el.style.backgroundColor = WINE;
  if (variant === "outline") { el.style.backgroundColor = "transparent"; el.style.color = WINE; el.style.borderColor = "rgba(117,0,6,0.4)"; }
  if (variant === "ghost") el.style.color = WINE;
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function Button({
  children, href, onClick, variant = "primary", size = "md",
  arrow = true, magnetic = true, cursor, external = false, className, type = "button",
}: ButtonProps) {
  const style = styleFor(variant, size);
  const common = {
    style, className,
    "data-cursor": cursor,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => hoverIn(variant, e.currentTarget),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { hoverOut(variant, e.currentTarget); e.currentTarget.style.transform = "scale(1)"; },
    onPointerDown: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = "scale(0.95)"; },
    onPointerUp: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = "scale(1)"; },
  };

  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  let node: ReactNode;
  if (href) {
    node = external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...common}>{inner}</a>
    ) : (
      <Link href={href} {...common}>{inner}</Link>
    );
  } else {
    node = <button type={type} onClick={onClick} {...common}>{inner}</button>;
  }

  return magnetic ? <Magnetic strength={12}>{node}</Magnetic> : node;
}
