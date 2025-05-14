import IFrontMatterContent from "./IFrontMatterContent";

interface IFileContent {
  htmlContent: string;
  matterContent: IFrontMatterContent;
}

export default IFileContent;
