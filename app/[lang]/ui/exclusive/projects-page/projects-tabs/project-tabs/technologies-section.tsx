"use client";

import { Badge } from "@/components/ui/badge";
import ProgrammingLanguagesCombobox from "./technologies-section/programming-languages-combobox";
import { JSX, useState } from "react";
import { IRepo } from "@/types/IProject";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import Image from "next/image";

const TechnologiesSection = ({
  getIconComponent,
  repo,
  projectsDict,
}: {
  getIconComponent: (iconName: string, color: string) => JSX.Element | null;
  repo: IRepo;
  projectsDict: IDictionary["Projects"];
}) => {
  const [programmingLanguage, setProgrammingLanguage] = useState<
    string | undefined
  >(repo.programmingLanguages[0]?.name);

  return (
    <div className="space-y-2">
      <ProgrammingLanguagesCombobox
        programmingLanguages={repo.programmingLanguages}
        value={programmingLanguage}
        setValue={setProgrammingLanguage}
        getIconComponent={getIconComponent}
        projectsDict={projectsDict}
      />
      <div>
        <div className="flex flex-wrap gap-1 justify-center">
          {repo.programmingLanguages
            .find((pl) => pl.name === programmingLanguage)
            ?.frameworks.map((framework) => (
              <Badge
                key={framework.name}
                variant="secondary"
                className="text-sm gap-2 py-1"
              >
                {framework.type === "ReactIcon" ? (
                  <span className="text-lg">
                    {getIconComponent(framework.iconName, framework.color)}
                  </span>
                ) : (
                  <Image
                    src={framework.imgLink}
                    width={framework.widthPx}
                    height={framework.heightPx}
                    alt={framework.name + " framework icon"}
                  />
                )}

                <span>{framework.name}</span>
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologiesSection;
