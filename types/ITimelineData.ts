import { z } from "zod/v4";
import { ZELangs } from "./ILang";
import { JSX } from "react";

const ZETimelineElements = z.enum(["studies", "experiences", "projects"]);

type ITimelineElement = z.infer<typeof ZETimelineElements>;

type ICapitalizedTimelineElements = {
  [K in ITimelineElement]: Capitalize<K>;
}[keyof typeof ZETimelineElements.enum];

const getTimelineElementDictKey = (
  timelineElement: ITimelineElement
): Capitalize<typeof timelineElement> => {
  return (timelineElement.charAt(0).toUpperCase() +
    timelineElement.slice(1)) as Capitalize<typeof timelineElement>;
};

const getTimelineElementsDictKeys = (): ICapitalizedTimelineElements[] => {
  return ZETimelineElements.options.map((element) =>
    getTimelineElementDictKey(element)
  );
};

const ZTimelineData = z.object({
  _id: z.string(),
  title: z.record(ZELangs, z.string()),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  description: z.record(ZELangs, z.string()),
  type: ZETimelineElements,
});

type ITimelineData = z.infer<typeof ZTimelineData>;

const ZTimelineStudiesData = z.object({
  ...ZTimelineData.shape,
  establishement: z.string(),
  place: z.string().optional(),
  type: z.literal(ZETimelineElements.enum.studies),
});

type ITimelineStudiesData = z.infer<typeof ZTimelineStudiesData>;

const ZTimelineExperiencesData = z.object({
  ...ZTimelineData.shape,
  enterprise: z.string().optional(),
  place: z.string().optional(),
  type: z.literal(ZETimelineElements.enum.experiences),
});

type ITimelineExperiencesData = z.infer<typeof ZTimelineExperiencesData>;

const ZTimelineProjectsData = z.object({
  ...ZTimelineData.shape,
  technologies: z.string(),
  status: z.object({
    [ZELangs.enum.EN]: z.enum([
      "Creation in progress",
      "Update in progress",
      "Paused",
      "Completed",
    ]),
    [ZELangs.enum.FR]: z.enum([
      "En cours de création",
      "Mise à jour en cours",
      "En pause",
      "Terminé",
    ]),
  }),
  type: z.literal(ZETimelineElements.enum.projects),
});

type ITimelineProjectsData = z.infer<typeof ZTimelineProjectsData>;

const ZTimelineDatas = z.object({
  [ZETimelineElements.enum.experiences]: z.array(ZTimelineExperiencesData),
  [ZETimelineElements.enum.projects]: z.array(ZTimelineProjectsData),
  [ZETimelineElements.enum.studies]: z.array(ZTimelineStudiesData),
});

type ITimelineDatas = z.infer<typeof ZTimelineDatas>;

type IDispatchedTimelineDatas<N extends number> = {
  [T in `timeline${N}`]: {
    fromTopPx: number;
    heightPx: number;
    jsxElement: JSX.Element;
  }[];
};

const createDispatchedTimelineDatas = <N extends number>(
  numbers: N[]
): IDispatchedTimelineDatas<N> => {
  const createTimelineEntries = () => {
    return numbers.reduce((acc, number) => {
      acc[`timeline${number}`] = [];
      return acc;
    }, {} as IDispatchedTimelineDatas<N>);
  };

  return createTimelineEntries();
};

const selectTimeline = <N extends number>(
  dispatchedTimelineDatas: IDispatchedTimelineDatas<N>,
  fromTopPx: number,
  heightPx: number
): `timeline${N}` | undefined => {
  const timelines = Object.keys(
    dispatchedTimelineDatas
  ) as (keyof IDispatchedTimelineDatas<N>)[];
  const ascendingTimelines = timelines.sort((a, b) => {
    const numberA = Number(a.replace("timeline", ""));
    const numberB = Number(b.replace("timeline", ""));
    return numberA - numberB;
  });
  for (const timeline of ascendingTimelines) {
    const dispatchedForTimeline = dispatchedTimelineDatas[timeline];
    const hasEnoughSpace = dispatchedForTimeline.every((value) => {
      const newElementEnd = fromTopPx + heightPx;
      const existingElementEnd = value.fromTopPx + value.heightPx;
      return (
        newElementEnd <= value.fromTopPx || fromTopPx >= existingElementEnd
      );
    });
    if (hasEnoughSpace) {
      return timeline;
    }
  }
  return undefined;
};

const getYears = (timelineDatas: ITimelineDatas) => {
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
  return { years, startDate, endDate };
};

const CHART_COLORS = {
  bg: [
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
  ] as const,
  border: [
    "border-chart-1",
    "border-chart-2",
    "border-chart-3",
    "border-chart-4",
    "border-chart-5",
  ] as const,
};

type IBgChartClass = (typeof CHART_COLORS.bg)[number];
type IBorderChartClass = (typeof CHART_COLORS.border)[number];

const timelineColorMapping = ZETimelineElements.options.reduce(
  (acc, option, index) => {
    if (index >= CHART_COLORS.bg.length) {
      throw new Error(
        "There are more elements in ZETimelineElements than available chart colors."
      );
    }
    acc[option] = {
      bgThemeColor: CHART_COLORS.bg[index],
      borderThemeColor: CHART_COLORS.border[index],
    };
    return acc;
  },
  {} as Record<
    ITimelineElement,
    {
      bgThemeColor: IBgChartClass;
      borderThemeColor: IBorderChartClass;
    }
  >
);

export type {
  ITimelineData,
  ITimelineElement,
  ITimelineDatas,
  ITimelineProjectsData,
  ITimelineExperiencesData,
  ITimelineStudiesData,
  IDispatchedTimelineDatas,
  ICapitalizedTimelineElements,
};
export {
  ZTimelineData,
  ZETimelineElements,
  ZTimelineDatas,
  ZTimelineExperiencesData,
  ZTimelineProjectsData,
  ZTimelineStudiesData,
  createDispatchedTimelineDatas,
  selectTimeline,
  getTimelineElementsDictKeys,
  getTimelineElementDictKey,
  getYears,
  timelineColorMapping,
};
