import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import axios, { AxiosResponse } from "axios";
import { ITagContent } from "@/types/ITagContent";
import checkedEnv from "@/lib/checkEnv";
import IRepo from "@/types/IRepo";
import { headers } from "next/headers";
import { setSPInSC } from "@/lib/utils";
import { TagCombobox } from "./tag-combobox";
import CategoryCollapsible from "./category-collapsible";

const ProjectSidebar = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    sha?: string;
  }>;
}) => {
  const { id } = await params;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }
  const sha = await searchParams?.then((params) => params.sha);
  let tagResponse: AxiosResponse<ITagContent, unknown>;
  if (!sha) {
    tagResponse = await axios.get<ITagContent>(
      checkedEnv.BACKEND_URL +
        checkedEnv.GET_LAST_TAG_URL.replace("{repoid}", id)
    );
    setSPInSC("sha", tagResponse.data.tag.commit.sha, pathname);
  } else {
    tagResponse = await axios.get<ITagContent>(
      checkedEnv.BACKEND_URL +
        checkedEnv.GET_TAG_URL.replace("{repoid}", id).replace("{sha}", sha)
    );
  }
  const repoResponse = await axios.get<IRepo>(
    checkedEnv.BACKEND_URL + checkedEnv.GET_REPO_URL.replace("{repoid}", id)
  );
  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{repoResponse.data.displayName}</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <TagCombobox tags={tagResponse.data.orderedTags} />
          </SidebarGroupAction>
          <SidebarSeparator className="my-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {tagResponse.data.orderedDirs.map((orderedDir) => (
                <CategoryCollapsible
                  key={orderedDir.dir.path}
                  orderedDir={orderedDir}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectSidebar;
