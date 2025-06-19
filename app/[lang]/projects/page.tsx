import checkedEnv from "@/lib/checkEnv";
import { ZProject } from "@/types/IProject";
import axios from "axios";
import { z } from "zod/v4";
import { getDictionary } from "../dictionaries";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import ProjectsTabs from "../ui/projects-page/projects-tabs";
import { IDictionary } from "../dictionaries/generated";
import ProjectsFiltersSidebar from "../ui/projects-page/projects-filters-sidebar";
import IProjectsPageProps, {
  generateFrameworkParamKey,
  retrieveProgrammingLanguageFromFrameworkParamKey,
} from "@/types/IProjectsPageProps";
import { ISelectedProjectsFilters } from "@/types/IProjectsFilters";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageContainer from "../ui/page-container";
import { getZDocumentsWithHighlights } from "@/types/IDocumentsWithHighlights";
import { ZESearchPaths } from "@/types/generated/ISearchPaths";

const generatePLFilters = (
  awaitedSearchParams: Awaited<IProjectsPageProps["searchParams"]>
): ISelectedProjectsFilters["programmingLanguages"] => {
  const plWithFw = Object.keys(awaitedSearchParams)
    .map((it) => retrieveProgrammingLanguageFromFrameworkParamKey(it))
    .filter((it) => it !== null);
  const pl = awaitedSearchParams.pl;

  const createPlWithFw = (
    pl: string,
    isSelected: boolean
  ): ISelectedProjectsFilters["programmingLanguages"][number] => ({
    name: {
      value: pl,
      isSelected,
    },
    frameworks: (() => {
      const frameworks = awaitedSearchParams[generateFrameworkParamKey(pl)];
      return frameworks
        ? typeof frameworks === "string"
          ? [frameworks]
          : frameworks
        : [];
    })(),
  });

  if (typeof pl === "string") {
    const remeaningProgrammingLanguages = plWithFw.filter((it) => it !== pl);
    return [
      createPlWithFw(pl, true),
      ...remeaningProgrammingLanguages.map((it) => createPlWithFw(it, false)),
    ];
  }

  if (Array.isArray(pl)) {
    const remeaningProgrammingLanguages = plWithFw.filter(
      (it) => !pl.includes(it)
    );
    return {
      ...pl.map((it) => createPlWithFw(it, true)),
      ...remeaningProgrammingLanguages.map((it) => createPlWithFw(it, false)),
    };
  }
  return plWithFw.map((it) => createPlWithFw(it, false));
};

const ProjectsPage = async ({ params, searchParams }: IProjectsPageProps) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const projectsDict: IDictionary["Projects"] = (await getDictionary(lang))
    .Projects;
  const awaitedSearchParams = await searchParams;
  const platforms = awaitedSearchParams.pf;
  const filtersBehavior = awaitedSearchParams.fb;
  const search = awaitedSearchParams.s;
  const headersList = await headers();

  const projectsResponse = await axios
    .post<unknown>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_POST_PROJECTS_URL,
      {
        platforms: platforms
          ? typeof platforms === "string"
            ? [platforms]
            : platforms
          : [],
        filtersBehavior:
          filtersBehavior === "union" || filtersBehavior === "intersection"
            ? filtersBehavior
            : undefined,
        search: typeof search === "string" ? search : undefined,
        programmingLanguages: generatePLFilters(awaitedSearchParams),
      } satisfies ISelectedProjectsFilters,
      { params: { lang } }
    )
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const referer = headersList.get("referer");
        const currentPath = headersList.get("x-current-path");
        if (referer) {
          redirect(referer);
        } else if (currentPath) {
          redirect(currentPath);
        } else {
          redirect("/");
        }
      } else {
        throw error;
      }
    });

  const projectsResponseParseResult = getZApiSuccessResponse(
    getZDocumentsWithHighlights(ZProject, ZESearchPaths)
  ).safeParse(projectsResponse.data);

  if (!projectsResponseParseResult.success) {
    throw new Error(z.prettifyError(projectsResponseParseResult.error));
  }

  const projectsWithHighlights = projectsResponseParseResult.data.data;
  return (
    <ProjectsFiltersSidebar projectsDict={projectsDict}>
      <PageContainer className="flex justify-around flex-wrap gap-y-5 w-full">
        <ProjectsTabs
          projectsWithHighlights={projectsWithHighlights}
          lang={lang}
          projectsDict={projectsDict}
          awaitedSearchParams={awaitedSearchParams}
        />
      </PageContainer>
    </ProjectsFiltersSidebar>
  );
};

export default ProjectsPage;
