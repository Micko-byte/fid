"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollChoreography } from "@/components/ScrollChoreography";
import { useWorkData } from "@/components/work/useWorkData";
import type { WorkImage, WorkProject } from "@/components/lib/work-types";
import type { ReactNode } from "react";

const COLORS = {
  bg: "#f5f2ec",
  text: "#1c1c1c",
  pill: "#1c1c1c",
  line: "rgba(28,28,28,0.12)",
};

const typeStyles = {
  title: {
    fontFamily: '"Founders Grotesk", "Helvetica Neue", "Arial Narrow", sans-serif',
    fontWeight: 300,
    letterSpacing: "-0.045em",
    lineHeight: 0.84,
    textWrap: "balance" as const,
  },
  display: {
    fontFamily: '"Founders Grotesk", "Helvetica Neue", "Arial Narrow", sans-serif',
    fontWeight: 300,
    letterSpacing: "-0.05em",
    lineHeight: 0.8,
    textWrap: "balance" as const,
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  caption: {
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    letterSpacing: "0.16em",
    lineHeight: 1.4,
  },
};

function toSrc(src: string) {
  return src.startsWith("/") ? src : `/${src.replace(/^public\//, "")}`;
}

function RevealBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PillLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[14px] px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-[#f5f2ec] ${className}`}
      style={{ backgroundColor: COLORS.pill, fontFamily: 'var(--font-body)' }}
    >
      {children}
    </Link>
  );
}

