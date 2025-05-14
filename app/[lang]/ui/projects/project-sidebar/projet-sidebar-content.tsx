import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { getTags } from "@/lib/test";
import { IProjectsReposKeys } from "@/projects/projects-repos";
import ProjectSidebarGroupContent from "./project-sidebar-group-content";
import ProjectSidebarMenu from "./project-sidebar-menu";
import { Suspense } from "react";
import ProjectSidebarSkeleton from "./project-sidebar-skeleton";

const ProjectSidebarContent = async ({
  name,
  searchParams,
}: {
  name: IProjectsReposKeys;
  searchParams?: Promise<{
    tag?: string;
  }>;
}) => {
  const tags = await getTags(name);
  const selectedTag = await searchParams?.then((params) => params.tag);
  const sha = tags.data.find((tag) => tag.name === selectedTag)?.commit.sha;
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{name}</SidebarGroupLabel>
        <ProjectSidebarGroupContent tags={tags}>
          {sha && (
            <Suspense fallback={<ProjectSidebarSkeleton />}>
              <ProjectSidebarMenu sha={sha} />
            </Suspense>
          )}
        </ProjectSidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default ProjectSidebarContent;
