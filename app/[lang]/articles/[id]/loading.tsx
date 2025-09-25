import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { extraLargeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import PageContainer from "../../ui/shared/page-container";
import HtmlMarkdownContentSkeleton from "../../ui/shared/html-markdown-content-skeleton";
import RightTocSidebarSkeleton from "../../ui/shared/right-toc-sidebar-skeleton";

const Loading = async () => {
  return (
    <SidebarProvider breakpoint={mobileBreakpoint}>
      <SidebarProvider breakpoint={extraLargeBreakpoint}>
        <PageContainer className="flex grow justify-center">
          <HtmlMarkdownContentSkeleton />
        </PageContainer>
        <SidebarTrigger side="right" />
        <RightTocSidebarSkeleton />
      </SidebarProvider>
    </SidebarProvider>
  );
};

export default Loading;
