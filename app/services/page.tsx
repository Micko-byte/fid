"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const OrbitalRings = dynamic(() => import("@/components/graphics/OrbitalRings"), { ssr: false });

const services = [
  {
    num: "01",
    title: "Strategic Communications & PR",
    summary: "We shape how organisations are understood — by media, stakeholders, and the public.",
    body: "Strategic communications is the foundation of everything we do. We work with clients to develop narratives that are honest, compelling and built to last — then we execute them across every channel that matters. From media relations to crisis management to corporate storytelling, we ensure your organisation is positioned, protected and heard.",
    capabilities: [
      "Media relations and earned coverage",
      "Crisis communications and reputation management",
      "Stakeholder and public affairs",
      "Corporate communications and internal alignment",
      "Brand positioning and narrative development",
      "Spokesperson training and media coaching",
      "Issues management and monitoring",
    ],
  },
  {
    num: "02",
    title: "Media Management & Buying",
    summary: "The right message, in the right place, at the right moment.",
    body: "Media without strategy is just noise. We plan, negotiate and place across every channel — TV, radio, print, digital and out-of-home — with a focus on reach efficiency and audience precision. We manage the full cycle from strategy to booking to post-campaign analysis, so every shilling is accountable.",
    capabilities: [
      "Integrated media planning and strategy",
      "TV, radio, print and digital media placement",
      "Out-of-home (OOH) and billboard advertising",
      "Sponsored content and editorial partnerships",
      "Media negotiation and rate management",
      "Campaign performance monitoring and reporting",
    ],
  },
  {
    num: "03",
    title: "Influencer, Creator & Talent Engagement",
    summary: "We connect brands with the voices their audiences already trust.",
    body: "Influence is not about reach — it is about resonance. We identify, brief and manage creators and talent who genuinely align with your brand, your values and your audience. From one-off activations to long-term ambassador partnerships, we handle the full relationship so every collaboration is authentic, measurable and on-brief.",
    capabilities: [
      "Influencer identification, vetting and matching",
      "Campaign briefing and creative direction",
      "Contract negotiation and relationship management",
      "Content review and brand alignment oversight",
      "Performance tracking, analytics and reporting",
      "Long-term ambassador and partnership programmes",
      "AI-integrated content production and virtual campaigns",
    ],
  },
  {
    num: "04",
    title: "Digital Strategy, Content & Social Media",
    summary: "Consistent, strategic presence across the platforms that matter to your audience.",
    body: "Social media is not a broadcast tool — it is a conversation. We manage that conversation with editorial discipline, creative rigour and platform-specific intelligence. From strategy to content production to community management, we build and sustain digital presences that grow audiences, drive engagement and support business objectives.",
    capabilities: [
      "Social media strategy and platform planning",
      "Content creation: copywriting, photography direction, video",
      "Community management and audience engagement",
      "Paid social advertising and campaign management",
      "Editorial calendars and content workflows",
      "Analytics, monthly insights and performance reporting",
      "AI-integrated content production pipelines",
    ],
  },
  {
    num: "05",
    title: "Experiential Marketing, Events & Brand Activations",
    summary: "Experiences that put people inside the brand — not just in front of it.",
    body: "The most powerful brand moments are the ones people experience directly. We design and produce events and activations that are thoughtful, logistically sound and narratively coherent — whether a government national observance for thousands, a VIP brand launch for fifty, or a roadshow across multiple cities. Every touchpoint is intentional.",
    capabilities: [
      "Event concept development and creative direction",
      "Full-service event production and logistics",
      "Brand launches, activations and product reveals",
      "Government and high-profile event management",
      "Roadshows and multi-city campaign execution",
      "Live and hybrid event design",
      "Post-event PR, coverage and amplification",
    ],
  },
  {
    num: "06",
    title: "Owned Platform Partnerships",
    summary: "Three platforms. One mission: creating culture, not just content.",
    body: "FID & Co. operates three owned media platforms that give brand partners access to engaged, curated communities. These are not advertising channels — they are editorial environments built around genuine audience interest. Partnerships are selective, meaningful and built around fit.",
    capabilities: [
      "The Tribe Vibe — Lifestyle, Music & Culture: brand integration, event partnerships",
      "Suhba Series — Curated Conversations, Identity & Wellbeing: dialogue series, co-production",
      "The Capital Room — Leadership, Business & African Perspectives: executive positioning, thought leadership",
    ],
  },
];

