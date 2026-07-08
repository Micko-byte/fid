"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Buildings, ChatsCircle, MusicNotes } from "@phosphor-icons/react";
import HoverIcon from "@/components/ui/HoverIcon";

const EASE = [0.16, 1, 0.3, 1] as const;

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle / Music / Culture / Community",
    href: "/platforms/the-tribe-vibe",
    desc: "FID & Co.'s flagship experiential lifestyle platform, bringing together music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    num: "01",
    image: "/photos/projects/tribe-vibe.jpg",
    logo: "/logos/tribe-vibe.png" as string | undefined,
    logoDark: false,
    accent: "#d98038",
    Icon: MusicNotes,
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations / Modern Identity / Thoughtful Experiences",
    href: "/platforms/suhba-series",
    desc: "An intimate conversation platform created to foster meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    num: "02",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01",
    logo: "/logos/suhba-series.png" as string | undefined,
    logoDark: false,
    accent: "#8a6a52",
    Icon: ChatsCircle,
  },
  {
    name: "The Capital Room",
    tag: "Leadership / Business / Influence / African Perspectives",
    href: "/platforms/the-capital-room",
    desc: "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets, bringing together founders, executives and changemakers.",
    num: "03",
    image: "/photos/editorial/podcast-set.jpg",
    logo: "/logos/capital-room.png" as string | undefined,
    logoDark: true,
    accent: "#750006",
    Icon: Buildings,
  },
];

