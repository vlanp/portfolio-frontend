import { z } from "zod/v4";

const ZFrontMatterContent = z.object({
  title: z.string(),
  description: z.string().optional(),
  nav: z.number().optional(),
  id: z.string().optional(),
});

type IFrontMatterContent = z.infer<typeof ZFrontMatterContent>;

export { ZFrontMatterContent };
export default IFrontMatterContent;
