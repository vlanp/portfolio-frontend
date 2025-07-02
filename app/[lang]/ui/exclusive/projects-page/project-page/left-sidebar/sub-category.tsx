"use client";

import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { constructNewUrl } from "@/lib/utils";
import { EProjectPageSearchParamsKeys } from "@/types/IProjectPageProps";
import { IFile } from "@/types/ITagContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SubCategory = ({ orderedFile }: { orderedFile: IFile }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const filePath = searchParams.get(EProjectPageSearchParamsKeys.FILE_PATH);

  const handleClick = () => {
    const newUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.FILE_PATH,
      orderedFile.file.path,
      pathname,
      urlSearchParams
    );
    router.push(newUrl);
  };

  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={handleClick}
          isActive={filePath === orderedFile.file.path}
        >
          {orderedFile.matterContent.title}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
};

export default SubCategory;
