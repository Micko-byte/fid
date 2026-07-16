"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { MobileEyebrow, ExplorePill } from "@/components/mobile/ui";
import { WhoWeAreGraphic } from "@/components/graphics/AbstractGraphics";
import WhoWeAreBackdrop from "@/components/graphics/WhoWeAreBackdrop";

const PX = "clamp(1.4rem, 6vw, 2rem)";
const PY = "clamp(4.5rem, 16vw, 6.5rem)";
const EASE = [0.16, 1, 0.3, 1] as const;

const philosophyPoints = [
  "The client's objectives",
  "The operating environment",
  "The audience and cultural context",
  "The reputational and commercial implications",
];

const values = [
  { title: "Strategic Thinking", body: "We approach communications with a clear understanding of the broader business, cultural and reputational environment in which organisations operate." },
  { title: "Cultural Intelligence", body: "Operating in African markets requires an understanding of social dynamics, local narratives and evolving cultural trends. Our campaigns are designed with these insights at the centre." },
  { title: "Integrated Delivery", body: "By combining public relations, digital storytelling, influencer engagement and experiential marketing, we translate strategies into tangible audience engagement." },
  { title: "Regional Perspective", body: "Through cross-border campaigns and partnerships, FID & Co. supports organisations operating across East and Southern Africa." },
  { title: "Execution Excellence", body: "From concept to on-ground implementation, we deliver campaigns with precision, professionalism and attention to detail." },
];

