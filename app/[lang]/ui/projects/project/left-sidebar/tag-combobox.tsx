"use client";

import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { cn, constructNewUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
import { IOctokitTagsResponse } from "@/types/ITagContent";
import { EProjectPageSearchParamsKeys } from "@/types/IProjectPageProps";

export function TagCombobox({
  tags,
  disabled,
}: {
  tags: IOctokitTagsResponse["data"];
  disabled?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const selectedTag = tags.find(
    (tag) =>
      tag.commit.sha === searchParams.get(EProjectPageSearchParamsKeys.SHA)
  )?.name;

  const handleTagSelection = async (sha: string) => {
    const newUrl = constructNewUrl(
      EProjectPageSearchParamsKeys.SHA,
      sha,
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
          className="w-[200px] justify-between"
        >
          {selectedTag}
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.name}
                  disabled={disabled}
                  value={tag.name}
                  onSelect={() => {
                    handleTagSelection(tag.commit.sha);
                  }}
                >
                  {tag.name}
                  <LuCheck
                    className={cn(
                      "ml-auto",
                      selectedTag === tag.name ? "opacity-100" : "opacity-0"
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
