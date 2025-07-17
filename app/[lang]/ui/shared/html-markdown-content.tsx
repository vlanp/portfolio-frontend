import { IFileContent } from "@/types/IFileContent";
import { IFile } from "@/types/ITagContent";
import Link from "next/link";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import Image from "next/image";

const HtmlMarkdownContent = ({
  htmlContent,
  htmlMarkdownContentDict,
  title,
  subTitle,
  previousFile,
  previousFileUrl,
  nextFile,
  nextFileUrl,
  createdAt,
  updatedAt,
  img,
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
  ) &
  (
    | { createdAt: string; updatedAt: string }
    | { createdAt?: never; updatedAt?: never }
  ) &
  (
    | {
        img: {
          url: string;
          width: number;
          height: number;
          alt: string;
        };
      }
    | { img?: never }
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
        {createdAt && (
          <div className="flex flex-row w-full justify-between mt-5 text-muted-foreground">
            <p>
              {htmlMarkdownContentDict.PublishedOn} {createdAt}
            </p>
            <p>
              {htmlMarkdownContentDict.LastUpdatedOn} {updatedAt}
            </p>
          </div>
        )}
        <div className="border-t-1 w-full mb-4" />
        {img && (
          <Image
            className="mb-2"
            alt={img.alt}
            src={img.url}
            width={img.width}
            height={img.height}
          />
        )}
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
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
