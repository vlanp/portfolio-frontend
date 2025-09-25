"use client";

import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { cn, constructNewUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import {
  getTimelineElementDictKey,
  ITimelineElement,
  ZETimelineElements,
} from "@/types/ITimelineData";
import { ETimelineDataPageSearchParamsKeys } from "@/types/ITimelineDataPageProps";

export function TimelineElementCombobox({
  disabled,
  timelineDict,
  selectedElement,
}: {
  disabled?: boolean;
  timelineDict: IDictionary["Timeline"];
  selectedElement: ITimelineElement;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  const handleElementSelection = async (el: string) => {
    const newUrl = constructNewUrl(
      ETimelineDataPageSearchParamsKeys.EL,
      el,
      pathname,
      urlSearchParams
    );
    router.push(newUrl);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit min-w-[150px] max-w-full justify-between self-center truncate flex flex-row"
        >
          <span className="self-center text-center flex-1">
            {selectedElement &&
              timelineDict[
                getTimelineElementDictKey(selectedElement as ITimelineElement)
              ]}
          </span>
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {ZETimelineElements.options.map((element) => (
                <CommandItem
                  key={element}
                  disabled={disabled}
                  value={element}
                  onSelect={() => {
                    handleElementSelection(element);
                  }}
                >
                  {timelineDict[getTimelineElementDictKey(element)]}
                  <LuCheck
                    className={cn(
                      "ml-auto",
                      selectedElement === element ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
