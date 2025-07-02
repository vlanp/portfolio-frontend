"use client";

import TimelineContainer from "./timeline/timeline-container";
import TimelineElement from "./timeline/timeline-element";
import { IoSchoolOutline, IoHammerOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { ITimelineDatas, ZETimelineElements } from "@/types/ITimelineData";
import { IDictionary } from "../../../dictionaries/generated";
import dynamic from "next/dynamic";
import { ILang } from "@/types/ILang";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { mobileBreakpoint } from "@/types/IBreakpoints";
import YearTimeline from "./timeline/timeline-container/year-timeline";
import { cn } from "@/lib/utils";

const Timeline = ({
  timelineDatas,
  timelineDict,
  lang,
}: {
  timelineDatas: ITimelineDatas;
  timelineDict: IDictionary["Timeline"];
  lang: ILang;
}) => {
  const ascendingDates = Object.values(timelineDatas)
    .flat()
    .map((it) => {
      if (it.endDate) {
        return [it.startDate, it.endDate];
      } else {
        return [it.startDate];
      }
    })
    .flat()
    .sort((a, b) => a.getTime() - b.getTime());

  const startDate: Date | undefined = ascendingDates[0];
  const endDate: Date | undefined = ascendingDates[ascendingDates.length - 1];
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const years = [...Array(endYear - startYear + 2).keys()].map(
    (i) => i + startYear
  );

  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);

  const timelineElement1 = (
    <TimelineElement
      Icon={IoSchoolOutline}
      bgThemeColor="bg-chart-1"
      borderThemeColor="border-chart-1"
      elementTitle={timelineDict.Studies}
      datas={timelineDatas.studies}
      startYear={startDate.getFullYear()}
      timelineElement={ZETimelineElements.enum.studies}
      lang={lang}
      years={years}
    />
  );

  const timelineElement2 = (
    <TimelineElement
      Icon={HiOutlineBriefcase}
      bgThemeColor="bg-chart-2"
      borderThemeColor="border-chart-2"
      elementTitle={timelineDict.Experiences}
      datas={timelineDatas.experiences}
      startYear={startDate.getFullYear()}
      timelineElement={ZETimelineElements.enum.experiences}
      lang={lang}
      years={years}
    />
  );

  const timelineElement3 = (
    <TimelineElement
      Icon={IoHammerOutline}
      bgThemeColor="bg-chart-4"
      borderThemeColor="border-chart-4"
      elementTitle={timelineDict.Projects}
      datas={timelineDatas.projects}
      startYear={startDate.getFullYear()}
      timelineElement={ZETimelineElements.enum.projects}
      lang={lang}
      years={years}
    />
  );
  return (
    <TimelineContainer years={years}>
      <div
        className={cn(
          "flex flex-row gap-2",
          isBelowMobileBp && "flex-col gap-10"
        )}
      >
        {isBelowMobileBp ? (
          <div className="flex flex-row">
            <YearTimeline years={years} />
            {timelineElement1}
          </div>
        ) : (
          timelineElement1
        )}
        {isBelowMobileBp ? (
          <div className="flex flex-row">
            <YearTimeline years={years} />
            {timelineElement2}
          </div>
        ) : (
          timelineElement2
        )}
        {isBelowMobileBp ? (
          <div className="flex flex-row">
            <YearTimeline years={years} />
            {timelineElement3}
          </div>
        ) : (
          timelineElement3
        )}
      </div>
    </TimelineContainer>
  );
};

// UseLayoutEffect is used in one of the child component, so we need to disable ssr for all the ui to be rendered in client side, allowing the useLayoutEffect to work properly
export default dynamic(() => Promise.resolve(Timeline), {
  ssr: false,
});
