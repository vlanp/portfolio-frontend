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
  searchParams: Promise<{
    sha?: string;
    filePath?: string;
  }>;
}) => {
  const { id } = await params;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }
  const sha = await searchParams?.then((params) => params.sha);
  const filePath = await searchParams?.then((params) => params.filePath);
  let tagResponse: AxiosResponse<ITagContent, unknown>;
  if (!sha) {
    tagResponse = await axios.get<ITagContent>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_LAST_TAG_URL.replace("{repoid}", id)
    );
    setSPInSC(
      "sha",
      tagResponse.data.tag.commit.sha,
      pathname,
      await searchParams
    );
  } else {
    tagResponse = await axios.get<ITagContent>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_TAG_URL.replace("{repoid}", id).replace(
          "{sha}",
          sha
        )
    );
  }
  if (!filePath) {
    setSPInSC(
      "filePath",
      tagResponse.data.orderedDirs[0].orderedFiles[0].file.path,
      pathname,
      await searchParams
    );
  }
  const repoResponse = await axios.get<IRepo>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_REPO_URL.replace("{repoid}", id)
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
