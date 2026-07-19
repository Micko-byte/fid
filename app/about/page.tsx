"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import OrbitalRings from "@/components/graphics/OrbitalRings";
import { WhoWeAreGraphic } from "@/components/graphics/AbstractGraphics";
import WhoWeAreBackdrop from "@/components/graphics/WhoWeAreBackdrop";
import Responsive from "@/components/mobile/Responsive";
import MobileAbout from "@/components/mobile/MobileAbout";

const values = [
  {
    title: "Strategic Thinking",
    body: "We approach communications with a clear understanding of the broader business, cultural and reputational environment in which organisations operate.",
  },
  {
    title: "Cultural Intelligence",
    body: "Operating in African markets requires an understanding of social dynamics, local narratives and evolving cultural trends. Our campaigns are designed with these insights at the centre.",
  },
  {
    title: "Integrated Delivery",
    body: "By combining public relations, digital storytelling, influencer engagement and experiential marketing, we ensure communications strategies are translated into tangible audience engagement.",
  },
  {
    title: "Regional Perspective",
    body: "Through cross-border campaigns and partnerships, FID & Co. supports organisations operating across East and Southern Africa.",
  },
  {
    title: "Execution Excellence",
    body: "From concept to on-ground implementation, we deliver campaigns with precision, professionalism and attention to detail.",
  },
];

const markets = [
  "Kenya", "Uganda", "Rwanda", "Ethiopia", "South Sudan", "Zambia", "Ghana", "Tanzania",
];

/* ── Hero — text left, video on the side ── */
function PageHero() {
  return (
    <section
      className="section-light relative min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden pt-28"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full flex items-center justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.25em] uppercase mb-8"
            style={{ color: "#750006" }}
          >
            About FID &amp; Co.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#260000",
              letterSpacing: "-0.03em",
              maxWidth: "14ch",
            }}
          >
            Communication as influence.
          </motion.h1>
        </div>
        {/* Video on the side */}
        <video
          src="/videos/digital-marketing.webm"
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block w-1/2 h-auto object-cover rounded-2xl"
        />
      </div>
    </section>
  );
}

