import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ArticleCardSkeleton = () => {
  return (
    <Card className="py-2 hover:cursor-pointer max-w-[1024px] w-full">
      <CardContent className="md:h-[250px] flex flex-row gap-5 items-center w-full">
        <div className="flex flex-col flex-2 h-full gap-2 w-full">
          <div className="flex flex-col h-[80px] md:flex-1 gap-2">
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1 w-1/3 self-center" />
          </div>
          <div className="w-1/2 self-center block md:hidden">
            <Skeleton className="w-full h-full aspect-video" />
          </div>
          <div className="flex flex-col h-[80px] md:flex-1 gap-1">
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
          </div>
          <Skeleton className="h-[30px] w-[70px] self-center md:self-start bg-primary" />
          <div className="flex flex-row gap-4 justify-center md:justify-start">
            <Skeleton className="w-[150px] h-[20px]" />
            <Skeleton className="w-[150px] h-[20px]" />
          </div>
        </div>
        <div className="flex-col flex-1 md:block hidden">
          <Skeleton className="w-full aspect-video" />
        </div>
      </CardContent>
    </Card>
  );
};
export default ArticleCardSkeleton;
