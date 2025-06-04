import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LuChevronDown } from "react-icons/lu";
import TechnologiesSectionSkeleton from "./project-tabs/technologies-section-skeleton";

function ProjectTabsSkeleton() {
  return (
    <Card className="w-full h-fit max-w-[600px] mx-auto shadow-lg border-2 hover:shadow-xl transition-shadow duration-300 py-4">
      <CardContent className="px-4 sm:px-6">
        <div className="text-center mb-3">
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <div className="flex items-center justify-center gap-1 md:gap-3">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs bg-secondary">
              <Skeleton className="h-3 w-3 mr-1" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs">
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex flex-1 items-center bg-muted p-0.5 md:p-1 h-7 md:h-10 rounded-md">
            <div className="px-1.5 md:px-4 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center gap-1 md:gap-2 h-6 md:h-8 rounded-sm bg-background mr-1 last:mr-0 flex-1">
              <Skeleton className="hidden md:block w-4 h-4" />
              <Skeleton className="h-3 flex-1" />
            </div>
            <div className="px-1.5 md:px-4 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center gap-1 md:gap-2 h-6 md:h-8 rounded-sm bg-background mr-1 last:mr-0 flex-1">
              <Skeleton className="hidden md:block w-4 h-4" />
              <Skeleton className="h-3 flex-1" />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-7 md:h-10 px-1.5 md:px-3 text-xs md:text-sm ml-2"
            disabled
          >
            <Skeleton className="h-3 w-4 mr-1" />
            <LuChevronDown className="h-2 w-2 md:h-4 md:w-4 opacity-30" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-sm border flex items-center justify-center">
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>

          <Card className="flex border-muted justify-between py-4 gap-2">
            <CardHeader className="flex justify-center">
              <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-lg">
                <Skeleton className="h-6 w-32" />
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs bg-secondary">
                  <Skeleton className="h-3 w-12" />
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col space-y-3 pt-0 flex-1 justify-between px-4 sm:px-6">
              <div className="text-center min-h-12 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>

              <TechnologiesSectionSkeleton />

              <div>
                <Skeleton className="h-5 w-20 mx-auto mb-2" />
                <div className="flex flex-wrap gap-1 justify-center">
                  {[1, 2].map((index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-md border px-2.5 py-1 text-sm gap-2"
                    >
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <Skeleton className="h-5 w-24 mx-auto mb-2" />
                <div className="flex gap-2 h-8">
                  <Button className="flex-1" disabled>
                    <Skeleton className="w-6 h-6 mr-2" />
                    <Skeleton className="hidden md:block h-4 w-8" />
                  </Button>
                  <Button variant="outline" className="flex-1" disabled>
                    <Skeleton className="w-6 h-6 mr-2" />
                    <Skeleton className="hidden md:block h-4 w-12" />
                  </Button>
                  <Button variant="outline" className="flex-1" disabled>
                    <Skeleton className="w-6 h-6 mr-2" />
                    <Skeleton className="hidden md:block h-4 w-16" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectTabsSkeleton;
