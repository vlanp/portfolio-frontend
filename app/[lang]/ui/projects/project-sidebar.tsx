import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { headers } from "next/headers";
import ProjectSidebarGroupHeader from "./project-sidebar-group-header";
import ProjectSidebarGroupMenu from "./project-sidebar-group-menu";
import IProjectPageProps from "@/types/IProjectPageProps";
import { Suspense } from "react";
import ProjectSidebarGroupMenuSkeleton from "./project-sidebar-group-menu-skeleton";

const ProjectSidebar = async ({ params, searchParams }: IProjectPageProps) => {
  const awaitedSearchParams = await searchParams;
  const filePath = awaitedSearchParams.filePath;
  const { id } = await params;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }

  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <ProjectSidebarGroupHeader
            repoId={id}
            pathname={pathname}
            awaitedSearchParams={awaitedSearchParams}
          />
          <SidebarSeparator className="my-2" />
          <Suspense
            key={awaitedSearchParams.sha}
            fallback={<ProjectSidebarGroupMenuSkeleton />}
          >
            <ProjectSidebarGroupMenu
              repoId={id}
              pathname={pathname}
              awaitedSearchParams={awaitedSearchParams}
              filePath={filePath}
            />
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectSidebar;
