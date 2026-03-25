"use client";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { formatPathToDisplayName } from "@/lib/utils";
import { IDir } from "@/types/ITagContent";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import SubCategory from "./sub-category";
import { useSearchParams } from "next/navigation";
import { EProjectPageSearchParamsKeys } from "@/types/IProjectPageProps";

const CategoryCollapsible = ({ orderedDir }: { orderedDir: IDir }) => {
  const searchParams = useSearchParams();
  const filePath = searchParams.get(EProjectPageSearchParamsKeys.FILE_PATH);
  const initialIsOpen = filePath
    ? orderedDir.orderedFiles.map((it) => it.file.path).includes(filePath)
    : false;
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);

  return (
    <Collapsible onOpenChange={setIsOpen} open={isOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {isOpen ? <LuChevronDown /> : <LuChevronRight />}
            {formatPathToDisplayName(orderedDir.dir.path)}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {orderedDir.orderedFiles.map((orderedFile) => (
          <CollapsibleContent key={orderedFile.file.path}>
            <SubCategory orderedFile={orderedFile} />
          </CollapsibleContent>
        ))}
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default CategoryCollapsible;
