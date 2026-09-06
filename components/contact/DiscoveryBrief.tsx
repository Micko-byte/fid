"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fireConfetti } from "@/components/motion/confetti";

/**
 * The Discovery Brief — Farida's 15-section briefing form, rendered as a
 * step-through so prospects aren't hit with a hundred fields at once.
 *
 * The questions, section titles and asides are taken verbatim from
 * "FID & Co. Briefing Form.docx". Only step 01 is required; the rest is
 * deliberately optional — this is a conversation starter, not a gate.
 */

type Field =
  | { k: string; l: string; t: "text" | "email" | "tel" | "url" | "textarea" }
  | { k: string; l?: string; t: "checks"; o: string[]; other?: boolean }
  | { k: string; l?: string; t: "groups"; g: { n: string; o: string[] }[] }
  | { k: string; l: string; t: "one"; o: string[] }
  | { k: string; l: string; t: "triple" };

type Step = { n: string; t: string; sub?: string; intro?: string[]; f: Field[] };

const STEPS: Step[] = [
  {
    n: "01",
    t: "Let's get acquainted",
    sub: "(We promise this isn't an interrogation.)",
    f: [
      { k: "company", l: "Company / Organisation *", t: "text" },
      { k: "name", l: "Your name *", t: "text" },
      { k: "role", l: "Your role", t: "text" },
      { k: "email", l: "Email *", t: "email" },
      { k: "mobile", l: "Mobile", t: "tel" },
      { k: "website", l: "Website", t: "url" },
      { k: "socials", l: "Social media handles", t: "text" },
    ],
  },
  {
    n: "02",
    t: "Tell us your story",
    sub: "Every brand has one. What's yours?",
    intro: ["Give us the short version, the long version or somewhere in between."],
    f: [
      { k: "whatYouDo", l: "What does your organisation do?", t: "textarea" },
      { k: "howBegan", l: "How did it begin?", t: "textarea" },
      { k: "problem", l: "What problem are you solving?", t: "textarea" },
      { k: "different", l: "What makes you different?", t: "textarea" },
      { k: "whyCare", l: "Why should people care?", t: "textarea" },
    ],
  },
  {
    n: "03",
    t: "What's your brand DNA?",
    sub: "If your brand walked into a room, who would we meet?",
    f: [
      {
        k: "traits",
        l: "Choose as many as feel right",
        t: "checks",
        other: true,
        o: [
          "Professional", "Bold", "Premium", "Innovative", "Corporate", "Playful",
          "Youthful", "Aspirational", "Purpose-driven", "Community-focused",
          "Disruptive", "Sophisticated", "Accessible", "Luxury",
          "Culturally rooted", "Pan-African",
        ],
      },
      { k: "threeWords", l: "In three words, your brand is:", t: "triple" },
      { k: "believe", l: "What does your brand believe in?", t: "textarea" },
      { k: "values", l: "What values should come through in everything we create?", t: "textarea" },
    ],
  },
  {
    n: "04",
    t: "What keeps you up at night?",
    sub: "Tell us where it hurts.",
    intro: ["What's the real communications or business challenge?"],
    f: [
      {
        k: "challenges",
        l: "Maybe…",
        t: "checks",
        o: [
          "Nobody knows us.",
          "People know us — but not for the right reasons.",
          "We're entering a new market.",
          "We're launching something.",
          "We need more customers.",
          "Our brand has evolved, but our communications haven't.",
          "Our social media needs CPR.",
          "We're doing great work, but nobody is talking about it.",
          "We need stronger media visibility.",
          "We need to build credibility.",
          "We need to reposition.",
          "We need to reach a completely different audience.",
          "We have a reputation issue.",
          "We know we need something — we're just not quite sure what yet.",
        ],
      },
      { k: "challengeOwn", l: "Or tell us in your own words", t: "textarea" },
    ],
  },
  {
    n: "05",
    t: "What are we building together?",
    sub: "Give us the brief behind the brief.",
    f: [
      {
        k: "goals",
        l: "What are you looking to achieve?",
        t: "checks",
        o: [
          "Brand awareness", "Reputation building", "Thought leadership",
          "Product/service launch", "Market entry", "Customer acquisition",
          "Stakeholder engagement", "Corporate positioning",
          "Government/public engagement", "Community engagement",
          "Brand repositioning", "Digital growth", "Media visibility",
          "Event or experience", "Influencer/creator campaign", "Sponsorship",
          "Full integrated campaign", "Something completely different",
        ],
      },
      { k: "goalsMore", l: "Tell us more", t: "textarea" },
    ],
  },
  {
    n: "06",
    t: "Paint us the picture",
    sub: "Fast-forward six months…",
    intro: [
      "The campaign worked. The event was brilliant. People are talking. Your CEO is smiling.",
      "What happened? What would make you say: “Yes. This worked.”",
    ],
    f: [
      { k: "visibility", l: "Visibility — what do you want people to see?", t: "textarea" },
      { k: "perception", l: "Perception — what do you want people to think?", t: "textarea" },
      { k: "engagement", l: "Engagement — what do you want people to do?", t: "textarea" },
      { k: "business", l: "Business — what should ultimately change?", t: "textarea" },
    ],
  },
  {
    n: "07",
    t: "Pick your FID & Co. menu",
    sub: "What can we bring to the table?",
    intro: ["Choose what you think you need. Don't know? That's perfectly fine — we'll recommend the right mix."],
    f: [
      {
        k: "menu",
        t: "groups",
        g: [
          {
            n: "Strategy & Communications",
            o: ["Communications Strategy", "Brand Strategy & Positioning", "Public Relations", "Corporate Communications", "Reputation Management", "Crisis Communications", "Executive Profiling", "Thought Leadership", "Stakeholder Engagement", "Government & Institutional Communications"],
          },
          {
            n: "Media",
            o: ["Media Relations", "Media Strategy & Planning", "Media Buying", "Press Conferences", "Media Events", "Interviews & Features", "Media Monitoring", "Media Training"],
          },
          {
            n: "Digital, Content & Production",
            o: ["Digital Strategy", "Social Media Management", "Community Management", "Content Strategy", "Photography", "Video Production", "Reels & Short-form Content", "Documentary Production", "Aftermovies", "Campaign Films", "AI-Integrated Content Production", "AI-Generated Muses & Virtual Models", "Analytics & Performance Reporting"],
          },
          {
            n: "Influencer & Creator Marketing",
            o: ["Influencer Strategy", "Influencer Identification & Booking", "Creator Campaigns", "Celebrity Engagement", "Talent Management", "Influencer Seeding", "Cross-Market Influencer Campaigns"],
          },
          {
            n: "Experiential Marketing & Events",
            o: ["Brand Experiences", "Product Launches", "Corporate Events", "Conferences & Summits", "Government & State Events", "Roadshows", "In-store Activations", "Consumer Activations", "Stakeholder Events", "Sponsorship Events", "Lifestyle & Cultural Experiences", "End-to-End Event Production"],
          },
          {
            n: "Creative & Brand",
            o: ["Campaign Concepts", "Creative Direction", "Brand Identity", "Graphic Design", "Copywriting", "Website Development", "Campaign Collateral", "Presentation & Corporate Material"],
          },
          {
            n: "Partnerships & Sponsorships",
            o: ["Sponsorship Strategy", "Sponsorship Acquisition", "Partnership Development", "Brand Integration", "Sponsor Management", "Experience Partnerships"],
          },
          {
            n: "Or…",
            o: ["“FID & Co., you tell us what we need.” We like this option too."],
          },
        ],
      },
    ],
  },
  {
    n: "08",
    t: "Now, give us the real brief",
    sub: "This is where the good stuff lives.",
    f: [
      { k: "background", l: "The background — what's happening in the business or brand right now?", t: "textarea" },
      { k: "objective", l: "The objective — what are we actually trying to achieve?", t: "textarea" },
      { k: "hero", l: "The hero — what are we putting centre stage? (A product? A service? A person? A campaign? An event? A cause? An entire organisation?)", t: "textarea" },
      { k: "keyMessages", l: "Key messages — if your audience remembers only three things, what should they be?", t: "triple" },
    ],
  },
  {
    n: "09",
    t: "Who are we talking to?",
    sub: "Because “everyone” is not a target audience.",
    f: [
      { k: "primaryAudience", l: "Primary audience", t: "textarea" },
      { k: "secondaryAudience", l: "Secondary audience", t: "textarea" },
      { k: "demographic", l: "Age / demographic", t: "text" },
      { k: "locations", l: "Location / markets", t: "text" },
      { k: "interests", l: "Interests / behaviours", t: "textarea" },
      { k: "whatMatters", l: "What matters to them?", t: "textarea" },
    ],
  },
  {
    n: "10",
    t: "Where should we show up?",
    sub: "Where do you think your audience is?",
    f: [
      {
        k: "channels",
        t: "checks",
        o: [
          "Television", "Radio", "Newspapers & Magazines", "Online Media", "LinkedIn",
          "Instagram", "TikTok", "Facebook", "X", "YouTube", "Podcasts",
          "Influencers & Creators", "Outdoor", "Events & Experiences", "In-store",
          "Internal Communications", "Community Platforms", "Other",
          "We're not sure. Recommend the right channels for us.",
        ],
      },
    ],
  },
  {
    n: "11",
    t: "Who else is in the room?",
    sub: "Let's talk competition.",
    f: [
      { k: "competitors", l: "Who are your biggest competitors?", t: "textarea" },
      { k: "admire", l: "Who do you admire — even if they're not a competitor?", t: "textarea" },
      { k: "doingWell", l: "What are they doing well?", t: "textarea" },
      { k: "differently", l: "What could your brand do differently?", t: "textarea" },
    ],
  },
  {
    n: "12",
    t: "Show us what you love",
    sub: "Inspiration is welcome. Copying isn't.",
    intro: ["Seen a campaign, event, website, social page or brand experience you absolutely loved?"],
    f: [
      { k: "links", l: "Drop the links here", t: "textarea" },
      { k: "surprise", t: "checks", o: ["“We trust FID & Co. to surprise us.” We secretly love hearing that."] },
    ],
  },
  {
    n: "13",
    t: "The practical stuff",
    sub: "Because brilliant ideas still need timelines and budgets.",
    f: [
      { k: "startWhen", l: "When would you like to start?", t: "text" },
      { k: "hardDate", l: "Is there a hard launch/event date?", t: "text" },
      {
        k: "duration",
        l: "How long are we looking at?",
        t: "one",
        o: ["One-off project", "Short campaign", "3 months", "6 months", "12 months", "Ongoing retainer", "Let's discuss"],
      },
      { k: "budget", l: "Estimated budget (KES)", t: "text" },
      {
        k: "budgetStatus",
        l: "And the budget?",
        t: "one",
        o: ["Budget already approved", "Budget under consideration", "We'd like FID & Co. to recommend an appropriate investment"],
      },
    ],
  },
  {
    n: "14",
    t: "Any non-negotiables?",
    sub: "Tell us before we accidentally fall in love with an idea you can't use.",
    f: [
      { k: "mustDo", l: "Anything we absolutely must do?", t: "textarea" },
      { k: "mustSay", l: "Must say?", t: "textarea" },
      { k: "mustAvoid", l: "Must avoid?", t: "textarea" },
      { k: "considerations", l: "Any brand, legal, cultural or regulatory considerations?", t: "textarea" },
    ],
  },
  {
    n: "15",
    t: "Before we wrap up…",
    sub: "Anything we haven't asked that you think we absolutely need to know?",
    intro: ["Dreams? Concerns? Politics? Internal sensitivities? That one idea your CEO is obsessed with? Tell us."],
    f: [{ k: "anythingElse", l: "Tell us", t: "textarea" }],
  },
];

