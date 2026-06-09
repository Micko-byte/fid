"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer
      className="py-16 border-t brand-pattern-light"
      style={{ backgroundColor: "#260000", borderColor: "rgba(217,171,136,0.1)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Logo + tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="font-heading text-3xl mb-3 block" style={{ color: "#F5F2EC" }}>
              FID <span style={{ color: "#750006" }}>&amp;</span> Co.
            </Link>
            <p className="font-body text-sm italic mb-6" style={{ color: "#D9AB88" }}>
              Insight. Strategy. Impact.
            </p>
            <p className="font-body text-xs leading-relaxed max-w-xs" style={{ color: "#D9AB88", opacity: 0.7 }}>
              A full-service strategic communications and brand experience firm operating across Kenya and Africa.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "#D98038" }}>
              Navigation
            </p>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: "#D9AB88" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#D9AB88")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "#D98038" }}>
              Contact
            </p>
            <div className="space-y-3">
              <a href="mailto:info@fidco.africa" className="font-body text-sm block" style={{ color: "#D9AB88" }}>
                info@fidco.africa
              </a>
              <a href="tel:+254797690609" className="font-body text-sm block" style={{ color: "#D9AB88" }}>
                +254 797 690 609
              </a>
              <p className="font-body text-xs" style={{ color: "#D9AB88", opacity: 0.6 }}>
                Westlands Business Park<br />3rd Floor Suite 12, Nairobi
              </p>
            </div>
          </div>
        </div>

        <div className="border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8" style={{ borderColor: "rgba(217,171,136,0.1)" }}>
          <p className="font-body text-xs" style={{ color: "#D9AB88", opacity: 0.5 }}>
            © {currentYear} FID &amp; Co. All rights reserved. fidco.africa
          </p>
          <div className="flex gap-6">
            {[
              { name: "Facebook", href: "https://facebook.com/profile.php?id=100070330230678" },
              { name: "Instagram", href: "https://instagram.com/fidpr/" },
              { name: "YouTube", href: "https://youtube.com/@FIDPR" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "#D9AB88", opacity: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
