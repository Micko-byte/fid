"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/components/mobile/useIsMobile";
import MobileHome from "@/components/mobile/MobileHome";

/**
 * Renders the minimal mobile homepage on phones, the full desktop
 * composition otherwise. SSR renders desktop to keep content crawlable;
 * swaps to mobile after mount so the Three.js hero never stays mounted on phones.
 */
export default function ResponsiveHome({ desktop }: { desktop: ReactNode }) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && isMobile) return <MobileHome />;
  return <>{desktop}</>;
}
