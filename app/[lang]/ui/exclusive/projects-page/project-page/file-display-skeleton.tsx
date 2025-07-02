import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HtmlMarkdownContentSkeleton from "../../../shared/html-markdown-content-skeleton";
import { extraLargeBreakpoint } from "@/types/IBreakpoints";
import RightTocSidebarSkeleton from "../../../shared/right-toc-sidebar-skeleton";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";

const FileDisplaySkeleton = ({
  rightTocSidebarDict,
}: {
  rightTocSidebarDict: IDictionary["shared"]["RightTocSidebar"];
}) => {
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
        <RightTocSidebarSkeleton rightTocSidebarDict={rightTocSidebarDict} />
      </SidebarProvider>
    </>
  );
};

export default FileDisplaySkeleton;
