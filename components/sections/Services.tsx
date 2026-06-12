"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import FlowingMenu from "@/components/ui/FlowingMenu";

// Editorial placeholder images — dark campaign imagery feel using picsum
const services = [
  {
    num: "01",
    title: "Strategic Communications & PR",
    slug: "strategic-communications",
    image: "https://picsum.photos/600/400?random=11",
  },
  {
    num: "02",
    title: "Media Management & Buying",
    slug: "media-management",
    image: "https://picsum.photos/600/400?random=22",
  },
  {
    num: "03",
    title: "Influencer, Creator & Talent",
    slug: "influencer-creator",
    image: "https://picsum.photos/600/400?random=33",
  },
  {
    num: "04",
    title: "Digital Strategy & Social Media",
    slug: "digital-strategy",
    image: "https://picsum.photos/600/400?random=44",
  },
  {
    num: "05",
    title: "Experiential Marketing & Events",
    slug: "experiential-marketing",
    image: "https://picsum.photos/600/400?random=55",
  },
];

// Map services to FlowingMenu items — each links to its detail page
const menuItems = services.map((s) => ({
  link: `/services/${s.slug}`,
  text: s.title,
  image: s.image,
  num: s.num,
}));

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      style={{
        backgroundColor: "#f7ecc4",
        color: "#211b18",
        paddingTop: "clamp(5.5rem, 12vw, 11rem)",
        paddingBottom: "0",          // FlowingMenu block sits flush at bottom
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.7, flexShrink: 0 }} />
              What we do
            </motion.span>

            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600,
                fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#2a0508",
                marginTop: "0.8rem", letterSpacing: 0, lineHeight: 1,
              }}
            >
              Our Expertise
            </motion.h2>
          </div>

          <Link
            href="/#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(33,27,24,0.6)", fontWeight: 500,
              whiteSpace: "nowrap", transition: "color 0.3s", textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#5B0E14")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(33,27,24,0.6)")}
          >
            All services
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: "62ch", color: "rgba(33,27,24,0.6)",
            fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)", lineHeight: 1.5,
            fontFamily: "var(--font-body)",
          }}
        >
          FID &amp; Co. is a 360° communications partner — bringing strategic counsel, cultural fluency and
          cut-through creativity to deliver ideas that move audiences, shape perception and earn lasting
          credibility across Africa.
        </motion.p>
      </div>

      {/* ── FlowingMenu — full-bleed below the header ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: `${services.length * 88}px`,
          minHeight: "360px",
          width: "100%",
          borderTop: "1px solid rgba(38,0,0,0.13)",
        }}
      >
        <FlowingMenu
          items={menuItems}
          speed={18}
          textColor="#2a0508"
          bgColor="#F5F2EC"
          marqueeBgColor="#5B0E14"
          marqueeTextColor="#F5F2EC"
          borderColor="rgba(38,0,0,0.13)"
        />
      </motion.div>
    </section>
  );
}
