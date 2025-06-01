import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HtmlMarkdownContent from "./file-display/html-markdown-content";
import RightSidebar from "./file-display/right-sidebar";
import axios from "axios";
import IFileContent from "@/types/IFileContent";
import checkedEnv from "@/lib/checkEnv";
import { extraLargeBreakpoint } from "@/types/IBreakpoints";
import { IDictionary } from "@/app/[lang]/dictionaries";
import FileDisplaySkeleton from "./file-display-skeleton";
import { ILang } from "@/types/ILang";
import { IApiSuccessResponse } from "@/types/IApiResponse";

const FileDisplay = async ({
  repoId,
  filePath,
  sha,
  urlSearchParams,
  projectDict,
  pathname,
  lang,
}: {
  repoId: string;
  filePath: string | undefined;
  sha: string;
  urlSearchParams: URLSearchParams;
  projectDict: IDictionary["Projects"]["Project"];
  pathname: string;
  lang: ILang;
}) => {
  if (!filePath) {
    return <FileDisplaySkeleton projectDict={projectDict} />;
  }

  const encodedFilepath = encodeURIComponent(filePath);
  const fileContent = (
    await axios.get<IApiSuccessResponse<IFileContent>>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_FILE_CONTENT_URL.replace(
          "{repoid}",
          repoId
        ).replace("{filepath}", encodedFilepath),
      { params: { ref: sha } }
    )
  ).data.data;

  return (
    <>
      <section className="flex flex-1">
        <HtmlMarkdownContent
          fileContent={fileContent}
          projectDict={projectDict}
          filePath={filePath}
          repoId={repoId}
          sha={sha}
          urlSearchParams={urlSearchParams}
          pathname={pathname}
          lang={lang}
        />
      </section>
      <SidebarProvider
        breakpoint={extraLargeBreakpoint}
        className="relative w-fit"
      >
        <SidebarTrigger side="right" />
        <RightSidebar
          projectDict={projectDict}
          tableOfContents={fileContent.tableOfContents}
        />
      </SidebarProvider>
    </>
  );
};

export default FileDisplay;
