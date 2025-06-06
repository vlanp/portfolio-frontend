import { ILang } from "./ILang";

const generateFrameworkParamKey = (programmingLanguage: string) => {
  return `fw_${programmingLanguage}` as const;
};

enum EProjectsPageSearchParamsKeys {
  PROGRAMMING_LANGUAGES = "pl",
  PLATFORMS = "pf",
  SEARCH = "s",
  FILTERS_BEHAVIOR = "fb",
}

type ISearchParamsKeysType =
  | `${EProjectsPageSearchParamsKeys}`
  | ReturnType<typeof generateFrameworkParamKey>;

interface IProjectsPageProps {
  params: Promise<{ lang: ILang }>;
  searchParams: Promise<
    Partial<Record<ISearchParamsKeysType, string | string[]>>
  >;
}

export default IProjectsPageProps;
export { EProjectsPageSearchParamsKeys, generateFrameworkParamKey };
