import { Skeleton } from "@/components/ui/skeleton";
import { LuChevronLeft, LuChevronRight, LuEllipsis } from "react-icons/lu";

const ArticlesPaginationSkeleton = () => {
  return (
    <div className="flex flex-row gap-2 my-10 items-center">
      <LuChevronLeft />
      <Skeleton className="w-[60px] h-[30px]" />
      <Skeleton className="w-[30px] h-[30px]" />
      <LuEllipsis />
      <Skeleton className="w-[30px] h-[30px]" />
      <LuEllipsis />
      <Skeleton className="w-[30px] h-[30px]" />
      <Skeleton className="w-[60px] h-[30px]" />
      <LuChevronRight />
    </div>
  );
};

export default ArticlesPaginationSkeleton;
