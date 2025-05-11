import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { getDictionary, IDictionary } from "../../dictionaries";

const ProjectSidebarError = async () => {
  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent className="flex flex-col items-center justify-center gap-4">
        <p>Unable to load the project</p>
        <Button
          variant="outline"
          className="w-3/4 self-center"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </SidebarContent>
    </Sidebar>
  );
};
export default ProjectSidebarError;
