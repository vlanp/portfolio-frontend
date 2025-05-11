"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { getBranch, getTags, getTagsDataState, getTree } from "@/lib/test";
import { IProjectsReposKeys } from "@/projects/projects-repos";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Link from "next/link";
import { TagCombobox } from "./tag-combobox";
import { useEffect, useState } from "react";
import { IOctokitTagsResponse } from "@/types/IOctokitResponse";
import { fetchDataIdle, IFetchDataState } from "@/types/IFetchDataState";
import ProjectSidebarSkeleton from "./project-sidebar-skeleton";
import ProjectSidebarError from "./project-sidebar-error";

const ProjectSidebar = ({ name }: { name: IProjectsReposKeys }) => {
  const [tagsDataState, setTagsDataState] =
    useState<IFetchDataState<IOctokitTagsResponse>>(fetchDataIdle);
  const [selectedTag, setSelectedTag] = useState<null | string>(null);

  // const project = await getProject(name);
  // const categories = project.map((it) => it.data.title);
  // console.log(categories);
  useEffect(() => {
    const settingTags = async () => {
      const tagsDataState = await getTagsDataState(name);
      setTagsDataState(tagsDataState);
      if (tagsDataState.status === "fetchDataSuccess")
        setSelectedTag(tagsDataState.data.data[0].name);
    };
    settingTags();
  }, [name]);
  // getTree(name, "312a7076f9dc9071c5aa89bc6809a776255d57a9");

  if (
    tagsDataState.status === "fetchDataIdle" ||
    tagsDataState.status === "fetchDataLoading"
  ) {
    return <ProjectSidebarSkeleton />;
  }

  if (tagsDataState.status === "fetchDataError" || selectedTag === null) {
    return <ProjectSidebarError />;
  }

  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <TagCombobox
              tags={tagsDataState.data}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          </SidebarGroupAction>
          <SidebarSeparator className="mt-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {categories.map((category) => (
                <Collapsible defaultOpen key={category}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>{category}</SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href={"/"}>ACME</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectSidebar;