const MAROON = "#750006";
const TEAL = "#2f7f7a";
const DRAFT_KEY = "fid-discovery-brief";

type Data = Record<string, string | string[]>;

export default function DiscoveryBrief() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  // A 15-step form is punishing to lose halfway, so drafts survive a reload.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {
      /* private mode / blocked storage — start empty */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const a = (k: string) => (Array.isArray(data[k]) ? (data[k] as string[]) : []);
  const set = (k: string, v: string | string[]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };
  // Reads the latest state rather than the render's closure — otherwise two
  // chips tapped in quick succession clobber each other's selection.
  const toggle = (k: string, v: string) =>
    setData((d) => {
      const cur = Array.isArray(d[k]) ? (d[k] as string[]) : [];
      return { ...d, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  const validateFirst = () => {
    const e: Record<string, string> = {};
    if (!s("company").trim()) e.company = "Please tell us who you are.";
    if (!s("name").trim()) e.name = "Your name is required.";
    if (!s("email").trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s("email"))) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateFirst()) return;
    setStep((i) => Math.min(i + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** Flatten into readable, ordered sections so the email reads like the document. */
  const buildPayload = () => {
    const sections = STEPS.map((st) => {
      const items: { label: string; value: string }[] = [];
      st.f.forEach((f) => {
        if (f.t === "checks") {
          const picked = [...a(f.k)];
          const other = s(`${f.k}Other`).trim();
          if (other) picked.push(`Other: ${other}`);
          if (picked.length) items.push({ label: f.l || st.t, value: picked.join(", ") });
        } else if (f.t === "groups") {
          f.g.forEach((g) => {
            const picked = a(f.k).filter((v) => g.o.includes(v));
            if (picked.length) items.push({ label: g.n, value: picked.join(", ") });
          });
        } else if (f.t === "triple") {
          const vals = a(f.k).filter(Boolean);
          if (vals.length) items.push({ label: f.l, value: vals.join(" · ") });
        } else {
          const v = s(f.k).trim();
          if (v) items.push({ label: f.l, value: v });
        }
      });
      return { title: `${st.n} | ${st.t}`, items };
    }).filter((x) => x.items.length);

    return { name: s("name"), email: s("email"), company: s("company"), sections };
  };

  const submit = async () => {
    if (!validateFirst()) { setStep(0); return; }
    setState("submitting");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "send failed");
      }
      setState("success");
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      fireConfetti();
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  };

  /* ── styles ── */
  const field = (k: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.85rem 1rem",
    border: `1px solid ${errors[k] ? MAROON : "rgba(117,0,6,0.16)"}`,
    background: "rgba(255,255,255,0.86)",
    color: "#1c1c1c",
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    outline: "none",
    borderRadius: "14px",
  });
  const label: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.13em",
    textTransform: "uppercase", color: "rgba(117,0,6,0.66)", display: "block",
    marginBottom: "0.5rem", fontWeight: 700,
  };

  const chip = (on: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-body)", fontSize: "0.86rem", lineHeight: 1.4,
    padding: "0.6rem 1rem", borderRadius: "999px", cursor: "pointer",
    border: `1px solid ${on ? MAROON : "rgba(117,0,6,0.18)"}`,
    background: on ? MAROON : "rgba(255,255,255,0.8)",
    color: on ? "#f7f3ec" : "#1c1c1c",
    transition: "background 0.18s, color 0.18s, border-color 0.18s",
    textAlign: "left",
  });

  if (state === "success") {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", padding: "clamp(3rem,8vw,6rem) 0" }}>
        <div style={{ width: "56px", height: "56px", margin: "0 auto 1.6rem", borderRadius: "16px", background: TEAL, color: "#f7f3ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>✓</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#260000", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          You&apos;re done.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.7, color: "rgba(28,28,28,0.7)" }}>
          That wasn&apos;t too painful, was it? Thank you for giving us a glimpse into your world. We&apos;ll use this brief to interrogate the challenge, identify the opportunities and determine the smartest way forward.
        </p>
      </div>
    );
  }

  const cur = STEPS[step];
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto" }}>
      {/* progress */}
      <div style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.7rem" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: MAROON }}>
            Section {cur.n} of {STEPS.length}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(28,28,28,0.5)" }}>
            {Math.round(pct)}%
          </span>
        </div>
        <div style={{ height: "3px", background: "rgba(117,0,6,0.12)", borderRadius: "999px", overflow: "hidden" }}>
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ height: "100%", background: `linear-gradient(90deg, ${MAROON}, ${TEAL})` }} />
        </div>
      </div>

      {/* Keyed fade-in rather than AnimatePresence: with mode="wait" the exit
          transition can wedge and strand the previous step on screen. */}
      <motion.div
        key={cur.n}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,5vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#260000", marginBottom: cur.sub ? "0.8rem" : "1.8rem" }}>
            {cur.t}
          </h2>
          {cur.sub && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", color: MAROON, marginBottom: "1rem", fontStyle: "italic" }}>{cur.sub}</p>
          )}
          {cur.intro?.map((p) => (
            <p key={p} style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(28,28,28,0.66)", marginBottom: "0.7rem", maxWidth: "60ch" }}>{p}</p>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "clamp(1.8rem,3vw,2.6rem)" }}>
            {cur.f.map((f) => {
              if (f.t === "checks") {
                return (
                  <div key={f.k} role="group" aria-label={f.l || cur.t}>
                    {f.l && <span style={label}>{f.l}</span>}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                      {f.o.map((o) => {
                        const on = a(f.k).includes(o);
                        return (
                          <button key={o} type="button" onClick={() => toggle(f.k, o)} aria-pressed={on} style={chip(on)}>
                            {o}
                          </button>
                        );
                      })}
                    </div>
                    {f.other && (
                      <input
                        type="text" placeholder="Other…" aria-label="Other"
                        value={s(`${f.k}Other`)}
                        onChange={(e) => set(`${f.k}Other`, e.target.value)}
                        style={{ ...field(`${f.k}Other`), marginTop: "0.8rem", maxWidth: "320px" }}
                      />
                    )}
                  </div>
                );
              }

              if (f.t === "groups") {
                return (
                  <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                    {f.g.map((g) => (
                      <div key={g.n} role="group" aria-label={g.n}>
                        <span style={label}>{g.n}</span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                          {g.o.map((o) => {
                            const on = a(f.k).includes(o);
                            return (
                              <button key={o} type="button" onClick={() => toggle(f.k, o)} aria-pressed={on} style={chip(on)}>
                                {o}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              if (f.t === "one") {
                return (
                  <div key={f.k} role="group" aria-label={f.l}>
                    <span style={label}>{f.l}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                      {f.o.map((o) => (
                        <button
                          key={o} type="button" aria-pressed={s(f.k) === o}
                          onClick={() => set(f.k, s(f.k) === o ? "" : o)}
                          style={chip(s(f.k) === o)}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              if (f.t === "triple") {
                const vals = a(f.k);
                return (
                  <div key={f.k} role="group" aria-label={f.l}>
                    <span style={label}>{f.l}</span>
                    <div style={{ display: "grid", gap: "0.7rem" }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                          <span aria-hidden style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: MAROON, fontWeight: 700, width: "1.2rem" }}>{i + 1}.</span>
                          <input
                            type="text"
                            aria-label={`${f.l} — ${i + 1}`}
                            value={vals[i] || ""}
                            onChange={(e) => {
                              const n = [vals[0] || "", vals[1] || "", vals[2] || ""];
                              n[i] = e.target.value;
                              set(f.k, n);
                            }}
                            style={field(f.k)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={f.k}>
                  <label htmlFor={`db-${f.k}`} style={label}>{f.l}</label>
                  {f.t === "textarea" ? (
                    <textarea
                      id={`db-${f.k}`} rows={3} value={s(f.k)}
                      aria-invalid={Boolean(errors[f.k])}
                      aria-describedby={errors[f.k] ? `db-${f.k}-err` : undefined}
                      onChange={(e) => set(f.k, e.target.value)}
                      style={{ ...field(f.k), resize: "vertical" }}
                    />
                  ) : (
                    <input
                      id={`db-${f.k}`} type={f.t} value={s(f.k)}
                      aria-invalid={Boolean(errors[f.k])}
                      aria-describedby={errors[f.k] ? `db-${f.k}-err` : undefined}
                      onChange={(e) => set(f.k, e.target.value)}
                      style={field(f.k)}
                    />
                  )}
                  {errors[f.k] && (
                    <p id={`db-${f.k}-err`} style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", marginTop: "0.4rem", color: MAROON }}>{errors[f.k]}</p>
                  )}
                </div>
              );
            })}
          </div>
      </motion.div>

      {/* nav */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", alignItems: "center", marginTop: "clamp(2.4rem,5vw,3.4rem)", paddingTop: "1.6rem", borderTop: "1px solid rgba(117,0,6,0.12)" }}>
        {step > 0 && (
          <button type="button" onClick={back} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "0.95rem 1.6rem", borderRadius: "999px", border: `1px solid rgba(117,0,6,0.25)`, background: "transparent", color: MAROON, cursor: "pointer" }}>
            ← Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "0.95rem 2rem", borderRadius: "999px", border: "none", background: MAROON, color: "#f7f3ec", cursor: "pointer" }}>
            Continue →
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={state === "submitting"} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "0.95rem 2rem", borderRadius: "999px", border: "none", background: TEAL, color: "#f7f3ec", cursor: state === "submitting" ? "wait" : "pointer", opacity: state === "submitting" ? 0.7 : 1 }}>
            {state === "submitting" ? "Sending…" : "Send the brief"}
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button type="button" onClick={() => setStep(STEPS.length - 1)} style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "rgba(28,28,28,0.5)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Skip to the end
          </button>
        )}
      </div>

      {state === "error" && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", marginTop: "1rem", color: MAROON }}>
          {errMsg} Please email us directly at{" "}
          <a href="mailto:info@fidco.africa" style={{ color: MAROON, fontWeight: 700 }}>info@fidco.africa</a>.
        </p>
      )}
    </div>
  );
}
