"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const WireframeOrb = dynamic(() => import("@/components/graphics/WireframeOrb"), { ssr: false });
const OrbitalRings = dynamic(() => import("@/components/graphics/OrbitalRings"), { ssr: false });

const stats = [
  { value: "15+", label: "Years of practice" },
  { value: "10+", label: "Industries served" },
  { value: "8+", label: "African markets" },
  { value: "100+", label: "Campaigns delivered" },
];

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

function PageHero() {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden pt-28"
      style={{ backgroundColor: "#2a0508" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 30% 80%, rgba(117,0,6,0.18) 0%, transparent 70%)" }}
      />
      {/* Animated orb — right half, desktop only */}
      <WireframeOrb
        color="#5B0E14"
        accentColor="#5B0E14"
        opacity={0.13}
        className="absolute right-0 top-0 h-full w-1/2 hidden md:block"
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "#5B0E14" }}
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
            color: "#F5F2EC",
            letterSpacing: "-0.03em",
            maxWidth: "14ch",
          }}
        >
          Communication as influence.
        </motion.h1>
      </div>
    </section>
  );
}

function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#f7ecc4" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-xs tracking-[0.25em] uppercase mb-10" style={{ color: "#5B0E14" }}>
              Who we are
            </p>
            <h2
              className="font-heading leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#2a0508", letterSpacing: "-0.02em" }}
            >
              We treat communication as influence — not a function.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="font-body text-base leading-relaxed" style={{ color: "rgba(28,28,28,0.75)" }}>
              FID &amp; Co. is a full-service strategic communications and brand experience firm based in Nairobi, Kenya. Founded by Farida Idris, the agency has spent over 15 years building reputations, launching brands and delivering campaigns that move people.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: "rgba(28,28,28,0.75)" }}>
              We operate across Kenya and East Africa — working across government, retail, hospitality, healthcare, sports and culture. Our work is grounded in local insight, shaped by global standards and driven by a belief that the best communications is indistinguishable from the truth.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: "rgba(28,28,28,0.75)" }}>
              From national government mandates to lifestyle brand launches, from continental multilateral forums to grassroots influencer campaigns — we apply the same rigour to every brief. Because every audience deserves to be communicated with, not at.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
              className="pt-8 pb-4 pr-8"
            >
              <p
                className="font-heading leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "#5B0E14", letterSpacing: "-0.03em" }}
              >
                {s.value}
              </p>
              <p className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(38,0,0,0.4)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40 relative overflow-hidden" style={{ backgroundColor: "#1C1C1C" }}>
      <OrbitalRings color="#D9AB88" opacity={0.07} className="absolute inset-0 w-full h-full" />
      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-20" style={{ color: "#5B0E14" }}>
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
              style={{ borderColor: "rgba(245,242,236,0.08)" }}
            >
              <div>
                <span className="font-body text-xs" style={{ color: "rgba(245,242,236,0.3)" }}>{p.num}</span>
                <h3
                  className="font-heading mt-3"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F5F2EC", letterSpacing: "-0.03em" }}
                >
                  {p.word}
                </h3>
              </div>
              <p
                className="font-body text-base leading-relaxed md:col-span-2 md:pt-8"
                style={{ color: "rgba(245,242,236,0.6)" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(245,242,236,0.08)" }} />
        </div>
      </div>
    </section>
  );
}

function OurApproach() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#f7ecc4" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#5B0E14" }}>
          How we work
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-heading mb-20 max-w-2xl"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#2a0508", letterSpacing: "-0.02em" }}
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
              style={{ borderColor: "rgba(38,0,0,0.1)" }}
            >
              <h3
                className="font-heading mb-4"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#2a0508", letterSpacing: "-0.01em" }}
              >
                {v.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.6)" }}>
                {v.body}
              </p>
            </motion.div>
          ))}
          <div className="border-t col-span-2" style={{ borderColor: "rgba(38,0,0,0.1)" }} />
        </div>
      </div>
    </section>
  );
}

function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40 relative overflow-hidden" style={{ backgroundColor: "#2a0508" }}>
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 font-heading select-none pointer-events-none"
        style={{ fontSize: "clamp(14rem, 32vw, 24rem)", color: "rgba(117,0,6,0.06)", lineHeight: 0.85 }}
      >
        F.I.
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#5B0E14" }}>
          Founder
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#F5F2EC", letterSpacing: "-0.03em" }}
            >
              Farida Idris
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-xs tracking-[0.2em] uppercase"
              style={{ color: "#5B0E14" }}
            >
              Founder &amp; Lead Strategist
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <blockquote
              className="font-heading leading-tight mb-8"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#F5F2EC",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people they serve.&rdquo;
            </blockquote>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(217,171,136,0.7)" }}>
              Farida Idris founded FID &amp; Co. with a conviction that African organisations deserve communications that are strategic, culturally grounded and genuinely effective. With over 15 years of experience spanning government mandates, lifestyle brands, multinational retail and social impact work, she has built an agency that leads with insight and delivers with precision.
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(217,171,136,0.7)" }}>
              Her approach is defined by a refusal to treat communication as peripheral. At FID &amp; Co., strategy comes first — and every campaign, every placement, every piece of content is accountable to a result.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Markets() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#f7ecc4" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-10" style={{ color: "#5B0E14" }}>
          African footprint
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-heading mb-20"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#2a0508", letterSpacing: "-0.02em" }}
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
              style={{ borderColor: "rgba(38,0,0,0.1)" }}
            >
              <p
                className="font-heading"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#2a0508", letterSpacing: "-0.01em" }}
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

function CTA() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#5B0E14" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, rgba(245,242,236,0.03) 0px, rgba(245,242,236,0.03) 1px, transparent 1px, transparent 60px)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="md:flex md:items-end md:justify-between gap-12">
          <h2
            className="font-heading leading-none mb-8 md:mb-0"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "#F5F2EC",
              letterSpacing: "-0.02em",
              maxWidth: "16ch",
            }}
          >
            Let&apos;s build something meaningful.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/#contact"
              className="font-body text-sm px-10 py-4 transition-colors duration-200 text-center"
              style={{ backgroundColor: "#f7ecc4", color: "#5B0E14", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F5F2EC")}
            >
              Book us
            </Link>
            <a
              href="mailto:info@fidco.africa"
              className="font-body text-sm px-10 py-4 border transition-colors duration-200 text-center"
              style={{ borderColor: "rgba(245,242,236,0.3)", color: "#F5F2EC", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.3)")}
            >
              info@fidco.africa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
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
