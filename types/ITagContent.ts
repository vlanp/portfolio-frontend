import IProjectFrontMatterContent from "./IProjectFrontMatterContent";
import type { Endpoints } from "@octokit/types";

export type IOctokitContentResponse =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];

export type IOctokitTagsResponse =
  Endpoints["GET /repos/{owner}/{repo}/tags"]["response"];

export type IOctokitTreeResponse =
  Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"];

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
  matterContent: IProjectFrontMatterContent;
}

export type { ITagContent, IDir, IFile };
