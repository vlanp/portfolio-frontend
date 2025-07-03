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

const getZFileContentWithExtraData = <
  ZMatterContent extends z.ZodType = z.ZodType,
  ZExtraData extends z.ZodType = z.ZodType,
>(
  zMatterContent: ZMatterContent,
  zExtraData: ZExtraData
) => {
  return z.object({
    ...getZFileContent(zMatterContent).shape,
    extraData: zExtraData,
  });
};

type IFileContentWithExtraData<MatterContent, ExtraData> = z.infer<
  ReturnType<typeof getZFileContentWithExtraData>
> & {
  matterContent: MatterContent;
  extraData: ExtraData;
};

export { getZFileContent, getZFileContentWithExtraData };
export type { IFileContent, IFileContentWithExtraData };
