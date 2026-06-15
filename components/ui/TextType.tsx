"use client";

import { useEffect, useMemo, useRef, useState, type ElementType } from "react";

interface TextTypeProps {
  text: string | string[];
  as?: ElementType;
  className?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  startOnVisible?: boolean;
}

export default function TextType({
  text,
  as: Component = "div",
  className = "",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 1800,
  deletingSpeed = 28,
  loop = true,
  showCursor = true,
  cursorCharacter = "|",
  startOnVisible = true,
}: TextTypeProps) {
  const sentences = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(!startOnVisible);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnVisible || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!visible) return;
    const sentence = sentences[currentSentence] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < sentence.length) {
      timer = setTimeout(() => {
        setDisplayed(sentence.slice(0, displayed.length + 1));
      }, typingSpeed);
    } else if (!deleting && displayed.length === sentence.length) {
      timer = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => {
        setDisplayed(sentence.slice(0, displayed.length - 1));
      }, deletingSpeed);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      if (currentSentence < sentences.length - 1) {
        setCurrentSentence((v) => v + 1);
      } else if (loop) {
        setCurrentSentence(0);
      }
    }

    return () => clearTimeout(timer);
  }, [currentSentence, deleting, displayed, sentences, typingSpeed, pauseDuration, deletingSpeed, loop, visible]);

  useEffect(() => {
    if (!visible) return;
    if (currentSentence !== 0 || deleting) return;
    const timer = setTimeout(() => {}, initialDelay);
    return () => clearTimeout(timer);
  }, [currentSentence, deleting, initialDelay, visible]);

  return (
    <Component ref={ref as never} className={`inline-flex items-center ${className}`}>
      <span>{displayed}</span>
      {showCursor ? <span style={{ marginLeft: "0.15em", opacity: 0.8 }}>{cursorCharacter}</span> : null}
    </Component>
  );
}
