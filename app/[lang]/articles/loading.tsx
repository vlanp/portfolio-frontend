import { Skeleton } from "@/components/ui/skeleton";
import ArticleCardSkeleton from "../ui/exclusive/articles-page/article-card-skeleton";
import ArticlesPaginationSkeleton from "../ui/exclusive/articles-page/articles-pagination-skeleton";
import CategoryFilterCardSkeleton from "../ui/shared/category-filter-card-skeleton";
import PageContainer from "../ui/shared/page-container";
import { articlesPerPage } from "./page";

const Loading = () => {
  return (
    <PageContainer className="flex flex-col gap-5 items-center w-full">
      <CategoryFilterCardSkeleton />
      <div className="flex flex-row gap-2">
        <Skeleton className="w-[40px] h-[30px]" />
        <Skeleton className="w-[120px] h-[30px]" />
      </div>

      <div className="flex flex-col gap-2 w-full items-center">
        {[...Array(articlesPerPage)].map((i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
      <ArticlesPaginationSkeleton />
    </PageContainer>
  );
};

export default Loading;
