"use client";

import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IArticleNoMd } from "@/types/IArticle";
import { ILang } from "@/types/ILang";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ArticleCard = ({
  article,
  lang,
  articleCardDict,
  pathname,
}: {
  article: IArticleNoMd;
  lang: ILang;
  articleCardDict: IDictionary["Articles"]["ArticleCard"];
  pathname: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(pathname + "/" + article._id);
  };
  return (
    <Card
      className="py-2 hover:cursor-pointer max-w-[1024px]"
      onClick={handleClick}
    >
      <CardContent className="md:h-[250px] flex flex-row gap-5 items-center">
        <div className="flex flex-col flex-2 h-full gap-2">
          <div className="flex-1">
            <h4 className="text-center md:text-left line-clamp-3 md:line-clamp-2">
              {article.title[lang]}
            </h4>
          </div>
          <div className="w-1/2 self-center block md:hidden">
            <Image
              className="w-full h-full object-cover rounded-lg"
              alt={article.title[lang]}
              src={article.imgUrl}
              width={article.imgWidth}
              height={article.imgHeight}
            />
          </div>
          <div className="flex-1">
            <p className="flex-1 text-muted-foreground md:line-clamp-3 text-justify">
              {article.description[lang]}
            </p>
          </div>
          <Badge className="self-center md:self-start">
            {article.category}
          </Badge>
          <div className="flex flex-row gap-4">
            <p className="text-xs text-muted-foreground text-center">
              {articleCardDict.PublishedOn}{" "}
              {new Date(article.createdAt).toLocaleDateString(lang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              {articleCardDict.LastUpdatedOn}{" "}
              {new Date(article.updatedAt).toLocaleDateString(lang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex-col flex-1 md:block hidden">
          <Image
            className="object-cover rounded-lg"
            alt={article.title[lang]}
            src={article.imgUrl}
            width={article.imgWidth}
            height={article.imgHeight}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default ArticleCard;
