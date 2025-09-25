"use client";

import { ReactNode } from "react";
import YearTimelineSkeleton from "./timeline-container/year-timeline-skeleton";
import TimelineBackgroundSkeleton from "./timeline-container/timeline-background-skeleton";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { largeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import { cn } from "@/lib/utils";

const TimelineContainer = ({ children }: { children: ReactNode }) => {
  const isBelowLargeBp = useIsBelowBP(largeBreakpoint);
  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);
  return (
    <section
      className={cn(
        "flex flex-1 max-w-[1024px]",
        isBelowLargeBp && "max-w-[800px] justify-center"
      )}
    >
      {!isBelowMobileBp && <YearTimelineSkeleton />}
      <div className={cn("flex relative")}>
        <TimelineBackgroundSkeleton />
        {children}
      </div>
      {!isBelowLargeBp && <YearTimelineSkeleton />}
    </section>
  );
};

export default TimelineContainer;
