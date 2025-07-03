import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import { ITimelineElement, ZTimelineDatas } from "@/types/ITimelineData";
import z from "zod/v4";
import { ILang } from "@/types/ILang";
import LeftSidebarBody from "./left-sidebar/left-sidebar-body";

const LeftSidebar = async ({
  timelineDict,
  lang,
  selectedElement,
}: {
  timelineDict: IDictionary["Timeline"];
  lang: ILang;
  selectedElement: ITimelineElement;
}) => {
  const timelineDatasResponse = await axios.get<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_TIMELINE_DATAS_NO_MD
  );
  const timelineDatasParseResult = getZApiSuccessResponse(
    ZTimelineDatas
  ).safeParse(timelineDatasResponse.data);
  if (!timelineDatasParseResult.success) {
    throw new Error(z.prettifyError(timelineDatasParseResult.error));
  }
  const timelineDatas = timelineDatasParseResult.data.data;

  return (
    <Sidebar variant="floating" className="top-header-height">
      <SidebarContent>
        <SidebarGroup className="min-h-full">
          <SidebarGroupContent>
            <SidebarMenu>
              <LeftSidebarBody
                timelineDatas={timelineDatas}
                timelineDict={timelineDict}
                lang={lang}
                selectedElement={selectedElement}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftSidebar;
