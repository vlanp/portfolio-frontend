import { z } from "zod/v4";
import { ZDocToc } from "./IDocToc";

const getZFileContent = <ZMatterContent extends z.ZodType = z.ZodType>(
  zMatterContent: ZMatterContent
) => {
  return z.object({
    htmlContent: z.string(),
    matterContent: zMatterContent,
    tableOfContents: ZDocToc.array(),
  });
};

type IFileContent<MatterContent> = z.infer<
  ReturnType<typeof getZFileContent>
> & {
  matterContent: MatterContent;
};

export { getZFileContent };
export default IFileContent;
