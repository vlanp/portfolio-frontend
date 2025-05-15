import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectSidebar from "../../ui/projects/project-sidebar";
import axios from "axios";
import IFileContent from "@/types/IFileContent";
import checkedEnv from "@/lib/checkEnv";
import IFileExist from "@/types/IFileExist";
import { setSPInSC } from "@/lib/utils";
import { headers } from "next/headers";
import HtmlMarkdownContent from "../../ui/projects/html-markdown-content";

const ProjectPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
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
    const didFileExist = (
      await axios.get<IFileExist>(
        checkedEnv.NEXT_PUBLIC_BACKEND_URL +
          checkedEnv.NEXT_PUBLIC_GET_FILE_EXIST_URL.replace(
            "{repoid}",
            id
          ).replace("{filepath}", encodedFilepath),
        { params: { sha } }
      )
    ).data;

    if (didFileExist.exist) {
      fileContent = (
        await axios.get<IFileContent>(
          checkedEnv.NEXT_PUBLIC_BACKEND_URL +
            checkedEnv.NEXT_PUBLIC_GET_FILE_CONTENT_URL.replace(
              "{repoid}",
              id
            ).replace("{filepath}", encodedFilepath),
          { params: { ref: sha } }
        )
      ).data;
    } else {
      const headerList = await headers();
      const pathname = headerList.get("x-current-path");
      if (!pathname) {
        throw new Error("No pathname found in headers");
      }
      setSPInSC("filePath", "", pathname, await searchParams);
    }
  }
  return (
    <SidebarProvider>
      <ProjectSidebar params={params} searchParams={searchParams} />
      <section className="flex flex-1">
        <SidebarTrigger className="fixed" />
        {fileContent && <HtmlMarkdownContent fileContent={fileContent} />}
      </section>
    </SidebarProvider>
  );
};

export default ProjectPage;
