import IArticlesPageProps, {
  EArticlesPageSearchParamsKeys,
} from "@/types/IArticlesPageProps";
import CategoryFilterCard from "../ui/shared/category-filter-card";
import PageContainer from "../ui/shared/page-container";
import { getDictionary } from "../dictionaries";
import { ZCategories } from "@/types/ICategories";
import { createURLSearchParams, searchParamsValueArray } from "@/lib/utils";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import { z } from "zod/v4";
import { ZArticleNoMd } from "@/types/IArticle";
import ArticleCard from "../ui/exclusive/articles-page/article-card";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ArticlesPagination from "../ui/exclusive/articles-page/articles-pagination";

const ArticlesPage = async ({ params, searchParams }: IArticlesPageProps) => {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");
  if (!pathname) {
    throw new Error("No pathname found in headers");
  }
  const referer = headersList.get("referer");
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const awaitedSearchParams = await searchParams;
  const filters = searchParamsValueArray(
    awaitedSearchParams,
    EArticlesPageSearchParamsKeys.FILTERS
  );
  const expanded = searchParamsValueArray(
    awaitedSearchParams,
    EArticlesPageSearchParamsKeys.EXPANDED
  );
  const dict = await getDictionary(lang);
  const categoryFilterCardDict = dict.shared.CategoryFilterCardDict;
  const articlesDict = dict.Articles;
  const articleCardDict = dict.Articles.ArticleCard;
  const articlesCategoriesResponse = await axios.get(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_ARTICLES_CATEGORIES
  );
  const articlesCategoriesParseResult = getZApiSuccessResponse(
    ZCategories
  ).safeParse(articlesCategoriesResponse.data);
  if (!articlesCategoriesParseResult.success) {
    throw new Error(z.prettifyError(articlesCategoriesParseResult.error));
  }
  const articlesCategories = articlesCategoriesParseResult.data.data;
  const categoryParams = createURLSearchParams({ categoryId: filters });

  const articlesNoMdResponse = await axios
    .get(
      checkedEnv.NEXT_PUBLIC_BACKEND_URL +
        checkedEnv.NEXT_PUBLIC_GET_ARTICLES_NO_MD,
      { params: categoryParams }
    )
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        if (referer) {
          redirect(referer);
        } else if (pathname) {
          redirect(pathname);
        } else {
          redirect("/");
        }
      } else {
        throw error;
      }
    });

  const articlesNoMdParseResult = getZApiSuccessResponse(
    z.array(ZArticleNoMd)
  ).safeParse(articlesNoMdResponse.data);

  if (!articlesNoMdParseResult.success) {
    throw new Error(z.prettifyError(articlesNoMdParseResult.error));
  }

  const articlesNoMd = articlesNoMdParseResult.data.data;

  return (
    <PageContainer className="flex flex-col gap-5 items-center">
      <CategoryFilterCard
        categoryFilterCardDict={categoryFilterCardDict}
        categories={articlesCategories}
        method="UrlSearchParams"
        searchParams={awaitedSearchParams}
        valueSearchParamKey={EArticlesPageSearchParamsKeys.FILTERS}
        expandedSearchParamKey={EArticlesPageSearchParamsKeys.EXPANDED}
        value={filters}
        expanded={expanded}
      />
      <span>
        {articlesDict.NbArticlesFound({
          nbArticles: articlesNoMd.length.toString(),
        })}
      </span>
      <div className="flex flex-col gap-2">
        {articlesNoMd.map((articleNoMd) => (
          <ArticleCard
            article={articleNoMd}
            key={articleNoMd._id}
            lang={lang}
            articleCardDict={articleCardDict}
            pathname={pathname}
          />
        ))}
      </div>
      <ArticlesPagination
        pathname={pathname}
        numberOfPages={6}
        searchParams={awaitedSearchParams}
        referer={referer}
      />
    </PageContainer>
  );
};

export default ArticlesPage;
