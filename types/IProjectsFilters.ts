import { z } from "zod/v4";

const ZProjectsFilters = z.object({
  programmingLanguages: z.array(z.string()),
  frameworks: z.array(z.string()),
  platforms: z.array(z.string()),
});

type IProjectsFilters = z.infer<typeof ZProjectsFilters>;

export type { IProjectsFilters };
export { ZProjectsFilters };
