import TimelineContainer from "./timeline/timeline-container";
import TimelineElement from "./timeline/timeline-element";
import { IoSchoolOutline, IoHammerOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { ITimelineDatas } from "@/types/ITimelineData";
import { IDictionary } from "../../dictionaries/generated";

const Timeline = ({
  timelineDatas,
  timelineDict,
}: {
  timelineDatas: ITimelineDatas;
  timelineDict: IDictionary["Timeline"];
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

  return (
    <TimelineContainer
      startYear={startDate.getFullYear()}
      endYear={endDate.getFullYear()}
    >
      <div className="flex flex-row flex-1 gap-2">
        <TimelineElement
          Icon={IoSchoolOutline}
          bgThemeColor="bg-chart-1"
          elementTitle={timelineDict.Studies}
          datas={timelineDatas.studies}
          startYear={startDate.getFullYear()}
        />
        <TimelineElement
          Icon={HiOutlineBriefcase}
          bgThemeColor="bg-chart-2"
          elementTitle={timelineDict.Experiences}
          datas={timelineDatas.experiences}
          startYear={startDate.getFullYear()}
        />
        <TimelineElement
          Icon={IoHammerOutline}
          bgThemeColor="bg-chart-4"
          elementTitle={timelineDict.Projects}
          datas={timelineDatas.projects}
          startYear={startDate.getFullYear()}
        />
      </div>
    </TimelineContainer>
  );
};

export default Timeline;
