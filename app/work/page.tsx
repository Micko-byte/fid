import { Suspense } from "react";
import WorkPageClient from "@/components/work/WorkPageClient";

function WorkFallback() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-[29px]" style={{ backgroundColor: "#f0f0f0", color: "#2a2a2a" }}>
      <p className="text-[12px] uppercase tracking-[0.18em]" style={{ fontFamily: '"Noto Sans", system-ui, sans-serif', lineHeight: 1.4 }}>
        Loading work
      </p>
    </main>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<WorkFallback />}>
      <WorkPageClient />
    </Suspense>
  );
}
