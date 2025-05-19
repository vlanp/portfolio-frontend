"use client";

import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { setSPInCC } from "@/lib/utils";
import { IFile } from "@/types/ITagContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SubCategory = ({ orderedFile }: { orderedFile: IFile }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedFilePath = searchParams.get("filePath");
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={() =>
            setSPInCC(
              "filePath",
              orderedFile.file.path,
              searchParams,
              router,
              pathname
            )
          }
          isActive={selectedFilePath === orderedFile.file.path}
        >
          {orderedFile.matterContent.title}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
};

export default SubCategory;
