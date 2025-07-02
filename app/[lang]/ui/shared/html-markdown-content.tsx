import { IFileContent } from "@/types/IFileContent";
import { IFile } from "@/types/ITagContent";
import Link from "next/link";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";

const HtmlMarkdownContent = async ({
  htmlContent,
  htmlMarkdownContentDict,
  title,
  subTitle,
  previousFile,
  previousFileUrl,
  nextFile,
  nextFileUrl,
}: {
  htmlContent: IFileContent<unknown>["htmlContent"];
  htmlMarkdownContentDict: IDictionary["shared"]["HtmlMarkdownContent"];
  nextFile?: IFile;
  title: string;
  subTitle?: string;
} & (
  | { previousFile: IFile; previousFileUrl: string }
  | { previousFile?: never; previousFileUrl?: never }
) &
  (
    | { nextFile: IFile; nextFileUrl: string }
    | { nextFile?: never; nextFileUrl?: never }
  )) => {
  return (
    <section className="justify-center py-5">
      <div className="max-w-6xl flex-1 flex flex-col items-center px-4">
        <h1 className="text-center">{title}</h1>
        {subTitle && (
          <p className="text-muted-foreground font-bold text-lg text-center">
            {subTitle}
          </p>
        )}
        <div className="border-t-1 w-full mb-4" />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <div className="flex flex-row justify-between w-full m-20">
          <div className="max-w-60">
            {previousFile && (
              <>
                <p className="text-muted-foreground font-bold text-sm tracking-wider">
                  {htmlMarkdownContentDict.Previous.toUpperCase()}
                </p>
                <Link className="text-xl" href={previousFileUrl}>
                  {previousFile.matterContent.title}
                </Link>
              </>
            )}
          </div>
          <div className="max-w-60">
            {nextFile && (
              <>
                <p className="text-muted-foreground font-bold text-sm tracking-wider">
                  {htmlMarkdownContentDict.Next.toUpperCase()}
                </p>
                <Link className="text-xl" href={nextFileUrl}>
                  {nextFile.matterContent.title}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HtmlMarkdownContent;
