import { ILang } from "./ILang";

const frameworkParamKeyPrefix = "fw_";

const generateFrameworkParamKey = (programmingLanguage: string) => {
  return `${frameworkParamKeyPrefix}${programmingLanguage}` as const;
};

const retrieveProgrammingLanguageFromFrameworkParamKey = (
  frameworkParamKey: string
): string | null => {
  if (frameworkParamKey.includes(frameworkParamKeyPrefix)) {
    return frameworkParamKey.replace(frameworkParamKeyPrefix, "");
  }
  return null;
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
export {
  EProjectsPageSearchParamsKeys,
  generateFrameworkParamKey,
  retrieveProgrammingLanguageFromFrameworkParamKey,
};
