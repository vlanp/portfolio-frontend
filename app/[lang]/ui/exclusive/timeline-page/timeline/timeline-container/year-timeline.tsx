import { cn } from "@/lib/utils";
import { titleContainerSizePx, yearDivHeightPx } from "../../timeline";

const YearTimeline = ({
  years,
  hidden,
}: {
  years: number[];
  hidden?: boolean;
}) => {
  return (
    <div
      className={cn(
        `flex flex-col flex-1 gap-2`,
        hidden && "invisible w-0 flex-0"
      )}
      style={{ paddingTop: `${titleContainerSizePx}px` }}
    >
      <div />
      <div>
        {years.map((year) => {
          return (
            <div
              key={year}
              className={cn(
                `flex flex-row items-center gap-2 px-2 min-w-[100px]`
              )}
              style={{ minHeight: `${yearDivHeightPx}px` }}
            >
              <span className="flex-1 h-px bg-border"></span>
              <span>{year}</span>
              <span className="flex-1 h-px bg-border"></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearTimeline;
