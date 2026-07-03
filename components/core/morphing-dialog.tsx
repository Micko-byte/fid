"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { createPortal } from "react-dom";

type Ctx = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  uid: string;
  transition?: Transition;
};

const MDContext = createContext<Ctx | null>(null);
const useMD = () => {
  const c = useContext(MDContext);
  if (!c) throw new Error("MorphingDialog parts must be used within <MorphingDialog>");
  return c;
};

export function MorphingDialog({ children, transition }: { children: ReactNode; transition?: Transition }) {
  const [isOpen, setIsOpen] = useState(false);
  const uid = useId();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return <MDContext.Provider value={{ isOpen, setIsOpen, uid, transition }}>{children}</MDContext.Provider>;
}

export function MorphingDialogTrigger({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const { setIsOpen, uid, transition } = useMD();
  return (
    <motion.div layoutId={`md-shell-${uid}`} onClick={() => setIsOpen(true)} className={className} style={{ cursor: "pointer", ...style }} transition={transition}>
      {children}
    </motion.div>
  );
}

export function MorphingDialogContainer({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useMD();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(12,12,12,0.6)", backdropFilter: "blur(5px)", zIndex: 9998 }}
          />
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", pointerEvents: "none" }}>
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function MorphingDialogContent({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const { uid, transition } = useMD();
  return (
    <motion.div layoutId={`md-shell-${uid}`} className={className} style={{ pointerEvents: "auto", overflow: "hidden", ...style }} transition={transition}>
      {children}
    </motion.div>
  );
}

export function MorphingDialogImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const { uid } = useMD();
  return <motion.img layoutId={`md-img-${uid}`} src={src} alt={alt} className={className} style={style} />;
}

export function MorphingDialogTitle({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const { uid } = useMD();
  return <motion.div layoutId={`md-title-${uid}`} className={className} style={style}>{children}</motion.div>;
}

export function MorphingDialogSubtitle({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const { uid } = useMD();
  return <motion.div layoutId={`md-subtitle-${uid}`} className={className} style={style}>{children}</motion.div>;
}

export function MorphingDialogClose({ className }: { className?: string }) {
  const { setIsOpen } = useMD();
  return (
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      aria-label="Close"
      className={className}
      style={{ position: "absolute", top: "0.9rem", right: "0.9rem", width: "32px", height: "32px", borderRadius: "999px", border: "none", background: "rgba(0,0,0,0.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1c1c1c" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
  );
}
