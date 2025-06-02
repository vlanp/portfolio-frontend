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
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { IDisplayIcon } from "@/types/IProject";

function ProgrammingLanguagesCombobox({
  programmingLanguages,
  value,
  setValue,
  getIconComponent,
}: {
  programmingLanguages: IDisplayIcon[];
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  getIconComponent: (iconName: string, color: string) => JSX.Element | null;
}) {
  const [open, setOpen] = useState(false);
  const programmingLanguage = programmingLanguages.find(
    (pl) => pl.name === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full text-md"
        >
          {value ? "Frameworks " + value : "Select framework..."}
          {programmingLanguage &&
            getIconComponent(
              programmingLanguage.iconName,
              programmingLanguage.color
            )}
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {programmingLanguages.map((programmingLanguage) => (
                <CommandItem
                  key={programmingLanguage.name}
                  value={programmingLanguage.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {"Frameworks " + programmingLanguage.name}
                  <LuCheck
                    className={cn(
                      "ml-auto",
                      value === programmingLanguage.name
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

export default ProgrammingLanguagesCombobox;
