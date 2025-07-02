import checkedEnv from "@/lib/checkEnv";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import { getZFileContent } from "@/types/IFileContent";
import ITimelineDataPageProps from "@/types/ITimelineDataPageProps";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

const TimelineDataPage = async ({ params }: ITimelineDataPageProps) => {
  const awaitedParams = await params;
  const id = awaitedParams.id;
  const lang = awaitedParams.lang;

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  if (!pathname) {
    throw new Error("No pathname found in headers");
  }

  const fileContentResponse = await axios
    .get<unknown>(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_TIMELINE_DATA_MD_CONTENT.replace("{id}", id)
    )
    .catch((error: Error | AxiosError) => {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 400)
      ) {
        // TODO : Maybe use notfound()
        redirect(pathname.replace("/" + id, ""));
      } else {
        throw error;
      }
    });

  const fileContentParseResult = getZApiSuccessResponse(
    getZFileContent(z.unknown())
  ).safeParse(fileContentResponse.data);

  if (!fileContentParseResult.success) {
    throw new Error(z.prettifyError(fileContentParseResult.error));
  }

  const fileContent = fileContentParseResult.data.data;

  return <p>{}</p>;
};

export default TimelineDataPage;
