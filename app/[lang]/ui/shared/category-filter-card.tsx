"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDictionary } from "../../dictionaries/generated";
import { LiaFilterSolid } from "react-icons/lia";
import { getParentId, ICategories, isChild } from "@/types/ICategories";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { cn, constructNewUrl, createURLSearchParams } from "@/lib/utils";
import { LuChevronRight, LuChevronDown } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

const CategoryFilterCard = ({
  categoryFilterCardDict,
  categories,
  value,
  setValue,
  expanded,
  setExpanded,
  method,
  searchParams,
  valueSearchParamKey,
  expandedSearchParamKey,
}: {
  categoryFilterCardDict: IDictionary["shared"]["CategoryFilterCardDict"];
  categories: ICategories;
} & (
  | {
      method: "UrlSearchParams";
      searchParams: Record<string, string | string[]>;
      valueSearchParamKey: string;
      expandedSearchParamKey: string;
      value: string[];
      setValue?: undefined;
      expanded: string[];
      setExpanded?: undefined;
    }
  | ({
      method: "StatesHooks";
      searchParams?: undefined;
      valueSearchParamKey?: undefined;
      expandedSearchParamKey?: undefined;
    } & (
      | { value?: undefined; setValue?: undefined }
      | {
          value: string[];
          setValue: Dispatch<SetStateAction<string[]>>;
        }
    ) &
      (
        | { expanded?: undefined; setExpanded?: undefined }
        | {
            expanded: string[];
            setExpanded: Dispatch<SetStateAction<string[]>>;
          }
      ))
)) => {
  const [_selectedCategories, _setSelectedCategories] = useState<string[]>(
    value || []
  );
  const [_expandedCategories, _setExpandedCategories] = useState<string[]>(
    expanded || []
  );
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategories = value ? value : _selectedCategories;
  const setSelectedCategories = setValue ? setValue : _setSelectedCategories;
  const expandedCategories = expanded ? expanded : _expandedCategories;
  const setExpandedCategories = setExpanded
    ? setExpanded
    : _setExpandedCategories;

  const handleClick = (id: string) => {
    if (method === "StatesHooks") {
      handleStates(id, setSelectedCategories, setExpandedCategories);
    } else {
      handleUrlSearchParams(
        id,
        searchParams,
        valueSearchParamKey,
        expandedSearchParamKey
      );
    }
  };

  const handleStates = (
    id: string,
    setSelectedCategories: Dispatch<SetStateAction<string[]>>,
    setExpandedCategories: Dispatch<SetStateAction<string[]>>
  ) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories((p) => p.filter((sc) => sc !== id));
    } else {
      const parentId = getParentId(categories, id);
      setSelectedCategories((p) => [...p.filter((sc) => sc !== parentId), id]);
      if (!expandedCategories.includes(id)) {
        setExpandedCategories((p) => [...p, id]);
      }
    }
  };

  const handleUrlSearchParams = (
    id: string,
    searchParams: Record<string, string | string[]>,
    valueSearchParamKey: string,
    expandedSearchParamKey: string
  ) => {
    const urlSearchParams = createURLSearchParams(searchParams);
    if (selectedCategories.includes(id)) {
      const ids = selectedCategories.filter((it) => it !== id);
      const newUrl = constructNewUrl(
        valueSearchParamKey,
        ids,
        pathname,
        urlSearchParams
      );
      router.replace(newUrl);
    } else {
      const parentId = getParentId(categories, id);
      const selectedCategoriesIds = [
        ...selectedCategories.filter((sc) => sc !== parentId),
        id,
      ];
      if (!expandedCategories.includes(id)) {
        const modifiedUrlSearchParams = constructNewUrl(
          valueSearchParamKey,
          selectedCategoriesIds,
          pathname,
          urlSearchParams,
          {
            returnUrlSearchParams: true,
          }
        );
        const expandedCategoriesIds = [...expandedCategories, id];
        const newUrl = constructNewUrl(
          expandedSearchParamKey,
          expandedCategoriesIds,
          pathname,
          modifiedUrlSearchParams
        );
        router.replace(newUrl);
      } else {
        const newUrl = constructNewUrl(
          valueSearchParamKey,
          selectedCategoriesIds,
          pathname,
          urlSearchParams
        );
        router.replace(newUrl);
      }
    }
  };

  const handleChevronClick = (id: string) => {
    if (!expandedCategories.includes(id)) {
      if (method === "UrlSearchParams") {
        const urlSearchParams = createURLSearchParams(searchParams);
        const ids = [...expandedCategories, id];
        const newUrl = constructNewUrl(
          expandedSearchParamKey,
          ids,
          pathname,
          urlSearchParams
        );
        router.replace(newUrl);
      } else {
        setExpandedCategories((p) => [...p, id]);
      }
    } else {
      if (method === "UrlSearchParams") {
        const urlSearchParams = createURLSearchParams(searchParams);
        const ids = expandedCategories.filter((it) => it !== id);
        const newUrl = constructNewUrl(
          expandedSearchParamKey,
          ids,
          pathname,
          urlSearchParams
        );
        router.replace(newUrl);
      } else {
        setExpandedCategories((p) => p.filter((it) => it !== id));
      }
    }
  };

  const constructFiltersComp = (categories: ICategories) => {
    const constructRecursively = (
      filters: string[],
      iter: number,
      prevCategory?: ICategories[string]
    ) => {
      const compContent: JSX.Element[] = [];
      filters.forEach((filter) => {
        const currentCategory =
          prevCategory?.childCategories[filter] || categories[filter];
        const nextFilters = Object.keys(currentCategory.childCategories);
        const someChildAreSelected = selectedCategories.some((sc) =>
          isChild(categories, currentCategory.id, sc)
        );
        compContent.push(
          <div key={currentCategory.id}>
            <div className="flex flex-row items-center h-[40px] m-[10px] gap-2">
              <span
                className={cn(
                  "flex flex-1 h-full items-center overflow-hidden rounded-md px-2 text-left ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50",
                  selectedCategories.includes(currentCategory.id) &&
                    "bg-sidebar-accent text-sidebar-accent-foreground",
                  !someChildAreSelected &&
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:cursor-pointer"
                )}
                style={{ marginLeft: 2 * iter * 10 }}
                onClick={() =>
                  someChildAreSelected
                    ? undefined
                    : handleClick(currentCategory.id)
                }
              >
                {filter}
              </span>
              <span className="flex items-center justify-center bg-accent rounded-full aspect-square h-full p-2">
                {currentCategory.numberOfElements}
              </span>
              <div className="flex items-center h-full text-xl px-2 aspect-square">
                {nextFilters.length !== 0 &&
                  (expandedCategories.includes(currentCategory.id) ? (
                    <LuChevronDown
                      className="hover:cursor-pointer"
                      onClick={() => handleChevronClick(currentCategory.id)}
                    />
                  ) : (
                    <LuChevronRight
                      className="hover:cursor-pointer"
                      onClick={() => handleChevronClick(currentCategory.id)}
                    />
                  ))}
              </div>
            </div>
            <div
              className={cn(
                !expandedCategories.includes(currentCategory.id) && "hidden"
              )}
            >
              {...constructRecursively(nextFilters, iter + 1, currentCategory)}
            </div>
          </div>
        );
      });
      return compContent;
    };

    const filters = Object.keys(categories);

    return constructRecursively(filters, 0);
  };

  return (
    <Card className="flex w-full max-w-[1024px] h-fit">
      <CardHeader>
        <CardTitle>
          <h5 className="flex flex-row items-center gap-2">
            <LiaFilterSolid size={30} />
            {categoryFilterCardDict.Title}
          </h5>
        </CardTitle>
      </CardHeader>
      <CardContent>{constructFiltersComp(categories)}</CardContent>
    </Card>
  );
};

export default CategoryFilterCard;
