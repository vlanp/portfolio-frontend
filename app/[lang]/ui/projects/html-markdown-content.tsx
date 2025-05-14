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
    <section className="prose prose-neutral prose-img:rounded-xl prose-a:text-blue-600 dark:prose-invert lg:prose-xl">
      <div className="mt-5 max-w-6xl flex flex-col items-center px-4">
        <h1>{fileContent.matterContent.title}</h1>
        <p>{fileContent.matterContent.description}</p>
        <p dangerouslySetInnerHTML={{ __html: fileContent.htmlContent }} />
      </div>
    </section>
  );
};

export default HtmlMarkdownContent;
