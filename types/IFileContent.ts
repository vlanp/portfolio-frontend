import { z } from "zod/v4";
import { ZDocToc } from "./IDocToc";
import { ZELangs } from "./ILang";

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

const getZFileContentWithTitle = <ZMatterContent extends z.ZodType = z.ZodType>(
  zMatterContent: ZMatterContent
) => {
  return z.object({
    ...getZFileContent(zMatterContent).shape,
    title: z.record(ZELangs, z.string()),
  });
};

type IFileContentWithTitle<MatterContent> = z.infer<
  ReturnType<typeof getZFileContentWithTitle>
> & {
  matterContent: MatterContent;
};

export { getZFileContent, getZFileContentWithTitle };
export type { IFileContent, IFileContentWithTitle };
