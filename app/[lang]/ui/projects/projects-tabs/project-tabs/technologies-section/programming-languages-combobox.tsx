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
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { IDisplayIcon } from "@/types/IProject";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import {
  fetchDataIdle,
  fetchDataLoading,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";
import ProgrammingLanguageComboboxSkeleton from "./programming-languages-combobox-skeleton";

function ProgrammingLanguagesCombobox({
  programmingLanguages,
  value,
  setValue,
  getIconComponent,
  projectsDict,
}: {
  programmingLanguages: IDisplayIcon[];
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  getIconComponent: (iconName: string, color: string) => JSX.Element | null;
  projectsDict: IDictionary["Projects"];
}) {
  const [open, setOpen] = useState(false);
  const [frameworksOfLanguagesDataState, setFrameworksOfLanguagesDataState] =
    useState<IFetchDataState<Map<string, string>>>(fetchDataIdle);
  const programmingLanguage = programmingLanguages.find(
    (pl) => pl.name === value
  );

  useEffect(() => {
    const getFrameworksOfLanguagesDataState = async (
      programmingLanguagesNames: string[]
    ) => {
      setFrameworksOfLanguagesDataState(fetchDataLoading);
      const frameworksOfLanguagesPromises = programmingLanguagesNames.map(
        (programmingLanguageName) => {
          return projectsDict.ProjectsTabs.ProjectTabs.ProgrammingLanguageCombobox.FrameworksOfLanguage(
            {
              programmingLanguage: programmingLanguageName,
            }
          );
        }
      );
      const frameworksOfLanguages = await Promise.all(
        frameworksOfLanguagesPromises
      );
      const mapping = new Map<string, string>();
      programmingLanguagesNames.forEach((programmingLanguageName, index) => {
        mapping.set(programmingLanguageName, frameworksOfLanguages[index]);
      });
      setFrameworksOfLanguagesDataState(new FetchDataSuccess(mapping));
    };

    getFrameworksOfLanguagesDataState(
      programmingLanguages.map((it) => it.name)
    );
  }, [programmingLanguages, projectsDict]);

  if (frameworksOfLanguagesDataState.status !== "fetchDataSuccess") {
    return <ProgrammingLanguageComboboxSkeleton />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full text-md flex justify-center gap-2"
        >
          <span className="truncate max-w-[200px]">
            {value ? frameworksOfLanguagesDataState.data.get(value) : ""}
          </span>
          <span className="hidden sm:block">
            {programmingLanguage &&
              getIconComponent(
                programmingLanguage.iconName,
                programmingLanguage.color
              )}
          </span>
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-60 p-0">
        <Command>
          <CommandInput
            placeholder={
              projectsDict.ProjectsTabs.ProjectTabs.ProgrammingLanguageCombobox
                .SearchPlaceholder
            }
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {
                projectsDict.ProjectsTabs.ProjectTabs
                  .ProgrammingLanguageCombobox.EmptySearchResult
              }
            </CommandEmpty>
            <CommandGroup>
              {programmingLanguages.map((programmingLanguage) => (
                <CommandItem
                  key={programmingLanguage.name}
                  value={programmingLanguage.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {frameworksOfLanguagesDataState.data.get(
                    programmingLanguage.name
                  )}
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
