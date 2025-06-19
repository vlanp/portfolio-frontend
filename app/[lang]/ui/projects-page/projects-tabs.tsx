"use client";

import { getDistinctIconNames, IProject } from "@/types/IProject";
import ProjectTabs from "./projects-tabs/project-tabs";
import { ILang } from "@/types/ILang";
import { useContext, useEffect } from "react";
import { IDictionary } from "../../dictionaries/generated";
import ProjectsTabsSkeleton from "./projects-tabs-skeleton";
import { ProjectsIconsContext } from "../../contexts/ProjectsIconsContext";
import { IDocumentsWithHighlights } from "@/types/IDocumentsWithHighlights";
import { ISearchPaths } from "@/types/generated/ISearchPaths";

const ProjectsTabs = ({
  projectsWithHighlights,
  lang,
  projectsDict,
}: {
  projectsWithHighlights: IDocumentsWithHighlights<IProject, ISearchPaths>;
  lang: ILang;
  projectsDict: IDictionary["Projects"];
}) => {
  const projectsIconsContext = useContext(ProjectsIconsContext);
  const iconsCompsDataState = projectsIconsContext.iconsCompsDataState;
  const refreshIcons = projectsIconsContext.refreshIcons;
  const projects = projectsWithHighlights.documents;
  const iconsNames = getDistinctIconNames(projects);

  let containsAllIcons: boolean = true;
  if (iconsCompsDataState.status === "fetchDataSuccess") {
    containsAllIcons = iconsNames.every((iconName) =>
      iconsCompsDataState.data.has(iconName)
    );
  }

  useEffect(() => {
    if (!containsAllIcons) {
      refreshIcons();
    }
  }, [containsAllIcons, refreshIcons]);

  if (iconsCompsDataState.status !== "fetchDataSuccess" || !containsAllIcons) {
    return <ProjectsTabsSkeleton />;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectTabs
          key={project._id}
          project={project}
          lang={lang}
          projectsDict={projectsDict}
          iconsComps={iconsCompsDataState.data}
          projectHighlight={projectsWithHighlights.documentsHighlights.find(
            (ph) => ph._id === project._id
          )}
        />
      ))}
    </>
  );
};

export default ProjectsTabs;
