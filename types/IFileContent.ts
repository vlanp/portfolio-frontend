import { z } from "zod/v4";
import { ZDocToc } from "./IDocToc";
import { ZFrontMatterContent } from "./IFrontMatterContent";

const ZFileContent = z.object({
  htmlContent: z.string(),
  matterContent: ZFrontMatterContent,
  tableOfContents: ZDocToc.array(),
});

type IFileContent = z.infer<typeof ZFileContent>;

export { ZFileContent };
export default IFileContent;
