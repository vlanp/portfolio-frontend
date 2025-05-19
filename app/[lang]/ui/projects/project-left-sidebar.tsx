import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { headers } from "next/headers";
import ProjectSidebarGroupHeader from "./left-sidebar/project-sidebar-group-header";
import ProjectSidebarGroupMenu from "./left-sidebar/project-sidebar-group-menu";
import IProjectPageProps from "@/types/IProjectPageProps";
import { Suspense } from "react";
import ProjectSidebarGroupMenuSkeleton from "./left-sidebar/project-sidebar-group-menu-skeleton";

const ProjectLeftSidebar = async ({
  params,
  searchParams,
}: IProjectPageProps) => {
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
          <SidebarSeparator />
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

export default ProjectLeftSidebar;
