import urls, { UrlsKeys } from "@/projects/projects-repos";
import {
  fetchDataError,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";
import { IGitHubContent } from "@/types/IGitHubContent";
import IProjectItem from "@/types/IProjectItem";
import matter from "gray-matter";

export const getProjectsNames = (): string[] => {
  return Object.keys(urls);
};

export const getProject = async (
  name: UrlsKeys
): Promise<IFetchDataState<IProjectItem[]>> => {
  const parseFile = async (
    fileContent: string,
    filePath: string
  ): Promise<IProjectItem> => {
    const matterResult = matter(fileContent);
    const pathSegments = filePath.split("/");
    const category =
      pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : null;

    const title = matterResult.data.title;
    const description = matterResult.data.description;
    const nav = matterResult.data.nav;

    if (!title || !description || !nav) {
      throw new Error(
        `A file is expected to have a title, a description and a nav : title => ${title}, description => ${description}, nav => ${nav}`
      );
    }

    return {
      fileName: pathSegments[-1],
      title,
      description,
      nav,
      category: category,
    };
  };

  const fetchDirectoryContent = async (
    url: string
  ): Promise<IGitHubContent[]> => {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    console.log(await response.text());

    return await response.json();
  };

  const fetchFileContent = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${response.status} ${response.statusText}`
      );
    }

    return await response.text();
  };

  const processDirectory = async (url: string): Promise<IProjectItem[]> => {
    const contents = await fetchDirectoryContent(url);
    const results: IProjectItem[] = [];

    for (const item of contents) {
      if (item.type === "dir") {
        const subDirResults = await processDirectory(item.path);
        results.push(...subDirResults);
      } else if (item.type === "file" && item.download_url) {
        try {
          const fileContent = await fetchFileContent(item.download_url);
          // Is there frontmatter metadatas
          if (fileContent.includes("---")) {
            const projectItem = await parseFile(fileContent, item.path);
            results.push(projectItem);
          } else {
            throw new Error(`A file is expected to have frontmatter metadatas`);
          }
        } catch (error) {
          console.error(`Error processing file ${item.path}:`, error);
        }
      }
    }

    return results;
  };

  try {
    const url = urls[name];
    const filesContents = await processDirectory(url);
    return new FetchDataSuccess<IProjectItem[]>(filesContents);
  } catch (error) {
    console.log(`An error occurred while getting project name ${name}:`, error);
    return fetchDataError;
  }
};
