"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import TextReveal from "@/components/animations/TextReveal";

const projects = [
  {
    client: "Executive Office of the President – Kenya",
    sector: "Government & Public Institutions",
    years: "2024–2026",
    title: "National Minorities Day",
    desc: "Creative and communications agency for Kenya's flagship national observance led by the Executive Office of the President.",
    scope: ["Creative direction and theme development", "Event branding and identity systems", "Fabrication and on-ground installation", "Media booking and buying", "Public relations strategy and execution", "Influencer marketing and digital amplification", "Stakeholder visibility and national media coverage"],
    impact: "High-level government communication delivered with sensitivity, accuracy and national impact.",
  },
  {
    client: "Africa Urban Forum (AUF) 2026",
    sector: "Government & Public Institutions",
    years: "2026",
    title: "Continental Urban Development Forum",
    desc: "On-ground experience delivery for the Africa Urban Forum — a high-level continental convening with the African Union and Kenya's State Department for Housing and Urban Development.",
    scope: ["Audience experience coordination", "Event support within a high-level multi-stakeholder environment", "Stakeholder and media engagement"],
    impact: "Advanced dialogue around urban development, sustainable cities and infrastructure, and the future of African urban spaces.",
  },
  {
    client: "State Department for Culture, Arts & Heritage",
    sector: "Government & Public Institutions",
    years: "2024",
    title: "Utamaduni Day",
    desc: "Led creative direction, marketing strategy and media engagement for Utamaduni Day 2024.",
    scope: ["Creative concept development", "Branding and visual assets", "Social media content and amplification", "Road shows", "Media booking, PR coverage and interviews", "TV commercials, print advertising and event visibility"],
    impact: "Supported national cultural celebration and storytelling, reinforcing Kenya's diverse heritage across media platforms.",
  },
  {
    client: "LC Waikiki Sub-Saharan Africa",
    sector: "Retail & Fashion",
    years: "2024–2026",
    title: "Digital & Communications Agency",
    desc: "Official digital and communications agency for LC Waikiki Africa across multiple Sub-Saharan markets — delivering locally relevant yet globally aligned storytelling.",
    scope: ["Digital content strategy and creation", "Social media management across markets", "Influencer identification and engagement", "Campaign execution and reporting", "Internal communications videos for Kenya, Uganda and Zambia", "Padel sponsorship activation", "AI-integrated digital production and virtual model campaigns"],
    impact: "Delivered scaled creative output across multiple African markets while maintaining brand consistency and global alignment.",
  },
  {
    client: "Kansai Plascon Paints Kenya",
    sector: "Manufacturing & Corporate Brands",
    years: "2025–2026",
    title: "Gor Mahia Partnership & Communications Partner",
    desc: "Led communications for the Gor Mahia partnership launch and appointed Official Communications Partner for Kansai Plascon Paints Kenya.",
    scope: ["Strategic communications planning", "Brand narrative and messaging refinement", "Production events curation", "Media relations and corporate storytelling", "Influencer and content strategy", "Stakeholder and partner communications"],
    impact: "Positioned Kansai Plascon as a market leader shaping spaces, communities and lifestyles across Kenya.",
  },
  {
    client: "Thrive Hospitality Group",
    sector: "Hospitality, Lifestyle & Destination Brands",
    years: "Ongoing",
    title: "Brand Launches & Repositioning",
    desc: "Communications partner across Café NBO, Glam Hotel, Social 8, Chaii Republic and Kingfisher Nest Hotel.",
    scope: ["Brand positioning and launch strategy", "Influencer and creator engagement", "Media hosting and lifestyle PR", "Experiential event design and execution", "Content strategy for digital platforms", "On-ground event production and coordination"],
    impact: "Each property launched as a distinct lifestyle destination with a clear audience, story and visual identity.",
  },
  {
    client: "The Amahoro Coalition & UNHCR",
    sector: "Social Impact & Multilateral Partnerships",
    years: "2023",
    title: "Africa Forum on Displacements — Accra, Ghana",
    desc: "Communications and media engagement for the Private Sector Forum on Displaced Persons held during the Africa Forum on Displacements.",
    scope: ["Strategic communications support for the forum", "Media engagement and interview coordination across multiple African markets", "Development of key messaging", "Coordination of spokesperson interviews with regional and international media", "Amplification of forum outcomes through earned media coverage"],
    impact: "Elevated conversations around private-sector leadership and sustainable solutions for displaced persons across Africa.",
  },
  {
    client: "Columbia Africa Healthcare",
    sector: "Healthcare & Medical Institutions",
    years: "2025",
    title: "Strategic Communications & Internal Alignment",
    desc: "Strategic communications and internal alignment across healthcare facilities for a leading network of hospitals and clinics in Kenya.",
    scope: ["Internal communications video profiles for hospitals and clinics", "Digital display content for healthcare facilities", "Visual storytelling highlighting medical services, facilities and care standards"],
    impact: "Enhanced stakeholder confidence and reinforced Columbia Africa's reputation as a trusted healthcare provider.",
  },
  {
    client: "WRC Safari Rally",
    sector: "Sports & Tourism",
    years: "2022",
    title: "Corporate Sponsorship Breakfast",
    desc: "Strategic communications and event support for the WRC Safari Rally Corporate Sponsorship Breakfast.",
    scope: ["Identification and curation of potential corporate sponsors", "Strategic guest list development (150+ CEOs and decision-makers)", "Event positioning and stakeholder engagement", "Media support and visibility"],
    impact: "Mobilised corporate support ahead of the global motorsport event, reinforcing Kenya's position on the international rally calendar.",
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ backgroundColor: "rgba(38,0,0,0.97)" }}
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center p-6 md:p-16" onClick={(e) => e.stopPropagation()}>
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl pt-12"
        >
          <button
            onClick={onClose}
            className="mb-12 flex items-center gap-2 font-body text-xs tracking-widest uppercase transition-colors"
            style={{ color: "#D9AB88" }}
          >
            <X size={16} /> Close
          </button>
          <p className="font-body text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#D98038" }}>
            {project.sector} · {project.years}
          </p>
          <h2
            className="font-heading leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F5F2EC", letterSpacing: "-0.02em" }}
          >
            {project.client}
          </h2>
          <h3 className="font-body text-lg mb-8" style={{ color: "#D9AB88" }}>{project.title}</h3>
          <p className="font-body text-base leading-relaxed mb-10" style={{ color: "rgba(245,242,236,0.75)", maxWidth: "60ch" }}>
            {project.desc}
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "#D98038" }}>
                Scope of work
              </p>
              <ul className="space-y-2.5">
                {project.scope.map((s, i) => (
                  <li key={i} className="font-body text-sm flex gap-3" style={{ color: "#D9AB88" }}>
                    <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: "#750006" }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "#D98038" }}>Impact</p>
              <p className="font-body text-base leading-relaxed" style={{ color: "rgba(245,242,236,0.75)", maxWidth: "44ch" }}>
                {project.impact}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div ref={ref}>
        <motion.button
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: index * 0.05, ease: "easeOut" }}
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full text-left group"
        >
          <div
            className="relative py-8 border-b transition-all duration-300"
            style={{
              borderColor: "rgba(38,0,0,0.12)",
              paddingLeft: hovered ? "1rem" : "0",
              backgroundColor: hovered ? "rgba(117,0,6,0.04)" : "transparent",
            }}
          >
            {/* Spotlight border — left edge lights up on hover */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-px"
              animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ backgroundColor: "#750006", transformOrigin: "top" }}
            />

            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <p className="font-body text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "#D98038" }}>
                  {project.sector}
                </p>
                <h3
                  className="font-heading leading-tight"
                  style={{
                    fontSize: "clamp(1.15rem, 2.2vw, 1.65rem)",
                    color: "#260000",
                    letterSpacing: "-0.01em",
                    textWrap: "balance",
                  } as React.CSSProperties}
                >
                  {project.client}
                </h3>
                <p className="font-body text-sm mt-1" style={{ color: "rgba(28,28,28,0.55)" }}>
                  {project.title}
                </p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="font-body text-xs" style={{ color: "#D9AB88" }}>{project.years}</span>
                <motion.span
                  animate={{ x: hovered ? 4 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <ArrowUpRight
                    size={18}
                    style={{ color: hovered ? "#750006" : "#D9AB88" }}
                  />
                </motion.span>
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-16 md:py-24" style={{ backgroundColor: "#F5F2EC" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="flex items-end justify-between mb-4">
          <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: "#D98038" }}>
            Our work
          </p>
          <Link
            href="/work"
            className="font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 hidden md:block"
            style={{ color: "rgba(38,0,0,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,0,0.4)")}
          >
            All case studies →
          </Link>
        </div>
        <TextReveal
          text="Case studies"
          as="h2"
          delay={0.05}
          className="font-heading mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#260000", letterSpacing: "-0.02em" }}
        />
        <div>
          {projects.map((p, i) => <ProjectRow key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
