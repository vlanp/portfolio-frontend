"use client";

import { getDistinctIconNames, IProject } from "@/types/IProject";
import ProjectTabs from "./projects-tabs/project-tabs";
import { ILang } from "@/types/ILang";
import { IDictionary } from "../../dictionaries";
import { useEffect, useState } from "react";
import { getIconsFromReactIcons } from "@/lib/get-icons-from-react-icons";
import { IconType } from "react-icons";
import {
  fetchDataIdle,
  fetchDataLoading,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";

const ProjectsTabs = ({
  projects,
  lang,
  projectsDict,
}: {
  projects: IProject[];
  lang: ILang;
  projectsDict: IDictionary["Projects"];
}) => {
  const [iconsCompsDataState, setIconsCompsDataState] =
    useState<IFetchDataState<Map<string, IconType | null>>>(fetchDataIdle);

  useEffect(() => {
    const getIconsComps = async () => {
      setIconsCompsDataState(fetchDataLoading);
      const iconsNames = getDistinctIconNames(projects);
      setIconsCompsDataState(
        new FetchDataSuccess(await getIconsFromReactIcons(iconsNames))
      );
    };
    getIconsComps();
  }, [projects]);

  if (iconsCompsDataState.status !== "fetchDataSuccess") {
    return;
  }

  return (
    <section className="flex flex-1 justify-around flex-wrap gap-y-5">
      {projects.map((project) => (
        <ProjectTabs
          key={project._id}
          project={project}
          lang={lang}
          projectsDict={projectsDict}
          iconsComps={iconsCompsDataState.data}
        />
      ))}
    </section>
  );
};

export default ProjectsTabs;
