"use client";

import IFileContent from "@/types/IFileContent";
import hljs from "highlight.js";

import { useEffect } from "react";

const HtmlMarkdownContent = ({
  fileContent,
}: {
  fileContent: IFileContent;
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [fileContent.htmlContent]);

  return (
    <section className="max-w-full flex flex-1 justify-center py-5">
      <div className="max-w-6xl flex-1 flex flex-col items-center px-4">
        <h1>{fileContent.matterContent.title}</h1>
        <p className="text-muted-foreground font-bold text-lg">
          {fileContent.matterContent.description}
        </p>
        <div className="border-t-1 w-full mb-4" />
        <div dangerouslySetInnerHTML={{ __html: fileContent.htmlContent }} />
      </div>
    </section>
  );
};

export default HtmlMarkdownContent;
