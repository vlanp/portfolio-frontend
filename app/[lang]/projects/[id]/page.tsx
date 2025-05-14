import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectSidebar from "../../ui/projects/project-sidebar";

const ProjectPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    sha?: string;
  }>;
}) => {
  return (
    <SidebarProvider>
      <ProjectSidebar params={params} searchParams={searchParams} />
      <SidebarTrigger />
    </SidebarProvider>
  );
};

export default ProjectPage;
