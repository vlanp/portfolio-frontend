import { ReactNode } from "react";
import YearTimeline from "./timeline-container/year-timeline";
import TimelineBackground from "./timeline-container/timeline-background";

const titleContainerSizePx = 120;

const TimelineContainer = ({
  children,
  years,
}: {
  children: ReactNode;
  years: number[];
}) => {
  return (
    <section className="flex flex-1 max-w-[1024px]">
      <YearTimeline years={years} />
      <div className="flex relative flex-3">
        <TimelineBackground years={years} />
        {children}
      </div>
      <YearTimeline years={years} />
    </section>
  );
};

export default TimelineContainer;
export { titleContainerSizePx };
