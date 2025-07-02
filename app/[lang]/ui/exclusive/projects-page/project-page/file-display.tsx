import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Content from "./file-display/content";
import RightTocSidebar from "../../../shared/right-toc-sidebar";
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
  pathname,
  lang,
  htmlMarkdownContentDict,
  rightTocSidebarDict,
}: {
  repoId: string;
  filePath: string | undefined;
  sha: string;
  urlSearchParams: URLSearchParams;
  pathname: string;
  lang: ILang;
  htmlMarkdownContentDict: IDictionary["shared"]["HtmlMarkdownContent"];
  rightTocSidebarDict: IDictionary["shared"]["RightTocSidebar"];
}) => {
  if (!filePath) {
    return <FileDisplaySkeleton rightTocSidebarDict={rightTocSidebarDict} />;
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
      <PageContainer className="flex flex-grow justify-center">
        <Content
          fileContent={fileContent}
          htmlMarkdownContentDict={htmlMarkdownContentDict}
          filePath={filePath}
          repoId={repoId}
          sha={sha}
          urlSearchParams={urlSearchParams}
          pathname={pathname}
          lang={lang}
        />
      </PageContainer>
      <SidebarTrigger side="right" />
      <RightTocSidebar
        rightTocSidebarDict={rightTocSidebarDict}
        tableOfContents={fileContent.tableOfContents}
      />
    </SidebarProvider>
  );
};

export default FileDisplay;
