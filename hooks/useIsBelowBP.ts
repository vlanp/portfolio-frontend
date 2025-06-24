import {
  IExtraLargeBreakPoint,
  ILargeBreakpoint,
  IMobileBreakpoint,
} from "@/types/IBreakpoints";
import * as React from "react";

export function useIsBelowBP(
  breakpoint: IMobileBreakpoint | ILargeBreakpoint | IExtraLargeBreakPoint
) {
  const [isBelowBP, setIsBelowBP] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsBelowBP(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsBelowBP(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isBelowBP;
}
