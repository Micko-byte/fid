"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/components/mobile/useIsMobile";

/**
 * Renders the minimal `mobile` tree on phones, the `desktop` tree otherwise.
 * SSR renders desktop (crawlable); swaps after mount.
 */
export default function Responsive({
  mobile,
  desktop,
}: {
  mobile: ReactNode;
  desktop: ReactNode;
}) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && isMobile) return <>{mobile}</>;
  return <>{desktop}</>;
}
