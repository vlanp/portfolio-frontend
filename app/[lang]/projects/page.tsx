import checkedEnv from "@/lib/checkEnv";
import { ZProject } from "@/types/IProject";
import axios from "axios";
import { z } from "zod/v4";
import { getDictionary, IDictionary } from "../dictionaries";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import ProjectsTabs from "../ui/projects/projects-tabs";

const ProjectsPage = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const projectsDict: IDictionary["Projects"] = (await getDictionary(lang))
    .Projects;

  const projectsResponse = await axios.get<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL + checkedEnv.NEXT_PUBLIC_GET_PROJECTS_URL
  );

  const apiResponseParseResult = getZApiSuccessResponse(
    ZProject.array()
  ).safeParse(projectsResponse.data);

  if (!apiResponseParseResult.success) {
    throw new Error(z.prettifyError(apiResponseParseResult.error));
  }

  const projects = apiResponseParseResult.data.data;

  return (
    <ProjectsTabs projects={projects} lang={lang} projectsDict={projectsDict} />
  );
};

export default ProjectsPage;
