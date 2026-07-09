"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpLeft, CheckCircle, Handshake } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import SplitText from "@/components/ui/SplitText";
import type { OwnedPlatform } from "@/components/lib/platforms";

const HERO_FLOATING_SHAPES = [
  { size: 380, x: "5%", y: "10%", color: "rgba(117,0,6,0.09)", dur: 24, dx: 25, dy: 18 },
  { size: 300, x: "68%", y: "8%", color: "rgba(201,170,60,0.11)", dur: 30, dx: -20, dy: 30 },
  { size: 260, x: "50%", y: "60%", color: "rgba(117,0,6,0.07)", dur: 28, dx: 18, dy: -25 },
  { size: 320, x: "15%", y: "68%", color: "rgba(217,128,56,0.13)", dur: 34, dx: -30, dy: -18 },
];

/* ── Culturally-inspired ornamental medallion — Suhba's design-reference accent.
   Original six-petal floret motif, echoing the brand-pattern-floral texture at a
   larger scale, used as standalone graphic layers rather than a repeating fill. ── */
function FloralMedallion({ size = 160, color = "#d98038", opacity = 0.16 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="1">
        <circle cx="50" cy="50" r="46" strokeOpacity={opacity * 0.6} />
        <circle cx="50" cy="50" r="34" strokeDasharray="2 6" strokeOpacity={opacity * 0.8} />
        <g transform="translate(50,50)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse key={deg} cx="0" cy="-20" rx="7" ry="20" transform={`rotate(${deg})`} />
          ))}
          <circle r="5" fill={color} fillOpacity={opacity * 1.2} stroke="none" />
        </g>
      </g>
    </svg>
  );
}