const markets = ["Kenya", "Uganda", "Rwanda", "Ethiopia", "South Sudan", "Zambia", "Ghana", "Tanzania"];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function MobileAbout() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* HERO */}
      <section className="bg-brand-deep" style={{ color: "#f5f2ec", padding: `calc(${PY} + 4rem) ${PX} ${PY}`, position: "relative" }}>
        <FadeUp><MobileEyebrow>About FID &amp; Co.</MobileEyebrow></FadeUp>
        <FadeUp delay={0.08}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.2rem, 9.5vw, 3.4rem)", lineHeight: 1.0, letterSpacing: "-0.03em", margin: "1.4rem 0 0" }}>
            Communication
            <br />as <span style={{ color: "#d98038" }}>influence.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.6, color: "rgba(245,242,236,0.62)", margin: "1.6rem 0 0", maxWidth: "36ch" }}>
            A strategic communications and brand-experience firm built for Africa&apos;s moment — leading with insight, delivering with precision.
          </p>
        </FadeUp>
        <FadeUp delay={0.22}>
          <video src="/videos/digital-marketing.webm" autoPlay muted loop playsInline style={{ width: "100%", borderRadius: "16px", margin: "2rem 0 0", display: "block" }} />
        </FadeUp>
      </section>

      {/* WHO WE ARE */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}`, position: "relative", overflow: "hidden", isolation: "isolate" }}>
        <WhoWeAreBackdrop />
        <div style={{ position: "relative", zIndex: 1 }}>
        <FadeUp><MobileEyebrow tone="light">Who we are</MobileEyebrow></FadeUp>
        <FadeUp delay={0.06}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 9vw, 2.8rem)", lineHeight: 1.02, letterSpacing: "-0.025em", margin: "1.2rem 0 0" }}>
            A strategic communications partner for organisations shaping Africa.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", lineHeight: 1.7, color: "rgba(28,28,28,0.7)", margin: "1.4rem 0 0" }}>
            FID &amp; Co. is a full-service strategic communications and brand experience firm delivering public relations, media engagement, digital storytelling, influencer marketing and experiential activations across Kenya and the wider African region. Our work is grounded in insight, shaped by strategy, and delivered with precision.
          </p>
        </FadeUp>
        <div style={{ marginTop: "2.4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { title: "Established in 2010", body: "We have evolved into a trusted partner for government institutions, multinational brands, corporates, hospitality groups, healthcare providers, sports organisations, investment firms and social impact initiatives." },
            { title: "Regional reach & affiliations", body: "FID & Co. is the Kenya Affiliate Agency and Country Representative for Wano Communications (South Africa), supporting regional client portfolios across East Africa." },
            { title: "A strategic boutique firm", body: "We combine the agility, cultural awareness and hands-on leadership of a boutique agency with the strategic depth required by multinational and institutional clients." },
          ].map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.06}>
              <div style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(28,28,28,0.1)", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(6px)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "#750006", margin: "0 0 0.6rem" }}>{c.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(28,28,28,0.65)", margin: 0 }}>{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-brand-deep" style={{ color: "#f5f2ec", padding: `${PY} ${PX}`, position: "relative" }}>
        <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <FadeUp><MobileEyebrow>Our philosophy</MobileEyebrow></FadeUp>
        <FadeUp delay={0.06}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.9rem, 8.5vw, 2.6rem)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "#f5f2ec", margin: "1.4rem 0 0" }}>
            Communication is not noise — it is intentional, contextual and powerful.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(245,242,236,0.62)", margin: "1.6rem 0 0" }}>
            At FID &amp; Co., we approach every engagement with a deep understanding of the client&apos;s objectives, the operating environment, the audience and cultural context, and the reputational and commercial implications. This allows us to design solutions that are strategic, relevant and sustainable, rather than reactive or trend-driven.
          </p>
        </FadeUp>
        <div style={{ marginTop: "1.8rem", display: "flex", flexDirection: "column", gap: "0" }}>
          {philosophyPoints.map((point, i) => (
            <FadeUp key={point} delay={i * 0.05}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(245,242,236,0.88)", margin: 0, padding: "0.9rem 0", borderTop: "1px solid rgba(245,242,236,0.12)", display: "flex", gap: "0.6rem" }}>
                <span style={{ color: "#d98038", fontWeight: 700 }}>—</span>{point}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <FadeUp><MobileEyebrow tone="light">What sets us apart</MobileEyebrow></FadeUp>
        <FadeUp delay={0.06}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.9rem, 8.5vw, 2.6rem)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "1.2rem 0 2.2rem" }}>
            What sets FID &amp; Co. apart.
          </h2>
        </FadeUp>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.05}>
              <div style={{ borderTop: "1px solid rgba(117,0,6,0.14)", paddingTop: "1.4rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem", color: "#260000", margin: "0 0 0.5rem" }}>{v.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(28,28,28,0.6)", margin: 0 }}>{v.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-brand-deep" style={{ color: "#f5f2ec", padding: `${PY} ${PX}`, position: "relative" }}>
        <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <FadeUp><MobileEyebrow>Founder</MobileEyebrow></FadeUp>
        <FadeUp delay={0.06}>
          <img src="/illustrations/founder-portrait.png" alt="Farida Idris" loading="lazy" style={{ width: "100%", maxWidth: "320px", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center top", borderRadius: "16px", margin: "1.4rem 0 0", border: "1px solid rgba(217,128,56,0.25)" }} />
        </FadeUp>
        <FadeUp delay={0.12}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.2rem, 10vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, margin: "1.6rem 0 0" }}>Farida Idris</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d98038", margin: "0.7rem 0 0" }}>Founder &amp; Lead Strategist</p>
        </FadeUp>
        <FadeUp delay={0.18}>
          <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.3rem, 6vw, 1.7rem)", lineHeight: 1.32, margin: "1.6rem 0 0" }}>
            &ldquo;Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people they serve.&rdquo;
          </blockquote>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(199,172,159,0.75)", margin: "1.4rem 0 0" }}>
            With over 15 years across government mandates, lifestyle brands, multinational retail and social impact work, Farida has built an agency that leads with insight and delivers with precision.
          </p>
        </FadeUp>
      </section>

      {/* MARKETS */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <FadeUp><MobileEyebrow tone="light">African footprint</MobileEyebrow></FadeUp>
        <FadeUp delay={0.06}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.9rem, 8.5vw, 2.6rem)", letterSpacing: "-0.02em", margin: "1.2rem 0 2rem" }}>Operating across 8+ markets</h2>
        </FadeUp>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
          {markets.map((m, i) => (
            <FadeUp key={m} delay={i * 0.04}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "#260000", padding: "0.55rem 1.2rem", borderRadius: "999px", border: "1px solid rgba(117,0,6,0.18)", background: "rgba(255,255,255,0.5)" }}>{m}</span>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA — matches the desktop white/red editorial redesign */}
      <section style={{ backgroundColor: "#FFFFFF", color: "#0f0f0f", padding: `${PY} ${PX}` }}>
        <FadeUp>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#750006", fontWeight: 700, margin: "0 0 1rem" }}>
            Next step
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.4rem, 11vw, 3.2rem)", lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0, maxWidth: "14ch", color: "#0f0f0f" }}>
            Let&apos;s build something meaningful.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(15,15,15,0.68)", margin: "1.1rem 0 0", maxWidth: "30ch" }}>
            Share your brief and we&apos;ll shape the route.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "2rem" }}>
            <a href="/#contact" style={{ background: "#750006", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.85rem", padding: "0.95rem 1.8rem", borderRadius: "999px", textDecoration: "none" }}>Book us</a>
            <ExplorePill href="mailto:info@fidco.africa" label="info@fidco.africa" tone="light" />
          </div>
        </FadeUp>
        <FadeUp delay={0.18}>
          <div
            style={{
              marginTop: "2.8rem",
              width: "min(220px, 60vw)",
              aspectRatio: "4 / 5",
              background: "#f5f2ec",
              border: "1px solid rgba(15,15,15,0.08)",
              borderTop: "6px solid #d98038",
              borderRadius: "4px",
              boxShadow: "0 20px 50px rgba(15,15,15,0.14)",
              padding: "1.2rem",
              transform: "rotate(-3deg)",
            }}
          >
            <WhoWeAreGraphic size="100%" />
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
