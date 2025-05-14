import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectSidebar from "../../ui/projects/project-sidebar";
import axios from "axios";
import IFileContent from "@/types/IFileContent";
import checkedEnv from "@/lib/checkEnv";

const ProjectPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    sha?: string;
    filePath?: string;
  }>;
}) => {
  const filePath = await searchParams?.then((params) => params.filePath);
  const sha = await searchParams?.then((params) => params.sha);
  const { id } = await params;
  let fileContent: IFileContent | null = null;
  if (filePath) {
    const encodedFilepath = encodeURIComponent(filePath);
    fileContent = (
      await axios.get<IFileContent>(
        checkedEnv.BACKEND_URL +
          checkedEnv.GET_FILE_CONTENT_URL.replace("{repoid}", id).replace(
            "{filepath}",
            encodedFilepath
          ),
        { params: { ref: sha } }
      )
    ).data;
  }
  return (
    <SidebarProvider>
      <ProjectSidebar params={params} searchParams={searchParams} />
      <SidebarTrigger />
      {fileContent && (
        <section className="flex justify-center w-full">
          <div className="mt-5 max-w-6xl flex flex-col items-center px-4">
            <h1>{fileContent.matterContent.title}</h1>
            <p>{fileContent.matterContent.description}</p>
            <p dangerouslySetInnerHTML={{ __html: fileContent.htmlContent }} />
          </div>
        </section>
      )}
    </SidebarProvider>
  );
};

export default ProjectPage;
