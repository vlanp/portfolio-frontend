import { arrayDistinct } from "@/lib/utils";
import { z } from "zod/v4";

const ZRepoDescription = z.object({
  fr: z.string(),
  en: z.string(),
});

type IRepoDescription = z.infer<typeof ZRepoDescription>;

const ZReactIcon = z.object({
  type: z.literal("ReactIcon"),
  name: z.string(),
  iconName: z.string(),
  color: z.string(),
});

const ZCustomIcon = z.object({
  type: z.literal("CustomIcon"),
  name: z.string(),
  imgLink: z.string(),
  widthPx: z.number(),
  heightPx: z.number(),
});

const ZDisplayIcon = z.discriminatedUnion("type", [ZReactIcon, ZCustomIcon]);

const ZDisplayIconWithChilds = z.union([
  ZReactIcon.extend({ frameworks: z.array(ZDisplayIcon) }),
]);

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
  programmingLanguages: z.array(ZDisplayIconWithChilds),
  platforms: z.array(ZReactIcon),
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
          if (framework.type === "ReactIcon") {
            iconNames.push(framework.iconName);
          }
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
