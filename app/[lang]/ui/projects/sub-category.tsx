"use client";

import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { IFile } from "@/types/ITagContent";

const SubCategory = ({ orderedFile }: { orderedFile: IFile }) => {
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>
          {orderedFile.content.matterContent.title}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
};

export default SubCategory;
