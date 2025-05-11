"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { IOctokitTagsResponse } from "@/types/IOctokitResponse";
import { Dispatch, SetStateAction, useState } from "react";

export function TagCombobox({
  tags,
  selectedTag,
  setSelectedTag,
}: {
  tags: IOctokitTagsResponse;
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
}) {
  const [open, setOpen] = useState(false);

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
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tags.data.map((tag) => (
                <CommandItem
                  key={tag.name}
                  value={tag.name}
                  onSelect={(currentValue) => {
                    setSelectedTag(currentValue);
                    setOpen(false);
                  }}
                >
                  {tag.name}
                  <Check
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
