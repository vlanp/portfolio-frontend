import { ILang } from "./ILang";

enum EArticlePageSearchParamsKeys {}

type ISearchParamsKeysType = `${EArticlePageSearchParamsKeys}`;

interface IArticlePageProps {
  params: Promise<{ id: string; lang: ILang }>;
  searchParams: Promise<Partial<Record<ISearchParamsKeysType, string>>>;
}

export default IArticlePageProps;
export { EArticlePageSearchParamsKeys };
