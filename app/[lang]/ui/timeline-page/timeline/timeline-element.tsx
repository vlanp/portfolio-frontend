import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { titleContainerSizePx } from "./timeline-container";
import { calculateYearsDifference, cn } from "@/lib/utils";
import { IconType } from "react-icons";
import {
  ITimelineExperiencesData,
  ITimelineStudiesData,
  ITimelinProjectsData,
} from "@/types/ITimelineData";
import { yearDivHeightPx } from "./timeline-container/year-timeline";

const TimelineElement = ({
  elementTitle,
  bgThemeColor: themeColor,
  Icon,
  datas,
  startYear,
}: {
  elementTitle: string;
  bgThemeColor: `bg-chart-${number}`;
  Icon: IconType;
  datas:
    | ITimelineExperiencesData[]
    | ITimelinProjectsData[]
    | ITimelineStudiesData[];
  startYear: number;
}) => {
  const startDate = new Date(startYear, 0, 1);
  const startYearHeightPx = yearDivHeightPx / 2;
  return (
    <div className="flex flex-col flex-1 gap-2">
      <Card
        className="flex flex-col justify-center w-full"
        style={{ height: `${titleContainerSizePx}px` }}
      >
        <CardHeader className="flex flex-row justify-center">
          <Icon size={40} className={cn("p-2 rounded-full", themeColor)} />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-center">{elementTitle}</CardTitle>
        </CardContent>
      </Card>
      <div className="relative flex flex-col flex-1">
        <div className="absolute flex top-0 left-0 right-0 bottom-0 justify-center">
          <p className={cn("w-2 h-full rounded-sm", themeColor)}></p>
        </div>
        {datas.map((data) => {
          const fromTop =
            calculateYearsDifference(startDate, data.startDate) *
              yearDivHeightPx +
            startYearHeightPx;
          const height = data.endDate
            ? calculateYearsDifference(data.startDate, data.endDate) *
              yearDivHeightPx
            : 20;
          return (
            <p
              key={data._id}
              className={cn("absolute w-6 rounded-sm self-center", themeColor)}
              style={{ top: fromTop, height }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimelineElement;
