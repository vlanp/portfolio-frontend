"use client";

import {
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IOctokitTagsResponse } from "@/types/IOctokitResponse";
import { TagCombobox } from "./tag-combobox";

const ProjectSidebarGroupContent = ({
  tags,
  children,
}: {
  tags: IOctokitTagsResponse;
  children?: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const selectedTag = searchParams.get("tag");

  const setTag = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams);
      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  useEffect(() => {
    if (selectedTag) return;
    setTag(tags.data[0].name);
  }, [selectedTag, setTag, tags.data]);

  return (
    <>
      <SidebarGroupAction asChild>
        <TagCombobox tags={tags} setTag={setTag} />
      </SidebarGroupAction>
      <SidebarSeparator className="mt-2" />
      <SidebarGroupContent>
        <SidebarMenu>{children}</SidebarMenu>
      </SidebarGroupContent>
    </>
  );
};

export default ProjectSidebarGroupContent;
