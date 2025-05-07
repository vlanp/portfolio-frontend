import {
  fetchDataError,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";
import IProjectItem from "@/types/IProjectItem";
import { Dirent, promises as fsPromises } from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "projects");

export const getProjects = async (): Promise<
  IFetchDataState<IProjectItem[]>
> => {
  const parseFile = async (fileDirent: Dirent): Promise<IProjectItem> => {
    const fullPath = path.join(fileDirent.parentPath, fileDirent.name);

    const fileContent = await fsPromises.readFile(fullPath, {
      encoding: "utf8",
    });

    const matterResult = matter(fileContent);

    return {
      fileName: fileDirent.name,
      title: matterResult.data.title,
      description: matterResult.data.description,
      nav: matterResult.data.nav,
      category: fileDirent.parentPath.split("/")[-1],
    };
  };

  try {
    const dirents = await fsPromises.readdir(projectsDirectory, {
      recursive: true,
      encoding: "utf-8",
      withFileTypes: true,
    });
    const fileDirents = dirents.filter((dirents) => dirents.isFile());
    const parsingPromises: Promise<IProjectItem>[] = [];
    for (const fileDirent of fileDirents) {
      parsingPromises.push(parseFile(fileDirent));
    }
    const filesContents = await Promise.all(parsingPromises);

    return new FetchDataSuccess<IProjectItem[]>(filesContents);
  } catch (error) {
    console.log("An error occured while getting projects : ", error);
    return fetchDataError;
  }
};
