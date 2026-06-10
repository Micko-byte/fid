"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import TextReveal from "@/components/animations/TextReveal";
import { projects } from "@/lib/projects";

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.05, ease: "easeOut" }}
      >
        <Link
          href={`/work/${project.slug}`}
          className="w-full text-left group block"
        >
          <div
            className="relative py-8 border-b transition-all duration-300"
            style={{ borderColor: "rgba(38,0,0,0.12)" }}
          >
            {/* Left edge accent on hover */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
              style={{ backgroundColor: "#750006" }}
            />

            <div
              className="transition-all duration-300 group-hover:pl-4"
              style={{} as React.CSSProperties}
            >
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
                  <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight
                      size={18}
                      className="transition-colors duration-200 group-hover:text-[#750006]"
                      style={{ color: "#D9AB88" }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
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
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
