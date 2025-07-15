import { ILang } from "@/types/ILang";
import PageContainer from "./ui/shared/page-container";
import Image from "next/image";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import { ZPicture } from "@/types/IPicture";
import { z } from "zod/v4";
import { IDictionary } from "./dictionaries/generated";
import { getDictionary } from "./dictionaries";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { headers } from "next/headers";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: ILang }>;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }

  const mainPictureResponse = await axios.get(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_MAIN_PICTURE_URL
  );

  const awaitedParams = await params;

  const lang = awaitedParams.lang;

  const homePageDict: IDictionary["About"] = (await getDictionary(lang)).About;

  const mainPictureParseResult = getZApiSuccessResponse(ZPicture).safeParse(
    mainPictureResponse.data
  );

  if (!mainPictureParseResult.success) {
    throw new Error(z.prettifyError(mainPictureParseResult.error));
  }

  const mainPicture = mainPictureParseResult.data.data;

  return (
    <PageContainer
      inCard
      className="flex flex-col-reverse lg:flex-row grow xl:w-[1280px] xl:self-center gap-5"
    >
      <section className="flex-3 text-center">
        <h1>{homePageDict.MainTitle}</h1>
        <p className="text-muted-foreground font-bold text-lg text-center">
          {homePageDict.MainSubTitle}
        </p>
        <div className="border-t-1 w-full mb-4" />
        <h2>{homePageDict.WhoAmI}</h2>
        <h3>{homePageDict.TitleP1}</h3>
        <p className="text-justify">{homePageDict.DescriptionP2}</p>
        <h3>{homePageDict.TitleP3}</h3>
        <p className="text-justify">{homePageDict.DescriptionP4}</p>
        <p className="text-justify">{homePageDict.DescriptionP5}</p>
        <h3>{homePageDict.TitleP6}</h3>
        <p className="text-justify">{homePageDict.DescriptionP7}</p>
        <p className="text-justify">{homePageDict.DescriptionP8}</p>
      </section>
      <section className="flex flex-col flex-2 justify-center items-center gap-5">
        <Image
          src={mainPicture.url}
          width={mainPicture.originalWidth}
          height={mainPicture.originalHeight}
          alt={"Author picture"}
          className="rounded-2xl"
        />
        <div className="flex flex-col gap-3">
          <Link
            href={checkedEnv.NEXT_PUBLIC_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2"
          >
            <SiGithub color="white" className="size-6" />
            <span>{checkedEnv.NEXT_PUBLIC_GITHUB_URL}</span>
          </Link>
          <Link
            href={checkedEnv.NEXT_PUBLIC_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2"
          >
            <SiLinkedin color={"#0A66C2"} className="size-6" />
            <span>{checkedEnv.NEXT_PUBLIC_LINKEDIN_URL}</span>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
