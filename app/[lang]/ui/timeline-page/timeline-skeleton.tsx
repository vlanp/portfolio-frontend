"use client";

import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import TimelineContainerSkeleton from "./timeline/timeline-container-skeleton";
import TimelineElementSkeleton from "./timeline/timeline-element-skeleton";
import { mobileBreakpoint } from "@/types/IBreakpoints";
import { cn } from "@/lib/utils";
import YearTimelineSkeleton from "./timeline/timeline-container/year-timeline-skeleton";

const TimelineSkeleton = () => {
  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);
  return (
    <TimelineContainerSkeleton>
      <div
        className={cn(
          "flex flex-row gap-2",
          isBelowMobileBp && "flex-col gap-10"
        )}
      >
        {isBelowMobileBp ? (
          <div className="flex flex-row">
            <YearTimelineSkeleton />
            <TimelineElementSkeleton />
          </div>
        ) : (
          <TimelineElementSkeleton />
        )}
        {isBelowMobileBp ? (
          <div className="flex flex-row">
            <YearTimelineSkeleton />
            <TimelineElementSkeleton />
          </div>
        ) : (
          <TimelineElementSkeleton />
        )}
        {isBelowMobileBp ? (
          <div className="flex flex-row">
            <YearTimelineSkeleton />
            <TimelineElementSkeleton />
          </div>
        ) : (
          <TimelineElementSkeleton />
        )}
      </div>
    </TimelineContainerSkeleton>
  );
};

export default TimelineSkeleton;
