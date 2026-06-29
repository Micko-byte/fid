"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on phone-width viewports. SSR-safe: starts false, resolves
 * after mount. Use to render the minimal mobile layouts.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
