"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Ticket, CalendarBlank, MapPin } from "@phosphor-icons/react";
import { events } from "@/components/lib/events";
import { platforms } from "@/components/lib/platforms";
import Footer from "@/components/Footer";
import IgCarousel from "@/components/platforms/IgCarousel";

const EVENT_ACCENT: Record<string, string> = {
  "the-tribe-vibe": "#d98038",
  "suhba-series": "#750006",
  "the-capital-room": "#1c1c1c",
};

function EventInstagram({ slug }: { slug: string }) {
  const platform = platforms.find((p) => p.slug === slug);
  if (platform?.instagram) {
    return (
      <div style={{ marginTop: "1.6rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(28,28,28,0.46)", fontWeight: 700, margin: "0 0 0.8rem" }}>
          Live on Instagram
        </p>
        <IgCarousel
          photos={platform.igPhotos ?? [platform.image]}
          href={platform.instagram}
          accent={EVENT_ACCENT[slug] ?? "#750006"}
          feedUrl={platform.igFeedUrl}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "1.6rem",
        padding: "1rem 1.1rem",
        borderRadius: "16px",
        border: "1px solid rgba(28,28,28,0.08)",
        background: "rgba(255,255,255,0.65)",
      }}
    >
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(28,28,28,0.46)", fontWeight: 700, margin: 0 }}>
        Instagram feed
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(28,28,28,0.64)", margin: "0.65rem 0 0" }}>
        The live Instagram embed for this platform is being connected. For now, the event hero keeps the latest visual reference in view.
      </p>
    </div>
  );
}

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
        borderTop: "1px solid rgba(28,28,28,0.1)",
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
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#f5f2ec" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev.image} alt={ev.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", top: "1rem", left: "1rem", backgroundColor: "#750006", color: "#fff", padding: "0.4rem 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
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
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.06em", color: "#750006", textTransform: "uppercase" }}>{ev.tagline}</span>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "#1c1c1c", letterSpacing: "-0.02em", lineHeight: 1.02 }}>
          {ev.name}
        </h2>

        <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(28,28,28,0.6)" }}>
            <CalendarBlank size={18} weight="bold" color="#750006" /> {ev.date}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(28,28,28,0.6)" }}>
            <MapPin size={18} weight="bold" color="#750006" /> {ev.location}
          </span>
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(28,28,28,0.6)", maxWidth: "46ch", marginTop: "0.3rem" }}>
          {ev.description}
        </p>

        {ev.ticketUrl && ev.ticketUrl !== "#" ? (
          <a
            href={ev.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginTop: "0.6rem", backgroundColor: "#750006", color: "#fff", padding: "0.85rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px", alignSelf: "flex-start", transition: "background 0.25s, gap 0.25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#8a0007"; e.currentTarget.style.gap = "0.9rem"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#750006"; e.currentTarget.style.gap = "0.6rem"; }}
          >
            <Ticket size={18} weight="fill" /> Get tickets
          </a>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.6rem", color: "rgba(28,28,28,0.45)", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, alignSelf: "flex-start" }}>
            <Ticket size={16} weight="bold" /> Tickets released soon
          </span>
        )}

        <EventInstagram slug={ev.slug} />
      </motion.div>
    </div>
  );
}

export default function EventsClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <main className="bg-brand-texture" style={{ color: "#1c1c1c", minHeight: "100vh" }}>
      <section style={{ paddingTop: "clamp(8rem,16vw,12rem)", paddingBottom: "clamp(4rem,8vw,7rem)" }}>
        <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
          >
            <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
            Events &amp; experiences
          </motion.span>

          <motion.h1
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(2.6rem,7vw,5.5rem)", color: "#1c1c1c", letterSpacing: "-0.025em", lineHeight: 0.98, marginTop: "1rem", maxWidth: "16ch", textWrap: "balance" } as React.CSSProperties}
          >
            Where culture and conversation come alive.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.2rem)", lineHeight: 1.6, color: "rgba(28,28,28,0.6)", maxWidth: "54ch", marginTop: "1.5rem" }}
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
          <div style={{ borderTop: "1px solid rgba(28,28,28,0.1)", paddingTop: "clamp(2.5rem,5vw,4rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(28,28,28,0.55)" }}>
              Interested in partnering or sponsoring an upcoming edition?
            </p>
            <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", fontWeight: 600, textDecoration: "none" }}>
              Get in touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Owned IPs — FID & Co.'s platforms behind the events ── */}
      <section style={{ paddingBottom: "clamp(5rem,10vw,9rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "clamp(1.6rem,3vw,2.4rem)" }}>
            <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}>
              Our owned IPs
            </span>
          </div>

          <div className="owned-ip-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1rem,2vw,1.6rem)" }}>
            {platforms.map((p) => (
              <Link
                key={p.slug}
                href={`/platforms/${p.slug}`}
                className="owned-ip-card"
                style={{ position: "relative", display: "block", borderRadius: "18px", overflow: "hidden", aspectRatio: "4 / 5", textDecoration: "none", border: `1px solid ${p.accent}2e` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="owned-ip-img" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.05) 0%, rgba(38,0,0,0.35) 55%, rgba(38,0,0,0.86) 100%)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(1.1rem,2vw,1.5rem)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.2rem,2vw,1.6rem)", lineHeight: 1.05, letterSpacing: "-0.01em", color: "#f5f2ec", margin: 0, textTransform: "uppercase" }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.04em", color: p.accent, margin: "0.5rem 0 0", fontWeight: 600 }}>
                    {p.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .owned-ip-card:hover .owned-ip-img { transform: scale(1.05); }
        @media (max-width: 768px) {
          .owned-ip-grid { grid-template-columns: 1fr !important; }
          .event-card { grid-template-columns: 1fr !important; }
          .event-card .event-text { order: 2 !important; }
          .event-card .event-img { order: 1 !important; }
        }
      `}</style>
      <Footer />
    </main>
  );
}