/* One scrolling IP panel — reports itself active when centred */
function IpPanel({
  p,
  i,
  onActive,
}: {
  p: (typeof platforms)[number];
  i: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  const iconRef = useRef<HTMLDivElement>(null);
  const iconInView = useInView(iconRef, { once: true });

  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  const panelPad = "clamp(3.5rem,9vh,6rem) clamp(1.5rem,4vw,3.5rem)";
  const centered: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: panelPad,
  };

  return (
    <div ref={ref} className="ip-panel" style={{ background: i % 2 ? "#efe8dc" : "#f5f2ec", position: "relative" }}>
      {/* panel 1 — identity: the image holds beside this… */}
      <div className="ip-subpanel" style={centered}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.26em", color: "rgba(28,28,28,0.45)", fontWeight: 600 }}
        >
          ({p.num}) Owned platform
        </motion.span>

        {/* mobile-only image (sticky pane hides on small screens) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" className="ip-inline-img" style={{ display: "none", width: "100%", maxWidth: "460px", aspectRatio: "4/3", objectFit: "cover", borderRadius: "10px", margin: "1.4rem 0 0" }} />

        <div ref={iconRef} style={{ marginTop: "1.6rem" }}>
          {p.logo ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 1rem", borderRadius: "12px", background: p.logoDark ? "#1c1c1c" : "#fff", border: "1px solid rgba(28,28,28,0.08)", boxShadow: "0 10px 30px rgba(38,0,0,0.07)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={`${p.name} logo`} loading="lazy" style={{ height: "44px", maxWidth: "160px", objectFit: "contain" }} />
            </motion.span>
          ) : (
            <HoverIcon icon={p.Icon} size={36} weight="bold" hoverWeight="fill" color={p.accent} drawOnScroll revealed={iconInView} />
          )}
        </div>

        <Link href={p.href} style={{ color: "inherit", textDecoration: "none" }} data-cursor="Explore">
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem,4.6vw,4rem)", lineHeight: 0.96, letterSpacing: "-0.01em", color: "#1c1c1c", margin: "1.5rem 0 0", maxWidth: "14ch", textTransform: "uppercase", fontWeight: 900 }}
          >
            {p.name}
          </motion.h3>
        </Link>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.accent, fontWeight: 700, margin: "1rem 0 0", maxWidth: "44ch", lineHeight: 1.8 }}
        >
          {p.tag}
        </motion.p>
      </div>

      {/* panel 2 — story: …and is still holding while this second panel passes,
          exactly the reference's image-stays-text-changes moment */}
      <div className="ip-subpanel" style={centered}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,2.8vw,2.3rem)", lineHeight: 1.2, color: "#1c1c1c", maxWidth: "26ch", margin: 0 }}
        >
          {p.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <Link
            href={p.href}
            data-cursor="Explore"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", marginTop: "2.2rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: p.accent, textDecoration: "none" }}
          >
            Explore platform <ArrowUpRight size={16} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <section id="platforms" className="fid-section section-light platforms-section" style={{ paddingBottom: 0 }}>
      <div aria-hidden className="platforms-bg-word">CULTURE</div>
      <div ref={ref} className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        <div className="platforms-head">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="type-eyebrow"
              style={{ color: "#750006" }}
            >
              Owned platforms &amp; cultural IPs
            </motion.span>
            <motion.h2
              data-skew
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              className="platforms-title"
            >
              Culture, conversation and brand experience on our terms.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="type-body platforms-intro"
          >
            These are not filler event pages. They are FID-owned audience platforms designed for cultural relevance, commercial partnership and repeatable brand moments.
          </motion.p>
        </div>

        {/* numbered index strip */}
        <div style={{ borderTop: "1px solid rgba(28,28,28,0.1)", paddingTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.4rem 2rem" }}>
          {platforms.map((p, i) => (
            <span
              key={p.name}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: i === active ? p.accent : "rgba(28,28,28,0.5)", fontWeight: i === active ? 700 : 600, transition: "color 0.3s" }}
            >
              ({p.num}) {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* alternating sticky-media rows — the image stays pinned (same image, no
          fades) while its text scrolls past; the next row simply pushes it away,
          exactly like the reference */}
      <div style={{ marginTop: "clamp(2rem,4vw,3rem)", position: "relative", zIndex: 1 }}>
        {platforms.map((p, i) => (
          <div key={p.name} className="ip-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div className="ip-media" style={{ position: "relative", order: i % 2 ? 2 : 1 }}>
              <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#1c1208" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18,8,4,0.16) 0%, transparent 42%, rgba(18,8,4,0.5) 100%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: "clamp(1.2rem,3vw,2.4rem)", bottom: "clamp(1.2rem,3.5vh,2.4rem)", right: "clamp(1.2rem,3vw,2.4rem)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem,2.4vw,2.1rem)", fontStyle: "italic", color: "#f5f2ec", margin: 0, textShadow: "0 4px 26px rgba(0,0,0,0.5)" }}>
                    ({p.num}) {p.name}
                  </p>
                  <div style={{ height: "2px", width: "56px", background: p.accent, marginTop: "0.8rem", borderRadius: "999px" }} />
                </div>
              </div>
            </div>
            <div style={{ order: i % 2 ? 1 : 2 }}>
              <IpPanel p={p} i={i} onActive={onActive} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .platforms-section {
          background: #f5f2ec;
          color: #1c1c1c;
          isolation: isolate;
        }
        .platforms-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23750006' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M0 40 L40 0 L80 40 L40 80 Z'/%3E%3Cpath d='M10 40 L40 10 L70 40 L40 70 Z'/%3E%3Cpath d='M20 40 L40 20 L60 40 L40 60 Z'/%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: -2;
        }
        .platforms-bg-word {
          position: absolute;
          left: -0.08em;
          top: clamp(1rem, 3vw, 2rem);
          z-index: -1;
          font-family: var(--font-heading);
          font-size: clamp(6rem, 18vw, 18rem);
          font-weight: 900;
          line-height: 0.8;
          color: rgba(117,0,6,0.04);
          letter-spacing: 0;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .platforms-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: end;
          margin-bottom: clamp(2rem, 5vw, 4rem);
        }
        .platforms-head .type-eyebrow {
          color: #d98038;
        }
        .platforms-title {
          margin: 1rem 0 0;
          max-width: 18ch;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 0.86;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
          color: #1c1c1c;
          text-wrap: balance;
        }
        .platforms-intro {
          max-width: 34ch;
          color: #1c1c1c;
          margin: 0;
        }
        @media (max-width: 980px) {
          .platforms-head {
            grid-template-columns: 1fr;
          }
          .platforms-title {
            max-width: 11ch;
          }
          .platforms-intro {
            max-width: 54ch;
          }
          .ip-row {
            grid-template-columns: 1fr !important;
          }
          .ip-media {
            display: none !important;
          }
          .ip-inline-img {
            display: block !important;
          }
          .ip-panel,
          .ip-subpanel {
            min-height: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
