import IFileContent from "@/types/IFileContent";
import IProjectPageProps from "@/types/IProjectPageProps";
import { getDictionary, IDictionary } from "../../dictionaries";
import axios from "axios";
import { IFile, ITagContent } from "@/types/ITagContent";
import checkedEnv from "@/lib/checkEnv";
import Link from "next/link";
import { constructNewUrl } from "@/lib/utils";
import { headers } from "next/headers";

const HtmlMarkdownContent = async ({
  fileContent,
  lang,
  filePath,
  repoId,
  sha,
  searchParams,
}: {
  fileContent: IFileContent;
  lang: Awaited<IProjectPageProps["params"]>["lang"];
  filePath: string;
  repoId: string;
  sha: string;
  searchParams: IProjectPageProps["searchParams"];
}) => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }
  const awaitedSearchParams = await searchParams;
  const dict: IDictionary = await getDictionary(lang);
  const tagResponse = await axios.get<ITagContent>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAG_URL.replace("{repoid}", repoId).replace(
        "{sha}",
        sha
      )
  );
  const orderedFiles = tagResponse.data.orderedDirs.flatMap(
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
        <p className="text-muted-foreground font-bold text-lg">
          {fileContent.matterContent.description}
        </p>
        <div className="border-t-1 w-full mb-4" />
        <div dangerouslySetInnerHTML={{ __html: fileContent.htmlContent }} />
        <div className="flex flex-row justify-between w-full m-20">
          <div className="max-w-60">
            {previousFile && (
              <>
                <p className="text-muted-foreground font-bold text-sm tracking-wider">
                  {dict.HtmlMarkdownContent.Previous.toUpperCase()}
                </p>
                <Link
                  className="text-xl"
                  href={constructNewUrl(
                    "filePath",
                    previousFile.file.path,
                    pathname,
                    awaitedSearchParams
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
                  {dict.HtmlMarkdownContent.Next.toUpperCase()}
                </p>
                <Link
                  className="text-xl"
                  href={constructNewUrl(
                    "filePath",
                    nextFile.file.path,
                    pathname,
                    awaitedSearchParams
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
