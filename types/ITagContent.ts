import type { Octokit as OctokitType } from "octokit";

type IOctokitTagsResponse = Awaited<
  ReturnType<OctokitType["rest"]["repos"]["listTags"]>
>;

type IOctokitTreeResponse = Awaited<
  ReturnType<OctokitType["rest"]["git"]["getTree"]>
>;

interface IContent {
  htmlContent: string;
  matterContent: {
    title: string;
    description: string;
    nav: number;
  };
}

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
  content: IContent;
}

export type { ITagContent, IDir, IFile };
