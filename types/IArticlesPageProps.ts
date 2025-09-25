import { ILang } from "./ILang";

enum EArticlesPageSearchParamsKeys {
  FILTERS = "f",
  EXPANDED = "e",
  PAGE = "p",
}

type ISearchParamsKeysType = `${EArticlesPageSearchParamsKeys}`;

interface IArticlesPageProps {
  params: Promise<{ lang: ILang }>;
  searchParams: Promise<
    Partial<Record<ISearchParamsKeysType, string | string[]>>
  >;
}

export default IArticlesPageProps;
export { EArticlesPageSearchParamsKeys };
