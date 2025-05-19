import IDocToC from "./IDocToc";
import IFrontMatterContent from "./IFrontMatterContent";

interface IFileContent {
  htmlContent: string;
  matterContent: IFrontMatterContent;
  tableOfContents: IDocToC[];
}

export default IFileContent;
