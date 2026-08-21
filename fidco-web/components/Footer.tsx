"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  Phone,
  TiktokLogo,
  YoutubeLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import BrandWordmark from "@/components/ui/BrandWordmark";
import FidLogo from "@/components/ui/FidLogo";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [
  { label: "Expertise", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Events", href: "/events" },
  { label: "Press & Articles", href: "/articles" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

const SERVICE_CHIPS = [
  "Strategic communications",
  "Media management",
  "Influencer strategy",
  "Digital campaigns",
  "Experiential marketing",
];

const SOCIAL_LINKS = [
  { Icon: InstagramLogo, href: "https://instagram.com/fidpr/", label: "Instagram" },
  { Icon: FacebookLogo, href: "https://facebook.com/profile.php?id=100070330230678", label: "Facebook" },
  { Icon: YoutubeLogo, href: "https://youtube.com/@FIDPR", label: "YouTube" },
  { Icon: LinkedinLogo, href: "https://www.linkedin.com/company/fidpr", label: "LinkedIn" },
  { Icon: TiktokLogo, href: "https://www.tiktok.com/@fidpr", label: "TikTok" },
];

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, ease: EASE },
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="section-red relative overflow-hidden border-t border-[#320204]"
      data-nav-dark
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(217,128,56,0.16),transparent_35%),radial-gradient(circle_at_88%_18%,rgba(245,242,236,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]"
      />
      <div aria-hidden className="brand-pattern-light absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 md:px-[clamp(1.5rem,5vw,6rem)] lg:py-20">
        <motion.div {...REVEAL} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <FidLogo variant="light" style={{ height: "18px", width: "auto" }} />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d98038]">
                FID &amp; Co.
              </span>
            </div>

            <h2 className="max-w-[14ch] font-[var(--font-heading)] text-[clamp(2.7rem,6.4vw,5.8rem)] leading-[0.94] tracking-[-0.04em] text-[#f5f2ec]">
              A footer should close the story, not just end the page.
            </h2>

            <p className="max-w-[42ch] text-[0.98rem] leading-7 text-white/72">
              If you are planning a launch, campaign, media push, or an event
              that needs a sharper public edge, let&apos;s make it feel
              deliberate from the first touchpoint to the last.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#f5f2ec] px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#750006] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#d9ab88]"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f5f2ec] transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {SERVICE_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <motion.aside
            {...REVEAL}
            transition={{ ...REVEAL.transition, duration: 0.55, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-[#2d0204]/75 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#d98038]">
              Quick contact
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="tel:+254797690609"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/82 transition-colors duration-300 hover:border-[#d98038]/40 hover:bg-white/10 hover:text-white"
              >
                <span>+254 797 690 609</span>
                <Phone size={18} weight="bold" color="#d98038" />
              </a>
              <a
                href="mailto:info@fidco.africa"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/82 transition-colors duration-300 hover:border-[#d98038]/40 hover:bg-white/10 hover:text-white"
              >
                <span>info@fidco.africa</span>
                <EnvelopeSimple size={18} weight="bold" color="#d98038" />
              </a>
              <a
                href="https://www.fidco.africa"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/82 transition-colors duration-300 hover:border-[#d98038]/40 hover:bg-white/10 hover:text-white"
              >
                <span>www.fidco.africa</span>
                <Globe size={18} weight="bold" color="#d98038" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.08 + index * 0.08, ease: EASE }}
                  whileHover={{ y: -3 }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white/70 transition-colors duration-300 hover:border-[#d98038]/60 hover:bg-[#d98038] hover:text-[#260000]"
                >
                  <Icon size={20} weight="bold" />
                </motion.a>
              ))}
            </div>
          </motion.aside>
        </motion.div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[1.2fr_0.75fr_0.95fr]">
          <motion.div
            {...REVEAL}
            transition={{ ...REVEAL.transition, duration: 0.55, delay: 0.12 }}
            className="space-y-5"
          >
            <BrandWordmark
              variant="light"
              style={{ height: "clamp(28px, 4vw, 40px)", width: "auto" }}
            />
            <p className="max-w-[34ch] text-sm leading-7 text-white/68">
              FID &amp; Co. is owned and managed by FID Public Relations Ltd.
              We shape narratives, media presence, and event moments across
              Kenya and the region.
            </p>
            <div className="flex flex-wrap gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/56">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Nairobi
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Kenya
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Africa
              </span>
            </div>
          </motion.div>

          <motion.div
            {...REVEAL}
            transition={{ ...REVEAL.transition, duration: 0.55, delay: 0.16 }}
          >
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#d98038]">
              Navigate
            </h3>
            <nav className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/72 transition-colors duration-300 hover:text-[#d98038]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            {...REVEAL}
            transition={{ ...REVEAL.transition, duration: 0.55, delay: 0.2 }}
          >
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#d98038]">
              Connect
            </h3>
            <div className="mt-5 space-y-3 text-sm text-white/72">
              <a
                href="tel:+254797690609"
                className="block transition-colors duration-300 hover:text-white"
              >
                +254 797 690 609
              </a>
              <a
                href="mailto:info@fidco.africa"
                className="block transition-colors duration-300 hover:text-white"
              >
                info@fidco.africa
              </a>
              <a
                href="https://www.fidco.africa"
                className="block transition-colors duration-300 hover:text-white"
              >
                www.fidco.africa
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">© {year} FID &amp; Co. All rights reserved.</p>
          <p className="text-xs text-white/50">
            Built in Nairobi for brands, institutions and cultural platforms
            across Africa.
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#f5f2ec]/10 bg-brand-texture">
        <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-[clamp(1.5rem,5vw,6rem)] lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-[#750006]/10 bg-[#f5f2ec] px-6 py-10 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.45)] md:px-10"
          >
            <div
              aria-hidden
              className="brand-pattern-light absolute inset-0 opacity-70"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d98038]/50 to-transparent"
            />

            <div className="relative flex flex-col items-center gap-4 text-center">
              <BrandWordmark
                variant="dark"
                style={{ height: "clamp(72px, 12vw, 170px)", width: "100%" }}
              />
              <p className="max-w-3xl text-sm leading-7 text-[#260000]/70">
                Insight. Strategy. Impact. FID &amp; Co. is owned and managed
                by FID Public Relations Ltd.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#750006]/60">
                <span className="rounded-full border border-[#750006]/10 bg-white/70 px-3 py-2">
                  Owned and managed
                </span>
                <span className="rounded-full border border-[#750006]/10 bg-white/70 px-3 py-2">
                  Nairobi, Kenya
                </span>
                <span className="rounded-full border border-[#750006]/10 bg-white/70 px-3 py-2">
                  Built for Africa
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
