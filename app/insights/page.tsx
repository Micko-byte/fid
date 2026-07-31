"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, X } from "@phosphor-icons/react";
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
    body: [
      "Across African markets, the communications landscape is evolving rapidly. Traditional advertising is no longer the sole driver of visibility — creators, influencers and digital communities are increasingly shaping how audiences discover, trust and engage with brands.",
      "This shift is especially visible in markets such as Kenya, Uganda and Rwanda, where social media platforms have become central to modern communication and consumer behaviour.",
      "However, successful creator-led marketing goes beyond selecting personalities with large followings. The most effective campaigns are grounded in strategy, audience alignment and cultural relevance.",
      "At FID & Co., influencer engagement is approached as part of a broader communications ecosystem — identifying creators whose audiences align with brand objectives, structuring campaigns that feel authentic rather than transactional, and integrating influencer storytelling into wider digital and media strategies.",
      "Our work across fashion, hospitality and lifestyle sectors has shown that creator-led campaigns are most impactful when they create genuine audience connection rather than short-term visibility.",
      "As African markets continue to evolve, brands that succeed will be those that focus not only on reach, but on credibility, consistency and cultural understanding.",
    ],
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Why experiential marketing builds cultural relevance",
    date: "April 2026",
    category: "Experiential",
    img: STOCK.experiential[1].src,
    summary: "In increasingly saturated markets, brands are no longer competing solely for visibility — they are competing for attention, relevance and emotional connection. Experiential marketing has emerged as one of the most effective ways to bridge this gap.",
    body: [
      "In increasingly saturated markets, brands are no longer competing solely for visibility — they are competing for attention, relevance and emotional connection. Experiential marketing has emerged as one of the most effective ways to bridge this gap.",
      "Unlike traditional campaigns, experiential platforms allow audiences to interact with brands in physical, emotional and social environments, creating stronger engagement and longer-lasting recall.",
      "Across African urban markets, particularly in cities such as Nairobi, experiential campaigns are becoming central to how hospitality, retail and lifestyle brands position themselves.",
      "At FID & Co., experiential platforms are designed to do more than create moments. They are structured to align with brand positioning, generate organic digital conversation and create content that extends beyond the event itself.",
      "Whether through launches, cultural activations or owned experiences such as The Tribe Vibe, the objective remains the same — translating brand strategy into memorable, culturally relevant experiences.",
      "As audiences become increasingly selective, brands that invest in experience-driven communication will be better positioned to build long-term relevance and audience affinity.",
    ],
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Entering African markets: why local insight matters",
    date: "March 2026",
    category: "Strategy",
    img: STOCK.strategy[0].src,
    summary: "Africa presents significant opportunities for organisations seeking growth across emerging and high-potential markets. However, success within these markets requires more than a global strategy — it requires local understanding.",
    body: [
      "Africa presents significant opportunities for organisations seeking growth across emerging and high-potential markets. However, success within these markets requires more than a global strategy — it requires local understanding.",
      "Markets across Africa are diverse, culturally nuanced and rapidly evolving. Consumer behaviour, media landscapes and audience expectations vary significantly from one region to another.",
      "For organisations entering markets such as Kenya, Uganda or Rwanda, communications plays a critical role in establishing credibility, building trust and navigating local stakeholder environments.",
      "At FID & Co., we work with organisations to ensure communications strategies are locally grounded while remaining globally aligned — adapting messaging to local realities, identifying relevant media and creator ecosystems, and ensuring campaigns resonate with target audiences while maintaining cross-market consistency.",
      "Through regional campaigns and strategic partnerships, we have seen that organisations investing in local insight and culturally informed communication are significantly better positioned to build sustainable market presence across Africa.",
      "In increasingly competitive environments, communication is no longer simply a support function — it is a strategic enabler of market growth and audience trust.",
    ],
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "AI, fashion and the future of content production in Africa",
    date: "February 2026",
    category: "Digital & Technology",
    img: STOCK.beauty[2].src,
    summary: "The fashion industry is undergoing a major shift in how content is created, distributed and consumed. Across global markets, brands are increasingly exploring how technology can enhance creativity while improving efficiency and scalability. In Africa, this shift presents unique opportunities.",
    body: [
      "The fashion industry is undergoing a major shift in how content is created, distributed and consumed. Across global markets, brands are increasingly exploring how technology can enhance creativity while improving efficiency and scalability. In Africa, this shift presents unique opportunities.",
      "Fashion brands operating across multiple markets often face challenges related to production logistics, regional adaptation and content scalability. Traditional production models involving multiple shoots and extensive logistics can become both time-intensive and costly.",
      "Artificial intelligence is beginning to reshape this reality. At FID & Co., we have explored the integration of AI-generated muses and virtual models as part of digital content production for regional fashion campaigns — enabling brands to maintain strong visual identity while adapting content efficiently across multiple markets.",
      "The advantages include scalable content production, reduced production costs, consistent visual storytelling and flexibility in adapting campaigns for diverse regional audiences.",
      "However, AI is not replacing creativity — it is enhancing it. The strongest campaigns continue to rely on human insight, cultural intelligence and strategic direction, supported by technology that improves efficiency and scalability.",
      "As African fashion markets continue to grow, brands that successfully balance creativity and innovation will be better positioned to shape the future of digital storytelling.",
    ],
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "Communicating at scale: lessons from national campaigns",
    date: "January 2026",
    category: "Government & Public Affairs",
    img: STOCK.government[0].src,
    summary: "Communications within government and public institutions operates within a uniquely complex environment. The audiences are broader. The stakeholders are more diverse. And the level of public scrutiny is significantly higher.",
    body: [
      "Communications within government and public institutions operates within a uniquely complex environment. The audiences are broader. The stakeholders are more diverse. And the level of public scrutiny is significantly higher.",
      "Whether supporting national celebrations, public initiatives or policy-driven campaigns, communication must balance visibility, clarity and sensitivity.",
      "Clarity of messaging remains critical. Public communication must be accessible, consistent and aligned with broader institutional objectives.",
      "Stakeholder coordination is equally important. Government communications often involve multiple institutions, partners and audiences, requiring careful alignment across all touchpoints. Large-scale media coordination also plays a central role, requiring structured planning across television, radio, print and digital platforms.",
      "Most importantly, public campaigns must remain culturally aware and socially inclusive, ensuring audiences feel represented and engaged.",
      "Communications within the public sector is not simply about information dissemination — it is about building trust, reinforcing identity and shaping national conversation. As governments across Africa continue to engage more actively with citizens and stakeholders, strategic communications will remain increasingly important in shaping public understanding and participation.",
    ],
    href: "https://www.linkedin.com/company/fid-pr/",
  },
  {
    title: "How hospitality brands build lifestyle relevance",
    date: "December 2025",
    category: "Brand & PR",
    img: STOCK.hospitality[1].src,
    summary: "Hospitality brands today are no longer competing solely on service, location or pricing. Increasingly, they are competing on experience, identity and cultural relevance — building environments people want to experience, document and share.",
    body: [
      "Hospitality brands today are no longer competing solely on service, location or pricing. Increasingly, they are competing on experience, identity and cultural relevance. Restaurants, hotels and lifestyle venues are now expected to create environments people want to experience, document and share.",
      "This shift has fundamentally changed how hospitality brands communicate. Traditional advertising alone is no longer sufficient. Brands must now build immersive narratives that exist both physically and digitally.",
      "At FID & Co., our work across hospitality and lifestyle brands has shown that successful positioning is built around experience-led storytelling, creator integration and strong digital amplification. Experiences are no longer simply events — they are content ecosystems.",
      "From launch activations to curated lifestyle platforms, hospitality campaigns today must generate visual engagement, social conversation and long-term audience connection. The most effective hospitality brands combine on-ground experiences, influencer storytelling, digital content, media visibility and community engagement.",
      "Across African cities such as Nairobi, hospitality brands are increasingly evolving into cultural spaces rather than transactional venues. They host conversations. They shape lifestyle culture. They become part of how audiences experience the city itself.",
      "As audiences continue to seek experiences that feel intentional and socially relevant, hospitality brands that invest in cultural relevance and integrated storytelling will be better positioned to build lasting audience affinity.",
    ],
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

function FeatureCard({ article, onOpen }: { article: typeof articles[0]; onOpen: (a: typeof articles[0]) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(article)}
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
        <span className="ins-readmore">Read article <ArrowUpRight size={16} weight="bold" /></span>
      </div>
    </motion.button>
  );
}

