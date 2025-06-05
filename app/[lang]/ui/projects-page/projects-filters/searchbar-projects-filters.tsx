"use client";

import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { Input } from "@/components/ui/input";
import { constructNewUrl } from "@/lib/utils";
import { EProjectsPageSearchParamsKeys } from "@/types/IProjectsPageProps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchbarProjectsFilters = ({
  projectsDict,
}: {
  projectsDict: IDictionary["Projects"];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const param = urlSearchParams.get(EProjectsPageSearchParamsKeys.SEARCH);
  const handleTextChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newUrl = constructNewUrl(
        EProjectsPageSearchParamsKeys.SEARCH,
        e.target.value,
        pathname,
        urlSearchParams
      );
      router.replace(newUrl);
    },
    300
  );

  return (
    <div className="flex flex-col gap-5">
      <h6>{projectsDict.ProjectsFilters.SearchInProjects}</h6>
      <Input
        type="search"
        id="search-projects"
        placeholder={projectsDict.ProjectsFilters.SearchInProjectsPlaceholder}
        onChange={handleTextChange}
        defaultValue={param || undefined}
      />
    </div>
  );
};

export default SearchbarProjectsFilters;
