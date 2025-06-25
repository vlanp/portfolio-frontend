import { ReactNode } from "react";
import YearTimeline from "./timeline-container/year-timeline";
import TimelineBackground from "./timeline-container/timeline-background";

const titleContainerSizePx = 120;

const TimelineContainer = ({
  children,
  startYear,
  endYear,
}: {
  children: ReactNode;
  startYear: number;
  endYear: number;
}) => {
  return (
    <section className="flex flex-1 max-w-[1024px]">
      <YearTimeline startYear={startYear} endYear={endYear} />
      <div className="flex relative flex-3">
        <TimelineBackground startYear={startYear} endYear={endYear} />
        {children}
      </div>
      <YearTimeline startYear={startYear} endYear={endYear} />
    </section>
  );
};

export default TimelineContainer;
export { titleContainerSizePx };