function GridCard({ article, index, onOpen }: { article: typeof articles[0]; index: number; onOpen: (a: typeof articles[0]) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(article)}
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
    </motion.button>
  );
}

function ArticleReader({ article, onClose }: { article: typeof articles[0]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
      onClick={onClose} role="dialog" aria-modal="true" aria-label={article.title}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", justifyContent: "center", overflowY: "auto", padding: "clamp(1rem,4vw,3rem) 1rem", background: "rgba(18,8,4,0.72)", backdropFilter: "blur(6px)" }}
    >
      <motion.article
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "min(760px, 100%)", height: "fit-content", background: "#f5f2ec", borderRadius: "16px", overflow: "hidden", boxShadow: "0 40px 120px rgba(38,0,0,0.4)" }}
      >
        <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(38,0,0,0.35))" }} />
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "1rem", right: "1rem", width: "40px", height: "40px", borderRadius: "999px", background: "rgba(38,0,0,0.55)", border: "1px solid rgba(245,242,236,0.3)", color: "#f5f2ec", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
            <X size={17} weight="bold" />
          </button>
        </div>
        <div style={{ padding: "clamp(1.6rem,4vw,3rem)" }}>
          <p className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#750006", fontWeight: 700, margin: 0 }}>
            {article.category} · {article.date}
          </p>
          <h1 className="font-heading" style={{ fontSize: "clamp(1.6rem,3.4vw,2.6rem)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "#260000", margin: "0.8rem 0 1.4rem" }}>
            {article.title}
          </h1>
          {article.body.map((p, k) => (
            <p key={k} className="font-body" style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(28,28,28,0.8)", margin: "0 0 1.1rem", maxWidth: "62ch" }}>{p}</p>
          ))}
          <p className="font-body" style={{ fontSize: "0.8rem", letterSpacing: "0.05em", color: "rgba(38,0,0,0.55)", margin: "1.6rem 0 0", fontWeight: 700 }}>— FID &amp; Co.</p>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ArticlesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [filter, setFilter] = useState("All");
  const [reading, setReading] = useState<typeof articles[0] | null>(null);

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
          {lead && <FeatureCard key={lead.title} article={lead} onOpen={setReading} />}
          <div className="ins-grid">
            {rest.map((a, i) => (
              <GridCard key={a.title} article={a} index={i} onOpen={setReading} />
            ))}
          </div>
        </div>
      </div>

      {reading && <ArticleReader article={reading} onClose={() => setReading(null)} />}

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

        .ins-feature, .ins-card { border: none; padding: 0; cursor: pointer; text-align: left; font: inherit; width: 100%; }
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
