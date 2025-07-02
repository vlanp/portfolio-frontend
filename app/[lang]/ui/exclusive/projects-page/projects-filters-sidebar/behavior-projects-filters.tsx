"use client";

import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { constructNewUrl } from "@/lib/utils";
import { EProjectsPageSearchParamsKeys } from "@/types/IProjectsPageProps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BehaviorProjectsFilters = ({
  projectsDict,
}: {
  projectsDict: IDictionary["Projects"];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const param = urlSearchParams.get(
    EProjectsPageSearchParamsKeys.FILTERS_BEHAVIOR
  );

  const handleSelection = (newValue: string) => {
    const newUrl = constructNewUrl(
      EProjectsPageSearchParamsKeys.FILTERS_BEHAVIOR,
      newValue,
      pathname,
      urlSearchParams
    );
    router.replace(newUrl);
  };

  return (
    <div className="flex flex-col gap-5">
      <h6>{projectsDict.ProjectsFilters.FiltersBehavior}</h6>
      <RadioGroup
        defaultValue={param || "union"}
        className="flex flex-row gap-10 flex-wrap"
        onValueChange={handleSelection}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="union" id="project-filters-union" />
              <Label htmlFor="project-filters-union">
                {projectsDict.ProjectsFilters.Union}
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-[200px]">
            {projectsDict.ProjectsFilters.FiltersUnionTooltip}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="intersection"
                id="project-filters-intersection"
              />
              <Label htmlFor="project-filters-intersection">
                {projectsDict.ProjectsFilters.Intersection}
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-[200px]">
            {projectsDict.ProjectsFilters.FiltersIntersectionTooltip}
          </TooltipContent>
        </Tooltip>
      </RadioGroup>
    </div>
  );
};

export default BehaviorProjectsFilters;
