import projectsRepos, { IProjectsReposKeys } from "@/projects/projects-repos";
import { Octokit } from "octokit";

const octokit = new Octokit({});

type IOctokitResponse = Awaited<
  ReturnType<typeof octokit.rest.repos.getContent>
>;

// Intended to handle only one recursive depth
const getProject = async (name: IProjectsReposKeys) => {
  const projectRepo = projectsRepos[name];
  const response = await octokit.rest.repos.getContent({
    owner: projectRepo.owner,
    repo: projectRepo.repo,
    path: projectRepo.path,
  });

  if (!Array.isArray(response.data)) {
    throw new Error("Unexpected result received from GitHub Api");
  }

  const dirs = response.data.filter((it) => it.type === "dir");

  const files = response.data.filter((it) => it.type === "file");

  const promises: Promise<IOctokitResponse>[] = [];

  for (const dir of dirs) {
    const promise = octokit.rest.repos.getContent({
      owner: "pmndrs",
      repo: "zustand",
      path: dir.path,
    });
    promises.push(promise);
  }

  const responses = await Promise.all(promises);

  responses.forEach((response) => {
    if (!Array.isArray(response.data)) {
      return;
    }
    files.push(...response.data.filter((it) => it.type === "file"));
  });

  const responsebis = await octokit.rest.repos.getContent({
    owner: "pmndrs",
    repo: "zustand",
    path: files[4].path,
    headers: { accept: "application/vnd.github.html+json" },
  });

  return responsebis.data;
};

export { getToto };
