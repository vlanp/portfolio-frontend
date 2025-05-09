import { getProject } from "@/lib/projects";
import { getToto } from "@/lib/test";
import { UrlsKeys } from "@/projects/projects-repos";

const ProjectPage = async (props: { params: Promise<{ name: UrlsKeys }> }) => {
  const params = await props.params;

  // const project = await getProject(params.name);

  // console.log(project);

  // const html = await getToto();

  // return <section dangerouslySetInnerHTML={{ __html: html }}></section>;
  return <section></section>;
};

export default ProjectPage;
