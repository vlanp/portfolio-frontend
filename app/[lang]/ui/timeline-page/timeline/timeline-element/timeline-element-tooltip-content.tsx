import { formatDate, formatDateRange } from "@/lib/utils";
import { ILang } from "@/types/ILang";
import {
  ITimelineExperiencesData,
  ITimelineProjectsData,
  ITimelineStudiesData,
} from "@/types/ITimelineData";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";

const TimelineElementTooltipContent = ({
  data,
  lang,
}: {
  data: ITimelineExperiencesData | ITimelineProjectsData | ITimelineStudiesData;
  lang: ILang;
}) => {
  return (
    <div className="max-w-[300px]">
      <h5>{data.title[lang]}</h5>

      {data.type === "studies" && <h6>{data.establishement}</h6>}

      {data.type === "experiences" && data.enterprise && (
        <h6>{data.enterprise}</h6>
      )}

      {data.type === "projects" && <p>{data.technologies}</p>}

      <p className="flex items-center">
        <IoCalendarClearOutline className="mr-1" />
        <span>
          {data.endDate
            ? formatDateRange(data.startDate, data.endDate, lang)
            : formatDate(data.startDate, lang)}
        </span>
        {data.type === "projects" && (
          <span className="ml-2 font-semibold">{data.status[lang]}</span>
        )}
      </p>

      {(data.type === "experiences" || data.type === "studies") &&
        data.place && (
          <p className="flex items-center">
            <LuMapPin className="mr-1" />
            <span>{data.place}</span>
          </p>
        )}

      <p>{data.description[lang]}</p>
    </div>
  );
};

export default TimelineElementTooltipContent;
