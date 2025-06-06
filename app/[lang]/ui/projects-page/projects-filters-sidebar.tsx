import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { extraLargeBreakpoint } from "@/types/IBreakpoints";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { z } from "zod/v4";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import CheckboxProjectsFilters from "./projects-filters-sidebar/checkbox-projects-filters";
import {
  EProjectsPageSearchParamsKeys,
  generateFrameworkParamKey,
} from "@/types/IProjectsPageProps";
import SearchbarProjectsFilters from "./projects-filters-sidebar/searchbar-projects-filters";
import BehaviorProjectsFilters from "./projects-filters-sidebar/behavior-projects-filters";
import { ZAllProjectsFilters } from "@/types/IProjectsFilters";

const ProjectsFiltersSidebar = async ({
  projectsDict,
  children,
}: {
  projectsDict: IDictionary["Projects"];
  children: React.ReactNode;
}) => {
  const projectsFiltersResponse = await axios.get<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL
  );
  const projectsFiltersParseResult = getZApiSuccessResponse(
    ZAllProjectsFilters
  ).safeParse(projectsFiltersResponse.data);
  if (!projectsFiltersParseResult.success) {
    throw new Error(z.prettifyError(projectsFiltersParseResult.error));
  }
  const projectsFilters = projectsFiltersParseResult.data.data;
  const frameworksCategoriesNames: Record<string, string> = Object.fromEntries(
    await Promise.all(
      projectsFilters.programmingLanguages.map(async (programmingLanguage) => [
        programmingLanguage,
        await projectsDict.ProjectsFilters.FrameworksOfLanguage({
          programmingLanguage: programmingLanguage.name,
        }),
      ])
    )
  );

  return (
    <SidebarProvider
      breakpoint={extraLargeBreakpoint}
      style={
        {
          "--sidebar-width": "30rem",
        } as React.CSSProperties & Record<string, string>
      }
    >
      <Sidebar variant="floating" className="top-header-height">
        <SidebarContent>
          <SidebarGroup className="min-h-full">
            <SidebarGroupLabel className="text-center self-center">
              {projectsDict.ProjectsFilters.AllFilters}
            </SidebarGroupLabel>
            <SidebarSeparator />
            <SidebarGroupContent>
              <SidebarMenu className="px-5 gap-10">
                <BehaviorProjectsFilters projectsDict={projectsDict} />
                <SearchbarProjectsFilters projectsDict={projectsDict} />
                <CheckboxProjectsFilters
                  categoryName={
                    projectsDict.ProjectsFilters.ProgrammingLanguages
                  }
                  elements={projectsFilters.programmingLanguages.map(
                    (it) => it.name
                  )}
                  searchParamsKey={
                    EProjectsPageSearchParamsKeys.PROGRAMMING_LANGUAGES
                  }
                />
                {projectsFilters.programmingLanguages.map(
                  (programmingLanguage) => {
                    return (
                      <CheckboxProjectsFilters
                        key={programmingLanguage.name}
                        categoryName={
                          frameworksCategoriesNames[programmingLanguage.name]
                        }
                        elements={programmingLanguage.frameworks}
                        searchParamsKey={generateFrameworkParamKey(
                          programmingLanguage.name
                        )}
                      />
                    );
                  }
                )}
                <CheckboxProjectsFilters
                  categoryName={projectsDict.ProjectsFilters.Platforms}
                  elements={projectsFilters.platforms}
                  searchParamsKey={EProjectsPageSearchParamsKeys.PLATFORMS}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
};

export default ProjectsFiltersSidebar;
