import { Suspense } from "react";
import WorkPageClient from "@/components/work/WorkPageClient";

function WorkFallback() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-[29px]" style={{ backgroundColor: "#f5f2ec", color: "#1c1c1c" }}>
      <p className="text-[12px] uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
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
