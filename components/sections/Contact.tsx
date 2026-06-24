"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FacebookLogo, InstagramLogo, YoutubeLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import { fireConfetti } from "@/components/motion/confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated chat/contact icon ── */
function ContactIcon() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path, circle");
    gsap.set(paths, { opacity: 0, scale: 0.6, transformOrigin: "center center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(paths, {
      opacity: 1, scale: 1,
      duration: 0.55, stagger: 0.04,
      ease: "back.out(1.6)",
    });

    // Continuous subtle pulse
    gsap.to(svgRef.current, {
      scale: 1.06,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    return () => { ScrollTrigger.getAll().forEach(() => {}); };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 59.76 48.87"
        style={{ width: "clamp(64px,10vw,88px)", height: "auto", display: "block" }}
        aria-hidden
      >
        <defs><style>{`.cic{fill:#750006;}`}</style></defs>
        <g>
          <path className="cic" d="m59.45,38.2l-11.55-11.65c.7-2.05,1.07-4.23,1.07-6.49C48.97,9,39.97,0,28.91,0c-3.53,0-6.9.9-10.01,2.67l.81,1.41.8,1.4c2.61-1.49,5.44-2.24,8.4-2.24,9.27,0,16.82,7.54,16.82,16.82,0,1.32-.15,2.61-.44,3.85l-7.21-7.27c-.67-.67-1.81-.2-1.81.74v17.8c-.71.34-1.46.64-2.23.89-1.59.54-3.32.82-5.13.82-2.99,0-5.94-.82-8.55-2.37l-.83,1.4-.82,1.39c3.1,1.84,6.63,2.82,10.2,2.82,2.17,0,4.25-.34,6.15-.99.41-.13.81-.27,1.21-.43v9.1c0,.95,1.15,1.42,1.81.74l8.39-8.55h12.24c.93,0,1.41-1.14.74-1.8Zm-18.83-13.88c.43-.42,1.17-.42,1.59,0l.76.76c.44.44.44,1.15,0,1.59-.21.21-.49.33-.79.33s-.58-.12-.8-.33l-.76-.76c-.44-.44-.44-1.15,0-1.59Zm11.72,12.1c-.21.21-.48.32-.78.32s-.59-.12-.81-.34l-5.09-5.28-1.16-1.21-.36-.37c-.43-.45-.42-1.16.03-1.59.41-.39,1.02-.42,1.45-.09.05.03.1.08.14.12l1.07,1.11,5.54,5.74c.43.45.42,1.16-.03,1.59Z"/>
          <path className="cic" d="m27.57,19.98c0-5.49-3.22-10.24-7.88-12.45-1.79-.85-3.79-1.33-5.9-1.33C6.19,6.2,0,12.38,0,19.98s6.19,13.79,13.79,13.79c1.44,0,2.87-.23,4.23-.67.53-.17,1.04-.37,1.53-.6,4.85-2.22,8.02-7.06,8.02-12.52Zm-10.54,10.04c-1.04.34-2.13.51-3.24.51-5.82,0-10.55-4.73-10.55-10.55s4.73-10.54,10.55-10.54c2.18,0,4.2.66,5.88,1.79,2.81,1.9,4.66,5.11,4.66,8.75s-1.83,6.92-4.76,8.82c-.77.51-1.62.92-2.54,1.22Z"/>
          <path className="cic" d="m7.7,18.33c-1.03,0-1.86.83-1.86,1.86s.83,1.86,1.86,1.86,1.86-.83,1.86-1.86-.83-1.86-1.86-1.86Z"/>
          <path className="cic" d="m13.79,18.33c-1.03,0-1.86.83-1.86,1.86s.83,1.86,1.86,1.86,1.86-.83,1.86-1.86-.83-1.86-1.86-1.86Z"/>
          <path className="cic" d="m19.87,22.05c1.03,0,1.86-.83,1.86-1.86s-.83-1.86-1.86-1.86c-.08,0-.16.01-.24.03-.92.1-1.62.88-1.62,1.83s.69,1.72,1.6,1.83c.09.02.17.03.26.03Z"/>
          <circle className="cic" cx="31.8" cy="20.19" r="1.86"/>
        </g>
      </svg>
    </div>
  );
}

const services = [
  "Strategic Communications & Public Relations",
  "Media Management & Buying",
  "Influencer, Creator & Talent Engagement",
  "Digital Strategy, Content & Social Media",
  "Experiential Marketing, Events & Brand Activations",
  "Owned Platform Partnerships",
  "Other",
];

type FormState = "idle" | "submitting" | "success" | "error";

