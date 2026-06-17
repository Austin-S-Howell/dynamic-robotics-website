import React from "react";

/** Shared responsive breakpoint hook (mobile < 820px). */
export function useIsMobile(bp = 820) {
  const [m, setM] = React.useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  React.useEffect(() => {
    const on = () => setM(window.innerWidth < bp);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return m;
}
