import { IFileContent } from "@/types/IFileContent";
import { EProjectPageSearchParamsKeys } from "@/types/IProjectPageProps";
import axios from "axios";
import { IFile, ITagContent } from "@/types/ITagContent";
import checkedEnv from "@/lib/checkEnv";
import { constructNewUrl } from "@/lib/utils";
import { ILang } from "@/types/ILang";
import { IApiSuccessResponse } from "@/types/IApiResponse";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import IProjectFrontMatterContent from "@/types/IProjectFrontMatterContent";
import HtmlMarkdownContent from "@/app/[lang]/ui/shared/html-markdown-content";

const Content = async ({
  fileContent,
  htmlMarkdownContentDict,
  filePath,
  repoId,
  sha,
  urlSearchParams,
  pathname,
  lang,
}: {
  fileContent: IFileContent<IProjectFrontMatterContent>;
  htmlMarkdownContentDict: IDictionary["shared"]["HtmlMarkdownContent"];
  filePath: string;
  repoId: string;
  sha: string;
  urlSearchParams: URLSearchParams;
  pathname: string;
  lang: ILang;
}) => {
  const tagContentResponse = await axios.get<IApiSuccessResponse<ITagContent>>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAG_URL.replace("{repoid}", repoId).replace(
        "{sha}",
        sha
      ),
    { params: { lang } }
  );
  const orderedFiles = tagContentResponse.data.data.orderedDirs.flatMap(
    (orderedDir) => orderedDir.orderedFiles
  );
  const numberOfFiles = orderedFiles.length;
  const currentIndex = orderedFiles.findIndex(
    (orderedFile) => orderedFile.file.path === filePath
  );
  let previousFile: IFile | undefined = undefined;
  let previousFileUrl: string | undefined = undefined;
  let nextFile: IFile | undefined = undefined;
  let nextFileUrl: string | undefined = undefined;
  if (currentIndex - 1 >= 0) {
    previousFile = orderedFiles[currentIndex - 1];
    previousFileUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.FILE_PATH,
      previousFile.file.path,
      pathname,
      urlSearchParams
    );
  }
  if (currentIndex !== -1 && currentIndex + 1 < numberOfFiles) {
    nextFile = orderedFiles[currentIndex + 1];
    nextFileUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.FILE_PATH,
      nextFile.file.path,
      pathname,
      urlSearchParams
    );
  }

  function fileTypescriptHelper<T extends string>(
    name: T,
    file?: IFile,
    fileUrl?: string
  ) {
    type FileKey = T;
    type UrlKey = `${T}Url`;

    if (file && fileUrl) {
      return {
        [name]: file,
        [`${name}Url`]: fileUrl,
      } as { [K in FileKey]: IFile } & { [K in UrlKey]: string };
    }

    if (!file && !fileUrl) {
      return {
        [name]: undefined,
        [`${name}Url`]: undefined,
      } as { [K in FileKey]: undefined } & { [K in UrlKey]: undefined };
    }

    throw new Error(`Both ${name} and ${name}Url must be consistently defined`);
  }

  const previous = fileTypescriptHelper(
    "previousFile",
    previousFile,
    previousFileUrl
  );
  const next = fileTypescriptHelper("nextFile", nextFile, nextFileUrl);

  return (
    <HtmlMarkdownContent
      htmlContent={fileContent.htmlContent}
      htmlMarkdownContentDict={htmlMarkdownContentDict}
      title={fileContent.matterContent.title}
      subTitle={fileContent.matterContent.description}
      {...previous}
      {...next}
    />
  );
};

export default Content;
