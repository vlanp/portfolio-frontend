"use server";

import projectsRepos, { IProjectsReposKeys } from "@/projects/projects-repos";
import {
  fetchDataError,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";
import {
  IOctokitTagsResponse,
  IOctokitTreeResponse,
} from "@/types/IOctokitResponse";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.PUBLIC_RESOURCES_TOKEN,
});

// Intended to handle only one recursive depth
// const getProject = async (name: IProjectsReposKeys) => {
//   const projectRepo = projectsRepos[name];
//   const response = await octokit.rest.repos.getContent({
//     owner: projectRepo.owner,
//     repo: projectRepo.repo,
//     path: projectRepo.path,
//   });

//   if (!Array.isArray(response.data)) {
//     throw new Error("Unexpected result received from GitHub Api");
//   }

//   const dirs = response.data.filter((it) => it.type === "dir");

//   const files = response.data.filter((it) => it.type === "file");

//   const promises: Promise<IOctokitResponse>[] = [];

//   for (const dir of dirs) {
//     const promise = octokit.rest.repos.getContent({
//       owner: "pmndrs",
//       repo: "zustand",
//       path: dir.path,
//       headers: { accept: "application/vnd.github.raw+json" },
//     });
//     promises.push(promise);
//   }

//   const responses = await Promise.all(promises);

//   responses.forEach((response) => {
//     if (!Array.isArray(response.data)) {
//       return;
//     }
//     files.push(...response.data.filter((it) => it.type === "file"));
//   });

//   const responsebis = await octokit.rest.repos.getContent({
//     owner: "pmndrs",
//     repo: "zustand",
//     path: files[4].path,
//     headers: { accept: "application/vnd.github.html+json" },
//   });

//   files.map((file) => {
//     console.log(file.path);
//   });

//   return dirs.map((dir) => {
//     return matter(dir.content || "");
//   });
// };

// const getBranch = async (name: IProjectsReposKeys) => {
//   const projectRepo = projectsRepos[name];
//   const branchData = await octokit.request(
//     "GET /repos/{owner}/{repo}/branches/main",
//     {
//       owner: projectRepo.owner,
//       repo: projectRepo.repo,
//       headers: {
//         "X-GitHub-Api-Version": "2022-11-28",
//       },
//     }
//   );
//   console.log(branchData.data);
// };

const getTagsDataState = async (
  name: IProjectsReposKeys
): Promise<IFetchDataState<IOctokitTagsResponse>> => {
  try {
    throw new Error("Error");
    const projectRepo = projectsRepos[name];
    const tags = await octokit.rest.repos.listTags({
      owner: projectRepo.owner,
      repo: projectRepo.repo,
    });
    return new FetchDataSuccess(tags);
  } catch (error) {
    console.warn("Error fetching tags:", error);
    return fetchDataError;
  }
};

const getTreeDataState = async (
  name: IProjectsReposKeys,
  sha: string
): Promise<IFetchDataState<IOctokitTreeResponse>> => {
  try {
    const projectRepo = projectsRepos[name];
    const tree = await octokit.rest.git.getTree({
      owner: projectRepo.owner,
      repo: projectRepo.repo,
      tree_sha: sha,
      recursive: "true",
    });
    const docsItems = tree.data.tree.filter(
      (item) => item.path.startsWith("docs/") || item.path === "docs"
    );
    console.log(docsItems);
    return new FetchDataSuccess(tree);
  } catch (error) {
    console.warn("Error fetching tree:", error);
    return fetchDataError;
  }
};

// export { getProject };

export { getTagsDataState, getTreeDataState };
