"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const ParticleField = dynamic(() => import("@/components/graphics/ParticleField"), { ssr: false });

const articles = [
  {
    title: "The rise of creator-led marketing in Africa",
    date: "May 2026",
    category: "Digital & Influence",
    summary: "Across East and West Africa, creator-led campaigns are outperforming traditional media placements on almost every metric that matters. We examine why — and what it means for brands building audience trust.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Why experiential marketing builds cultural relevance",
    date: "April 2026",
    category: "Experiential",
    summary: "A product launch is not an experience. A roadshow is not a conversation. We argue that the gap between activation and cultural resonance is a strategic problem — and explain how we close it.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Entering African markets: why local insight matters",
    date: "March 2026",
    category: "Strategy",
    summary: "Global brands routinely underestimate the cost of communications that feel imported. We examine the markers of locally credible brand entry — and the mistakes that make expansion harder than it needs to be.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "AI, fashion and the future of content production in Africa",
    date: "February 2026",
    category: "Digital & Technology",
    summary: "LC Waikiki's AI-integrated campaign for Sub-Saharan Africa offered a proof of concept for what AI-assisted content can do at scale. We reflect on what we learned — and what it signals for content teams across the continent.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Communicating at scale: lessons from national campaigns",
    date: "January 2026",
    category: "Government & Public Affairs",
    summary: "National-level communications demands a different kind of rigour. Managing government mandates — from Utamaduni Day to National Minorities Day — has taught us how to sustain message clarity across thousands of touchpoints.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "How hospitality brands build lifestyle relevance",
    date: "December 2025",
    category: "Brand & PR",
    summary: "The brands that win in hospitality are not the ones with the best rooms — they are the ones that understand what kind of life they want guests to feel they are living. We unpack the communications strategy behind four Nairobi launches.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
];

function PageHero() {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden pt-28"
      style={{ backgroundColor: "#260000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(117,0,6,0.18) 0%, transparent 70%)" }}
      />
      <ParticleField color="#D9AB88" count={80} opacity={0.3} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "#D98038" }}
        >
          Our Thinking
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
            maxWidth: "16ch",
          }}
        >
          Perspectives on communication in Africa.
        </motion.h1>
      </div>
    </section>
  );
}

function ArticlesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "#D98038" }}
        >
          Latest articles
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-body text-base mb-20 max-w-xl"
          style={{ color: "rgba(28,28,28,0.6)" }}
        >
          Our team writes about strategy, culture, brand and the evolving communications landscape across Africa. Published on LinkedIn and updated regularly.
        </motion.p>

        <div>
          {articles.map((a, i) => (
            <ArticleRow key={i} article={a} index={i} />
          ))}
          <div className="border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }} />
        </div>
      </div>
    </section>
  );
}

function ArticleRow({ article, index }: { article: typeof articles[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group block py-10 border-t"
      style={{ borderColor: "rgba(38,0,0,0.1)" }}
    >
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div>
          <p className="font-body text-xs tracking-[0.15em] uppercase mb-1" style={{ color: "#D98038" }}>
            {article.category}
          </p>
          <p className="font-body text-xs" style={{ color: "rgba(38,0,0,0.35)" }}>
            {article.date}
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3
                className="font-heading leading-tight mb-3 group-hover:text-[#750006] transition-colors duration-200"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)", color: "#260000", letterSpacing: "-0.01em" }}
              >
                {article.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.55)", maxWidth: "55ch" }}>
                {article.summary}
              </p>
            </div>
            <motion.div
              className="flex-shrink-0 mt-1"
              animate={{ x: 0, y: 0 }}
              whileHover={{ x: 3, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <ArrowUpRight
                size={20}
                className="transition-colors duration-200 group-hover:text-[#750006]"
                style={{ color: "rgba(38,0,0,0.2)" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function CTA() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#750006" }}
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
              style={{ backgroundColor: "#F5F2EC", color: "#750006", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F5F2EC")}
            >
              Book us
            </Link>
            <Link
              href="/work"
              className="font-body text-sm px-10 py-4 border transition-colors duration-200 text-center"
              style={{ borderColor: "rgba(245,242,236,0.3)", color: "#F5F2EC", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.3)")}
            >
              See our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function InsightsPage() {
  return (
    <>
      <PageHero />
      <ArticlesSection />
      <CTA />
      <Footer />
    </>
  );
}
