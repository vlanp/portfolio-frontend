import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HtmlMarkdownContentSkeleton from "./file-display/html-markdown-content-skeleton";
import { extraLargeBreakpoint } from "@/types/IBreakpoints";
import RightSidebarSkeleton from "./file-display/right-sidebar-skeleton";
import { IDictionary } from "@/app/[lang]/dictionaries";

const FileDisplaySkeleton = ({
  projectDict,
}: {
  projectDict: IDictionary["Projects"]["Project"];
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
        <RightSidebarSkeleton projectDict={projectDict} />
      </SidebarProvider>
    </>
  );
};

export default FileDisplaySkeleton;
