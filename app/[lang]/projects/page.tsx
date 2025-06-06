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
} from "@/types/IProjectsPageProps";
import { ISelectedProjectsFilters } from "@/types/IProjectsFilters";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageContainer from "../ui/page-container";

const ProjectsPage = async ({ params, searchParams }: IProjectsPageProps) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const projectsDict: IDictionary["Projects"] = (await getDictionary(lang))
    .Projects;
  const awaitedSearchParams = await searchParams;
  const platforms = awaitedSearchParams.pf;
  const filtersBehavior = awaitedSearchParams.fb;
  const search = awaitedSearchParams.s;
  const programmingLanguages = awaitedSearchParams.pl;
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
        programmingLanguages: programmingLanguages
          ? typeof programmingLanguages === "string"
            ? [
                {
                  name: programmingLanguages,
                  frameworks: (() => {
                    const frameworks =
                      awaitedSearchParams[
                        generateFrameworkParamKey(programmingLanguages)
                      ];
                    return frameworks
                      ? typeof frameworks === "string"
                        ? [frameworks]
                        : frameworks
                      : [];
                  })(),
                },
              ]
            : programmingLanguages.map((programmingLanguage) => ({
                name: programmingLanguage,
                frameworks: (() => {
                  const frameworks =
                    awaitedSearchParams[
                      generateFrameworkParamKey(programmingLanguage)
                    ];
                  return frameworks
                    ? typeof frameworks === "string"
                      ? [frameworks]
                      : frameworks
                    : [];
                })(),
              }))
          : [],
      } satisfies ISelectedProjectsFilters
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
    ZProject.array()
  ).safeParse(projectsResponse.data);

  if (!projectsResponseParseResult.success) {
    throw new Error(z.prettifyError(projectsResponseParseResult.error));
  }

  const projects = projectsResponseParseResult.data.data;

  return (
    <ProjectsFiltersSidebar projectsDict={projectsDict}>
      <PageContainer className="flex justify-around flex-wrap gap-y-5">
        <ProjectsTabs
          projects={projects}
          lang={lang}
          projectsDict={projectsDict}
        />
      </PageContainer>
    </ProjectsFiltersSidebar>
  );
};

export default ProjectsPage;
