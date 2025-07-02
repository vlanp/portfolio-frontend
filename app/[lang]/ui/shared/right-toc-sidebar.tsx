import { IDictionary } from "@/app/[lang]/dictionaries/generated";
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
import IDocToC from "@/types/IDocToc";
import Link from "next/link";

const RightTocSidebar = ({
  rightTocSidebarDict,
  tableOfContents,
}: {
  rightTocSidebarDict: IDictionary["shared"]["RightTocSidebar"];
  tableOfContents: IDocToC[];
}) => {
  return (
    <Sidebar side="right" variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupLabel>{rightTocSidebarDict.Title}</SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {tableOfContents
                .filter((it) => it.level === 1)
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

export default RightTocSidebar;
