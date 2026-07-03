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
        textDecoration: "none",
      }}
    >
      {/* Expanding frosted label */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#f5f2ec",
          background: "rgba(13,6,6,0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(245,242,236,0.12)",
          borderRadius: "999px",
          paddingLeft: hover ? "1.1rem" : "0",
          paddingRight: hover ? "1.5rem" : "0",
          height: "44px",
          display: "inline-flex",
          alignItems: "center",
          marginRight: hover ? "-1.4rem" : "0",
          maxWidth: hover ? "200px" : "0",
          opacity: hover ? 1 : 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "max-width 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, padding 0.4s, margin 0.4s",
        }}
      >
        Chat with us
      </span>

      {/* Circular FAB */}
      <span
        style={{
          position: "relative",
          width: "60px",
          height: "60px",
          borderRadius: "999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #25D366 0%, #0e9f6e 100%)",
          color: "#ffffff",
          boxShadow: hover
            ? "0 14px 36px rgba(37,211,102,0.45), 0 6px 14px rgba(0,0,0,0.25)"
            : "0 10px 28px rgba(37,211,102,0.32), 0 4px 10px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.18)",
          transform: hover ? "translateY(-3px) scale(1.04)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s",
        }}
      >
        {/* pulsing ring */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "999px",
            border: "2px solid rgba(37,211,102,0.55)",
            animation: "fid-wa-ping 2.4s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        {/* online dot */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "13px",
            height: "13px",
            borderRadius: "999px",
            background: "#d98038",
            border: "2px solid #260000",
          }}
        />
        <WhatsappLogo size={30} weight="fill" />
      </span>

      <style>{`
        @keyframes fid-wa-ping {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
