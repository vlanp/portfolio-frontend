import { arrayDistinct } from "@/lib/utils";
import { z } from "zod/v4";

const ZRepoDescription = z.object({
  fr: z.string(),
  en: z.string(),
});

type IRepoDescription = z.infer<typeof ZRepoDescription>;

const ZDisplayIcon = z.object({
  name: z.string(),
  iconName: z.string(),
  color: z.string(),
});

type IDisplayIcon = z.infer<typeof ZDisplayIcon>;

const ZDisplayName = z
  .object({
    name: z.string(),
    type: z.string(),
  })
  .transform((displayName) => ({
    name: displayName.name,
    type: displayName.type,
    stringified: displayName.name + " " + displayName.type,
  }));

type IDisplayName = z.infer<typeof ZDisplayName>;

const ZRepo = z.object({
  displayName: ZDisplayName,
  owner: z.string(),
  repo: z.string(),
  path: z.string(),
  description: ZRepoDescription,
  programmingLanguages: z.array(ZDisplayIcon),
  frameworksJavascript: z.array(ZDisplayIcon).optional(),
  frameworksKotlin: z.array(ZDisplayIcon).optional(),
  frameworksPython: z.array(ZDisplayIcon).optional(),
  frameworksCSS: z.array(ZDisplayIcon).optional(),
  platforms: z.array(ZDisplayIcon),
  youtube: z.string(),
  github: z.string(),
  _id: z.string(),
});

type IRepo = z.infer<typeof ZRepo>;

const ZProject = z.object({
  name: z.string(),
  repos: z.array(ZRepo),
  isFullStack: z.boolean(),
  _id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

type IProject = z.infer<typeof ZProject>;

function getDistinctIconNames(projects: IProject[]): string[] {
  const iconNames: string[] = [];

  projects.forEach((project) => {
    project.repos.forEach((repo) => {
      repo.programmingLanguages.forEach((lang) => {
        iconNames.push(lang.iconName);
      });

      repo.frameworksJavascript?.forEach((framework) => {
        iconNames.push(framework.iconName);
      });

      repo.frameworksKotlin?.forEach((framework) => {
        iconNames.push(framework.iconName);
      });

      repo.frameworksPython?.forEach((framework) => {
        iconNames.push(framework.iconName);
      });

      repo.frameworksCSS?.forEach((framework) => {
        iconNames.push(framework.iconName);
      });

      repo.platforms.forEach((platform) => {
        iconNames.push(platform.iconName);
      });
    });
  });

  return arrayDistinct(iconNames);
}

export { ZRepoDescription, ZRepo, ZProject, getDistinctIconNames };
export type { IRepoDescription, IDisplayName, IRepo, IProject, IDisplayIcon };
