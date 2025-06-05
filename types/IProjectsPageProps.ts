import { ILang } from "./ILang";

enum EProjectsPageSearchParamsKeys {
  PROGRAMMING_LANGUAGES = "pl",
  FRAMEWORKS = "fw",
  PLATFORMS = "pf",
  SEARCH = "s",
  FILTERS_BEHAVIOR = "fb",
}

type ISearchParamsKeysType = `${EProjectsPageSearchParamsKeys}`;

interface IProjectsPageProps {
  params: Promise<{ lang: ILang }>;
  searchParams: Promise<Partial<Record<ISearchParamsKeysType, string>>>;
}

export default IProjectsPageProps;
export { EProjectsPageSearchParamsKeys };
