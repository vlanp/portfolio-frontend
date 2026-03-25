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

const CategoryCollapsible = ({
  orderedDir,
  initialIsOpen,
}: {
  orderedDir: IDir;
  initialIsOpen: boolean;
}) => {
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
