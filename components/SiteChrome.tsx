"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import GrainOverlay from "@/components/GrainOverlay";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  // The old /work page uses its own full-screen layout — strip site chrome for it
  // but keep chrome for /work/[slug] detail pages
  const isLegacyWorkRoute = pathname === "/work" || pathname.startsWith("/work?");

  // Fire intro-done immediately so Hero shows without the loader
  useEffect(() => {
    document.documentElement.dataset.intro = "done";
    window.dispatchEvent(new Event("fid:intro-done"));
  }, []);

  if (isLegacyWorkRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-body"
        style={{ backgroundColor: "#5B0E14", color: "#F5F2EC" }}
      >
        Skip to content
      </a>
      <ScrollProgress />
      <GrainOverlay />
      <Nav />
      <main id="main-content">{children}</main>
    </>
  );
}
