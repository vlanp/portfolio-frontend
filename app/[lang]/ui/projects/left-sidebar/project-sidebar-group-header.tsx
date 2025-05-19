import { SidebarGroupLabel, SidebarGroupAction } from "@/components/ui/sidebar";
import IRepo from "@/types/IRepo";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { IOctokitTagsResponse } from "@/types/ITagContent";
import { setSPInSC } from "@/lib/utils";
import IProjectPageProps from "@/types/IProjectPageProps";
import { TagCombobox } from "./tag-combobox";

const ProjectSidebarGroupHeader = async ({
  repoId,
  pathname,
  awaitedSearchParams,
}: {
  repoId: string;
  pathname: string;
  awaitedSearchParams: Awaited<IProjectPageProps["searchParams"]>;
}) => {
  const repoResponsePromise = axios.get<IRepo>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_REPO_URL.replace("{repoid}", repoId)
  );
  const tagsResponsePromise = axios.get<IOctokitTagsResponse["data"]>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAGS_URL.replace("{repoid}", repoId)
  );
  const responses = await Promise.all([
    repoResponsePromise,
    tagsResponsePromise,
  ]);
  const [repoResponse, tagsResponse] = responses;
  if (!awaitedSearchParams.sha) {
    setSPInSC(
      "sha",
      tagsResponse.data[0].commit.sha,
      pathname,
      awaitedSearchParams
    );
  }
  return (
    <>
      <SidebarGroupLabel>{repoResponse.data.displayName}</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <TagCombobox tags={tagsResponse.data} />
      </SidebarGroupAction>
    </>
  );
};

export default ProjectSidebarGroupHeader;
