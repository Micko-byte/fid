"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import IntroLoader from "@/components/IntroLoader";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isWorkRoute = pathname === "/work" || pathname.startsWith("/work?");

  if (isWorkRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-body"
        style={{ backgroundColor: "#750006", color: "#F5F2EC" }}
      >
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <GrainOverlay />
      <IntroLoader />
      <Nav />
      <main id="main-content">{children}</main>
    </>
  );
}
