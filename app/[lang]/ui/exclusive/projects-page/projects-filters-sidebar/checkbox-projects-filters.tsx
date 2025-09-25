"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { constructNewUrl } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CheckboxProjectsFilters = ({
  elements,
  categoryName,
  searchParamsKey,
}: {
  elements: string[];
  categoryName: string;
  searchParamsKey: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const params = urlSearchParams.getAll(searchParamsKey);

  const handleCheckedChange = (checkedState: CheckedState, element: string) => {
    const newUrl = constructNewUrl(
      searchParamsKey,
      checkedState === true ? element : "",
      pathname,
      urlSearchParams,
      {
        append: true,
        oldParamValue: element,
      }
    );
    router.replace(newUrl);
  };

  return (
    elements.length > 0 && (
      <div className="flex flex-col gap-5">
        <h6>{categoryName}</h6>
        <div className="flex flex-row gap-5 flex-wrap">
          {elements.map((element) => {
            return (
              <div className="flex items-center gap-2 min-w-30" key={element}>
                <Checkbox
                  id={"checkbox-" + element}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(checked, element)
                  }
                  defaultChecked={params.includes(element) ? true : false}
                />
                <Label htmlFor={"checkbox-" + element}>{element}</Label>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default CheckboxProjectsFilters;