/* ── Eight-point star — classic Islamic geometric motif, used as a subtle accent. ── */
function GeometricStar({ size = 24, color = "#750006", opacity = 0.35 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="0.8">
        {[0, 45].map((deg) => (
          <polygon key={deg} points="20,2 24,16 38,16 27,24 31,38 20,29 9,38 13,24 2,16 16,16" transform={`rotate(${deg} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="3" fill={color} fillOpacity={opacity * 0.6} stroke="none" />
      </g>
    </svg>
  );
}

/* ── Islamic geometric section divider — interlocking star lattice. ── */
function ArabesqueDivider({ accent }: { accent: string }) {
  return (
    <div aria-hidden style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
      <svg viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block", opacity: 0.35 }}>
        <path d="M0 20 C200 8, 400 32, 600 20 S1000 8, 1200 20" stroke={accent} strokeWidth="1" fill="none" />
        {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
          <g key={x} transform={`translate(${x}, 20)`}>
            <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="0.5" strokeOpacity="0.4" />
          </g>
        ))}
        <circle cx="600" cy="20" r="4" fill={accent} fillOpacity="0.4" stroke="none" />
      </svg>
    </div>
  );
}

export default function PlatformClient({ platform: p }: { platform: OwnedPlatform }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });
  const highlightsRef = useRef<HTMLUListElement>(null);
  const partnershipsRef = useRef<HTMLUListElement>(null);
  const highlightsInView = useInView(highlightsRef, { once: true, margin: "-10%" });
  const partnershipsInView = useInView(partnershipsRef, { once: true, margin: "-10%" });
  const isSuhba = p.slug === "suhba-series";

  return (
    <>
      <main className="bg-brand-texture" style={{ color: "#1c1c1c", minHeight: "100vh" }}>
        {/* ── HERO ── */}
        <section ref={heroRef} style={{ position: "relative", paddingTop: "clamp(8rem,16vw,12rem)", paddingBottom: "clamp(4rem,8vw,7rem)", overflow: "hidden" }}>
          {/* Suhba: soft blurred backdrop photo — no colour overlay. */}
          {isSuhba && (
            <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.gallery?.[1] ?? p.image}
                alt=""
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(6px)",
                  transform: "scale(1.06)",
                }}
              />
            </div>
          )}

          {/* warm ambient wash */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(60% 70% at 80% 0%, ${p.accent}22 0%, transparent 55%), radial-gradient(60% 70% at 10% 100%, rgba(117,0,6,0.08) 0%, transparent 55%)` }} />

          {/* floating abstract shapes */}
          {HERO_FLOATING_SHAPES.map((s, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              animate={{ x: [0, s.dx, 0], y: [0, s.dy, 0] }}
              transition={{ duration: s.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              style={{
                position: "absolute",
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${s.color}, transparent 70%)`,
                filter: "blur(60px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          ))}

          {/* Suhba: culturally-inspired floral/geometric layer, on top of the existing
              ambient wash + floating shapes above — retains the current background as
              the base and layers new graphics over it, per the design-reference brief. */}
          {isSuhba && (
            <>
              <div aria-hidden className="brand-pattern-floral" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />
              <div aria-hidden style={{ position: "absolute", top: "6%", right: "4%", pointerEvents: "none", zIndex: 1, opacity: 0.8 }}>
                <FloralMedallion size={180} color={p.accent} opacity={0.22} />
              </div>
              <div aria-hidden style={{ position: "absolute", bottom: "-6%", left: "-3%", pointerEvents: "none", zIndex: 1, opacity: 0.7 }}>
                <FloralMedallion size={220} color="#750006" opacity={0.14} />
              </div>
            </>
          )}

          <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            {/* breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <Link href="/#platforms" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(28,28,28,0.55)", textDecoration: "none" }}>
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
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(3rem,9vw,8rem)", color: "#1c1c1c", lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase", margin: 0 }}
              />

              <motion.p
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", letterSpacing: "0.04em", color: p.accent, textTransform: "uppercase", margin: 0 }}
              >
                {p.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.2rem)", lineHeight: 1.65, color: "#1c1c1c", maxWidth: "55ch", margin: 0 }}
              >
                {p.shortDesc}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Featured partners — section 2 for Suhba (client brief) ── */}
        {p.partners && p.partners.length > 0 && (
          <>
            {isSuhba && <ArabesqueDivider accent={p.accent} />}
            <section
              className={isSuhba ? "bg-brand-texture" : undefined}
              style={{
                backgroundColor: isSuhba ? undefined : "#f5f2ec",
                paddingTop: "clamp(3rem,6vw,5rem)",
                paddingBottom: "clamp(3rem,6vw,5rem)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isSuhba && (
                <>
                  <div aria-hidden style={{ position: "absolute", top: "8%", left: "2%", pointerEvents: "none", opacity: 0.55 }}>
                    <FloralMedallion size={120} color={p.accent} opacity={0.14} />
                  </div>
                  <div aria-hidden style={{ position: "absolute", bottom: "5%", right: "3%", pointerEvents: "none", opacity: 0.5 }}>
                    <GeometricStar size={80} color="#c9aa3c" opacity={0.18} />
                  </div>
                </>
              )}
              <div style={{ position: "relative", zIndex: 1, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: p.accent }}>
                  {isSuhba && <GeometricStar size={14} color={p.accent} opacity={0.7} />}
                  <span style={{ width: "26px", height: "1px", background: p.accent, opacity: 0.7 }} />
                  Featured Partners
                  {isSuhba && <GeometricStar size={14} color={p.accent} opacity={0.7} />}
                </span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(2rem,4vw,3rem)", color: "#1c1c1c", letterSpacing: "-0.02em", marginTop: "0.8rem", marginBottom: "clamp(2rem,4vw,3rem)" }}>
                  Partners shaping the experience
                </h2>

                <div className="suhba-mq-mask">
                  <div className="suhba-mq-track">
                    {[...p.partners, ...p.partners].map((pt, i) => (
                      <div key={i} className="suhba-mq-item">
                        {pt.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={pt.logo} alt={`${pt.name} logo`} loading="lazy" />
                        ) : (
                          <span className="suhba-mq-wordmark" style={{ color: p.accent }}>{pt.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <style>{`
              .suhba-mq-mask {
                -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
                mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
              }
              .suhba-mq-track {
                display: flex;
                align-items: center;
                gap: clamp(2.5rem, 5vw, 4.5rem);
                width: max-content;
                animation: suhba-mq-scroll 36s linear infinite;
              }
              .suhba-mq-track:hover { animation-play-state: paused; }
              .suhba-mq-item {
                flex: 0 0 auto;
                height: clamp(48px, 8vw, 64px);
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .suhba-mq-item img {
                max-height: 100%;
                max-width: 170px;
                width: auto;
                object-fit: contain;
                filter: grayscale(1) contrast(1.1);
                opacity: 0.65;
                transition: filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
              }
              .suhba-mq-item img:hover {
                filter: grayscale(0);
                opacity: 1;
                transform: scale(1.08);
              }
              .suhba-mq-wordmark {
                font-family: var(--font-heading);
                font-weight: 600;
                font-size: clamp(1rem, 1.6vw, 1.3rem);
                text-transform: uppercase;
                letter-spacing: 0.04em;
                white-space: nowrap;
                opacity: 0.75;
                transition: opacity 0.4s ease, transform 0.4s ease;
              }
              .suhba-mq-wordmark:hover { opacity: 1; transform: scale(1.05); }
              @keyframes suhba-mq-scroll {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @media (prefers-reduced-motion: reduce) {
                .suhba-mq-track { animation: none; flex-wrap: wrap; justify-content: center; }
              }
            `}</style>
          </>
        )}

        {/* ── Cover image ── */}
        <section style={{ paddingBottom: "clamp(4rem,8vw,6rem)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#f5f2ec", borderRadius: "4px", boxShadow: "0 30px 80px rgba(117,0,6,0.15)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(117,0,6,0.55))" }} />
              {isSuhba && (
                <div aria-hidden style={{ position: "absolute", bottom: "-4%", right: "2%", pointerEvents: "none", opacity: 0.9 }}>
                  <FloralMedallion size={140} color="#f5f2ec" opacity={0.5} />
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Photo gallery (if platform has images) ── */}
        {p.gallery && p.gallery.length > 0 && (
          <section style={{ paddingBottom: "clamp(3rem,6vw,5rem)" }}>
            <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: p.gallery.length === 1 ? "1fr" : p.gallery.length === 2 ? "1fr 1fr" : "1.4fr 1fr 1fr",
                gap: "clamp(0.75rem,1.5vw,1.2rem)",
              }} className="plat-gallery-grid">
                {p.gallery.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="platform-feature-media"
                    style={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      height: i === 0 ? "clamp(320px,44vw,540px)" : "clamp(220px,28vw,360px)",
                      background: "#e8e0d8",
                      position: "relative",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${p.name} — image ${i + 1}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(38,0,0,0.45) 100%)", pointerEvents: "none" }} />
                  </motion.div>
                ))}
              </div>
            </div>
            <style>{`.plat-gallery-grid { @media (max-width:900px) { grid-template-columns: 1fr 1fr !important; } @media (max-width:580px) { grid-template-columns: 1fr !important; } }`}</style>
          </section>
        )}

        {/* ── Intro paragraph ── */}
        <section style={{ paddingBottom: "clamp(5rem,10vw,8rem)", position: "relative" }}>
          {isSuhba && (
            <div aria-hidden style={{ position: "absolute", top: "10%", right: "4%", pointerEvents: "none", opacity: 0.45 }}>
              <GeometricStar size={56} color="#c9aa3c" opacity={0.2} />
            </div>
          )}
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }} className="plat-page-grid">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: p.accent, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isSuhba && <GeometricStar size={10} color={p.accent} opacity={0.6} />}
                About the platform
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.35vw,1.2rem)", lineHeight: 1.75, color: "#1c1c1c", maxWidth: "70ch", margin: 0 }}>
                {p.intro}
              </p>
            </div>
          </div>
        </section>

        {/* ── Highlights + Partnership opportunities ── */}
        <section style={{ paddingBottom: "clamp(5rem,10vw,8rem)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,4rem)", borderTop: "1px solid rgba(28,28,28,0.1)", paddingTop: "clamp(3rem,6vw,5rem)" }} className="plat-page-grid">
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.4rem,2.4vw,1.9rem)", color: "#1c1c1c", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>
                  What it delivers
                </h3>
                <ul ref={highlightsRef} style={{ listStyle: "none", padding: 0, margin: "1.4rem 0 0", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {p.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={highlightsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.96rem", color: "#1c1c1c" }}
                    >
                      <CheckCircle size={18} weight="bold" color={p.accent} style={{ flexShrink: 0, marginTop: "2px" }} /> {h}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.4rem,2.4vw,1.9rem)", color: "#1c1c1c", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>
                  Brand partnership opportunities
                </h3>
                <ul ref={partnershipsRef} style={{ listStyle: "none", padding: 0, margin: "1.4rem 0 0", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {p.partnerships.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={partnershipsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.96rem", color: "#1c1c1c" }}
                    >
                      <Handshake size={18} weight="bold" color={p.accent} style={{ flexShrink: 0, marginTop: "2px" }} /> {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-light" style={{ position: "relative", paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(6rem,12vw,10rem)", overflow: "hidden" }}>
          {isSuhba && (
            <div aria-hidden style={{ position: "absolute", top: "4%", left: "3%", pointerEvents: "none", opacity: 0.7 }}>
              <FloralMedallion size={150} color="#750006" opacity={0.16} />
            </div>
          )}
          {/* accent illustration near CTA */}
          <motion.img
            src="/illustrations/iconography-accents.png"
            alt=""
            aria-hidden="true"
            animate={{ y: [0, -8, 0], rotate: [12, 14, 12] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: "-2%",
              bottom: "8%",
              width: "clamp(180px, 22vw, 340px)",
              height: "auto",
              opacity: 0.12,
              pointerEvents: "none",
              zIndex: 0,
              transform: "rotate(12deg)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1.5rem", textTransform: "uppercase", background: `linear-gradient(135deg, #1c1c1c 40%, ${p.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Partner with {p.name}.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.2vw,1.05rem)", color: "#1c1c1c", maxWidth: "52ch", margin: "0 auto 2rem", lineHeight: 1.65 }}>
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