function WorkCard({ project }: { project: WorkProject }) {
  const preview = project.images?.[0]?.src ? toSrc(project.images[0].src) : "";

  return (
    <Link href={`/work/${project.slug}`} className="group block overflow-hidden border-t pt-5" style={{ borderColor: COLORS.line }}>
      <div className="grid gap-[29px] md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <p className="mb-5 text-[12px] uppercase tracking-[0.18em]" style={{ ...typeStyles.caption, color: COLORS.text }}>
              {project.sector} · {project.years}
            </p>
            <h2 className="max-w-[14ch] text-[clamp(27px,3.2vw,75px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
              {project.client}
            </h2>
          </div>
          <p className="max-w-[48ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.82 }}>
            {project.desc}
          </p>
          <div className="flex flex-wrap items-center gap-[29px] pt-2">
            <span className="uppercase text-[12px]" style={{ ...typeStyles.caption, color: COLORS.text, letterSpacing: "0.12em" }}>
              {project.title}
            </span>
            <span
              className="rounded-[14px] px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-[#f5f2ec]"
              style={{ backgroundColor: COLORS.pill, fontFamily: 'var(--font-body)' }}
            >
              VIEW CASE STUDY
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#e4e4e4]">
            {preview ? (
              <img src={preview} alt={project.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#e5e5e5,#f3f3f3)]">
                <span className="rounded-[14px] bg-[#1c1c1c] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[#f5f2ec]">
                  MORE +
                </span>
              </div>
            )}
          </div>
          <div className="absolute left-4 top-4 rounded-[14px] bg-[#1c1c1c] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[#f5f2ec]">
            MORE +
          </div>
        </div>
      </div>
    </Link>
  );
}

function WorkListing({ projects }: { projects: WorkProject[] }) {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-16 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(117,0,6,0.08), transparent 70%)", filter: "blur(8px)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 18, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(240,194,160,0.18), transparent 68%)", filter: "blur(14px)" }}
        />
      </motion.div>

      <header className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-[29px]">
        <Link href="/FID%20%26%20Co%20-%20Home.html" className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
          FID & Co.
        </Link>
        <div className="flex items-center gap-[29px]">
          <Link href="/FID%20%26%20Co%20-%20Home.html#work" className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
            Home
          </Link>
          <span className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
            Work
          </span>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[1440px] px-6 pb-[96px] pt-[64px] md:px-[29px] md:pt-[80px]">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
          Selected work
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="max-w-[12ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
          The work pages now open properly.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-8 max-w-[48ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.82 }}>
          Open any project to see the case-study route, the scroll choreography, and the uploaded image sequence when those files are added.
        </motion.p>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-6 pb-[120px] md:px-[29px]">
        <div className="grid gap-[29px]">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectImageFlow({ images, title }: { images: WorkImage[]; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageA = useTransform(scrollYProgress, [0, 1], ["2vh", "-8vh"]);
  const imageB = useTransform(scrollYProgress, [0, 1], ["8vh", "-14vh"]);
  const imageC = useTransform(scrollYProgress, [0, 1], ["14vh", "-20vh"]);
  const imageD = useTransform(scrollYProgress, [0, 1], ["20vh", "-26vh"]);

  const cards = useMemo(() => {
    const fallback = { src: "", label: title };
    return [images[0] ?? fallback, images[1] ?? images[0] ?? fallback, images[2] ?? images[1] ?? images[0] ?? fallback, images[3] ?? images[2] ?? images[1] ?? images[0] ?? fallback];
  }, [images, title]);

  return (
    <section ref={containerRef} className="mx-auto max-w-[1440px] px-6 pb-[120px] md:px-[29px]">
      <div className="grid gap-[29px] md:grid-cols-[0.72fr_1.28fr]">
        <div className="md:sticky md:top-24 self-start">
          <p className="mb-5 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
            Image story
          </p>
          <h2 className="max-w-[12ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
            Scroll through the work
          </h2>
          <p className="mt-6 max-w-[32ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.82 }}>
            Each frame moves slightly differently as you scroll, giving the clicked project pages a more cinematic rhythm.
          </p>
        </div>

        <div className="space-y-6">
          {[imageA, imageB, imageC, imageD].map((y, index) => {
            const image = cards[index];
            return (
              <motion.figure
                key={`${title}-${index}`}
                style={{ y }}
                className="relative overflow-hidden border border-[rgba(28,28,28,0.12)] bg-[#ececec]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  {image.src ? (
                    <img src={toSrc(image.src)} alt={image.label} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-end justify-start bg-[linear-gradient(135deg,#e9e9e9,#f5f5f5)] p-6">
                      <p className="max-w-[16ch] text-[27px] leading-[0.88]" style={{ ...typeStyles.title, color: COLORS.text }}>
                        {image.label}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-4 border-t px-5 py-4" style={{ borderColor: COLORS.line }}>
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
                      0{index + 1}
                    </p>
                    <p className="mt-2 max-w-[28ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.82 }}>
                      {image.label}
                    </p>
                  </div>
                  <span className="rounded-[14px] bg-[#1c1c1c] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[#f5f2ec]">
                    MORE +
                  </span>
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectHero({
  project,
  nextProject,
}: {
  project: WorkProject;
  nextProject?: WorkProject;
}) {
  const images = useMemo(() => {
    const entries = project.images ?? [];
    const fallback = { src: "", label: project.title };
    return [entries[0] ?? fallback, entries[1] ?? entries[0] ?? fallback, entries[2] ?? entries[1] ?? entries[0] ?? fallback, entries[3] ?? entries[2] ?? entries[1] ?? entries[0] ?? fallback];
  }, [project]);

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-[29px]">
        <Link href="/work" className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
          FID & Co.
        </Link>
        <div className="flex items-center gap-[29px]">
          <Link href="/work" className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
            All work
          </Link>
          <Link href="/FID%20%26%20Co%20-%20Home.html" className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
            Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-6 pb-[96px] pt-[52px] md:px-[29px] md:pt-[72px]">
        <p className="mb-5 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
          {project.sector} · {project.years}
        </p>
        <h1 className="max-w-[11ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.display, color: COLORS.text }}>
          {project.client}
        </h1>
        <p className="mt-6 max-w-[28ch] text-[27px]" style={{ ...typeStyles.body, color: COLORS.text }}>
          {project.title}
        </p>
        <p className="mt-6 max-w-[50ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.86 }}>
          {project.tagline || project.desc}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-[29px]">
          <PillLink href="/work">View all work</PillLink>
          {nextProject ? <PillLink href={`/work/${nextProject.slug}`}>Next case study</PillLink> : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-[120px] md:px-[29px]">
        <ScrollChoreography
          images={{
            topLeft: images[0].src,
            topRight: images[1].src,
            bottomLeft: images[2].src,
            bottomRight: images[3].src,
          }}
        />
      </section>

      <ProjectImageFlow images={project.images ?? []} title={project.title} />

      <RevealBlock>
        <section className="mx-auto grid max-w-[1440px] gap-[29px] px-6 pb-[120px] md:grid-cols-[0.9fr_1.1fr] md:px-[29px]">
          <div>
            <p className="mb-5 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
              Brief
            </p>
            <h2 className="max-w-[13ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
              {project.title}
            </h2>
          </div>
          <p className="max-w-[48ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.85 }}>
            {project.desc}
          </p>
        </section>
      </RevealBlock>

      <RevealBlock>
        <section className="mx-auto grid max-w-[1440px] gap-[29px] px-6 pb-[120px] md:grid-cols-[0.9fr_1.1fr] md:px-[29px]">
          <div>
            <p className="mb-5 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
              Scope
            </p>
            <h2 className="max-w-[12ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
              What we did
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.scope.map((item, index) => (
              <div key={item} className="border-t pt-4" style={{ borderColor: COLORS.line }}>
                <p className="mb-3 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
                  0{index + 1}
                </p>
                <p className="max-w-[28ch] text-[16px]" style={{ ...typeStyles.body, color: COLORS.text, opacity: 0.82 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      <RevealBlock>
        <section className="mx-auto grid max-w-[1440px] gap-[29px] px-6 pb-[120px] md:grid-cols-[0.9fr_1.1fr] md:px-[29px]">
          <div>
            <p className="mb-5 text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
              Impact
            </p>
            <h2 className="max-w-[12ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
              Why it mattered
            </h2>
          </div>
          <p className="max-w-[48ch] text-[27px]" style={{ ...typeStyles.body, color: COLORS.text }}>
            {project.impact}
          </p>
        </section>
      </RevealBlock>

      <footer className="mx-auto max-w-[1440px] px-6 pb-[120px] md:px-[29px]">
        <div className="flex flex-wrap items-center justify-between gap-[29px] border-t pt-6" style={{ borderColor: COLORS.line }}>
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
              Next project
            </p>
            <p className="mt-2 text-[27px]" style={{ ...typeStyles.body, color: COLORS.text }}>
              {nextProject ? nextProject.client : "Back to work"}
            </p>
          </div>
          <div className="flex items-center gap-[29px]">
            <PillLink href="/work">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft size={14} weight="bold" />
                <span>View work</span>
              </span>
            </PillLink>
            {nextProject ? (
              <PillLink href={`/work/${nextProject.slug}`}>
                <span className="inline-flex items-center gap-2">
                  <span>View next</span>
                  <ArrowRight size={14} weight="bold" />
                </span>
              </PillLink>
            ) : null}
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function WorkPageClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("p");
  const { projects, ready } = useWorkData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  const current = useMemo(() => {
    if (!slug) return null;
    return projects.find((project) => project.slug === slug) ?? null;
  }, [projects, slug]);

  const nextProject = useMemo(() => {
    if (!current || !projects.length) return undefined;
    const index = projects.findIndex((project) => project.slug === current.slug);
    if (index < 0) return undefined;
    return projects[(index + 1) % projects.length];
  }, [current, projects]);

  if (!ready) {
    return (
      <main className="min-h-screen px-6 py-12 md:px-[29px]" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
        <p className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
          Loading work
        </p>
      </main>
    );
  }

  if (!slug) {
    return <WorkListing projects={projects} />;
  }

  if (!current) {
    return (
      <main className="min-h-screen px-6 py-12 md:px-[29px]" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
        <p className="text-[12px] uppercase tracking-[0.18em]" style={typeStyles.caption}>
          Case study not found
        </p>
        <h1 className="mt-4 max-w-[12ch] text-[clamp(70px,8vw,101px)]" style={{ ...typeStyles.title, color: COLORS.text }}>
          The project is missing.
        </h1>
        <div className="mt-8">
          <PillLink href="/work">View all work</PillLink>
        </div>
      </main>
    );
  }

  return <ProjectHero project={current} nextProject={nextProject} />;
}
