import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import IProjectPageProps from "@/types/IProjectPageProps";
import { getDictionary, IDictionary } from "../../dictionaries";
import IDocToC from "@/types/IDocToc";
import Link from "next/link";

const ProjectRightSidebar = async ({
  lang,
  tableOfContents,
}: {
  lang: Awaited<IProjectPageProps["params"]>["lang"];
  tableOfContents: IDocToC[];
}) => {
  const dict: IDictionary = await getDictionary(lang);
  return (
    <Sidebar side="right" variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupLabel>
            {dict.RightProjectSidebar.Title}
          </SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {tableOfContents
                .filter((it) => it.parent === null)
                .map((docToc) => (
                  <SidebarMenuItem key={docToc.id}>
                    <SidebarMenuButton asChild>
                      <Link href={docToc.url}>{docToc.title}</Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {tableOfContents
                        .filter((it) => it.parent?.id === docToc.id)
                        .map((it) => (
                          <SidebarMenuSubItem key={it.id}>
                            <SidebarMenuSubButton asChild>
                              <Link href={it.url}>{it.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectRightSidebar;
