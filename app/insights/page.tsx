"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { STOCK } from "@/lib/stock-photos";

const ParticleField = dynamic(() => import("@/components/graphics/ParticleField"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

const articles = [
  {
    title: "The rise of creator-led marketing in Africa",
    date: "May 2026",
    category: "Digital & Influence",
    img: STOCK.digital[1].src,
    summary: "Across African markets, the communications landscape is evolving rapidly. Traditional advertising is no longer the sole driver of visibility — creators, influencers and digital communities are increasingly shaping how audiences discover, trust and engage with brands.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Why experiential marketing builds cultural relevance",
    date: "April 2026",
    category: "Experiential",
    img: STOCK.experiential[1].src,
    summary: "In increasingly saturated markets, brands are no longer competing solely for visibility — they are competing for attention, relevance and emotional connection. Experiential marketing has emerged as one of the most effective ways to bridge this gap.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Entering African markets: why local insight matters",
    date: "March 2026",
    category: "Strategy",
    img: STOCK.strategy[0].src,
    summary: "Africa presents significant opportunities for organisations seeking growth across emerging and high-potential markets. However, success within these markets requires more than a global strategy — it requires local understanding.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "AI, fashion and the future of content production in Africa",
    date: "February 2026",
    category: "Digital & Technology",
    img: STOCK.beauty[2].src,
    summary: "The fashion industry is undergoing a major shift in how content is created, distributed and consumed. Across global markets, brands are increasingly exploring how technology can enhance creativity while improving efficiency and scalability. In Africa, this shift presents unique opportunities.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Communicating at scale: lessons from national campaigns",
    date: "January 2026",
    category: "Government & Public Affairs",
    img: STOCK.government[0].src,
    summary: "Communications within government and public institutions operates within a uniquely complex environment. The audiences are broader. The stakeholders are more diverse. And the level of public scrutiny is significantly higher.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "How hospitality brands build lifestyle relevance",
    date: "December 2025",
    category: "Brand & PR",
    img: STOCK.hospitality[1].src,
    summary: "Hospitality brands today are no longer competing solely on service, location or pricing. Increasingly, they are competing on experience, identity and cultural relevance — building environments people want to experience, document and share.",
    href: "https://www.linkedin.com/company/fid-pr/",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

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

function FeatureCard({ article }: { article: typeof articles[0] }) {
  return (
    <motion.a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="ins-feature group"
    >
      <div className="ins-feature-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.img} alt={article.title} loading="eager" />
        <span className="ins-feature-tag">{article.category}</span>
      </div>
      <div className="ins-feature-copy">
        <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,242,236,0.6)", margin: 0 }}>
          Featured · {article.date}
        </p>
        <h3 className="font-heading ins-feature-title">{article.title}</h3>
        <p className="font-body ins-feature-sum">{article.summary}</p>
        <span className="ins-readmore">Read on LinkedIn <ArrowUpRight size={16} weight="bold" /></span>
      </div>
    </motion.a>
  );
}

function GridCard({ article, index }: { article: typeof articles[0]; index: number }) {
  return (
    <motion.a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05, ease: EASE }}
      className="ins-card group"
    >
      <div className="ins-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.img} alt={article.title} loading="lazy" />
        <span className="ins-card-tag">{article.category}</span>
      </div>
      <p className="font-body" style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(38,0,0,0.4)", margin: "1rem 0 0.5rem" }}>
        {article.date}
      </p>
      <h3 className="font-heading ins-card-title">{article.title}</h3>
      <p className="font-body ins-card-sum">{article.summary}</p>
      <span className="ins-readmore ins-readmore-dark">Read more <ArrowUpRight size={14} weight="bold" /></span>
    </motion.a>
  );
}

function ArticlesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [filter, setFilter] = useState("All");

  const shown = filter === "All" ? articles : articles.filter((a) => a.category === filter);
  const [lead, ...rest] = shown;

  return (
    <section className="section-light" style={{ paddingTop: "clamp(3rem,6vw,5rem)", paddingBottom: "clamp(5rem,10vw,8rem)" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "clamp(1.6rem,3vw,2.4rem)" }}>
          <div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
              className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#750006" }}>
              Latest articles
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-body text-base max-w-xl" style={{ color: "rgba(28,28,28,0.6)" }}>
              Our team writes about strategy, culture, brand and the evolving communications landscape across Africa. Published on LinkedIn and updated regularly.
            </motion.p>
          </div>
        </div>

        {/* Category filter */}
        <div className="ins-filters">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`ins-chip ${filter === c ? "ins-chip-on" : ""}`}>
              {c}
            </button>
          ))}
        </div>

        <div key={filter}>
          {lead && <FeatureCard key={lead.title} article={lead} />}
          <div className="ins-grid">
            {rest.map((a, i) => (
              <GridCard key={a.title} article={a} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ins-filters { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: clamp(2rem,4vw,3rem); }
        .ins-chip {
          font-family: var(--font-body); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.55rem 1.1rem; border-radius: 999px; border: 1px solid rgba(38,0,0,0.16);
          background: transparent; color: rgba(38,0,0,0.6); cursor: pointer;
          transition: all 0.25s ease; white-space: nowrap;
        }
        .ins-chip:hover { border-color: #750006; color: #750006; }
        .ins-chip-on { background: #750006; border-color: #750006; color: #f5f2ec; }

        .ins-feature {
          display: grid; grid-template-columns: 1.15fr 1fr; gap: 0; text-decoration: none;
          border-radius: 18px; overflow: hidden; background: #260000;
          margin-bottom: clamp(2rem,4vw,3rem); box-shadow: 0 30px 80px rgba(38,0,0,0.18);
        }
        .ins-feature-media { position: relative; min-height: clamp(280px, 42vw, 460px); overflow: hidden; }
        .ins-feature-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .ins-feature:hover .ins-feature-media img { transform: scale(1.05); }
        .ins-feature-tag, .ins-card-tag {
          position: absolute; top: 1rem; left: 1rem; z-index: 2;
          font-family: var(--font-body); font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
          padding: 0.4rem 0.8rem; border-radius: 999px; background: rgba(245,242,236,0.92); color: #750006;
        }
        .ins-feature-copy { padding: clamp(1.8rem,3.5vw,3rem); display: flex; flex-direction: column; justify-content: center; gap: 1rem; }
        .ins-feature-title { font-size: clamp(1.5rem,2.6vw,2.3rem); line-height: 1.08; color: #f5f2ec; letter-spacing: -0.02em; margin: 0.2rem 0 0; }
        .ins-feature-sum { font-size: 0.92rem; line-height: 1.7; color: rgba(245,242,236,0.72); margin: 0; }

        .ins-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1.5rem,3vw,2.4rem); }
        .ins-card { display: flex; flex-direction: column; text-decoration: none; }
        .ins-card-media { position: relative; aspect-ratio: 3/2; border-radius: 14px; overflow: hidden; background: #e8e0d8; }
        .ins-card-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .ins-card:hover .ins-card-media img { transform: scale(1.06); }
        .ins-card-title { font-size: clamp(1.05rem,1.5vw,1.3rem); line-height: 1.2; color: #260000; letter-spacing: -0.01em; margin: 0 0 0.6rem; transition: color 0.2s; }
        .ins-card:hover .ins-card-title { color: #750006; }
        .ins-card-sum {
          font-size: 0.85rem; line-height: 1.6; color: rgba(28,28,28,0.55); margin: 0 0 1rem; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .ins-readmore { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-body); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #f5f2ec; }
        .ins-readmore-dark { color: #750006; }

        @media (max-width: 900px) {
          .ins-feature { grid-template-columns: 1fr; }
          .ins-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ins-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
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
