import { titleContainerSizePx, yearDivHeightPx } from "../../timeline";

const TimelineBackground = ({ years }: { years: number[] }) => {
  return (
    <div className="absolute flex top-0 bottom-0 left-0 right-0">
      <div
        className="flex flex-col flex-1 gap-2"
        style={{ paddingTop: `${titleContainerSizePx}px` }}
      >
        <div />
        <div>
          {years.map((year) => {
            return (
              <div
                className="flex items-center"
                key={year}
                style={{ minHeight: `${yearDivHeightPx}px` }}
              >
                <span className="h-px w-full border-t border-dashed border-border"></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineBackground;
