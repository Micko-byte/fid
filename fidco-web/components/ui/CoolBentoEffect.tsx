"use client";

import { motion } from "framer-motion";
import type { WorkImage } from "@/components/lib/work-types";

interface CoolBentoEffectProps {
  images: WorkImage[];
  title?: string;
  className?: string;
}

const layout = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

export default function CoolBentoEffect({ images, title = "Case study grid", className = "" }: CoolBentoEffectProps) {
  const items = images.slice(0, 6);

  if (!items.length) return null;

  return (
    <section className={className} aria-label={title}>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[190px] lg:auto-rows-[220px]">
        {items.map((image, index) => (
          <motion.figure
            key={`${image.src}-${index}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8, scale: 1.015 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ type: "spring", stiffness: 220, damping: 24, delay: index * 0.04 }}
            className={`group relative overflow-hidden border border-[rgba(42,42,42,0.12)] bg-[#e8e8e8] ${layout[index % layout.length]}`}
          >
            <img
              src={image.src}
              alt={image.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/8 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 text-white">
              <span className="max-w-[22ch] text-[12px] uppercase tracking-[0.16em] leading-relaxed">
                {image.label}
              </span>
              <span className="text-[12px] uppercase tracking-[0.18em] opacity-70">
                {String(index + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
