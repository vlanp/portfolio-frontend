import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LeftSidebar from "../../ui/projects/project/left-sidebar";
import axios, { AxiosError } from "axios";
import checkedEnv from "@/lib/checkEnv";
import IFileExist from "@/types/IFileExist";
import { headers } from "next/headers";
import IProjectPageProps, {
  EProjectPageSearchParamsKeys,
} from "@/types/IProjectPageProps";
import { mobileBreakpoint } from "@/types/IBreakpoints";
import IRepo from "@/types/IRepo";
import { redirect } from "next/navigation";
import { IOctokitTagsResponse } from "@/types/ITagContent";
import { Suspense } from "react";
import LeftSidebarSkeleton from "../../ui/projects/project/left-sidebar-skeleton";
import FileDisplay from "../../ui/projects/project/file-display";
import { getDictionary, IDictionary } from "../../dictionaries";
import FileDisplaySkeleton from "../../ui/projects/project/file-display-skeleton";
import { constructNewUrl } from "@/lib/utils";

const ProjectPage = async ({ params, searchParams }: IProjectPageProps) => {
  const awaitedSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams(awaitedSearchParams);
  const awaitedParams = await params;

  const lang = awaitedParams.lang;
  const projectDict: IDictionary["Projects"]["Project"] = (
    await getDictionary(lang)
  ).Projects.Project;

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }

  const repoId = awaitedParams.repoId;
  const repoResponse = await axios
    .get<IRepo>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_REPO_URL.replace("{repoid}", repoId)
    )
    .catch((error: Error | AxiosError) => {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 400)
      ) {
        // TODO : Maybe use notfound()
        redirect(pathname.replace("/" + repoId, ""));
      } else {
        throw error;
      }
    });

  const tagsResponse = await axios.get<IOctokitTagsResponse["data"]>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAGS_URL.replace("{repoid}", repoId)
  );
  const sha = awaitedSearchParams.sha;
  const tag = tagsResponse.data.find((it) => it.commit.sha === sha);
  if (!tag && tagsResponse.data.length > 0) {
    const newUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.SHA,
      tagsResponse.data[0].commit.sha,
      pathname,
      urlSearchParams
    );
    redirect(newUrl);
  }

  if (!sha) {
    throw new Error(
      "No sha has been set, meaning that no tags where found for the repoId " +
        repoId +
        ". This shouldn't happen, unless a new repo is being created"
    );
  }

  const filePath = awaitedSearchParams.filePath;
  if (filePath) {
    const encodedFilepath = encodeURIComponent(filePath);
    const didFileExist = (
      await axios.get<IFileExist>(
        checkedEnv.NEXT_PUBLIC_BACKEND_URL +
          checkedEnv.NEXT_PUBLIC_GET_FILE_EXIST_URL.replace(
            "{repoid}",
            repoId
          ).replace("{filepath}", encodedFilepath),
        { params: { sha } }
      )
    ).data;
    if (!didFileExist.exist) {
      const newUrl = constructNewUrl(
        EProjectPageSearchParamsKeys.FILE_PATH,
        "",
        pathname,
        urlSearchParams
      );
      redirect(newUrl);
    }
  }

  return (
    <>
      <SidebarProvider breakpoint={mobileBreakpoint} className="w-fit">
        <Suspense
          key={sha}
          fallback={
            <LeftSidebarSkeleton
              tags={tagsResponse.data}
              displayName={repoResponse.data.displayName}
            />
          }
        >
          <LeftSidebar
            repoId={repoId}
            pathname={pathname}
            sha={sha}
            urlSearchParams={urlSearchParams}
            repoDisplayName={repoResponse.data.displayName}
            tags={tagsResponse.data}
            filePath={filePath}
          />
        </Suspense>
        <SidebarTrigger />
      </SidebarProvider>
      <Suspense
        key={sha + filePath}
        fallback={<FileDisplaySkeleton projectDict={projectDict} />}
      >
        <FileDisplay
          repoId={repoId}
          filePath={filePath}
          sha={sha}
          urlSearchParams={urlSearchParams}
          projectDict={projectDict}
          pathname={pathname}
        />
      </Suspense>
    </>
  );
};

export default ProjectPage;
