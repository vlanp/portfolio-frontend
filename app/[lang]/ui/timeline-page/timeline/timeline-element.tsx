import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { titleContainerSizePx } from "./timeline-container";
import { calculateYearsDifference, cn } from "@/lib/utils";
import { IconType } from "react-icons";
import {
  createDispatchedTimelineDatas,
  ITimelineElement,
  ITimelineExperiencesData,
  ITimelineStudiesData,
  ITimelinProjectsData,
  selectTimeline,
} from "@/types/ITimelineData";
import { yearDivHeightPx } from "./timeline-container/year-timeline";
import TimelineElementBody, {
  linesWidhtPx,
} from "./timeline-element/timeline-element-body";

const TimelineElement = ({
  elementTitle,
  bgThemeColor,
  Icon,
  datas,
  startYear,
  timelineElement,
}: {
  elementTitle: string;
  bgThemeColor: `bg-chart-${number}`;
  Icon: IconType;
  datas:
    | ITimelineExperiencesData[]
    | ITimelinProjectsData[]
    | ITimelineStudiesData[];
  startYear: number;
  timelineElement: ITimelineElement;
}) => {
  const startDate = new Date(startYear, 1, 1);
  const startYearHeightPx = yearDivHeightPx / 2;
  const dispatchedTimelineDatas = createDispatchedTimelineDatas([1, 2, 3]);
  const elementContainerRelativeWidth = 3 / 4;

  datas.forEach((data) => {
    const fromTopPx =
      calculateYearsDifference(startDate, data.startDate) * yearDivHeightPx +
      startYearHeightPx;
    const heightPx = data.endDate
      ? calculateYearsDifference(data.startDate, data.endDate) * yearDivHeightPx
      : 20;
    const timeline = selectTimeline(
      dispatchedTimelineDatas,
      fromTopPx,
      heightPx
    );
    if (!timeline) {
      console.warn(
        "Wasn't able to display this element into a timeline because there wasn't enough place available.",
        {
          element: timelineElement,
          data,
          calculatedPosition: {
            fromTopPx,
            heightPx,
          },
          dispatchedTimelineDatas,
        }
      );
      return undefined;
    }
    const widthPx = 24;
    dispatchedTimelineDatas[timeline].push({
      fromTopPx,
      heightPx,
      jsxElement: (
        <span
          key={data._id}
          className={cn("absolute rounded-sm", bgThemeColor)}
          style={{
            top: fromTopPx,
            height: heightPx,
            width: widthPx,
            left: -(widthPx / 2 - linesWidhtPx / 2),
          }}
        />
      ),
    });
  });

  return (
    <div className="flex flex-col flex-1">
      <Card
        className="flex flex-col justify-center w-full"
        style={{ height: `${titleContainerSizePx}px` }}
      >
        <CardHeader className="flex flex-row justify-center">
          <Icon size={40} className={cn("p-2 rounded-full", bgThemeColor)} />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-center">{elementTitle}</CardTitle>
        </CardContent>
      </Card>
      <div className="relative flex flex-col flex-1">
        <TimelineElementBody
          bgThemeColor={bgThemeColor}
          startYearHeightPx={startYearHeightPx}
          containerRelativeWidth={elementContainerRelativeWidth}
          dispatchedTimelineDatas={dispatchedTimelineDatas}
        />
      </div>
    </div>
  );
};

export default TimelineElement;
