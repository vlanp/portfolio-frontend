// Auto-generated file. Do not edit manually.

import { z } from "zod/v4";

interface ISearchPathsMapping {
  en: {
    NAME: "name";
    REPOS_DESCRIPTION_EN: "repos.description.en";
    REPOS_DISPLAYNAME_NAME: "repos.displayName.name";
  };
  fr: {
    NAME: "name";
    REPOS_DESCRIPTION_FR: "repos.description.fr";
    REPOS_DISPLAYNAME_NAME: "repos.displayName.name";
  };
}

const searchPathsMapping: ISearchPathsMapping = {
  en: {
    NAME: "name",
    REPOS_DESCRIPTION_EN: "repos.description.en",
    REPOS_DISPLAYNAME_NAME: "repos.displayName.name",
  },
  fr: {
    NAME: "name",
    REPOS_DESCRIPTION_FR: "repos.description.fr",
    REPOS_DISPLAYNAME_NAME: "repos.displayName.name",
  },
};

const ZESearchPaths = z.union([
  z.enum(["name", "repos.description.en", "repos.displayName.name"]),
  z.enum(["name", "repos.description.fr", "repos.displayName.name"]),
]);

type ISearchPaths = z.infer<typeof ZESearchPaths>;

export type { ISearchPathsMapping, ISearchPaths };
export { searchPathsMapping, ZESearchPaths };
