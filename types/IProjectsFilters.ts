import { z } from "zod/v4";

const ZAllProjectsFilters = z.object({
  programmingLanguages: z.array(
    z.object({
      name: z.string(),
      frameworks: z.array(z.string()),
    })
  ),
  platforms: z.array(z.string()),
});

type IAllProjectsFilters = z.infer<typeof ZAllProjectsFilters>;

const ZSelectedProjectsFilters = ZAllProjectsFilters.extend({
  search: z.string().optional(),
  filtersBehavior: z.literal(["union", "intersection"]).optional(),
});

type ISelectedProjectsFilters = z.infer<typeof ZSelectedProjectsFilters>;

export type { IAllProjectsFilters, ISelectedProjectsFilters };
export { ZAllProjectsFilters, ZSelectedProjectsFilters };
