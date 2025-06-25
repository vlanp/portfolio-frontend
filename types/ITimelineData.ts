import { z } from "zod/v4";
import { ZELang } from "./ILang";

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

export type {
  ITimelineData,
  ITimelineElement,
  ITimelineDatas,
  ITimelinProjectsData,
  ITimelineExperiencesData,
  ITimelineStudiesData,
};
export {
  ZTimelineData,
  ZETimelineElements,
  ZTimelineDatas,
  ZTimelineExperiencesData,
  ZTimelineProjectsData,
  ZTimelineStudiesData,
};
