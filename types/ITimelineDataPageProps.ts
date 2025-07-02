import { ILang } from "./ILang";

enum ETimelineDataPageSearchParamsKeys {}

type ISearchParamsKeysType = `${ETimelineDataPageSearchParamsKeys}`;

interface ITimelineDataPageProps {
  params: Promise<{ id: string; lang: ILang }>;
  searchParams: Promise<Partial<Record<ISearchParamsKeysType, string>>>;
}

export default ITimelineDataPageProps;
export { ETimelineDataPageSearchParamsKeys };
