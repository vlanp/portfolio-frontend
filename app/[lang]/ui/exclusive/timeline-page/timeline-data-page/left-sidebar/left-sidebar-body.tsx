"use client";

import { IoSchoolOutline } from "react-icons/io5";
import YearTimeline from "../../timeline/timeline-container/year-timeline";
import TimelineElement from "../../timeline/timeline-element";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import {
  getTimelineElementDictKey,
  getYears,
  ITimelineDatas,
  ITimelineElement,
} from "@/types/ITimelineData";
import { ILang } from "@/types/ILang";

const LeftSidebarBody = ({
  timelineDict,
  timelineDatas,
  lang,
  selectedElement,
}: {
  timelineDict: IDictionary["Timeline"];
  timelineDatas: ITimelineDatas;
  lang: ILang;
  selectedElement: ITimelineElement;
}) => {
  const { years, startDate } = getYears(timelineDatas);
  return (
    <div className="flex flex-row justify-center">
      <YearTimeline years={years} hidden />
      <TimelineElement
        Icon={IoSchoolOutline}
        bgThemeColor="bg-chart-1"
        borderThemeColor="border-chart-1"
        elementTitle={timelineDict[getTimelineElementDictKey(selectedElement)]}
        datas={timelineDatas[selectedElement]}
        startYear={startDate.getFullYear()}
        timelineElement={selectedElement}
        lang={lang}
        years={years}
        timelineDict={timelineDict}
        withCombobox
        replaceCurrentPath
      />
    </div>
  );
};

export default LeftSidebarBody;
