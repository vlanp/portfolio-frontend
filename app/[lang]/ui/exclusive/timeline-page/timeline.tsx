"use client";

import TimelineContainer from "./timeline/timeline-container";
import TimelineElement from "./timeline/timeline-element";
import { IoSchoolOutline, IoHammerOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import {
  getYears,
  ITimelineDatas,
  timelineColorMapping,
  ZETimelineElements,
} from "@/types/ITimelineData";
import { IDictionary } from "../../../dictionaries/generated";
import dynamic from "next/dynamic";
import { ILang } from "@/types/ILang";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { mobileBreakpoint } from "@/types/IBreakpoints";
import YearTimeline from "./timeline/timeline-container/year-timeline";
import { cn } from "@/lib/utils";

const titleContainerSizePx = 120;
const yearDivHeightPx = 80;
const startYearHeightPx = yearDivHeightPx / 2;
const timelineWidthPx = 8;
const timelineElementRelativeWidthToContainer = 3 / 4;
const middleTimelineMarginYPx = 8;
const sideTimelineMarginYPx = startYearHeightPx - middleTimelineMarginYPx - 5;

const Timeline = ({
  timelineDatas,
  timelineDict,
  lang,
}: {
  timelineDatas: ITimelineDatas;
  timelineDict: IDictionary["Timeline"];
  lang: ILang;
}) => {
  const { years, startDate } = getYears(timelineDatas);

  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);

  const timelineElement1 = (
    <TimelineElement
      Icon={IoSchoolOutline}
      bgThemeColor={
        timelineColorMapping[ZETimelineElements.enum.studies].bgThemeColor
      }
      borderThemeColor={
        timelineColorMapping[ZETimelineElements.enum.studies].borderThemeColor
      }
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
      bgThemeColor={
        timelineColorMapping[ZETimelineElements.enum.experiences].bgThemeColor
      }
      borderThemeColor={
        timelineColorMapping[ZETimelineElements.enum.experiences]
          .borderThemeColor
      }
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
      bgThemeColor={
        timelineColorMapping[ZETimelineElements.enum.projects].bgThemeColor
      }
      borderThemeColor={
        timelineColorMapping[ZETimelineElements.enum.projects].borderThemeColor
      }
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

export {
  yearDivHeightPx,
  startYearHeightPx,
  timelineWidthPx,
  timelineElementRelativeWidthToContainer,
  middleTimelineMarginYPx,
  sideTimelineMarginYPx,
  titleContainerSizePx,
};
