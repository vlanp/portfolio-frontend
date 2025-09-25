import { ILang } from "@/types/ILang";
import ResumeIframe from "../ui/exclusive/resume-page/resume-iframe";

const ResumePage = async ({ params }: { params: Promise<{ lang: ILang }> }) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  return <ResumeIframe lang={lang} />;
};

export default ResumePage;
