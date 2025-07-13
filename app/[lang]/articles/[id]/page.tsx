import checkedEnv from "@/lib/checkEnv";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import { getZFileContentWithExtraData } from "@/types/IFileContent";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import HtmlMarkdownContent from "../../ui/shared/html-markdown-content";
import { getDictionary } from "../../dictionaries";
import PageContainer from "../../ui/shared/page-container";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { extraLargeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import RightTocSidebar from "../../ui/shared/right-toc-sidebar";
import { ZArticle } from "@/types/IArticle";
import IArticlePageProps from "@/types/IArticlePageProps";

const ArticlePage = async ({ params }: IArticlePageProps) => {
  const awaitedParams = await params;
  const id = awaitedParams.id;
  const lang = awaitedParams.lang;
  const dict = await getDictionary(lang);
  // const articleDict = dict.Article;
  const htmlMarkdownContentDict = dict.shared.HtmlMarkdownContent;
  const rightTocSidebarDict = dict.shared.RightTocSidebar;
  // const awaitedSearchParams = await searchParams;
  // const urlSearchParams = new URLSearchParams(awaitedSearchParams);

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  if (!pathname) {
    throw new Error("No pathname found in headers");
  }

  const fileContentResponse = await axios
    .get<unknown>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_ARTICLES_MD_CONTENT.replace("{id}", id),
      { params: { lang } }
    )
    .catch((error: Error | AxiosError) => {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 400)
      ) {
        // TODO : Maybe use notfound()
        redirect(pathname.replace("/" + id, ""));
      } else {
        throw error;
      }
    });

  const fileContentParseResult = getZApiSuccessResponse(
    getZFileContentWithExtraData(z.unknown(), ZArticle)
  ).safeParse(fileContentResponse.data);

  if (!fileContentParseResult.success) {
    throw new Error(z.prettifyError(fileContentParseResult.error));
  }

  const fileContent = fileContentParseResult.data.data;

  return (
    <SidebarProvider breakpoint={mobileBreakpoint}>
      <SidebarProvider breakpoint={extraLargeBreakpoint}>
        <PageContainer className="flex grow justify-center">
          <HtmlMarkdownContent
            htmlContent={fileContent.htmlContent}
            htmlMarkdownContentDict={htmlMarkdownContentDict}
            title={fileContent.extraData.title[lang]}
          />
        </PageContainer>
        <SidebarTrigger side="right" />
        <RightTocSidebar
          rightTocSidebarDict={rightTocSidebarDict}
          tableOfContents={fileContent.tableOfContents}
        />
      </SidebarProvider>
    </SidebarProvider>
  );
};

export default ArticlePage;
