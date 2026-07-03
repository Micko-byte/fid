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
    summary: "Across African markets, the communications landscape is evolving rapidly. Traditional advertising is no longer the sole driver of visibility — creators, influencers and digital communities are increasingly shaping how audiences discover, trust and engage with brands.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Why experiential marketing builds cultural relevance",
    date: "April 2026",
    category: "Experiential",
    summary: "In increasingly saturated markets, brands are no longer competing solely for visibility — they are competing for attention, relevance and emotional connection. Experiential marketing has emerged as one of the most effective ways to bridge this gap.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Entering African markets: why local insight matters",
    date: "March 2026",
    category: "Strategy",
    summary: "Africa presents significant opportunities for organisations seeking growth across emerging and high-potential markets. However, success within these markets requires more than a global strategy — it requires local understanding.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "AI, fashion and the future of content production in Africa",
    date: "February 2026",
    category: "Digital & Technology",
    summary: "The fashion industry is undergoing a major shift in how content is created, distributed and consumed. Across global markets, brands are increasingly exploring how technology can enhance creativity while improving efficiency and scalability. In Africa, this shift presents unique opportunities.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Communicating at scale: lessons from national campaigns",
    date: "January 2026",
    category: "Government & Public Affairs",
    summary: "Communications within government and public institutions operates within a uniquely complex environment. The audiences are broader. The stakeholders are more diverse. And the level of public scrutiny is significantly higher.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "How hospitality brands build lifestyle relevance",
    date: "December 2025",
    category: "Brand & PR",
    summary: "Hospitality brands today are no longer competing solely on service, location or pricing. Increasingly, they are competing on experience, identity and cultural relevance — building environments people want to experience, document and share.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
];

function PageHero() {
  return (
    <section
      className="section-light relative min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden pt-28"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(217,128,56,0.07) 0%, transparent 70%)" }}
      />
      <ParticleField color="#1c1c1c" count={80} opacity={0.12} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "#750006" }}
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
            color: "#1c1c1c",
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="section-light py-24 md:py-40">
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "#750006" }}
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
  const inView = useInView(ref, { once: true, margin: "-40px" });

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
          <p className="font-body text-xs tracking-[0.15em] uppercase mb-1" style={{ color: "#750006" }}>
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
                weight="bold"
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
          backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="md:flex md:items-end md:justify-between gap-12">
          <h2
            className="font-heading leading-none mb-8 md:mb-0"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "#FFFFFF",
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
              style={{ backgroundColor: "#f5f2ec", color: "#750006", letterSpacing: "0.05em", borderRadius: "var(--button-radius)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Book us
            </Link>
            <Link
              href="/work"
              className="font-body text-sm px-10 py-4 border transition-colors duration-200 text-center"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF", letterSpacing: "0.05em", borderRadius: "var(--button-radius)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
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
