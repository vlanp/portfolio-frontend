"use client";

import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
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
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { IRepo } from "@/types/IProject";

export function RepoCombobox({
  repos,
  disabled,
  projectDict,
  repoId,
}: {
  repos: IRepo[];
  disabled?: boolean;
  projectDict: IDictionary["Projects"]["Project"];
  repoId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const selectedRepo = repos.find((repo) => repo._id === repoId);

  const handleRepoSelection = async (newRepoId: string) => {
    const newUrl = pathname.replace(repoId, newRepoId);
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
          className="min-w-[150px] w-full truncate"
        >
          {selectedRepo?.displayName.stringified}
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[150px] max-w-full p-0">
        <Command>
          <CommandInput
            placeholder={
              projectDict.LeftProjectSidebar.RepoCombobox.SearchPlaceholder
            }
          />
          <CommandList>
            <CommandEmpty>
              {projectDict.LeftProjectSidebar.RepoCombobox.EmptySearchResult}
            </CommandEmpty>
            <CommandGroup>
              {repos.map((repo) => (
                <CommandItem
                  key={repo._id}
                  disabled={disabled}
                  value={repo.displayName.stringified}
                  onSelect={() => {
                    handleRepoSelection(repo._id);
                  }}
                >
                  {repo.displayName.stringified}
                  <LuCheck
                    className={cn(
                      "ml-auto",
                      selectedRepo?._id === repo._id
                        ? "opacity-100"
                        : "opacity-0"
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
