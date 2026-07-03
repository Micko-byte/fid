"use client";

import { useEffect, useState } from "react";
import type { WorkProject, WorkSector } from "@/components/lib/work-types";
import { workProjects } from "@/lib/work-gallery";

let loaderPromise: Promise<void> | null = null;

function ensureWorkDataScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.FID_PROJECTS && window.FID_SECTORS) return Promise.resolve();
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-fid-data="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load fid-data.js")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "/fid-data.js";
    script.async = true;
    script.dataset.fidData = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load fid-data.js"));
    document.head.appendChild(script);
  }).finally(() => {
    loaderPromise = null;
  });

  return loaderPromise;
}

export function useWorkData() {
  const [projects, setProjects] = useState<WorkProject[]>(workProjects);
  const [sectors, setSectors] = useState<WorkSector[]>([]);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    let alive = true;

    const sync = () => {
      if (!alive) return;
      setProjects(workProjects);
      setSectors(window.FID_SECTORS ?? []);
      setReady(true);
    };

    if (window.FID_PROJECTS && window.FID_SECTORS) {
      sync();
      return () => {
        alive = false;
      };
    }

    ensureWorkDataScript()
      .then(sync)
      .catch(() => {
        if (!alive) return;
        setProjects(workProjects);
        setSectors([]);
        setReady(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { projects, sectors, ready };
}
