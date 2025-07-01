import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { titleContainerSizePx } from "./timeline-container";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import TimelineElementBodySkeleton from "./timeline-element/timeline-element-body-skeleton";

const TimelineElementSkeleton = () => {
  return (
    <div className={cn("flex flex-col w-[200px]")}>
      <Card
        className="flex flex-col justify-center w-full"
        style={{ height: `${titleContainerSizePx}px` }}
      >
        <CardHeader className="flex flex-row justify-center">
          <Skeleton className={cn("p-2 rounded-full w-[40px] h-[40px]")} />
        </CardHeader>
        <CardContent className="flex justify-center">
          <Skeleton className="w-1/2 h-[20px]" />
        </CardContent>
      </Card>
      <div className="relative flex flex-col flex-1">
        <TimelineElementBodySkeleton />
      </div>
    </div>
  );
};

export default TimelineElementSkeleton;
