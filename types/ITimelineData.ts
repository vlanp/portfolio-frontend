import { z } from "zod/v4";
import { ZELang } from "./ILang";
import { JSX } from "react";

const ZETimelineElements = z.enum(["studies", "experiences", "projects"]);

type ITimelineElement = z.infer<typeof ZETimelineElements>;

const ZTimelineData = z.strictObject({
  _id: z.string(),
  title: z.record(ZELang, z.string()),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.record(ZELang, z.string()),
});

type ITimelineData = z.infer<typeof ZTimelineData>;

const ZTimelineStudiesData = z.strictObject({
  ...ZTimelineData.shape,
  establishement: z.string(),
  place: z.string().optional(),
});

type ITimelineStudiesData = z.infer<typeof ZTimelineStudiesData>;

const ZTimelineExperiencesData = z.strictObject({
  ...ZTimelineData.shape,
  enterprise: z.string().optional(),
  place: z.string().optional(),
});

type ITimelineExperiencesData = z.infer<typeof ZTimelineExperiencesData>;

const ZTimelineProjectsData = z.strictObject({
  ...ZTimelineData.shape,
  technologies: z.string(),
  status: z.object({
    [ZELang.enum.EN]: z.enum([
      "Creation in progress",
      "Update in progress",
      "Paused",
      "Completed",
    ]),
    [ZELang.enum.FR]: z.enum([
      "En cours de création",
      "Mise à jour en cours",
      "En pause",
      "Terminé",
    ]),
  }),
});

type ITimelinProjectsData = z.infer<typeof ZTimelineProjectsData>;

const ZTimelineDatas = z.strictObject({
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

export type {
  ITimelineData,
  ITimelineElement,
  ITimelineDatas,
  ITimelinProjectsData,
  ITimelineExperiencesData,
  ITimelineStudiesData,
  IDispatchedTimelineDatas,
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
};
