"use client";

import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";

const RightTocSidebarSkeleton = ({
  rightTocSidebarDict,
}: {
  rightTocSidebarDict: IDictionary["shared"]["RightTocSidebar"];
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
    <Sidebar side="right" variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupLabel>{rightTocSidebarDict.Title}</SidebarGroupLabel>
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

export default RightTocSidebarSkeleton;
