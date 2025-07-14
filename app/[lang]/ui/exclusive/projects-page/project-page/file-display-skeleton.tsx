import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HtmlMarkdownContentSkeleton from "../../../shared/html-markdown-content-skeleton";
import { extraLargeBreakpoint } from "@/types/IBreakpoints";
import RightTocSidebarSkeleton from "../../../shared/right-toc-sidebar-skeleton";

const FileDisplaySkeleton = () => {
  return (
    <>
      <section className="flex flex-1">
        <HtmlMarkdownContentSkeleton />
      </section>
      <SidebarProvider
        breakpoint={extraLargeBreakpoint}
        className="relative w-fit"
      >
        <SidebarTrigger side="right" />
        <RightTocSidebarSkeleton />
      </SidebarProvider>
    </>
  );
};

export default FileDisplaySkeleton;
