import { titleContainerSizePx } from "../timeline-container";

const TimelineBackground = ({
  startYear,
  endYear,
}: {
  startYear: number;
  endYear: number;
}) => {
  const years = [...Array(endYear - startYear + 2).keys()].map(
    (i) => i + startYear
  );
  return (
    <div className="absolute flex top-0 bottom-0 left-0 right-0">
      <div
        className="flex flex-col flex-1"
        style={{ paddingTop: `${titleContainerSizePx}px` }}
      >
        {years.map((year) => {
          return (
            <div className="flex flex-1 items-center" key={year}>
              <p className="h-px w-full border-t border-dashed border-border"></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineBackground;
