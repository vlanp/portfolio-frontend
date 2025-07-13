import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LiaFilterSolid } from "react-icons/lia";
import { LuChevronDown } from "react-icons/lu";

const CategoryFilterCardSkeleton = () => {
  return (
    <Card className="flex grow max-w-[1024px] h-fit w-full">
      <CardHeader>
        <CardTitle>
          <h5 className="flex flex-row items-center gap-2">
            <LiaFilterSolid size={30} />
            <Skeleton className="w-60 max-w-full h-[30px]" />
          </h5>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {[...Array(5)].map((v) => {
          return (
            <div
              key={v}
              className="flex flex-row items-center h-[30px] m-[10px] gap-2"
            >
              <Skeleton className="flex-1 h-full" />
              <Skeleton className="" />
              <Skeleton className="flex rounded-full aspect-square h-full p-2" />
              <LuChevronDown />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CategoryFilterCardSkeleton;
