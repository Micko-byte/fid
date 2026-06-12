"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FacebookLogo, InstagramLogo, YoutubeLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import { fireConfetti } from "@/components/motion/confetti";

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
    border: `1px solid ${errors[name] ? "#c0392b" : focused === name ? "#5B0E14" : "rgba(26,26,26,0.16)"}`,
    backgroundColor: focused === name ? "#fff" : "#faf8f3",
    color: "#1a1a1a",
    fontFamily: "var(--font-body)",
    fontSize: "0.92rem",
    outline: "none",
    borderRadius: "2px",
    transition: "border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
    boxShadow: focused === name ? "0 0 0 3px rgba(117,0,6,0.08)" : "none",
  });
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.55)", display: "block", marginBottom: "0.5rem", fontWeight: 500 };
  const errStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "0.72rem", marginTop: "0.4rem", color: "#c0392b" };

  return (
    <section id="contact" style={{ backgroundColor: "#f7ecc4", paddingTop: "clamp(5.5rem,12vw,11rem)", paddingBottom: "clamp(5.5rem,12vw,11rem)" }}>
      <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem,6vw,5rem)", alignItems: "start" }}>
          {/* Left: info */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#5B0E14", marginBottom: "1.2rem", fontWeight: 500 }}>
              Get in touch
            </p>
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2.4rem,5.5vw,4.5rem)", color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.02, textWrap: "balance", marginBottom: "2.5rem" } as React.CSSProperties}
            >
              Let&apos;s build something meaningful.
            </motion.h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
              {[
                { Icon: EnvelopeSimple, label: "Email", value: "info@fidco.africa", href: "mailto:info@fidco.africa" },
                { Icon: Phone, label: "Phone", value: "+254 797 690 609", href: "tel:+254797690609" },
                { Icon: MapPin, label: "Location", value: "Nairobi, Kenya · Africa", href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", flexShrink: 0, border: "1px solid rgba(117,0,6,0.2)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" }}>
                    <Icon size={20} weight="light" color="#5B0E14" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,26,0.45)", marginBottom: "0.25rem" }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#1a1a1a", textDecoration: "none" }}>{value}</a>
                    ) : (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#1a1a1a" }}>{value}</p>
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
                    style={{ width: "40px", height: "40px", border: "1px solid rgba(26,26,26,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(26,26,26,0.55)", borderRadius: "2px", transition: "all 0.25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.backgroundColor = "#5B0E14"; e.currentTarget.style.borderColor = "#5B0E14"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(26,26,26,0.55)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(26,26,26,0.14)"; }}
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
            style={{ backgroundColor: "#fff", border: "1px solid rgba(26,26,26,0.1)", borderRadius: "4px", padding: "clamp(1.6rem,3.5vw,2.8rem)", boxShadow: "0 18px 50px rgba(26,26,26,0.06)" }}
          >
            {state === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.2rem", padding: "3rem 0" }}>
                <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", backgroundColor: "#5B0E14", color: "#fff", borderRadius: "2px" }}>✓</div>
                <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontSize: "1.6rem", color: "#1a1a1a" }}>Message received</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(26,26,26,0.6)", maxWidth: "32ch" }}>Thank you for reaching out. We&apos;ll be in touch shortly.</p>
                <button onClick={() => setState("idle")} style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B0E14", background: "none", border: "none", cursor: "pointer", marginTop: "0.4rem" }}>Send another message →</button>
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
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "1rem", width: "100%", backgroundColor: "#5B0E14", color: "#fff", border: "none", borderRadius: "2px", cursor: "pointer", marginTop: "0.4rem" }}
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
