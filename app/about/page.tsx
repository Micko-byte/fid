"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import OrbitalRings from "@/components/graphics/OrbitalRings";
import { WhoWeAreGraphic } from "@/components/graphics/AbstractGraphics";
import Responsive from "@/components/mobile/Responsive";
import MobileAbout from "@/components/mobile/MobileAbout";

const pillars = [
  {
    num: "01",
    word: "INSIGHT",
    body: "We start with understanding. Before strategy comes research, listening and an honest assessment of where a brand stands in the world it operates in. We do not assume — we investigate.",
  },
  {
    num: "02",
    word: "STRATEGY",
    body: "Every mandate has a plan. We build communications frameworks that are structured, measurable and aligned to business outcomes — not just moments. Strategy is the work before the work.",
  },
  {
    num: "03",
    word: "IMPACT",
    body: "We measure success by what changes. Coverage earned, audiences moved, narratives shifted, brands positioned. Real outcomes. Real proof. Every engagement is accountable to a result.",
  },
];

const values = [
  {
    title: "Outcome before activity",
    body: "We are always in service of the result — not the deliverable. If a tactic doesn't serve the strategy, it doesn't belong in the plan.",
  },
  {
    title: "Rigour at every scale",
    body: "We bring the same standard to a regional activation as we do to a national campaign. Size of brief does not determine quality of thinking.",
  },
  {
    title: "African excellence",
    body: "We believe African brands deserve world-class communications — and we deliver it. Local insight. Global standard. No compromise.",
  },
  {
    title: "Relationships over transactions",
    body: "We are not a vendor. We are a communications partner. Our best work happens when clients trust us enough to involve us in the full picture.",
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
    <section className="section-light" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(5rem,10vw,9rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
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
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,5.2rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "#1c1c1c", maxWidth: "18ch", marginBottom: "clamp(2rem,4vw,3.5rem)" }}
        >
          A communications firm built for Africa&apos;s moment.
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(1.5rem,3vw,2.5rem)" }}>
          {[
            { title: "Founded in Nairobi", body: "We began in Kenya and grew our practice across East Africa, building relationships with institutions, brands and governments." },
            { title: "Pan-African perspective", body: "Our work spans more than 8 African markets — we understand how culture, politics and commerce interact differently in each context." },
            { title: "Integrated practice", body: "We don't separate PR from strategy or digital from experiential. Every engagement draws on the full range of our disciplines." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "clamp(1.5rem,2.5vw,2.2rem)", borderRadius: "12px", border: "1px solid rgba(28,28,28,0.08)", background: "rgba(255,255,255,0.55)" }}
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
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-20" style={{ color: "#d98038" }}>
          Our philosophy
        </p>
        <div className="space-y-0">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-3 gap-6 py-12 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div>
                <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{p.num}</span>
                <h3
                  className="font-heading mt-3"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}
                >
                  {p.word}
                </h3>
              </div>
              <p
                className="font-body text-base leading-relaxed md:col-span-2 md:pt-8"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
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
          How we work
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-heading mb-20 max-w-2xl"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#260000", letterSpacing: "-0.02em" }}
        >
          Principled by design. Accountable by default.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-0">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="py-10 pr-0 md:pr-16 border-t"
              style={{ borderColor: "rgba(117,0,6,0.1)" }}
            >
              <h3
                className="font-heading mb-4"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#260000", letterSpacing: "-0.01em" }}
              >
                {v.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.6)" }}>
                {v.body}
              </p>
            </motion.div>
          ))}
          <div className="border-t col-span-2" style={{ borderColor: "rgba(117,0,6,0.1)" }} />
        </div>
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
              &ldquo;Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people they serve.&rdquo;
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
          .cta-tilt-frame { display: none; }
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
