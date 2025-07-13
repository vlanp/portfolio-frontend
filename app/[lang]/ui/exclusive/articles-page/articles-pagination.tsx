import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { constructNewUrl, createURLSearchParams } from "@/lib/utils";
import IArticlesPageProps, {
  EArticlesPageSearchParamsKeys,
} from "@/types/IArticlesPageProps";

const ArticlesPagination = ({
  pathname,
  numberOfPages,
  searchParams,
  page,
}: {
  pathname: string;
  numberOfPages: number;
  searchParams: Awaited<IArticlesPageProps["searchParams"]>;
  page: number;
}) => {
  const urlSearchParams = createURLSearchParams(searchParams);
  const constructPageLink = (page: number) => {
    const newUrl = constructNewUrl(
      EArticlesPageSearchParamsKeys.PAGE,
      page.toString(),
      pathname,
      urlSearchParams
    );
    return newUrl;
  };
  const constructPagination = () => {
    const maxVisiblePages = 6; // A number less than 6 will have no effect
    const siblingCount = 1;

    const items = [];

    if (numberOfPages <= maxVisiblePages) {
      for (let i = 1; i <= numberOfPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={constructPageLink(i)} isActive={i === page}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={constructPageLink(1)} isActive={1 === page}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      let startPage = Math.max(2, page - siblingCount);
      let endPage = Math.min(numberOfPages - 1, page + siblingCount);

      if (page <= 3) {
        endPage = Math.min(numberOfPages - 1, 5);
      } else if (page >= numberOfPages - 2) {
        startPage = Math.max(2, numberOfPages - 4);
      }

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={constructPageLink(i)} isActive={i === page}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < numberOfPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (numberOfPages > 1) {
        items.push(
          <PaginationItem key={numberOfPages}>
            <PaginationLink
              href={constructPageLink(numberOfPages)}
              isActive={numberOfPages === page}
            >
              {numberOfPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items.length > 1 ? (
      <Pagination className="my-10">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={constructPageLink(page - 1)} />
            </PaginationItem>
          )}
          {items}
          {page < numberOfPages && (
            <PaginationItem>
              <PaginationNext href={constructPageLink(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    ) : undefined;
  };
  return constructPagination();
};

export default ArticlesPagination;
