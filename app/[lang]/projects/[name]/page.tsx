import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectSidebar from "../../ui/projects/project-sidebar";
import { IProjectsReposKeys } from "@/projects/projects-repos";

const ProjectPage = async ({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: Promise<{ name: IProjectsReposKeys }>;
  searchParams?: Promise<{
    tag?: string;
  }>;
}) => {
  const name = (await params).name;
  return (
    <SidebarProvider>
      <ProjectSidebar name={name} searchParams={searchParams} />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
};

export default ProjectPage;
