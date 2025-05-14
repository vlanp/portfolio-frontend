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
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const selectedTag = tags.find(
    (tag) => tag.commit.sha === searchParams.get("sha")
  )?.name;

  const setSha = useCallback(
    (sha: string) => {
      const params = new URLSearchParams(searchParams);
      if (sha) {
        params.set("sha", sha);
      } else {
        params.delete("sha");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

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
              {tags.map((tag) => (
                <CommandItem
                  key={tag.name}
                  disabled={disabled}
                  value={tag.name}
                  onSelect={() => {
                    setSha(tag.commit.sha);
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