function validate(form: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.service) errors.service = "Please select a service.";
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => { const next = { ...err }; delete next[name]; return next; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setState("submitting");
    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
      if (endpoint) await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setState("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      fireConfetti();
    } catch {
      setState("error");
    }
  };

  const fieldBox = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.85rem 1rem",
    border: `1px solid ${errors[name] ? "#d98038" : focused === name ? "#d98038" : "rgba(245,242,236,0.2)"}`,
    backgroundColor: focused === name ? "rgba(245,242,236,0.1)" : "rgba(245,242,236,0.06)",
    color: "#f5f2ec",
    fontFamily: "var(--font-body)",
    fontSize: "0.92rem",
    outline: "none",
    borderRadius: "14px",
    transition: "border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
    boxShadow: focused === name ? "0 0 0 3px rgba(217,128,56,0.15)" : "none",
  });
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,242,236,0.55)", display: "block", marginBottom: "0.5rem", fontWeight: 500 };
  const errStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "0.72rem", marginTop: "0.4rem", color: "#c0392b" };

  return (
    <section id="contact" className="section-dark" style={{ backgroundColor: "#1c1c1c", color: "#f5f2ec", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)", position: "relative", overflow: "hidden" }}>
      {/* SVG decorative divider */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
        <svg viewBox="0 0 1440 2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
          <line x1="0" y1="1" x2="1440" y2="1" stroke="url(#contact-divider)" strokeWidth="1" />
          <defs>
            <linearGradient id="contact-divider" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(117,0,6,0)" />
              <stop offset="30%" stopColor="rgba(117,0,6,0.25)" />
              <stop offset="50%" stopColor="rgba(117,0,6,0.4)" />
              <stop offset="70%" stopColor="rgba(117,0,6,0.25)" />
              <stop offset="100%" stopColor="rgba(117,0,6,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)", position: "relative", zIndex: 1 }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem,6vw,5rem)", alignItems: "start" }}>
          {/* Left: info */}
          <div style={{ textAlign: "center" }}>
            <ContactIcon />
            <div style={{ position: "relative", display: "inline-block" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#d98038", marginBottom: "1.2rem", fontWeight: 500 }}>
                Get in touch
              </p>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.8rem,6.5vw,5.2rem)", backgroundImage: "linear-gradient(135deg, #f5f2ec 40%, #d98038 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.02em", lineHeight: 1.02, textWrap: "balance", marginBottom: "2.5rem", maxWidth: "18ch", marginLeft: "auto", marginRight: "auto" } as React.CSSProperties}
            >
              Let&apos;s start a conversation.
            </motion.h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
              {[
                { Icon: EnvelopeSimple, label: "Email", value: "info@fidco.africa", href: "mailto:info@fidco.africa" },
                { Icon: Phone, label: "Phone", value: "+254 797 690 609", href: "tel:+254797690609" },
                { Icon: MapPin, label: "Location", value: "Nairobi, Kenya · Africa", href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", flexShrink: 0, border: "1px solid rgba(245,242,236,0.2)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px" }}>
                    <Icon size={20} weight="light" color="#d98038" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,242,236,0.45)", marginBottom: "0.25rem" }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#f5f2ec", textDecoration: "none" }}>{value}</a>
                    ) : (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#f5f2ec" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: "1rem", marginTop: "0.6rem" }}>
                {[
                  { Icon: FacebookLogo, href: "https://facebook.com/profile.php?id=100070330230678", label: "Facebook" },
                  { Icon: InstagramLogo, href: "https://instagram.com/fidpr/", label: "Instagram" },
                  { Icon: YoutubeLogo, href: "https://youtube.com/@FIDPR", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: "40px", height: "40px", border: "1px solid rgba(245,242,236,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,242,236,0.6)", borderRadius: "14px", transition: "all 0.25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#1c1c1c"; e.currentTarget.style.backgroundColor = "#d98038"; e.currentTarget.style.borderColor = "#d98038"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,242,236,0.6)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(245,242,236,0.2)"; }}
                  >
                    <Icon size={20} weight="light" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: boxed form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ backgroundColor: "rgba(245,242,236,0.06)", border: "1px solid rgba(245,242,236,0.14)", borderRadius: "14px", padding: "clamp(1.6rem,3.5vw,2.8rem)", boxShadow: "0 18px 50px rgba(0,0,0,0.3)", backdropFilter: "blur(10px)" }}
          >
            {state === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.2rem", padding: "3rem 0" }}>
                <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", backgroundColor: "#d98038", color: "#260000", borderRadius: "14px" }}>✓</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", color: "#f5f2ec" }}>Message received</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(245,242,236,0.6)", maxWidth: "32ch" }}>Thank you for reaching out. We&apos;ll be in touch shortly.</p>
                <button onClick={() => setState("idle")} style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#d98038", background: "none", border: "none", cursor: "pointer", marginTop: "0.4rem" }}>Send another message →</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                {[
                  { name: "name", label: "Full name *", type: "text", required: true },
                  { name: "email", label: "Email address *", type: "email", required: true },
                  { name: "phone", label: "Phone number", type: "tel", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type={f.type} name={f.name}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      onFocus={() => setFocused(f.name)}
                      onBlur={() => setFocused(null)}
                      required={f.required}
                      style={fieldBox(f.name)}
                    />
                    {errors[f.name] && <p style={errStyle}>{errors[f.name]}</p>}
                  </div>
                ))}

                <div>
                  <label style={labelStyle}>Service of interest *</label>
                  <select
                    name="service" value={form.service} onChange={handleChange}
                    onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                    required style={{ ...fieldBox("service"), cursor: "pointer" }}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p style={errStyle}>{errors.service}</p>}
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    required rows={4} style={{ ...fieldBox("message"), resize: "none" }}
                  />
                  {errors.message && <p style={errStyle}>{errors.message}</p>}
                </div>

                <motion.button
                  type="submit" disabled={state === "submitting"}
                  whileHover={{ backgroundColor: "#8a0007" }} whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "1rem", width: "100%", backgroundColor: "#750006", color: "#f5f2ec", border: "none", borderRadius: "14px", cursor: "pointer", marginTop: "0.4rem" }}
                >
                  {state === "submitting" ? "Sending…" : "Send message"}
                </motion.button>

                {state === "error" && <p style={errStyle}>Connection failed. Please email us directly at info@fidco.africa</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
