"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";

const articles = [
  { title: "The rise of creator-led marketing in Africa", date: "May 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Why experiential marketing builds cultural relevance", date: "April 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Entering African markets: why local insight matters", date: "March 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "AI, fashion and the future of content production in Africa", date: "February 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Communicating at scale: lessons from national campaigns", date: "January 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "How hospitality brands build lifestyle relevance", date: "December 2025", href: "https://www.linkedin.com/company/fid-pr/" },
];

export default function Insights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="insights" className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="flex items-end justify-between mb-20">
          <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: "#D98038" }}>
            Our thinking
          </p>
          <Link
            href="/insights"
            className="font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 hidden md:block"
            style={{ color: "rgba(38,0,0,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,0,0.4)")}
          >
            All articles →
          </Link>
        </div>

        <div>
          {articles.map((a, i) => (
            <motion.a
              key={i}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-baseline justify-between py-7 border-t transition-colors duration-200"
              style={{ borderColor: "rgba(38,0,0,0.1)" }}
            >
              <div className="flex items-baseline gap-8">
                <span className="font-body text-xs flex-shrink-0" style={{ color: "rgba(38,0,0,0.3)" }}>
                  {a.date}
                </span>
                <h3
                  className="font-heading leading-tight group-hover:text-[#750006] transition-colors duration-200"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#260000", letterSpacing: "-0.01em" }}
                >
                  {a.title}
                </h3>
              </div>
              <ArrowUpRight
                size={16}
                className="flex-shrink-0 ml-6 transition-colors duration-200 group-hover:text-[#750006]"
                style={{ color: "rgba(38,0,0,0.2)" }}
              />
            </motion.a>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }} />
        </div>
      </div>
    </section>
  );
}
