"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLayoutEffect, useRef, useState } from "react";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { largeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import { cn } from "@/lib/utils";
import { titleContainerSizePx, yearDivHeightPx } from "../../timeline";

const YearTimeline = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [yearCount, setYearCount] = useState(0);
  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);
  const isBelowLargeBp = useIsBelowBP(largeBreakpoint);

  useLayoutEffect(() => {
    const calculateYearCount = () => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.clientHeight;

      const yearCount = Math.floor(containerHeight / yearDivHeightPx) - 1;

      setYearCount(yearCount);
    };

    calculateYearCount();

    const handleResize = () => calculateYearCount();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isBelowLargeBp, isBelowMobileBp]);

  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-w-[100px]",
        isBelowMobileBp && "min-h-[400px]"
      )}
      style={{ paddingTop: `${titleContainerSizePx}px` }}
      ref={containerRef}
    >
      {[...Array(yearCount).keys()].map((index) => {
        return (
          <div
            key={index}
            className={`flex flex-row items-center gap-2 px-2`}
            style={{ minHeight: `${yearDivHeightPx}px` }}
          >
            <p className="flex-1 h-px bg-border"></p>
            <Skeleton className="h-[26px] w-[50px]" />
            <p className="flex-1 h-px bg-border"></p>
          </div>
        );
      })}
    </div>
  );
};

export default YearTimeline;
