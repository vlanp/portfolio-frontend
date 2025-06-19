"use client";

import {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  fetchDataIdle,
  fetchDataLoading,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";
import { IconType } from "react-icons";
import { getDistinctIconNames, IProject, ZProject } from "@/types/IProject";
import { getIconsFromReactIcons } from "@/lib/get-icons-from-react-icons";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import z from "zod/v4";
import { ILang } from "@/types/ILang";
import { getZDocumentsWithHighlights } from "@/types/IDocumentsWithHighlights";

const ProjectsIconsContext = createContext<{
  iconsCompsDataState: IFetchDataState<Map<string, IconType | null>>;
  refreshIcons: () => void;
}>(null!); // null! is a hack to avoid undefined context value, which would not be possible when the context is used in a component that is not wrapped in the provider associated with this context => allow to use context without checking for null or undefined

const fetchAllProjects = async (lang: ILang): Promise<IProject[]> => {
  const projectsResponse = await axios.post<unknown>(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_POST_PROJECTS_URL,
    undefined,
    { params: { lang } }
  );

  const projectsResponseParseResult = getZApiSuccessResponse(
    getZDocumentsWithHighlights(ZProject)
  ).safeParse(projectsResponse.data);

  if (!projectsResponseParseResult.success) {
    throw new Error(z.prettifyError(projectsResponseParseResult.error));
  }

  return projectsResponseParseResult.data.data.documents;
};

const ProjectsIconsProvider = memo(function ProjectsIconsProvider({
  children,
  lang,
}: PropsWithChildren<{ lang: ILang }>) {
  const [iconsCompsDataState, setIconsCompsDataState] =
    useState<IFetchDataState<Map<string, IconType | null>>>(fetchDataIdle);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshIcons = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const getIconsComps = async () => {
      setIconsCompsDataState(fetchDataLoading);
      const projects = await fetchAllProjects(lang);
      const iconsNames = getDistinctIconNames(projects);
      setIconsCompsDataState(
        new FetchDataSuccess(await getIconsFromReactIcons(iconsNames))
      );
    };
    getIconsComps();
  }, [lang, refresh]);

  return (
    <ProjectsIconsContext.Provider
      value={{ iconsCompsDataState, refreshIcons }}
    >
      {children}
    </ProjectsIconsContext.Provider>
  );
});

export { ProjectsIconsContext, ProjectsIconsProvider };
