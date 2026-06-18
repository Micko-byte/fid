"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";

const PHONE = "254797690609"; // +254 797 690 609
const MESSAGE = "Hello FID & Co., I'd like to discuss a project.";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed",
        bottom: "clamp(1.1rem, 3vw, 2rem)",
        right: "clamp(1.1rem, 3vw, 2rem)",
        zIndex: 90,
        display: "inline-flex",
        alignItems: "center",
        gap: hover ? "0.7rem" : "0",
        backgroundColor: "#25D366",
        color: "#ffffff",
        borderRadius: "var(--button-radius)",
        padding: hover ? "0.85rem 1.3rem 0.85rem 0.95rem" : "0.95rem",
        textDecoration: "none",
        boxShadow: "0 10px 30px rgba(37,211,102,0.35), 0 4px 10px rgba(0,0,0,0.18)",
        transition: "gap 0.3s cubic-bezier(0.16,1,0.3,1), padding 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <WhatsappLogo size={26} weight="fill" style={{ flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          maxWidth: hover ? "160px" : "0",
          opacity: hover ? 1 : 0,
          transition: "max-width 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s",
        }}
      >
        Chat with us
      </span>
    </a>
  );
}
