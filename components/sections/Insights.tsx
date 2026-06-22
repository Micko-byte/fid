"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { TextRoll } from "@/components/core/text-roll";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
} from "@/components/core/morphing-dialog";

const articles = [
  { title: "The rise of creator-led marketing in Africa", date: "May 2026", img: "/photos/projects/lc-waikiki-influencer.jpg", href: "https://www.linkedin.com/company/fid-pr/", blurb: "How creators are reshaping brand storytelling across the continent — and what it means for reach, trust and cultural relevance." },
  { title: "Why experiential marketing builds cultural relevance", date: "April 2026", img: "/photos/projects/tribe-vibe.jpg", href: "https://www.linkedin.com/company/fid-pr/", blurb: "Live experiences turn audiences into communities. We unpack how brand worlds earn lasting cultural equity." },
  { title: "Entering African markets: why local insight matters", date: "March 2026", img: "/photos/projects/africa-forum-displacement.jpg", href: "https://www.linkedin.com/company/fid-pr/", blurb: "Market entry is a cultural exercise as much as a commercial one. Local insight is the difference between noise and resonance." },
  { title: "AI, fashion and the future of content production in Africa", date: "February 2026", img: "/photos/projects/allso-beauty.jpg", href: "https://www.linkedin.com/company/fid-pr/", blurb: "Generative tools are accelerating content — but cultural fluency still decides what lands. A look at the new production stack." },
  { title: "Communicating at scale: lessons from national campaigns", date: "January 2026", img: "/photos/projects/national-minorities-day.jpg", href: "https://www.linkedin.com/company/fid-pr/", blurb: "Lessons from delivering high-stakes national communication with accuracy, sensitivity and reach." },
  { title: "How hospitality brands build lifestyle relevance", date: "December 2025", img: "/photos/editorial/cultural-festival.jpg", href: "https://www.linkedin.com/company/fid-pr/", blurb: "Hospitality is becoming lifestyle. How destination brands turn venues into cultural platforms." },
];

const spring = { type: "spring", stiffness: 200, damping: 24 } as const;

export default function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="insights" style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)", position: "relative" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>(06)</span>
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} /> Our Thinking
            </motion.span>
            <motion.h2 initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }} animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}} transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.4rem,6vw,5rem)", color: "#1a1a1a", marginTop: "0.8rem", letterSpacing: "-0.02em", lineHeight: 0.95, textTransform: "uppercase" }}>
              <TextRoll>Perspectives &amp;</TextRoll><br /><TextRoll>Intelligence</TextRoll>
            </motion.h2>
          </div>
          <Link href="/insights" style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.5)", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.5)")}>
            All articles →
          </Link>
        </div>

        {/* Rows — click to open a morphing preview */}
        <div>
          {articles.map((a, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
              <MorphingDialog transition={spring}>
                <MorphingDialogTrigger
                  className="insight-row"
                  style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,2vw,2rem)", padding: "clamp(1.1rem,2.2vw,1.7rem) 0", borderTop: "1px solid rgba(117,0,6,0.18)" }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(26,26,26,0.4)", flexShrink: 0, width: "5.5rem" }}>{a.date}</span>
                  <MorphingDialogImage src={a.img} alt={a.title} style={{ width: "72px", height: "56px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                  <MorphingDialogTitle style={{ flex: 1 }}>
                    <h3 className="insight-title" style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(1.15rem,2.4vw,2rem)", lineHeight: 1.06, letterSpacing: "-0.01em", color: "#1a1a1a", transition: "color 0.3s", textTransform: "uppercase", margin: 0 }}>
                      {a.title}
                    </h3>
                  </MorphingDialogTitle>
                  <ArrowUpRight size={20} weight="light" color="rgba(26,26,26,0.3)" style={{ flexShrink: 0 }} />
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent style={{ width: "min(560px, 92vw)", background: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(117,0,6,0.12)", boxShadow: "0 40px 100px rgba(12,12,12,0.4)", position: "relative" }}>
                    <MorphingDialogImage src={a.img} alt={a.title} style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "clamp(1.4rem,3vw,2.2rem)" }}>
                      <MorphingDialogSubtitle style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#d9ab88", fontWeight: 600, marginBottom: "0.7rem" }}>
                        {a.date}
                      </MorphingDialogSubtitle>
                      <MorphingDialogTitle>
                        <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1a1a1a", textTransform: "uppercase", margin: 0 }}>
                          {a.title}
                        </h3>
                      </MorphingDialogTitle>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(26,26,26,0.66)", marginTop: "1rem" }}>
                        {a.blurb}
                      </motion.p>
                      <motion.a
                        href={a.href} target="_blank" rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1.6rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#260000", background: "#d98038", padding: "0.85rem 1.6rem", borderRadius: "999px", textDecoration: "none" }}
                      >
                        Read more <ArrowUpRight size={15} weight="bold" />
                      </motion.a>
                    </div>
                    <MorphingDialogClose />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(117,0,6,0.18)" }} />
        </div>
      </div>

      <style>{`
        .insight-row:hover .insight-title { color: #750006; }
      `}</style>
    </section>
  );
}
