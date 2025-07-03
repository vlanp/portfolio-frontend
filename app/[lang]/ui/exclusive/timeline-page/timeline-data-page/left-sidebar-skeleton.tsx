import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import TimelineElementSkeleton from "../timeline/timeline-element-skeleton";

const LeftSidebarSkeleton = () => {
  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupContent className="gap-1 flex-1">
            <SidebarMenu className="min-h-full">
              <div className="flex flex-row justify-center grow">
                <TimelineElementSkeleton />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftSidebarSkeleton;
