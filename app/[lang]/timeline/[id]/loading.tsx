import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { extraLargeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import LeftSidebarSkeleton from "../../ui/exclusive/timeline-page/timeline-data-page/left-sidebar-skeleton";
import PageContainer from "../../ui/shared/page-container";
import HtmlMarkdownContentSkeleton from "../../ui/shared/html-markdown-content-skeleton";
import RightTocSidebarSkeleton from "../../ui/shared/right-toc-sidebar-skeleton";

const Loading = async () => {
  return (
    <SidebarProvider breakpoint={mobileBreakpoint}>
      <LeftSidebarSkeleton />
      <SidebarTrigger />
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
