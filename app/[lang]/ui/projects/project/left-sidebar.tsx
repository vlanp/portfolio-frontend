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
import {
  getZApiSuccessResponse,
  IApiSuccessResponse,
} from "@/types/IApiResponse";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { RepoCombobox } from "./left-sidebar/repo-combobox";
import { ZProject } from "@/types/IProject";
import { z } from "zod/v4";

const LeftSidebar = async ({
  repoId,
  sha,
  filePath,
  pathname,
  urlSearchParams,
  tags,
  lang,
  projectDict,
}: {
  repoId: string;
  sha: string;
  filePath: string | undefined;
  pathname: string;
  urlSearchParams: URLSearchParams;
  tags: IOctokitTagsResponse["data"];
  lang: ILang;
  projectDict: IDictionary["Projects"]["Project"];
}) => {
  const tagContentResponsePromise = axios.get<IApiSuccessResponse<ITagContent>>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAG_URL.replace("{repoid}", repoId).replace(
        "{sha}",
        sha
      ),
    { params: { lang } }
  );
  const projectResponsePromise = axios.get<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_PROJECT_FROM_REPO_URL.replace(
        "{repoid}",
        repoId
      )
  );
  const responses = await Promise.all([
    tagContentResponsePromise,
    projectResponsePromise,
  ]);
  const [tagContentResponse, reposResponse] = responses;
  const projectResponseParseResult = getZApiSuccessResponse(ZProject).safeParse(
    reposResponse.data
  );
  if (!projectResponseParseResult.success) {
    throw new Error(z.prettifyError(projectResponseParseResult.error));
  }
  const project = projectResponseParseResult.data.data;
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
          <SidebarGroupLabel className="text-center self-center">
            {project.name}
          </SidebarGroupLabel>
          <div className="flex flex-col gap-2">
            <SidebarGroupAction asChild>
              <RepoCombobox
                repos={project.repos}
                projectDict={projectDict}
                repoId={repoId}
              />
            </SidebarGroupAction>
            <SidebarGroupAction asChild>
              <TagCombobox tags={tags} projectDict={projectDict} />
            </SidebarGroupAction>
          </div>
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
