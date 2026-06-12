"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Ticket, CalendarBlank, MapPin } from "@phosphor-icons/react";
import { events } from "@/lib/events";

function EventCard({ ev, i }: { ev: typeof events[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reverse = i % 2 === 1;

  return (
    <div
      ref={ref}
      className="event-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(1.5rem,4vw,4rem)",
        alignItems: "center",
        paddingTop: "clamp(2.5rem,5vw,4rem)",
        paddingBottom: "clamp(2.5rem,5vw,4rem)",
        borderTop: "1px solid rgba(26,26,26,0.1)",
      }}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", order: reverse ? 2 : 1 }}
        className="event-img"
      >
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#ece7df" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev.image} alt={ev.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", top: "1rem", left: "1rem", backgroundColor: "#5B0E14", color: "#fff", padding: "0.4rem 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
          {ev.status === "upcoming" ? "Upcoming" : "Recurring"}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        style={{ order: reverse ? 1 : 2, display: "flex", flexDirection: "column", gap: "1rem" }}
        className="event-text"
      >
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.06em", color: "#5B0E14", textTransform: "uppercase" }}>{ev.tagline}</span>
        <h2 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.02 }}>
          {ev.name}
        </h2>

        <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(26,26,26,0.6)" }}>
            <CalendarBlank size={18} weight="light" color="#5B0E14" /> {ev.date}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(26,26,26,0.6)" }}>
            <MapPin size={18} weight="light" color="#5B0E14" /> {ev.location}
          </span>
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)", maxWidth: "46ch", marginTop: "0.3rem" }}>
          {ev.description}
        </p>

        <a
          href={ev.ticketUrl}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginTop: "0.6rem", backgroundColor: "#5B0E14", color: "#fff", padding: "0.85rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px", alignSelf: "flex-start", transition: "background 0.25s, gap 0.25s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#8a0007"; e.currentTarget.style.gap = "0.9rem"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#5B0E14"; e.currentTarget.style.gap = "0.6rem"; }}
        >
          <Ticket size={18} weight="fill" /> Get tickets
        </a>
      </motion.div>
    </div>
  );
}

export default function EventsClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <main style={{ backgroundColor: "#f7ecc4", color: "#1a1a1a", minHeight: "100vh" }}>
      <section style={{ paddingTop: "clamp(8rem,16vw,12rem)", paddingBottom: "clamp(4rem,8vw,7rem)" }}>
        <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14" }}
          >
            <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
            Events &amp; experiences
          </motion.span>

          <motion.h1
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.6rem,7vw,5.5rem)", color: "#1a1a1a", letterSpacing: "-0.025em", lineHeight: 0.98, marginTop: "1rem", maxWidth: "16ch", textWrap: "balance" } as React.CSSProperties}
          >
            Where culture and conversation come alive.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.2rem)", lineHeight: 1.6, color: "rgba(26,26,26,0.6)", maxWidth: "54ch", marginTop: "1.5rem" }}
          >
            FID &amp; Co.&apos;s owned platforms move beyond interruption-based marketing — building experiences audiences genuinely value. Explore what&apos;s coming up.
          </motion.p>
        </div>
      </section>

      {/* Event cards */}
      <section style={{ paddingBottom: "clamp(5rem,10vw,9rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
          {events.map((ev, i) => (
            <EventCard key={ev.slug} ev={ev} i={i} />
          ))}
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)", paddingTop: "clamp(2.5rem,5vw,4rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(26,26,26,0.55)" }}>
              Interested in partnering or sponsoring an upcoming edition?
            </p>
            <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B0E14", fontWeight: 600, textDecoration: "none" }}>
              Get in touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .event-card { grid-template-columns: 1fr !important; }
          .event-card .event-text { order: 2 !important; }
          .event-card .event-img { order: 1 !important; }
        }
      `}</style>
    </main>
  );
}
