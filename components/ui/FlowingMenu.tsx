"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface MenuItemData {
  link: string;
  text: string;
  image: string;
  num?: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  onHoverItem?: (index: number | null) => void;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  index: number;
  onHoverItem?: (index: number | null) => void;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = "#ffffff",
  bgColor = "#120F17",
  marqueeBgColor = "#ffffff",
  marqueeTextColor = "#120F17",
  borderColor = "#ffffff",
  onHoverItem,
}) => {
  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
            index={idx}
            onHoverItem={onHoverItem}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  image,
  num,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
  index,
  onHoverItem,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector(
        ".marquee-part"
      ) as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector(
        ".marquee-part"
      ) as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };
    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
    onHoverItem?.(index);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(
        marqueeInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" },
        0
      );
    onHoverItem?.(null);
  };

  return (
    <div
      className="flex-1 relative overflow-hidden"
      ref={itemRef}
      style={{
        borderTop: isFirst ? "none" : `1px solid ${borderColor}`,
      }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer no-underline"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: textColor,
          padding: "0 clamp(1.5rem, 5vw, 6rem)",
          gap: "clamp(1rem, 2vw, 1.4rem)",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        {num && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              color: "rgba(217,171,136,0.4)",
              flexShrink: 0,
            }}
          >
            {num}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-heading, 'Oswald')",
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: "clamp(1.5rem, 3.8vw, 3.2rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {text}
        </span>
        {/* Arrow */}
        <svg
          style={{
            flexShrink: 0,
            opacity: 0.3,
            transition: "opacity 0.3s",
          }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>

      {/* Marquee overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        ref={marqueeRef}
        style={{
          backgroundColor: marqueeBgColor,
          transform: "translateY(101%)",
        }}
      >
        <div
          className="h-full flex"
          ref={marqueeInnerRef}
          style={{ width: "max-content" }}
        >
          {[...Array(repetitions)].map((_, idx) => (
            <div
              className="marquee-part flex items-center flex-shrink-0"
              key={idx}
              style={{ color: marqueeTextColor }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-heading, 'Oswald')",
                  fontWeight: 600,
                  fontSize: "clamp(1.5rem, 3.8vw, 3.2rem)",
                  lineHeight: 1,
                  padding: "0 1vw",
                  letterSpacing: "-0.02em",
                }}
              >
                {text}
              </span>
              <div
                style={{
                  width: "clamp(140px,14vw,200px)",
                  height: "7vh",
                  margin: "2em 2vw",
                  padding: "1em",
                  borderRadius: "50px",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
