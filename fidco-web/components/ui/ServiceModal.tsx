"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle } from "@phosphor-icons/react";
import { services as serviceData } from "@/components/lib/services";
import { STOCK } from "@/lib/stock-photos";

const MODAL_EASE = [0.16, 1, 0.3, 1] as const;

// A topic-appropriate stock image per expertise area (relates to the write-up).
const SERVICE_IMAGE: Record<string, string | undefined> = {
  "strategic-communications": STOCK.pressConf?.[0]?.src,
  "media-management": STOCK.media?.[0]?.src,
  "influencer-creator": STOCK.digital?.[0]?.src,
  "digital-strategy": STOCK.strategy?.[1]?.src,
  "experiential-marketing": STOCK.experiential?.[0]?.src,
};

/* Expertise pop-up — the write-up in words, no stock-photo pages (Farida's brief:
   "delete those pages when clicked and add pop-ups with the write-up"). Shared by
   the desktop and mobile expertise sections. */
export default function ServiceModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const svc = serviceData.find((s) => s.slug === slug);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  if (!svc) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={svc.title}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem,4vw,2.5rem)", background: "rgba(18,8,4,0.68)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, ease: MODAL_EASE }}
        onClick={(e) => e.stopPropagation()}
        className="brand-pattern-light"
        style={{ position: "relative", width: "min(620px, 100%)", maxHeight: "88vh", overflowY: "auto", borderRadius: "20px", padding: "clamp(1.8rem,4vw,3rem)", background: "linear-gradient(160deg, #2e0703 0%, #260000 55%, #180404 100%)", border: "1px solid rgba(217,128,56,0.2)", boxShadow: "0 40px 110px rgba(38,0,0,0.5)" }}
      >
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 2, width: "38px", height: "38px", borderRadius: "999px", background: "rgba(38,0,0,0.5)", border: "1px solid rgba(245,242,236,0.28)", color: "#f5f2ec", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
          <X size={16} weight="bold" />
        </button>

        {SERVICE_IMAGE[svc.slug] && (
          <div style={{ position: "relative", margin: "calc(-1 * clamp(1.8rem,4vw,3rem)) calc(-1 * clamp(1.8rem,4vw,3rem)) 1.6rem", height: "clamp(150px, 26vw, 210px)", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SERVICE_IMAGE[svc.slug]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.95)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.15) 0%, rgba(38,0,0,0.35) 60%, #260000 100%)" }} />
          </div>
        )}

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: 0 }}>
          Expertise · {svc.num}
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,3.2vw,2.2rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f5f2ec", margin: "0.7rem 0 0", maxWidth: "22ch" }}>
          {svc.title}
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", lineHeight: 1.7, color: "rgba(245,242,236,0.82)", margin: "1.1rem 0 0" }}>{svc.summary}</p>
        {svc.detailParagraphs.map((p, k) => (
          <p key={k} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(245,242,236,0.64)", margin: "0.9rem 0 0" }}>{p}</p>
        ))}

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", fontWeight: 700, margin: "1.8rem 0 0.9rem" }}>What we do</p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.6rem" }}>
          {svc.capabilities.map((c) => (
            <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(245,242,236,0.8)" }}>
              <CheckCircle size={17} weight="fill" color="#d98038" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
