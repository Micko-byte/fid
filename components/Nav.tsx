"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/#contact") return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(38,0,0,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(217,171,136,0.1)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
          <Link href="/" aria-label="FID &amp; Co. — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="FID &amp; Co." style={{ height: "28px", width: "auto", display: "block" }} />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative font-body text-sm tracking-wide pb-0.5"
                style={{ color: isActive(link.href) ? "#F5F2EC" : "#D9AB88" }}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: "#750006" }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="font-body text-sm px-6 py-2.5 transition-colors duration-200"
              style={{ backgroundColor: "#750006", color: "#F5F2EC", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8a0007")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#750006")}
            >
              Book us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            style={{ color: "#F5F2EC" }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <List size={28} weight="light" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ backgroundColor: "#260000" }}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b" style={{ borderColor: "rgba(217,171,136,0.1)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="FID &amp; Co." style={{ height: "26px", width: "auto" }} />
              <button onClick={() => setMenuOpen(false)} style={{ color: "#D9AB88" }} aria-label="Close menu">
                <X size={28} weight="light" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading block"
                    style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#F5F2EC", lineHeight: 1.1 }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: navLinks.length * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm px-8 py-4 inline-block mt-4"
                  style={{ backgroundColor: "#750006", color: "#F5F2EC", letterSpacing: "0.05em" }}
                >
                  Book us now
                </Link>
              </motion.div>
            </div>

            <div className="px-8 py-8 border-t" style={{ borderColor: "rgba(217,171,136,0.1)" }}>
              <p className="font-body text-xs" style={{ color: "rgba(217,171,136,0.5)" }}>
                info@fidco.africa · +254 797 690 609
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
