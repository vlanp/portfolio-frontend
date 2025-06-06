import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LeftSidebar from "../../ui/projects-page/project-page/left-sidebar";
import axios, { AxiosError } from "axios";
import checkedEnv from "@/lib/checkEnv";
import IFileExist, { ZFileExist } from "@/types/IFileExist";
import { headers } from "next/headers";
import IProjectPageProps, {
  EProjectPageSearchParamsKeys,
} from "@/types/IProjectPageProps";
import { mobileBreakpoint } from "@/types/IBreakpoints";
import { redirect } from "next/navigation";
import { IOctokitTagsResponse } from "@/types/ITagContent";
import { Suspense } from "react";
import LeftSidebarSkeleton from "../../ui/projects-page/project-page/left-sidebar-skeleton";
import FileDisplay from "../../ui/projects-page/project-page/file-display";
import { getDictionary } from "../../dictionaries";
import FileDisplaySkeleton from "../../ui/projects-page/project-page/file-display-skeleton";
import { constructNewUrl } from "@/lib/utils";
import { ZRepo } from "@/types/IProject";
import {
  getZApiSuccessResponse,
  IApiSuccessResponse,
} from "@/types/IApiResponse";
import z from "zod/v4";
import { IDictionary } from "../../dictionaries/generated";

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
    .get<unknown>(
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

  const repoResponseParseResult = getZApiSuccessResponse(ZRepo).safeParse(
    repoResponse.data
  );

  if (!repoResponseParseResult.success) {
    throw new Error(z.prettifyError(repoResponseParseResult.error));
  }

  const repo = repoResponseParseResult.data.data;

  const tagsResponse = await axios.get<
    IApiSuccessResponse<IOctokitTagsResponse["data"]>
  >(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAGS_URL.replace("{repoid}", repoId)
  );
  const tags = tagsResponse.data.data;
  const sha = awaitedSearchParams.sha;
  const tag = tags.find((it) => it.commit.sha === sha);
  if (!tag && tags.length > 0) {
    const newUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.SHA,
      tags[0].commit.sha,
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
    const didFileExistResponse = await axios.get<
      IApiSuccessResponse<IFileExist>
    >(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_FILE_EXIST_URL.replace(
          "{repoid}",
          repoId
        ).replace("{filepath}", encodedFilepath),
      { params: { sha, lang } }
    );

    const fileExistReponseParseResult = getZApiSuccessResponse(
      ZFileExist
    ).safeParse(didFileExistResponse.data);

    if (!fileExistReponseParseResult.success) {
      throw new Error(z.prettifyError(fileExistReponseParseResult.error));
    }

    const fileExist = fileExistReponseParseResult.data.data;

    if (!fileExist.exist) {
      const newUrl = constructNewUrl(
        EProjectPageSearchParamsKeys.FILE_PATH,
        "",
        pathname,
        urlSearchParams
      );
      redirect(newUrl);
    } else if (fileExist.filePath) {
      const newUrl = constructNewUrl(
        EProjectPageSearchParamsKeys.FILE_PATH,
        fileExist.filePath,
        pathname,
        urlSearchParams
      );
      redirect(newUrl);
    }
  }

  return (
    <SidebarProvider breakpoint={mobileBreakpoint}>
      <Suspense
        key={sha}
        fallback={
          <LeftSidebarSkeleton
            tags={tags}
            projectDict={projectDict}
            repoId={repoId}
            repos={[repo]}
          />
        }
      >
        <LeftSidebar
          repoId={repoId}
          pathname={pathname}
          sha={sha}
          urlSearchParams={urlSearchParams}
          tags={tags}
          filePath={filePath}
          lang={lang}
          projectDict={projectDict}
        />
      </Suspense>
      <SidebarTrigger />
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
          lang={lang}
        />
      </Suspense>
    </SidebarProvider>
  );
};

export default ProjectPage;
