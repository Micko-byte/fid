"use client";

import { useEffect, useRef } from "react";

/**
 * A muted video that only plays while scrolled into view, looping a fixed
 * segment of the clip. Defaults to the 1.6s–4.8s window (the "active" part of
 * the Canva exports, matching the hero) so every animation across the site
 * loops the same lively beat instead of the slow intro/outro.
 *
 * Plays on enter, pauses on leave. Provide a `poster` (the PNG) for the first frame.
 */
interface ScrollVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  /** Loop window start (seconds). */
  start?: number;
  /** Loop window end (seconds). */
  end?: number;
}

export default function ScrollVideo({
  src,
  poster,
  className,
  style,
  threshold = 0.3,
  start = 1.6,
  end = 4.8,
}: ScrollVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Keep playback inside the [start, end] loop window.
    const onTimeUpdate = () => {
      if (el.currentTime >= end || el.currentTime < start) {
        el.currentTime = start;
      }
    };
    el.addEventListener("timeupdate", onTimeUpdate);

    const seekToStart = () => {
      if (el.currentTime < start || el.currentTime >= end) el.currentTime = start;
    };
    el.addEventListener("loadedmetadata", seekToStart);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seekToStart();
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("loadedmetadata", seekToStart);
    };
  }, [threshold, start, end]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
      style={style}
    />
  );
}
