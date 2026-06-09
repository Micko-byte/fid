"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "@phosphor-icons/react";

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
    } catch {
      setState("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    borderBottomColor: "rgba(245,242,236,0.18)",
    color: "#F5F2EC",
    backgroundColor: "transparent",
  };
  const inputClass = "w-full px-0 py-3 border-b font-body text-sm outline-none focus:border-b-[#750006] transition-colors duration-200";

  return (
    <section id="contact" className="py-24 md:py-40" style={{ backgroundColor: "#1C1C1C" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#D98038" }}>
              Get in touch
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-heading leading-tight mb-14"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#F5F2EC",
                letterSpacing: "-0.02em",
                textWrap: "balance",
              } as React.CSSProperties}
            >
              Let's build something deliberate.
            </motion.h2>

            <div className="space-y-7">
              <div>
                <p className="font-body text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "#D98038" }}>Email</p>
                <a href="mailto:info@fidco.africa" className="font-body text-base transition-colors hover:text-white" style={{ color: "#D9AB88" }}>
                  info@fidco.africa
                </a>
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "#D98038" }}>Phone</p>
                <a href="tel:+254797690609" className="font-body text-base transition-colors hover:text-white" style={{ color: "#D9AB88" }}>
                  +254 797 690 609
                </a>
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "#D98038" }}>Location</p>
                <p className="font-body text-base" style={{ color: "#D9AB88" }}>
                  Westlands Business Park, 3rd Floor Suite 12<br />Nairobi, Kenya
                </p>
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "#D98038" }}>Social</p>
                <div className="flex gap-5">
                  {[
                    { Icon: FacebookLogo, href: "https://facebook.com/profile.php?id=100070330230678", label: "Facebook" },
                    { Icon: InstagramLogo, href: "https://instagram.com/fidpr/", label: "Instagram" },
                    { Icon: YoutubeLogo, href: "https://youtube.com/@FIDPR", label: "YouTube" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="transition-colors hover:text-[#750006]"
                      style={{ color: "rgba(217,171,136,0.5)" }}
                    >
                      <Icon size={22} weight="light" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start justify-center h-full gap-5 py-20"
              >
                <div className="w-12 h-12 flex items-center justify-center text-xl font-heading" style={{ backgroundColor: "#750006", color: "#F5F2EC" }}>
                  ✓
                </div>
                <h3 className="font-heading text-2xl" style={{ color: "#F5F2EC", letterSpacing: "-0.01em" }}>
                  Message received
                </h3>
                <p className="font-body text-sm max-w-xs" style={{ color: "#D9AB88" }}>
                  Thank you for reaching out. We'll be in touch shortly.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="font-body text-xs tracking-widest uppercase mt-2 transition-colors hover:text-white"
                  style={{ color: "#750006" }}
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {[
                  { name: "name", label: "Full name", type: "text", required: true },
                  { name: "email", label: "Email address", type: "email", required: true },
                  { name: "phone", label: "Phone number", type: "tel", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="font-body text-xs tracking-[0.15em] uppercase block mb-1" style={{ color: "#D98038" }}>
                      {f.label}{f.required ? " *" : ""}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      required={f.required}
                      className={inputClass}
                      style={inputStyle}
                      aria-invalid={!!errors[f.name]}
                      aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
                    />
                    {errors[f.name] && (
                      <p id={`${f.name}-err`} className="font-body text-xs mt-1" style={{ color: "#D98038" }}>
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="font-body text-xs tracking-[0.15em] uppercase block mb-1" style={{ color: "#D98038" }}>
                    Service of interest *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    aria-invalid={!!errors.service}
                  >
                    <option value="" style={{ backgroundColor: "#1C1C1C" }}>Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ backgroundColor: "#1C1C1C" }}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <p className="font-body text-xs mt-1" style={{ color: "#D98038" }}>{errors.service}</p>}
                </div>

                <div>
                  <label className="font-body text-xs tracking-[0.15em] uppercase block mb-1" style={{ color: "#D98038" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={inputClass}
                    style={{ ...inputStyle, resize: "none" }}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="font-body text-xs mt-1" style={{ color: "#D98038" }}>{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={state === "submitting"}
                  whileHover={{ backgroundColor: "#8a0007" }}
                  whileTap={{ scale: 0.98 }}
                  className="font-body text-sm px-10 py-4 w-full transition-colors duration-200 disabled:opacity-40 cursor-pointer"
                  style={{ backgroundColor: "#750006", color: "#F5F2EC", letterSpacing: "0.05em" }}
                >
                  {state === "submitting" ? "Sending…" : "Send message"}
                </motion.button>

                {state === "error" && (
                  <p className="font-body text-xs" style={{ color: "#D98038" }}>
                    Connection failed. Please email us directly at info@fidco.africa
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
