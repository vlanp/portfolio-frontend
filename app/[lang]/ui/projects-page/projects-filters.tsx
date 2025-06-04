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
import { ZProjectsFilters } from "@/types/IProjectsFilters";
import { z } from "zod/v4";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import CheckboxProjectsFilters from "./projects-filters/checkbox-projects-filters";
import { camelToScreamingSnakeCase, capitalizeFirstLetter } from "@/lib/utils";
import { EProjectsPageSearchParamsKeys } from "@/types/IProjectsPageProps";

const ProjectsFilters = async ({
  projectsDict,
}: {
  projectsDict: IDictionary["Projects"];
}) => {
  const projectsFiltersResponse = await axios.get<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL
  );
  const projectsFiltersParseResult = getZApiSuccessResponse(
    ZProjectsFilters
  ).safeParse(projectsFiltersResponse.data);
  if (!projectsFiltersParseResult.success) {
    throw new Error(z.prettifyError(projectsFiltersParseResult.error));
  }
  const projectsFilters = projectsFiltersParseResult.data.data;

  return (
    <SidebarProvider
      breakpoint={extraLargeBreakpoint}
      className="w-fit"
      style={
        {
          "--sidebar-width": "30rem",
          "--sidebar-width-mobile": "30rem",
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
                {Object.keys(projectsFilters).map((key) => {
                  const dictKey = capitalizeFirstLetter(
                    key
                  ) as keyof (typeof projectsDict)["ProjectsFilters"];
                  return (
                    <CheckboxProjectsFilters
                      key={key}
                      categoryName={projectsDict.ProjectsFilters[dictKey]}
                      elements={
                        projectsFilters[key as keyof typeof projectsFilters]
                      }
                      searchParamsKey={
                        EProjectsPageSearchParamsKeys[
                          camelToScreamingSnakeCase(
                            key
                          ) as keyof typeof EProjectsPageSearchParamsKeys
                        ]
                      }
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
};

export default ProjectsFilters;
