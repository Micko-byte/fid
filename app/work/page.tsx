"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const ParticleField = dynamic(() => import("@/components/graphics/ParticleField"), { ssr: false });

const projects = [
  {
    client: "Executive Office of the President – Kenya",
    sector: "Government & Public Institutions",
    years: "2024–2026",
    title: "National Minorities Day",
    desc: "Creative and communications agency for Kenya's flagship national observance led by the Executive Office of the President. A mandate that demanded sensitivity, precision and the ability to operate within complex government systems while delivering campaigns with national reach.",
    scope: [
      "Creative direction and theme development",
      "Event branding and identity systems",
      "Fabrication and on-ground installation",
      "Media booking and buying",
      "Public relations strategy and execution",
      "Influencer marketing and digital amplification",
      "Stakeholder visibility and national media coverage",
    ],
    impact: "High-level government communication delivered with sensitivity, accuracy and national impact — reinforcing Kenya's commitment to minority rights and representation.",
  },
  {
    client: "Africa Urban Forum (AUF) 2026",
    sector: "Government & Public Institutions",
    years: "2026",
    title: "Continental Urban Development Forum",
    desc: "On-ground experience delivery for the Africa Urban Forum — a high-level continental convening with the African Union and Kenya's State Department for Housing and Urban Development. A complex, multi-stakeholder environment requiring precise coordination and seamless audience experience.",
    scope: [
      "Audience experience coordination",
      "Event support within a high-level multi-stakeholder environment",
      "Stakeholder and media engagement",
    ],
    impact: "Advanced dialogue around urban development, sustainable cities and infrastructure, and the future of African urban spaces.",
  },
  {
    client: "State Department for Culture, Arts & Heritage",
    sector: "Government & Public Institutions",
    years: "2024",
    title: "Utamaduni Day",
    desc: "Led creative direction, marketing strategy and media engagement for Utamaduni Day 2024 — Kenya's annual celebration of cultural diversity. From brand identity to broadcast media, every element was designed to reflect the depth and vibrancy of Kenya's heritage.",
    scope: [
      "Creative concept development",
      "Branding and visual assets",
      "Social media content and amplification",
      "Road shows",
      "Media booking, PR coverage and interviews",
      "TV commercials, print advertising and event visibility",
    ],
    impact: "Supported national cultural celebration and storytelling, reinforcing Kenya's diverse heritage across media platforms with broad public engagement.",
  },
  {
    client: "LC Waikiki Sub-Saharan Africa",
    sector: "Retail & Fashion",
    years: "2024–2026",
    title: "Digital & Communications Agency",
    desc: "Official digital and communications agency for LC Waikiki Africa across multiple Sub-Saharan markets. The mandate required us to deliver locally relevant yet globally aligned storytelling — balancing brand consistency with market-specific cultural nuance across Kenya, Uganda and Zambia.",
    scope: [
      "Digital content strategy and creation",
      "Social media management across markets",
      "Influencer identification and engagement",
      "Campaign execution and reporting",
      "Internal communications videos for Kenya, Uganda and Zambia",
      "Padel sponsorship activation",
      "AI-integrated digital production and virtual model campaigns",
    ],
    impact: "Delivered scaled creative output across multiple African markets while maintaining brand consistency and global alignment — with measurable growth in social engagement and market visibility.",
  },
  {
    client: "Kansai Plascon Paints Kenya",
    sector: "Manufacturing & Corporate Brands",
    years: "2025–2026",
    title: "Gor Mahia Partnership & Communications Partner",
    desc: "Led communications for the landmark Gor Mahia partnership launch and were subsequently appointed Official Communications Partner for Kansai Plascon Paints Kenya. A brand repositioning mandate that required cultural fluency, community credibility and strategic media management.",
    scope: [
      "Strategic communications planning",
      "Brand narrative and messaging refinement",
      "Production events curation",
      "Media relations and corporate storytelling",
      "Influencer and content strategy",
      "Stakeholder and partner communications",
    ],
    impact: "Positioned Kansai Plascon as a market leader shaping spaces, communities and lifestyles across Kenya — with the Gor Mahia partnership providing a high-visibility platform for brand exposure.",
  },
  {
    client: "Thrive Hospitality Group",
    sector: "Hospitality, Lifestyle & Destination Brands",
    years: "Ongoing",
    title: "Brand Launches & Repositioning",
    desc: "Long-term communications partner across Café NBO, Glam Hotel, Social 8, Chaii Republic and Kingfisher Nest Hotel. Each property required a distinct brand story, a defined audience and a launch strategy tailored to its personality — all executed under a unified communications framework.",
    scope: [
      "Brand positioning and launch strategy",
      "Influencer and creator engagement",
      "Media hosting and lifestyle PR",
      "Experiential event design and execution",
      "Content strategy for digital platforms",
      "On-ground event production and coordination",
    ],
    impact: "Each property launched as a distinct lifestyle destination with a clear audience, story and visual identity — building the Thrive portfolio into a recognisable hospitality brand across Nairobi.",
  },
  {
    client: "The Amahoro Coalition & UNHCR",
    sector: "Social Impact & Multilateral Partnerships",
    years: "2023",
    title: "Africa Forum on Displacements — Accra, Ghana",
    desc: "Communications and media engagement for the Private Sector Forum on Displaced Persons held during the Africa Forum on Displacements in Accra, Ghana. A mandate requiring sensitivity, speed and the ability to coordinate media across multiple African markets simultaneously.",
    scope: [
      "Strategic communications support for the forum",
      "Media engagement and interview coordination across multiple African markets",
      "Development of key messaging",
      "Coordination of spokesperson interviews with regional and international media",
      "Amplification of forum outcomes through earned media coverage",
    ],
    impact: "Elevated conversations around private-sector leadership and sustainable solutions for displaced persons across Africa — driving meaningful earned media coverage across the continent.",
  },
  {
    client: "Columbia Africa Healthcare",
    sector: "Healthcare & Medical Institutions",
    years: "2025",
    title: "Strategic Communications & Internal Alignment",
    desc: "Strategic communications and internal alignment across healthcare facilities for a leading network of hospitals and clinics in Kenya. The mandate focused on building institutional trust — both internally among staff and externally with patients and stakeholders.",
    scope: [
      "Internal communications video profiles for hospitals and clinics",
      "Digital display content for healthcare facilities",
      "Visual storytelling highlighting medical services, facilities and care standards",
    ],
    impact: "Enhanced stakeholder confidence and reinforced Columbia Africa's reputation as a trusted, patient-centred healthcare provider across its Kenya network.",
  },
  {
    client: "WRC Safari Rally",
    sector: "Sports & Tourism",
    years: "2022",
    title: "Corporate Sponsorship Breakfast",
    desc: "Strategic communications and event support for the WRC Safari Rally Corporate Sponsorship Breakfast — a high-stakes engagement event targeting Kenya's most senior corporate decision-makers ahead of the global motorsport event.",
    scope: [
      "Identification and curation of potential corporate sponsors",
      "Strategic guest list development (150+ CEOs and decision-makers)",
      "Event positioning and stakeholder engagement",
      "Media support and visibility",
    ],
    impact: "Mobilised corporate support ahead of the global motorsport event, reinforcing Kenya's position on the international rally calendar and driving meaningful sponsor commitments.",
  },
];

