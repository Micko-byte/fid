"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const ITEMS = [
  { num: "01", label: "Strategic Communications" },
  { num: "02", label: "Media Strategy" },
  { num: "03", label: "Digital & Influencer" },
  { num: "04", label: "Experiential Marketing" },
  { num: "05", label: "Brand Activations" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·—";

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    const total = text.length;
    let iter = 0;

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iter) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iter += 0.6;
      if (iter < total) {
        frameRef.current = setTimeout(tick, 28);
      } else {
        setDisplay(text);
      }
    };

    if (frameRef.current) clearTimeout(frameRef.current);
    tick();
  }, [text]);

  const reset = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current);
    setDisplay(text);
  }, [text]);

  useEffect(() => () => { if (frameRef.current) clearTimeout(frameRef.current); }, []);

  return (
    <span
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="inline-block cursor-default select-none transition-colors duration-200 hover:text-[#D9AB88]"
    >
      {display}
    </span>
  );
}

function MarqueeItem({ num, label }: { num: string; label: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span
        className="font-body text-[0.62rem] tracking-[0.18em] mr-2 opacity-40"
        style={{ color: "#D9AB88" }}
      >
        {num}
      </span>
      <span
        className="font-body text-[0.8rem] tracking-[0.24em] uppercase"
        style={{ color: "#F5F2EC", fontFamily: "var(--font-body)" }}
      >
        <ScrambleText text={label} />
      </span>
      <span
        className="mx-10 opacity-25"
        style={{ color: "#D9AB88" }}
        aria-hidden="true"
      >
        ·
      </span>
    </span>
  );
}

export default function Marquee() {
  // Repeat 4× so the strip loops seamlessly
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden border-y py-[14px]"
      style={{
        backgroundColor: "#1d0202",
        borderColor: "rgba(217,171,136,0.14)",
      }}
    >
      <div
        className="flex"
        style={{
          animation: "fid-marquee 34s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <MarqueeItem key={i} num={item.num} label={item.label} />
        ))}
      </div>

      {/* Fade masks at edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16"
        style={{ background: "linear-gradient(to right, #1d0202, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{ background: "linear-gradient(to left, #1d0202, transparent)" }}
      />

      <style>{`
        @keyframes fid-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
