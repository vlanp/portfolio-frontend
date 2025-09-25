import { ZTimelineDatas } from "@/types/ITimelineData";
import PageContainer from "../ui/shared/page-container";
import Timeline from "../ui/exclusive/timeline-page/timeline";
import { ILang } from "@/types/ILang";
import { IDictionary } from "../dictionaries/generated";
import { getDictionary } from "../dictionaries";
import checkedEnv from "@/lib/checkEnv";
import axios from "axios";
import { z } from "zod/v4";
import { getZApiSuccessResponse } from "@/types/IApiResponse";

const TimelinePage = async ({
  params,
}: {
  params: Promise<{ lang: ILang }>;
}) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const timelineDict: IDictionary["Timeline"] = (await getDictionary(lang))
    .Timeline;
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
    <PageContainer className="flex grow justify-center">
      <Timeline
        timelineDatas={timelineDatas}
        timelineDict={timelineDict}
        lang={lang}
      />
    </PageContainer>
  );
};

export default TimelinePage;