/* ── Who we are — text left, cards ── */
function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-light" style={{ position: "relative", overflow: "hidden", isolation: "isolate", paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(5rem,10vw,9rem)" }}>
      <WhoWeAreBackdrop />
      <div ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", marginBottom: "1.5rem" }}
        >
          Who we are
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,5.2rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "#1c1c1c", maxWidth: "20ch", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}
        >
          A strategic communications partner for organisations shaping Africa.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.15rem)", lineHeight: 1.7, color: "rgba(28,28,28,0.7)", maxWidth: "60ch", marginBottom: "clamp(2.5rem,5vw,3.5rem)" }}
        >
          FID &amp; Co. is a full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region. Our work is grounded in insight, shaped by strategy, and delivered with precision.
        </motion.p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(1.5rem,3vw,2.5rem)" }}>
          {[
            { title: "Established in 2010", body: "We have evolved into a trusted partner for government institutions, multinational brands, corporates, hospitality groups, healthcare providers, sports organisations, investment firms and social impact initiatives." },
            { title: "Regional reach & affiliations", body: "FID & Co. is the Kenya Affiliate Agency and Country Representative for Wano Communications (South Africa), supporting the execution and management of regional client portfolios across East Africa." },
            { title: "A strategic boutique firm", body: "We combine the agility, cultural awareness and hands-on leadership of a boutique agency with the strategic depth required by multinational brands and institutional clients." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "clamp(1.5rem,2.5vw,2.2rem)", borderRadius: "12px", border: "1px solid rgba(28,28,28,0.08)", background: "rgba(255,255,255,0.66)", backdropFilter: "blur(6px)" }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "#750006", marginBottom: "0.75rem" }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(28,28,28,0.65)" }}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Philosophy (dark) — left-aligned pillars ── */
function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="bg-brand-deep relative overflow-hidden py-24 md:py-40">
      <div aria-hidden className="brand-pattern-light absolute inset-0 opacity-40 pointer-events-none" />
      <OrbitalRings color="#C7AC9F" opacity={0.07} className="absolute inset-0 w-full h-full" />
      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-10" style={{ color: "#d98038" }}>
          Our philosophy
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading leading-tight"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.6rem)", color: "#FFFFFF", letterSpacing: "-0.02em", maxWidth: "22ch" }}
        >
          Communication is not noise — it is intentional, contextual and powerful.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12" style={{ marginTop: "clamp(2.5rem,5vw,4rem)" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-body text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            At FID &amp; Co., we approach every engagement with a deep understanding of the client&apos;s objectives, the operating environment, the audience and cultural context, and the reputational and commercial implications. This allows us to design solutions that are strategic, relevant and sustainable, rather than reactive or trend-driven.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="space-y-4"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {[
              "The client's objectives",
              "The operating environment",
              "The audience and cultural context",
              "The reputational and commercial implications",
            ].map((point) => (
              <li key={point} className="font-body flex items-start gap-3 border-t pt-4" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.1)", fontSize: "1.02rem" }}>
                <span style={{ color: "#d98038", fontWeight: 700 }}>—</span>
                {point}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ── How we work — left-aligned values ── */
function OurApproach() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="section-light py-24 md:py-40">
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#750006" }}>
          What sets us apart
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-heading mb-20 max-w-2xl"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#260000", letterSpacing: "-0.02em" }}
        >
          What sets FID &amp; Co. apart.
        </motion.h2>

        {/* Farida called these out specifically — they're differentiators, so they
            carry real visual weight rather than sitting in a paragraph. */}
        <div className="sets-grid">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="sets-card"
            >
              <span className="sets-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-heading sets-title">{v.title}</h3>
              <p className="font-body sets-body">{v.body}</p>
            </motion.div>
          ))}
        </div>

        <style>{`
          .sets-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: clamp(1rem, 2vw, 1.6rem);
          }
          /* first two lead the row at a larger scale */
          .sets-card {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: clamp(1.6rem, 3vw, 2.4rem);
            border-radius: 16px;
            background: #ffffff;
            border: 1px solid rgba(117,0,6,0.12);
            border-top: 3px solid #750006;
            box-shadow: 0 14px 40px rgba(38,0,0,0.06);
            transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.3s ease;
          }
          .sets-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 28px 70px rgba(38,0,0,0.13);
            border-color: rgba(117,0,6,0.28);
          }
          .sets-card .sets-num {
            font-family: var(--font-body);
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.22em;
            color: #d98038 !important;
            margin-bottom: 1rem;
          }
          .sets-card .sets-title {
            font-size: clamp(1.5rem, 2.4vw, 2.1rem);
            line-height: 1.08;
            letter-spacing: -0.02em;
            color: #750006 !important;
            margin: 0 0 0.9rem;
            font-weight: 800;
          }
          .sets-card .sets-body {
            font-size: 0.95rem;
            line-height: 1.7;
            color: rgba(28,28,28,0.7);
            margin: 0;
          }
          @media (max-width: 980px) {
            .sets-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 620px) {
            .sets-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ── Founder — portrait on the side, text on the other ── */
function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="bg-brand-deep relative overflow-hidden py-24 md:py-40">
      <div aria-hidden className="brand-pattern-light absolute inset-0 opacity-40 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 font-heading select-none pointer-events-none"
        style={{ fontSize: "clamp(14rem, 32vw, 24rem)", color: "rgba(117,0,6,0.06)", lineHeight: 0.85 }}
      >
        F.I.
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#d98038" }}>
          Founder
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Portrait on the side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: "100%", maxWidth: "440px", aspectRatio: "4/5", overflow: "hidden", borderRadius: "16px", border: "1px solid rgba(217,128,56,0.25)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/founder-portrait.png"
                alt="Farida Idris, Founder & Lead Strategist"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}
            >
              Farida Idris
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-xs tracking-[0.2em] uppercase mb-8"
              style={{ color: "#d98038" }}
            >
              Founder &amp; Lead Strategist
            </motion.p>

            <blockquote
              className="font-heading leading-tight mb-8"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people and communities they serve.&rdquo;
            </blockquote>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(199,172,159,0.7)" }}>
              Farida Idris founded FID &amp; Co. with a conviction that African organisations deserve communications that are strategic, culturally grounded and genuinely effective. With over 15 years of experience spanning government mandates, lifestyle brands, multinational retail and social impact work, she has built an agency that leads with insight and delivers with precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Markets — left-aligned chips ── */
function Markets() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="section-light py-24 md:py-40">
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-10" style={{ color: "#750006" }}>
          African footprint
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-heading mb-20"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#260000", letterSpacing: "-0.02em" }}
        >
          Operating across 8+ markets
        </motion.h2>

        <div className="flex flex-wrap gap-0">
          {markets.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-r border-b px-8 py-6"
              style={{ borderColor: "rgba(117,0,6,0.1)" }}
            >
              <p
                className="font-heading"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#260000", letterSpacing: "-0.01em" }}
              >
                {m}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* right-edge striped border, echoing an editorial report page */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 pointer-events-none hidden md:block"
        style={{
          width: "18px",
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(117,0,6,0.14) 0px, rgba(117,0,6,0.14) 2px, transparent 2px, transparent 10px)",
        }}
      />
      <div ref={ref} className="relative max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="md:flex md:items-center md:justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "34rem" }}
          >
            <p
              className="font-body"
              style={{ fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", marginBottom: "1.2rem", fontWeight: 700 }}
            >
              Next step
            </p>
            <h2
              className="font-heading leading-none"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                color: "#0f0f0f",
                letterSpacing: "-0.02em",
                maxWidth: "14ch",
              }}
            >
              Let&apos;s build something meaningful.
            </h2>
            <p
              className="font-body"
              style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "rgba(15,15,15,0.68)", marginTop: "1.4rem", maxWidth: "32ch" }}
            >
              Share your brief and we&apos;ll shape the route.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0" style={{ marginTop: "2.4rem" }}>
              <Link
                href="/#contact"
                className="font-body text-sm px-10 py-4 transition-colors duration-200 text-center"
                style={{ backgroundColor: "#750006", color: "#FFFFFF", letterSpacing: "0.05em" }}
              >
                Book us
              </Link>
              <a
                href="mailto:info@fidco.africa"
                className="font-body text-sm px-10 py-4 border transition-colors duration-200 text-center"
                style={{ borderColor: "rgba(15,15,15,0.25)", color: "#0f0f0f", letterSpacing: "0.05em" }}
              >
                info@fidco.africa
              </a>
            </div>
          </motion.div>

          {/* tilted abstract mark — editorial "report spread" treatment */}
          <motion.div
            initial={{ opacity: 0, rotate: -3, y: 30 }}
            animate={inView ? { opacity: 1, rotate: -6, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="cta-tilt-frame"
            style={{
              flexShrink: 0,
              width: "clamp(220px, 26vw, 340px)",
              aspectRatio: "4 / 5",
              background: "#f5f2ec",
              border: "1px solid rgba(15,15,15,0.08)",
              borderTop: "6px solid #d98038",
              borderRadius: "4px",
              boxShadow: "0 30px 70px rgba(15,15,15,0.16)",
              padding: "clamp(1.2rem, 2.5vw, 2rem)",
              marginTop: "3rem",
            }}
          >
            <WhoWeAreGraphic size="100%" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-tilt-frame {
            margin-left: auto;
            margin-right: auto;
            margin-top: clamp(2.5rem, 8vw, 3.5rem);
            transform: rotate(-3deg) !important;
          }
        }
      `}</style>
    </section>
  );
}

function AboutDesktop() {
  return (
    <>
      <PageHero />
      <WhoWeAre />
      <OurApproach />
      <Philosophy />
      <Founder />
      <Markets />
      <CTA />
      <Footer />
    </>
  );
}

export default function AboutPage() {
  return <Responsive mobile={<MobileAbout />} desktop={<AboutDesktop />} />;
}
