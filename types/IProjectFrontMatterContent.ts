import { z } from "zod/v4";

const ZProjectFrontMatterContent = z.object({
  title: z.string(),
  description: z.string().optional(),
  nav: z.number().optional(),
  id: z.string().optional(),
});

type IProjectFrontMatterContent = z.infer<typeof ZProjectFrontMatterContent>;

export { ZProjectFrontMatterContent };
export default IProjectFrontMatterContent;
