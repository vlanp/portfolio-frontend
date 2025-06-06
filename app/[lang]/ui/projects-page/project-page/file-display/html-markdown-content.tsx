import IFileContent from "@/types/IFileContent";
import { EProjectPageSearchParamsKeys } from "@/types/IProjectPageProps";
import axios from "axios";
import { IFile, ITagContent } from "@/types/ITagContent";
import checkedEnv from "@/lib/checkEnv";
import Link from "next/link";
import { constructNewUrl } from "@/lib/utils";
import { ILang } from "@/types/ILang";
import { IApiSuccessResponse } from "@/types/IApiResponse";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";

const HtmlMarkdownContent = async ({
  fileContent,
  projectDict,
  filePath,
  repoId,
  sha,
  urlSearchParams,
  pathname,
  lang,
}: {
  fileContent: IFileContent;
  projectDict: IDictionary["Projects"]["Project"];
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
  let previousFile: IFile | null = null;
  let nextFile: IFile | null = null;
  if (currentIndex - 1 >= 0) {
    previousFile = orderedFiles[currentIndex - 1];
  }
  if (currentIndex !== -1 && currentIndex + 1 < numberOfFiles) {
    nextFile = orderedFiles[currentIndex + 1];
  }

  return (
    <section className="max-w-full flex flex-1 justify-center py-5">
      <div className="max-w-6xl flex-1 flex flex-col items-center px-4">
        <h1>{fileContent.matterContent.title}</h1>
        <p className="text-muted-foreground font-bold text-lg text-center">
          {fileContent.matterContent.description}
        </p>
        <div className="border-t-1 w-full mb-4" />
        <div dangerouslySetInnerHTML={{ __html: fileContent.htmlContent }} />
        <div className="flex flex-row justify-between w-full m-20">
          <div className="max-w-60">
            {previousFile && (
              <>
                <p className="text-muted-foreground font-bold text-sm tracking-wider">
                  {projectDict.HtmlMarkdownContent.Previous.toUpperCase()}
                </p>
                <Link
                  className="text-xl"
                  href={constructNewUrl(
                    EProjectPageSearchParamsKeys.FILE_PATH,
                    previousFile.file.path,
                    pathname,
                    urlSearchParams
                  )}
                >
                  {previousFile.matterContent.title}
                </Link>
              </>
            )}
          </div>
          <div className="max-w-60">
            {nextFile && (
              <>
                <p className="text-muted-foreground font-bold text-sm tracking-wider">
                  {projectDict.HtmlMarkdownContent.Next.toUpperCase()}
                </p>
                <Link
                  className="text-xl"
                  href={constructNewUrl(
                    EProjectPageSearchParamsKeys.FILE_PATH,
                    nextFile.file.path,
                    pathname,
                    urlSearchParams
                  )}
                >
                  {nextFile.matterContent.title}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HtmlMarkdownContent;
