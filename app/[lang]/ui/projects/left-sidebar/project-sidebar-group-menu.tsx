import { SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import CategoryCollapsible from "./category-collapsible";
import axios from "axios";
import { ITagContent } from "@/types/ITagContent";
import checkedEnv from "@/lib/checkEnv";
import { setSPInSC } from "@/lib/utils";
import IProjectPageProps from "@/types/IProjectPageProps";

const ProjectSidebarGroupMenu = async ({
  repoId,
  pathname,
  awaitedSearchParams,
  filePath,
}: {
  repoId: string;
  pathname: string;
  awaitedSearchParams: Awaited<IProjectPageProps["searchParams"]>;
  filePath?: string;
}) => {
  while (!awaitedSearchParams.sha) {
    await new Promise(() => {});
  }
  const tagResponse = await axios.get<ITagContent>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TAG_URL.replace("{repoid}", repoId).replace(
        "{sha}",
        awaitedSearchParams.sha
      )
  );
  if (!filePath) {
    setSPInSC(
      "filePath",
      tagResponse.data.orderedDirs[0].orderedFiles[0].file.path,
      pathname,
      awaitedSearchParams
    );
  }
  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {tagResponse.data.orderedDirs.map((orderedDir) => (
          <CategoryCollapsible
            key={orderedDir.dir.path}
            orderedDir={orderedDir}
          />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
};

export default ProjectSidebarGroupMenu;
