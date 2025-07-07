import { ILang } from "./ILang";

enum EArticlesPageSearchParamsKeys {}

type ISearchParamsKeysType = `${EArticlesPageSearchParamsKeys}`;

interface IArticlesPageProps {
  params: Promise<{ lang: ILang }>;
  searchParams: Promise<Partial<Record<ISearchParamsKeysType, string>>>;
}

export default IArticlesPageProps;
export { EArticlesPageSearchParamsKeys };
