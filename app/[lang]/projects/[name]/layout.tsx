import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectSidebar from "../../ui/projects/project-sidebar";
import { IProjectsReposKeys } from "@/projects/projects-repos";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ name: IProjectsReposKeys }>;
}) {
  const name = (await params).name;
  return (
    <SidebarProvider>
      <ProjectSidebar name={name} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
