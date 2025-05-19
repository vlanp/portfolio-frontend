import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";

const ProjectRightSidebar = () => {
  return (
    <Sidebar side="right" variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full"></SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectRightSidebar;
