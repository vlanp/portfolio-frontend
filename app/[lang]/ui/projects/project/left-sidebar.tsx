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
import { EProjectPageSearchParamsKeys } from "@/types/IProjectPageProps";
import CategoryCollapsible from "./left-sidebar/category-collapsible";
import { IOctokitTagsResponse, ITagContent } from "@/types/ITagContent";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { redirect } from "next/navigation";
import { TagCombobox } from "./left-sidebar/tag-combobox";
import { constructNewUrl } from "@/lib/utils";
import { ILang } from "@/types/ILang";
import { IApiSuccessResponse } from "@/types/IApiResponse";

const LeftSidebar = async ({
  repoId,
  sha,
  filePath,
  pathname,
  urlSearchParams,
  repoDisplayName,
  tags,
  lang,
}: {
  repoId: string;
  sha: string;
  filePath: string | undefined;
  pathname: string;
  urlSearchParams: URLSearchParams;
  repoDisplayName: string;
  tags: IOctokitTagsResponse["data"];
  lang: ILang;
}) => {
  const tagContentResponse = await axios.get<IApiSuccessResponse<ITagContent>>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAG_URL.replace("{repoid}", repoId).replace(
        "{sha}",
        sha
      ),
    { params: { lang } }
  );
  if (!filePath) {
    const firstFilePath =
      tagContentResponse.data.data.orderedDirs[0]?.orderedFiles[0]?.file?.path;
    if (!firstFilePath) {
      throw new Error(
        "Unable to find a file to display for repoid " +
          repoId +
          ". This shouldn't happen, unless a new repo is being created"
      );
    }
    const newUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.FILE_PATH,
      firstFilePath,
      pathname,
      urlSearchParams
    );
    redirect(newUrl);
  }

  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupLabel>{repoDisplayName}</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <TagCombobox tags={tags} />
          </SidebarGroupAction>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {tagContentResponse.data.data.orderedDirs.map((orderedDir) => (
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

export default LeftSidebar;
