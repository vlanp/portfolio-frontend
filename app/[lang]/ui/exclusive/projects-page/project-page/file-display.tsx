import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HtmlMarkdownContent from "./file-display/html-markdown-content";
import RightSidebar from "./file-display/right-sidebar";
import axios from "axios";
import { getZFileContent } from "@/types/IFileContent";
import checkedEnv from "@/lib/checkEnv";
import { extraLargeBreakpoint } from "@/types/IBreakpoints";
import FileDisplaySkeleton from "./file-display-skeleton";
import { ILang } from "@/types/ILang";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import z from "zod/v4";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import PageContainer from "../../../shared/page-container";
import { ZProjectFrontMatterContent } from "@/types/IProjectFrontMatterContent";

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
  const fileContentResponse = await axios.get<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_FILE_CONTENT_URL.replace(
        "{repoid}",
        repoId
      ).replace("{filepath}", encodedFilepath),
    { params: { ref: sha } }
  );

  const fileContentParseResult = getZApiSuccessResponse(
    getZFileContent(ZProjectFrontMatterContent)
  ).safeParse(fileContentResponse.data);

  if (!fileContentParseResult.success) {
    throw new Error(z.prettifyError(fileContentParseResult.error));
  }

  const fileContent = fileContentParseResult.data.data;

  return (
    <SidebarProvider breakpoint={extraLargeBreakpoint}>
      <PageContainer className="flex-1">
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
      </PageContainer>
      <SidebarTrigger side="right" />
      <RightSidebar
        projectDict={projectDict}
        tableOfContents={fileContent.tableOfContents}
      />
    </SidebarProvider>
  );
};

export default FileDisplay;
