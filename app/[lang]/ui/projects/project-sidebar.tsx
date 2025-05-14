import { Sidebar } from "@/components/ui/sidebar";
import { IProjectsReposKeys } from "@/projects/projects-repos";
import { Suspense } from "react";
import ProjectSidebarSkeleton from "./project-sidebar/project-sidebar-skeleton";
import ProjectSidebarContent from "./project-sidebar/projet-sidebar-content";

const ProjectSidebar = ({
  name,
  searchParams,
}: {
  name: IProjectsReposKeys;
  searchParams?: Promise<{
    tag?: string;
  }>;
}) => {
  // const project = await getProject(name);
  // const categories = project.map((it) => it.data.title);
  // console.log(categories);
  // getTree(name, "312a7076f9dc9071c5aa89bc6809a776255d57a9");

  return (
    <Sidebar variant="floating" className="top-header-height">
      <Suspense fallback={<ProjectSidebarSkeleton />}>
        <ProjectSidebarContent name={name} searchParams={searchParams} />
      </Suspense>
    </Sidebar>
  );
};

export default ProjectSidebar;
