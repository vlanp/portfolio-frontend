"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";

const ProjectSidebarSkeleton = () => {
  const [skeletonCount, setSkeletonCount] = useState(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

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
      <SidebarContent ref={sidebarRef}>
        <SidebarGroup>
          <SidebarGroupContent className="gap-1">
            <SidebarMenu>
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

export default ProjectSidebarSkeleton;
