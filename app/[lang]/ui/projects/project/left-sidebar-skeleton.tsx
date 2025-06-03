"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";
import { TagCombobox } from "./left-sidebar/tag-combobox";
import { IOctokitTagsResponse } from "@/types/ITagContent";
import { IDictionary } from "@/app/[lang]/dictionaries";

const LeftSidebarSkeleton = ({
  tags,
  displayName,
  projectDict,
}: {
  tags: IOctokitTagsResponse["data"];
  displayName: string;
  projectDict: IDictionary["Projects"]["Project"];
}) => {
  const [skeletonCount, setSkeletonCount] = useState(0);
  const sidebarRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const calculateSkeletonCount = () => {
      if (!sidebarRef.current) return;

      const sidebarHeight = sidebarRef.current.clientHeight;

      const sidebarGroupPadding = 8;

      const sidebarMenuGap = 4;

      const sidebarMenuItemHeight = 32;

      const count = Math.floor(
        (sidebarHeight - sidebarGroupPadding * 2) /
          (sidebarMenuItemHeight + sidebarMenuGap)
      );

      setSkeletonCount(count);
    };

    calculateSkeletonCount();

    const handleResize = () => {
      calculateSkeletonCount();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupLabel>{displayName}</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <TagCombobox tags={tags} disabled projectDict={projectDict} />
          </SidebarGroupAction>
          <SidebarSeparator />
          <SidebarGroupContent className="gap-1 flex-1">
            <SidebarMenu ref={sidebarRef} className="min-h-full">
              {Array.from({ length: skeletonCount }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftSidebarSkeleton;
