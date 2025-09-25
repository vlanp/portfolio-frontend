"use client";

import { ReactNode } from "react";
import YearTimeline from "./timeline-container/year-timeline";
import TimelineBackground from "./timeline-container/timeline-background";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { largeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import { cn } from "@/lib/utils";

const TimelineContainer = ({
  children,
  years,
}: {
  children: ReactNode;
  years: number[];
}) => {
  const isBelowLargeBp = useIsBelowBP(largeBreakpoint);
  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);
  return (
    <section
      className={cn(
        "flex flex-1 max-w-[1024px]",
        isBelowLargeBp && "max-w-[800px] justify-center"
      )}
    >
      {!isBelowMobileBp && <YearTimeline years={years} />}
      <div className="flex relative">
        {!isBelowMobileBp && <TimelineBackground years={years} />}
        {children}
      </div>
      {!isBelowLargeBp && <YearTimeline years={years} />}
    </section>
  );
};

export default TimelineContainer;
