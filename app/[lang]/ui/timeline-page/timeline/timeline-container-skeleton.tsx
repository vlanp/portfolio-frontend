import { ReactNode } from "react";
import YearTimelineSkeleton from "./timeline-container/year-timeline-skeleton";
import TimelineBackgroundSkeleton from "./timeline-container/timeline-background-skeleton";

const TimelineContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-1 max-w-[1024px]">
      <YearTimelineSkeleton />
      <div className="flex relative flex-3">
        <TimelineBackgroundSkeleton />
        {children}
      </div>
      <YearTimelineSkeleton />
    </section>
  );
};

export default TimelineContainer;