const sectors = [
  { name: "Government & Public Institutions", icon: "○" },
  { name: "Retail & Fashion", icon: "◇" },
  { name: "Manufacturing & Corporate Brands", icon: "△" },
  { name: "Hospitality & Lifestyle", icon: "□" },
  { name: "Healthcare & Medical Institutions", icon: "+" },
  { name: "Finance & Investment", icon: "◎" },
  { name: "Sports & Tourism", icon: "◈" },
  { name: "Social Impact & Development", icon: "◉" },
  { name: "Beauty & Lifestyle", icon: "◆" },
  { name: "Culture & Entertainment", icon: "◐" },
];

function ServiceAccordion({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-t"
      style={{ borderColor: "rgba(38,0,0,0.1)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-8 group flex items-start justify-between gap-8"
      >
        <div className="flex-1">
          <div className="flex items-baseline gap-6 mb-2">
            <span className="font-body text-xs flex-shrink-0" style={{ color: "rgba(38,0,0,0.25)" }}>
              {service.num}
            </span>
            <h3
              className="font-heading leading-tight group-hover:text-[#750006] transition-colors duration-200"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", color: "#260000", letterSpacing: "-0.02em" }}
            >
              {service.title}
            </h3>
          </div>
          <p className="font-body text-sm ml-12" style={{ color: "rgba(28,28,28,0.5)" }}>
            {service.summary}
          </p>
        </div>
        <div className="flex-shrink-0 mt-2" style={{ color: open ? "#750006" : "rgba(38,0,0,0.3)" }}>
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-12 grid md:grid-cols-2 gap-10">
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.7)", maxWidth: "55ch" }}>
                {service.body}
              </p>
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "#D98038" }}>
                  What&apos;s included
                </p>
                <ul className="space-y-2.5">
                  {service.capabilities.map((c, i) => (
                    <li key={i} className="font-body text-sm flex gap-3" style={{ color: "rgba(28,28,28,0.7)" }}>
                      <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: "#750006" }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PageHero() {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden pt-28"
      style={{ backgroundColor: "#260000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(117,0,6,0.18) 0%, transparent 70%)" }}
      />
      <OrbitalRings color="#D9AB88" opacity={0.09} className="absolute right-0 top-0 h-full w-2/3 hidden md:block" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "#D98038" }}
        >
          Our Expertise
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
          Six disciplines. One strategy.
        </motion.h1>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "#D98038" }}
        >
          What we do
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-body text-base mb-20 max-w-2xl"
          style={{ color: "rgba(28,28,28,0.6)" }}
        >
          Each discipline is distinct. All six are designed to work together — giving clients one connected partner across every dimension of their communications.
        </motion.p>

        <div>
          {services.map((svc, i) => (
            <ServiceAccordion key={i} service={svc} index={i} />
          ))}
          <div className="border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }} />
        </div>
      </div>
    </section>
  );
}

function SectorsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#1C1C1C" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div ref={ref} className="mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#D98038" }}>
            Industries we serve
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5F2EC", letterSpacing: "-0.02em" }}
          >
            10+ industries
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 border-l border-t" style={{ borderColor: "rgba(245,242,236,0.08)" }}>
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group p-6 border-r border-b cursor-default transition-all duration-300 hover:bg-[#750006]"
              style={{ borderColor: "rgba(245,242,236,0.08)" }}
            >
              <div className="font-body text-xl mb-3 transition-colors duration-300 group-hover:text-[#F5F2EC]" style={{ color: "#D98038" }}>
                {s.icon}
              </div>
              <p className="font-body text-xs leading-snug transition-colors duration-300 group-hover:text-[#F5F2EC]" style={{ color: "rgba(245,242,236,0.7)" }}>
                {s.name}
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
            Ready to start a conversation?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/#contact"
              className="font-body text-sm px-10 py-4 transition-colors duration-200 text-center"
              style={{ backgroundColor: "#F5F2EC", color: "#750006", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F5F2EC")}
            >
              Get in touch
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

export default function ServicesPage() {
  return (
    <>
      <PageHero />
      <ServicesSection />
      <SectorsSection />
      <CTA />
      <Footer />
    </>
  );
}
