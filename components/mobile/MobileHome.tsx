"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Megaphone, Newspaper, ShareNetwork, ChartLineUp, Confetti,
  Timer, ChartBar, Buildings, GlobeHemisphereEast,
} from "@phosphor-icons/react";
import Footer from "@/components/Footer";
import BrandHero from "@/components/sections/BrandHero";
import Contact from "@/components/sections/Contact";
import {
  MobileSectionHead,
  MobileEyebrow,
  MobileSlider,
  RadialDial,
} from "@/components/mobile/ui";

const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/${id}`;

const PX = "clamp(1.4rem, 6vw, 2rem)";
const PY = "clamp(4.5rem, 16vw, 6.5rem)";
const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  { label: "Strategic\nCommunications", slug: "strategic-communications", dots: ["#750006", "#d98038", "#f5f2ec", "#d9ab88"], Icon: Megaphone },
  { label: "Media\nManagement", slug: "media-management", dots: ["#d98038", "#750006", "#d9ab88", "#f5f2ec"], Icon: Newspaper },
  { label: "Digital &\nInfluencer", slug: "influencer-creator", dots: ["#f5f2ec", "#d98038", "#750006"], Icon: ShareNetwork },
  { label: "Digital Strategy\n& Social", slug: "digital-strategy", dots: ["#d9ab88", "#750006", "#d98038"], Icon: ChartLineUp },
  { label: "Experiential\nMarketing", slug: "experiential-marketing", dots: ["#750006", "#f5f2ec", "#d98038", "#d9ab88"], Icon: Confetti },
];

const WORK = [
  { slug: "africa-urban-forum-2026", client: "Africa Urban Forum", sector: "Government", image: cl("auf-01") },
  { slug: "kansai-plascon", client: "Kansai Plascon", sector: "Corporate", image: cl("kansai-01") },
  { slug: "thrive-hospitality-group", client: "Chaii Republic", sector: "Hospitality", image: "/photos/projects/thrive-hospitality/glam-01.jpg" },
  { slug: "allso-beauty", client: "Allso Beauty", sector: "Beauty & Lifestyle", image: cl("allso-01") },
];

const PLATFORMS = [
  { slug: "the-tribe-vibe", name: "The Tribe Vibe", tag: "Lifestyle · Music · Culture", image: "/photos/projects/tribe-vibe.jpg" },
  { slug: "suhba-series", name: "Suhba Series", tag: "Curated Conversations", image: cl("suhba-01") },
  { slug: "the-capital-room", name: "The Capital Room", tag: "Leadership · Business", image: "/photos/editorial/podcast-set.jpg" },
];

const STATS = [
  { v: "15+", l: "Years shaping reputation", Icon: Timer },
  { v: "250+", l: "Campaigns delivered", Icon: ChartBar },
  { v: "80+", l: "Brands & institutions", Icon: Buildings },
  { v: "12+", l: "African markets", Icon: GlobeHemisphereEast },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function MobileHome() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── HERO ── */}
      <BrandHero />

      {/* ── WHO WE ARE ── */}
      <section style={{ background: "#f5f2ec", color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <FadeUp>
          <MobileEyebrow tone="light">Who we are</MobileEyebrow>
        </FadeUp>
        <FadeUp delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 9vw, 2.8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: "1.2rem 0 0",
            }}
          >
            A communications partner built for influence at{" "}
            <em style={{ fontStyle: "normal", color: "#d98038" }}>scale</em>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.98rem",
              lineHeight: 1.7,
              color: "rgba(28,28,28,0.66)",
              margin: "1.4rem 0 0",
            }}
          >
            FID &amp; Co. is a full-service strategic communications and brand
            experience firm delivering PR, media, digital storytelling,
            influencer marketing and experiential activations across Africa.
          </p>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem 1rem",
            marginTop: "3rem",
          }}
        >
          {STATS.map((s, i) => (
            <FadeUp key={s.l} delay={0.1 + i * 0.06}>
              <s.Icon size={26} weight="light" color="#d98038" />
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 12vw, 3.4rem)",
                  lineHeight: 0.9,
                  color: "#750006",
                  marginTop: "0.5rem",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                  color: "rgba(28,28,28,0.6)",
                  marginTop: "0.6rem",
                }}
              >
                {s.l}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── OUR EXPERTISE (rotating dials, 2-1-2) ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "#1c1c1c", color: "#f5f2ec", padding: `${PY} ${PX}` }}>
        <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
        <MobileSectionHead title="Our Expertise" href="/services" tone="dark" />
        {(() => {
          const Dial = (i: number) => {
            const s = SERVICES[i];
            const Icon = s.Icon;
            return (
              <FadeUp key={s.slug} delay={(i % 2) * 0.06}>
                <Link href={`/services/${s.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <RadialDial
                    label={s.label}
                    tone="dark"
                    dots={s.dots}
                    size={150}
                    spin={56 + i * 8}
                    dir={i % 2 === 0 ? 1 : -1}
                    icon={<Icon size={24} weight="light" />}
                  />
                </Link>
              </FadeUp>
            );
          };
          const row: React.CSSProperties = { display: "flex", justifyContent: "center", gap: "0.75rem" };
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div style={row}>{Dial(0)}{Dial(1)}</div>
              <div style={row}>{Dial(2)}</div>
              <div style={row}>{Dial(3)}{Dial(4)}</div>
            </div>
          );
        })()}
        </div>
      </section>

      {/* ── SELECTED WORK (slider) ── */}
      <section style={{ background: "#1c1c1c", color: "#f5f2ec", padding: `${PY} ${PX}` }}>
        <MobileSectionHead title="Selected Work" href="/#work" label="View all" tone="dark" />
        <MobileSlider tone="dark">
          {WORK.map((w) => (
            <Link key={w.slug} href={`/work/${w.slug}`} style={{ textDecoration: "none", display: "block", paddingRight: "1px" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: "16px", overflow: "hidden", background: "#260000" }}>
                <img src={w.image} alt={w.client} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85), transparent 55%)" }} />
                <div style={{ position: "absolute", left: "1.2rem", bottom: "1.2rem", right: "1.2rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d98038", margin: 0 }}>{w.sector}</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.01em", color: "#f5f2ec", margin: "0.4rem 0 0" }}>{w.client}</h3>
                </div>
              </div>
            </Link>
          ))}
        </MobileSlider>
      </section>

      {/* ── PLATFORMS (slider) ── */}
      <section style={{ background: "#f5f2ec", color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <MobileSectionHead title="Owned Platforms" href="/events" tone="light" />
        <MobileSlider tone="light">
          {PLATFORMS.map((p) => (
            <Link key={p.slug} href={`/platforms/${p.slug}`} style={{ textDecoration: "none", display: "block", paddingRight: "1px" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: "16px", overflow: "hidden", background: "#260000" }}>
                <img src={p.image} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(38,0,0,0.85), transparent 55%)" }} />
                <div style={{ position: "absolute", left: "1.2rem", bottom: "1.2rem", right: "1.2rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d98038", margin: 0 }}>{p.tag}</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.6rem", letterSpacing: "-0.01em", color: "#f5f2ec", margin: "0.4rem 0 0" }}>{p.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </MobileSlider>
      </section>

      {/* ── FOUNDER (white) ── */}
      <section style={{ background: "#f5f2ec", color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <FadeUp>
          <MobileEyebrow tone="light">Founder</MobileEyebrow>
        </FadeUp>
        <FadeUp delay={0.06}>
          <img
            src="/illustrations/founder-portrait.png"
            alt="Farida Idris"
            loading="lazy"
            style={{ width: "100%", maxWidth: "320px", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center top", borderRadius: "16px", margin: "1.4rem 0 0", border: "1px solid rgba(117,0,6,0.18)" }}
          />
        </FadeUp>
        <FadeUp delay={0.12}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.2rem, 10vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, margin: "1.6rem 0 0", color: "#1c1c1c" }}>
            Farida Idris
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#750006", margin: "0.7rem 0 0" }}>
            Founder &amp; Lead Strategist
          </p>
        </FadeUp>
        <FadeUp delay={0.18}>
          <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.3rem, 6vw, 1.7rem)", lineHeight: 1.32, letterSpacing: "-0.01em", margin: "1.6rem 0 0", color: "#1c1c1c" }}>
            &ldquo;Communication is not simply about visibility. It is about
            shaping understanding and connecting organisations with the people
            they serve.&rdquo;
          </blockquote>
        </FadeUp>
      </section>

      {/* ── CONTACT (real form) ── */}
      <Contact />

      <Footer />
    </div>
  );
}
