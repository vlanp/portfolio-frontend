"use client";

import { ILang } from "@/types/ILang";
import { useTheme } from "next-themes";

const ResumeIframe = ({ lang }: { lang: ILang }) => {
  const { theme } = useTheme() || "";
  return (
    <iframe
      src={`https://generated-cv.netlify.app/${lang}/${theme}`}
      width="100%"
      height="100%"
      title="CV"
      className="grow"
    />
  );
};

export default ResumeIframe;
