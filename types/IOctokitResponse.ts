import type { Octokit as OctokitType } from "octokit";

export type IOctokitContentResponse = Awaited<
  ReturnType<OctokitType["rest"]["repos"]["getContent"]>
>;

export type IOctokitTagsResponse = Awaited<
  ReturnType<OctokitType["rest"]["repos"]["listTags"]>
>;

export type IOctokitTreeResponse = Awaited<
  ReturnType<OctokitType["rest"]["git"]["getTree"]>
>;
