import { ILang } from "./ILang";

enum EProjectPageSearchParamsKeys {
  SHA = "sha",
  FILE_PATH = "filePath",
}

type ISearchParamsKeysType = `${EProjectPageSearchParamsKeys}`;

interface IProjectPageProps {
  params: Promise<{ repoId: string; lang: ILang }>;
  searchParams: Promise<Partial<Record<ISearchParamsKeysType, string>>>;
}

export default IProjectPageProps;
export { EProjectPageSearchParamsKeys };
