"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, Megaphone, Television, UsersThree, DeviceMobileCamera, Confetti, type Icon } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { services } from "@/components/lib/services";

const OrbitalRings = dynamic(() => import("@/components/graphics/OrbitalRings"), { ssr: false });

const iconMap: Record<string, Icon> = {
  Megaphone, Television, UsersThree, DeviceMobileCamera, Confetti,
};

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
  const ref = useRef<HTMLDivElement>(null);
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
          <div className="flex items-center gap-5 mb-2">
            <span className="font-body text-xs flex-shrink-0" style={{ color: "rgba(38,0,0,0.25)" }}>
              {service.num}
            </span>
            {(() => { const Ico = iconMap[service.iconName]; return Ico ? <Ico size={28} weight="light" color="#750006" style={{ flexShrink: 0 }} /> : null; })()}
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
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "#750006" }}>
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
      style={{ backgroundColor: "#f5f2ec" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(217,128,56,0.07) 0%, transparent 70%)" }}
      />
      <OrbitalRings color="#1c1c1c" opacity={0.06} className="absolute right-0 top-0 h-full w-2/3 hidden md:block" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "#750006" }}
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
            color: "#1c1c1c",
            letterSpacing: "-0.03em",
            maxWidth: "14ch",
          }}
        >
Five disciplines. One strategy.
        </motion.h1>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#f5f2ec" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "#750006" }}
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
          Each discipline is distinct. All five are designed to work together — giving clients one connected partner across every dimension of their communications.
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: "#1c1c1c" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div ref={ref} className="mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#750006" }}>
            Industries we serve
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            10+ industries
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 border-l border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group p-6 border-r border-b cursor-default transition-all duration-300 hover:bg-[#750006]"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="font-body text-xl mb-3 transition-colors duration-300 group-hover:text-[#FFFFFF]" style={{ color: "#750006" }}>
                {s.icon}
              </div>
              <p className="font-body text-xs leading-snug transition-colors duration-300 group-hover:text-[#FFFFFF]" style={{ color: "rgba(255,255,255,0.7)" }}>
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
            Ready to start a conversation?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/#contact"
              className="font-body text-sm px-10 py-4 transition-colors duration-200 text-center"
              style={{ backgroundColor: "#f5f2ec", color: "#750006", letterSpacing: "0.05em", borderRadius: "var(--button-radius)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Get in touch
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
