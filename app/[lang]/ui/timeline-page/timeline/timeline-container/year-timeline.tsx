import { titleContainerSizePx } from "../timeline-container";

const yearDivHeightPx = 80;

const YearTimeline = ({
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
    <div
      className={`flex flex-col flex-1`}
      style={{ paddingTop: `${titleContainerSizePx}px` }}
    >
      {years.map((year) => {
        return (
          <div
            key={year}
            className={`flex flex-row items-center gap-2 px-2`}
            style={{ minHeight: `${yearDivHeightPx}px` }}
          >
            <p className="flex-1 h-px bg-border"></p>
            <p>{year}</p>
            <p className="flex-1 h-px bg-border"></p>
          </div>
        );
      })}
    </div>
  );
};

export default YearTimeline;
export { yearDivHeightPx };