const allSectors = ["All", ...Array.from(new Set(projects.map((p) => p.sector)))];

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
          transition={{ duration: 0.65, delay: index * 0.04, ease: "easeOut" }}
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
                  <ArrowUpRight size={18} style={{ color: hovered ? "#750006" : "#D9AB88" }} />
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

function PageHero() {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden pt-28"
      style={{ backgroundColor: "#260000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(117,0,6,0.2) 0%, transparent 70%)" }}
      />
      <ParticleField color="#D98038" count={100} opacity={0.35} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "#D98038" }}
        >
          Our Work
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
          Strategically sharp. Culturally fluent.
        </motion.h1>
      </div>
    </section>
  );
}

function WorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [activeSector, setActiveSector] = useState("All");

  const filtered = activeSector === "All" ? projects : projects.filter((p) => p.sector === activeSector);

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div ref={ref} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.25em] uppercase mb-6"
            style={{ color: "#D98038" }}
          >
            Case studies
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-body text-base max-w-xl"
            style={{ color: "rgba(28,28,28,0.6)" }}
          >
            A selection of mandates across government, retail, hospitality, healthcare, sports and social impact.
          </motion.p>
        </div>

        {/* Sector filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {allSectors.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className="font-body text-xs px-4 py-2 border transition-colors duration-200"
              style={{
                borderColor: activeSector === s ? "#750006" : "rgba(38,0,0,0.15)",
                backgroundColor: activeSector === s ? "#750006" : "transparent",
                color: activeSector === s ? "#F5F2EC" : "rgba(38,0,0,0.6)",
                letterSpacing: "0.05em",
              }}
            >
              {s}
            </button>
          ))}
        </motion.div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((p, i) => (
                <ProjectRow key={p.client} project={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="border-t" style={{ borderColor: "rgba(38,0,0,0.12)" }} />
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
              Start a conversation
            </Link>
            <Link
              href="/services"
              className="font-body text-sm px-10 py-4 border transition-colors duration-200 text-center"
              style={{ borderColor: "rgba(245,242,236,0.3)", color: "#F5F2EC", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.3)")}
            >
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <>
      <PageHero />
      <WorkSection />
      <CTA />
      <Footer />
    </>
  );
}
