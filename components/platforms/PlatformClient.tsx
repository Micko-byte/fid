"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpLeft } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import SplitText from "@/components/ui/SplitText";
import type { OwnedPlatform } from "@/lib/platforms";

export default function PlatformClient({ platform: p }: { platform: OwnedPlatform }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <>
      <main style={{ backgroundColor: "#f7ecc4", color: "#1a1a1a", minHeight: "100vh" }}>
        {/* ── HERO ── */}
        <section ref={heroRef} style={{ position: "relative", paddingTop: "clamp(8rem,16vw,12rem)", paddingBottom: "clamp(4rem,8vw,7rem)", overflow: "hidden" }}>
          {/* warm ambient wash */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(60% 70% at 80% 0%, ${p.accent}22 0%, transparent 55%), radial-gradient(60% 70% at 10% 100%, rgba(91,14,20,0.08) 0%, transparent 55%)` }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            {/* breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <Link href="/#platforms" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,26,26,0.55)", textDecoration: "none" }}>
                <ArrowUpLeft size={14} /> Back to platforms
              </Link>
            </motion.div>

            {/* number + name */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(1.5rem,4vw,3rem)", marginTop: "clamp(2rem,5vw,3.5rem)" }}>
              <motion.span
                initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.accent }}
              >
                <span style={{ width: "26px", height: "1px", background: p.accent, opacity: 0.7 }} />
                {p.num} · Owned Platform
              </motion.span>

              <SplitText
                tag="h1"
                text={p.name}
                splitType="chars"
                delay={30}
                duration={0.9}
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
                style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(3rem,9vw,8rem)", color: "#1a1a1a", lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase", margin: 0 }}
              />

              <motion.p
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", letterSpacing: "0.04em", color: p.accent, textTransform: "uppercase", margin: 0 }}
              >
                {p.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.2rem)", lineHeight: 1.65, color: "rgba(26,26,26,0.72)", maxWidth: "55ch", margin: 0 }}
              >
                {p.shortDesc}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Cover image ── */}
        <section style={{ paddingBottom: "clamp(4rem,8vw,6rem)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#ece7df", borderRadius: "4px", boxShadow: "0 30px 80px rgba(91,14,20,0.15)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(26,3,6,0.55))" }} />
              <span style={{ position: "absolute", left: "1.6rem", bottom: "1.4rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
                Asset placeholder — replace with hero image
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── Intro paragraph ── */}
        <section style={{ paddingBottom: "clamp(5rem,10vw,8rem)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }} className="plat-page-grid">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: p.accent, margin: 0 }}>About the platform</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.35vw,1.2rem)", lineHeight: 1.75, color: "rgba(26,26,26,0.78)", maxWidth: "70ch", margin: 0 }}>
                {p.intro}
              </p>
            </div>
          </div>
        </section>

        {/* ── Highlights + Partnership opportunities ── */}
        <section style={{ paddingBottom: "clamp(5rem,10vw,8rem)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,4rem)", borderTop: "1px solid rgba(26,26,26,0.1)", paddingTop: "clamp(3rem,6vw,5rem)" }} className="plat-page-grid">
              <div>
                <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.4rem,2.4vw,1.9rem)", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>
                  What it delivers
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "1.4rem 0 0", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {p.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.96rem", color: "rgba(26,26,26,0.75)" }}>
                      <span style={{ color: p.accent }}>—</span> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.4rem,2.4vw,1.9rem)", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>
                  Brand partnership opportunities
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "1.4rem 0 0", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {p.partnerships.map((h, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.96rem", color: "rgba(26,26,26,0.75)" }}>
                      <span style={{ color: p.accent }}>—</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured partners (Suhba etc.) ── */}
        {p.partners && p.partners.length > 0 && (
          <section style={{ backgroundColor: "#fbf3d6", paddingTop: "clamp(4rem,8vw,6rem)", paddingBottom: "clamp(4rem,8vw,6rem)" }}>
            <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: p.accent }}>
                <span style={{ width: "26px", height: "1px", background: p.accent, opacity: 0.7 }} />
                Featured Partners
              </span>
              <h2 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a1a1a", letterSpacing: "-0.02em", marginTop: "0.8rem", marginBottom: "clamp(2rem,4vw,3rem)" }}>
                Partners shaping the experience
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
                {p.partners.map((pt, i) => (
                  <div key={i} style={{ padding: "1.4rem 1.5rem", backgroundColor: "#f7ecc4", border: "1px solid rgba(91,14,20,0.1)", borderRadius: "6px" }}>
                    <p style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "1.05rem", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.02em", margin: 0 }}>
                      {pt.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: p.accent, margin: "0.4rem 0 0.7rem" }}>
                      {pt.role}
                    </p>
                    {pt.note && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.55, color: "rgba(26,26,26,0.65)", margin: 0 }}>
                        {pt.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(6rem,12vw,10rem)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2rem,5vw,4rem)", color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1.5rem", textTransform: "uppercase" }}>
              Partner with {p.name}.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.2vw,1.05rem)", color: "rgba(26,26,26,0.65)", maxWidth: "52ch", margin: "0 auto 2rem", lineHeight: 1.65 }}>
              Partnership opportunities are tailored to align with each platform&apos;s audience, objectives and experience design.
            </p>
            <div style={{ display: "inline-flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Button href="/#contact" variant="primary" magnetic cursor="Let's talk">Start a conversation</Button>
              <Button href="/#platforms" variant="outline">See all platforms</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .plat-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
