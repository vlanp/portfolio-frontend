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
  programmingLanguages: z.array(
    ZDisplayIcon.extend({
      frameworks: z.array(ZDisplayIcon),
    })
  ),
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
      repo.programmingLanguages.forEach((programmingLanguage) => {
        iconNames.push(programmingLanguage.iconName);
        programmingLanguage.frameworks.forEach((framework) => {
          iconNames.push(framework.iconName);
        });
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
