import type { Octokit as OctokitType } from "octokit";
import IFrontMatterContent from "./IFrontMatterContent";

type IOctokitTagsResponse = Awaited<
  ReturnType<OctokitType["rest"]["repos"]["listTags"]>
>;

type IOctokitTreeResponse = Awaited<
  ReturnType<OctokitType["rest"]["git"]["getTree"]>
>;

interface ITagContent {
  orderedTags: IOctokitTagsResponse["data"];
  tag: IOctokitTagsResponse["data"][0];
  orderedDirs: IDir[];
}

interface IDir {
  dir: IOctokitTreeResponse["data"]["tree"][0];
  orderedFiles: IFile[];
}

interface IFile {
  file: IOctokitTreeResponse["data"]["tree"][0];
  matterContent: IFrontMatterContent;
}

export type { ITagContent, IDir, IFile };
