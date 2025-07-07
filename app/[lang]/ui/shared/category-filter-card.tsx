"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDictionary } from "../../dictionaries/generated";
import { LiaFilterSolid } from "react-icons/lia";
import { getParentId, ICategories, isChild } from "@/types/ICategories";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { LuChevronRight, LuChevronDown } from "react-icons/lu";

const CategoryFilterCard = ({
  categoryFilterCardDict,
  categories,
  value,
  setValue,
}: {
  categoryFilterCardDict: IDictionary["shared"]["CategoryFilterCardDict"];
  categories: ICategories;
} & (
  | { value?: undefined; setValue?: undefined }
  | { value: string[]; setValue: Dispatch<SetStateAction<string[]>> }
)) => {
  const [_selectedCategories, _setSelectedCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const setSelectedCategories = setValue ? setValue : _setSelectedCategories;
  const selectedCategories = value ? value : _selectedCategories;

  const handleClick = (id: string) => {
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

  const handleChevronClick = (id: string) => {
    if (!expandedCategories.includes(id)) {
      setExpandedCategories((p) => [...p, id]);
    } else {
      setExpandedCategories((p) => p.filter((it) => it !== id));
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
            <div className="flex flex-row items-center">
              <p
                className={cn(
                  "flex-1 overflow-hidden rounded-md p-2 text-left ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50",
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
              </p>
              {nextFilters.length !== 0 &&
                (expandedCategories.includes(currentCategory.id) ? (
                  <div className="flex h-full text-xl px-2">
                    <LuChevronDown
                      className="hover:cursor-pointer"
                      onClick={() => handleChevronClick(currentCategory.id)}
                    />
                  </div>
                ) : (
                  <div className="flex h-full text-xl px-2">
                    <LuChevronRight
                      className="hover:cursor-pointer"
                      onClick={() => handleChevronClick(currentCategory.id)}
                    />
                  </div>
                ))}
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
    <Card className="flex grow max-w-[1024px] h-fit">
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
