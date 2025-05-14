import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getTree } from "@/lib/test";
import { formatPathToDisplayName } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

const ProjectSidebarMenu = async ({ sha }: { sha: string }) => {
  const docsTree = await getTree("Zustand", sha);

  const dirs = docsTree.data.tree.filter((item) => item.type === "tree");

  const files = docsTree.data.tree.filter(
    (item) => item.type === "blob" && item.path.endsWith(".md")
  );

  return dirs.map((dir) => (
    <Collapsible key={dir.path}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronDown />
            {formatPathToDisplayName(dir.path)}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {files
          .filter((file) => file.path.startsWith(dir.path))
          .map((file) => (
            <CollapsibleContent key={file.path}>
              <SidebarMenuSub>
                <SidebarMenuSubItem className="mb-2">
                  <SidebarMenuSubButton className="h-fit">
                    {formatPathToDisplayName(file.path)}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          ))}
      </SidebarMenuItem>
    </Collapsible>
  ));
};

export default ProjectSidebarMenu;
