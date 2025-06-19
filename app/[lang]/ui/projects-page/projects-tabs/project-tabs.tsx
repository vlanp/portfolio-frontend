"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProject } from "@/types/IProject";
import { LuChevronDown, LuLayers } from "react-icons/lu";
import { SiYoutube, SiGithub, SiGoogledocs } from "react-icons/si";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ILang } from "@/types/ILang";
import Link from "next/link";
import { IconType } from "react-icons";
import TechnologiesSection from "./project-tabs/technologies-section";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { IDocumentsHighlights } from "@/types/IDocumentsWithHighlights";
import { removePrefixOrThrow } from "@/types/IRemovePrefix";
import { splitString } from "@/types/ISplitString";
import { getNestedValue } from "@/types/IGetNestedValue";
import { ISearchPaths } from "@/types/generated/ISearchPaths";
import HighlightedText from "@/components/ui/main/highlighted-text";
import { getHighlightConcatsTexts } from "@/lib/utils";

const ProjectTabs = ({
  project,
  lang,
  projectsDict,
  iconsComps,
  projectHighlight,
}: {
  project: IProject;
  lang: ILang;
  projectsDict: IDictionary["Projects"];
  iconsComps: Map<string, IconType | null>;
  projectHighlight: IDocumentsHighlights<ISearchPaths> | undefined;
}) => {
  const repoIdConcatsTextsMap = new Map<
    IProject["repos"][number]["_id"],
    string[][]
  >();
  project.repos.forEach((repo) => repoIdConcatsTextsMap.set(repo._id, []));
  const highlightsWithReposIds:
    | (IDocumentsHighlights<ISearchPaths>["highlights"][number] & {
        _id: string;
      })[]
    | undefined = projectHighlight?.highlights
    .filter((highlight) => highlight.path.startsWith("repos."))
    .map((highlight) => {
      const concatsTexts = getHighlightConcatsTexts(highlight);
      const path = highlight.path;
      const pathNoRepo = removePrefixOrThrow(path, "repos."); // Want to keep only the subdocuments path => repos path. Shouldn't throw an error since path is prefiltered
      const splittedPath = splitString(pathNoRepo, ".");
      let _id: string | undefined = undefined;
      project.repos.forEach((repo) => {
        const field = getNestedValue(repo, splittedPath);
        const concatsTextsForRepoId = repoIdConcatsTextsMap.get(repo._id);
        if (
          concatsTexts.every((concatText) => field.includes(concatText)) &&
          !concatsTextsForRepoId?.includes(concatsTexts)
        ) {
          _id = repo._id;
          repoIdConcatsTextsMap.set(
            repo._id,
            concatsTextsForRepoId
              ? [...concatsTextsForRepoId, concatsTexts]
              : [concatsTexts]
          );
        }
      });
      if (!_id) {
        throw new Error(
          "No repo _id were found for the highlight : " +
            JSON.stringify(highlight, undefined, 2)
        );
      }
      return {
        ...highlight,
        _id,
      };
    });

  const scoresByReposIds = highlightsWithReposIds?.reduce<
    Record<string, number>
  >((acc, item) => {
    acc[item._id] = (acc[item._id] ?? 0) + item.score;
    return acc;
  }, {});

  const repoIdWithBestScore =
    scoresByReposIds &&
    Object.entries(scoresByReposIds).sort(([, a], [, b]) => b - a)[0]?.[0];

  const idOfInitialRepo = repoIdWithBestScore || project.repos[0]?._id;
  const [selectedTab, setSelectedTab] = useState(idOfInitialRepo);
  console.log(JSON.stringify(highlightsWithReposIds, undefined, 2));

  const shouldTruncateDescription =
    selectedTab && highlightsWithReposIds
      ? highlightsWithReposIds
          .filter((highlight) => highlight._id === selectedTab)
          .filter((highlight) => highlight.path === `repos.description.${lang}`)
          .length === 0
        ? true
        : false
      : true;

  console.log(shouldTruncateDescription);

  const [truncateDescription, setTruncateDescription] = useState<boolean>(true);
  const repoInfoCardRef = useRef<HTMLDivElement>(null);
  const [initialRepoInfoCardHeight, setInitialRepoInfoCardHeight] = useState<
    number | null
  >(null);

  useLayoutEffect(() => {
    const resetRepoInfoCard = () => {
      setTruncateDescription(true);
      setInitialRepoInfoCardHeight(null);
    };

    window.addEventListener("resize", resetRepoInfoCard);

    return () => {
      window.removeEventListener("resize", resetRepoInfoCard);
    };
  }, [shouldTruncateDescription]);

  useLayoutEffect(() => {
    if (repoInfoCardRef.current && !initialRepoInfoCardHeight) {
      const { height } = repoInfoCardRef.current.getBoundingClientRect();
      setInitialRepoInfoCardHeight(height);
    }
  }, [initialRepoInfoCardHeight]);

  useEffect(() => {
    if (repoIdWithBestScore) {
      setSelectedTab(repoIdWithBestScore);
    }
  }, [repoIdWithBestScore]);

  useEffect(() => {
    setTruncateDescription(shouldTruncateDescription);
  }, [shouldTruncateDescription]);

  const MAX_VISIBLE_TABS = 4;
  const totalRepos = project.repos.length;
  const showMoreIndicator = totalRepos > MAX_VISIBLE_TABS;
  const visibleRepos = showMoreIndicator
    ? project.repos.slice(0, MAX_VISIBLE_TABS)
    : project.repos;
  const hiddenRepos = showMoreIndicator
    ? project.repos.slice(MAX_VISIBLE_TABS)
    : [];

  const isSelectedTabHidden = hiddenRepos.some(
    (repo) => repo._id === selectedTab
  );
  const selectedHiddenRepo = hiddenRepos.find(
    (repo) => repo._id === selectedTab
  );

  const getIconComponent = (iconName: string, color: string) => {
    const IconComponent = iconsComps.get(iconName);
    return IconComponent ? <IconComponent color={color} /> : null;
  };

  return (
    <Card className="w-full h-fit max-w-[600px] mx-auto shadow-lg border-2 hover:shadow-xl transition-shadow duration-300 py-4">
      <CardContent className="px-4 sm:px-6">
        {/* Project Header */}
        <div className="text-center mb-3">
          <h4 className="flex flex-wrap justify-center mt-0">
            {projectHighlight ? (
              <HighlightedText
                text={project.name}
                highlights={projectHighlight?.highlights.filter(
                  (highlight) => highlight.path === "name"
                )}
              />
            ) : (
              project.name
            )}
          </h4>
          <div className="flex items-center justify-center gap-1 md:gap-3">
            {project.isFullStack && (
              <Badge variant="secondary" className="text-xs md:text-sm">
                <LuLayers className="h-2 w-2 md:h-3 md:w-3 mr-1" />
                {projectsDict.FullStack}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs md:text-sm">
              {totalRepos}{" "}
              {totalRepos > 1
                ? projectsDict.Repositories
                : projectsDict.Repository}
            </Badge>
          </div>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          {/* Navigation */}
          <div className="flex items-center">
            <TabsList className="flex-1 justify-start p-0.5 md:p-1 h-7 md:h-10">
              {visibleRepos.map((repo) => (
                <TabsTrigger
                  key={repo._id}
                  value={repo._id}
                  title={repo.displayName.name}
                  className="px-1.5 md:px-4 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center gap-1 md:gap-2 h-6 md:h-8 hover:cursor-pointer"
                >
                  <span className="hidden md:inline">
                    {getIconComponent(
                      repo.programmingLanguages[0]?.iconName,
                      repo.programmingLanguages[0]?.color
                    )}
                  </span>
                  <span className="truncate text-xs md:text-sm max-w-[60px]">
                    {repo.displayName.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {showMoreIndicator && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isSelectedTabHidden ? "default" : "outline"}
                    size="sm"
                    className={`h-7 md:h-10 px-1.5 md:px-3 text-xs md:text-sm transition-all duration-200 ${
                      isSelectedTabHidden
                        ? "bg-primary text-primary-foreground shadow-md"
                        : ""
                    }`}
                  >
                    {isSelectedTabHidden && selectedHiddenRepo ? (
                      <>
                        <span className="hidden md:inline">
                          {getIconComponent(
                            selectedHiddenRepo.programmingLanguages[0]
                              ?.iconName,
                            selectedHiddenRepo.programmingLanguages[0]?.color
                          )}
                        </span>
                        <span className="ml-0 md:ml-2 max-w-[40px] md:max-w-[80px] truncate text-xs md:text-sm">
                          {selectedHiddenRepo.displayName.name}
                        </span>
                      </>
                    ) : (
                      <>
                        +{totalRepos - MAX_VISIBLE_TABS}
                        <LuChevronDown className="h-2 w-2 md:h-4 md:w-4 ml-0.5 md:ml-1" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  {hiddenRepos.map((repo) => (
                    <DropdownMenuItem
                      key={repo._id}
                      onClick={() => setSelectedTab(repo._id)}
                      className={`flex items-center gap-2 text-sm cursor-pointer ${
                        selectedTab === repo._id
                          ? "bg-accent text-accent-foreground font-medium"
                          : ""
                      }`}
                    >
                      {getIconComponent(
                        repo.programmingLanguages[0]?.iconName,
                        repo.programmingLanguages[0]?.color
                      )}
                      {repo.displayName.stringified}
                      {selectedTab === repo._id && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Actuel
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Content */}
          {project.repos.map((repo) => (
            <TabsContent
              key={repo._id}
              value={repo._id}
              className="mt-0 space-y-3"
            >
              {/* Video */}
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-black shadow-sm border">
                <iframe
                  className="w-full h-full"
                  src={repo.youtube + "?hl=" + lang}
                  title={`${repo.displayName.stringified}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Repository Information */}
              <Card
                style={{
                  ...(initialRepoInfoCardHeight && {
                    minHeight: `${initialRepoInfoCardHeight}px`,
                  }),
                }}
                className="flex border-muted justify-between py-4 gap-2"
                ref={repoInfoCardRef}
              >
                <CardHeader className="flex justify-center">
                  <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-lg">
                    <span className="max-w-[220px] sm:max-w-[300px] truncate">
                      {highlightsWithReposIds ? (
                        <HighlightedText
                          text={repo.displayName.name}
                          highlights={highlightsWithReposIds
                            .filter((highlight) => highlight._id === repo._id)
                            .filter(
                              (highlight) =>
                                highlight.path === "repos.displayName.name"
                            )}
                        />
                      ) : (
                        repo.displayName.name
                      )}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {repo.displayName.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3 pt-0 flex-1 justify-between px-4 sm:px-6">
                  {/* Description */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p
                        className={
                          "text-sm text-muted-foreground text-center min-h-12 hover:cursor-pointer hover:opacity-60 mt-0" +
                          (truncateDescription ? " line-clamp-2" : "")
                        }
                        onClick={() => setTruncateDescription((p) => !p)}
                      >
                        {highlightsWithReposIds ? (
                          <HighlightedText
                            text={repo.description[lang]}
                            highlights={highlightsWithReposIds
                              .filter((highlight) => highlight._id === repo._id)
                              .filter(
                                (highlight) =>
                                  highlight.path === `repos.description.${lang}`
                              )}
                          />
                        ) : (
                          repo.description[lang]
                        )}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {truncateDescription
                          ? projectsDict.ProjectsTabs.ProjectTabs.ShowMore
                          : projectsDict.ProjectsTabs.ProjectTabs.ShowLess}
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  {truncateDescription && (
                    <>
                      {/* Languages and Frameworks */}
                      <TechnologiesSection
                        getIconComponent={getIconComponent}
                        repo={repo}
                        projectsDict={projectsDict}
                      />
                      {/* Platforms */}
                      {repo.platforms.length > 0 && (
                        <div>
                          <p className="text-md w-full text-center">
                            {projectsDict.ProjectsTabs.ProjectTabs.Platform}
                          </p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {repo.platforms.map((platform) => (
                              <Badge
                                key={platform.iconName}
                                variant="outline"
                                className="text-sm py-1 gap-2"
                              >
                                <span className="text-md">
                                  {getIconComponent(
                                    platform.iconName,
                                    platform.color
                                  )}
                                </span>

                                <span>{platform.name}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Links */}
                      <div className="flex flex-col">
                        <p className="text-md w-full text-center">
                          {projectsDict.ProjectsTabs.ProjectTabs.LearnMore}
                        </p>
                        <div className="flex gap-2 h-8">
                          <Button asChild className="flex-1">
                            <Link
                              href={repo.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiGithub className="size-6" />
                              <span className="hidden md:block">
                                {projectsDict.Code}
                              </span>
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
                            <Link
                              href={repo.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiYoutube className="size-6 text-red-500" />
                              <span className="hidden md:block">
                                {projectsDict.Video}
                              </span>
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
                            <Link href={"/projects/" + repo._id}>
                              <SiGoogledocs className="size-6" />
                              <span className="hidden md:block">
                                {projectsDict.Documentation}
                              </span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectTabs;
