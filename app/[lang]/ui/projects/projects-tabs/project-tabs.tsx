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
import { IProject, IRepo } from "@/types/IProject";
import { LuChevronDown, LuCode, LuLayers } from "react-icons/lu";
import { SiYoutube, SiGithub, SiGoogledocs } from "react-icons/si";
import { useState } from "react";
import { ILang } from "@/types/ILang";
import { IDictionary } from "../../../dictionaries";
import Link from "next/link";
import { IconType } from "react-icons";

const ProjectTabs = ({
  project,
  lang,
  projectsDict,
  iconsComps,
}: {
  project: IProject;
  lang: ILang;
  projectsDict: IDictionary["Projects"];
  iconsComps: Map<string, IconType | null>;
}) => {
  const [selectedTab, setSelectedTab] = useState(project.repos[0]?._id);

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

  const getAllFrameworks = (repo: IRepo) => {
    const frameworks = [
      ...(repo.frameworksJavascript || []),
      ...(repo.frameworksKotlin || []),
      ...(repo.frameworksPython || []),
      ...(repo.frameworksCSS || []),
    ];
    return frameworks;
  };

  const getIconComponent = (iconName: string, color: string) => {
    const IconComponent = iconsComps.get(iconName);
    return IconComponent ? <IconComponent color={color} /> : null;
  };

  return (
    <Card className="w-full h-fit max-w-full md:max-w-[600px] mx-auto shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
      <CardContent>
        {/* Project Header */}
        <div className="text-center space-y-2 mb-3 md:mb-6">
          <h3 className="truncate font-semibold text-base md:text-xl">
            {project.name}
          </h3>
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
          <div className="flex items-center gap-1 md:gap-3 mb-2 md:mb-4">
            <TabsList className="flex-1 justify-start p-0.5 md:p-1 h-7 md:h-10">
              {visibleRepos.map((repo) => (
                <TabsTrigger
                  key={repo._id}
                  value={repo._id}
                  className="px-1.5 md:px-4 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center gap-1 md:gap-2 h-6 md:h-8"
                >
                  <span className="hidden md:inline">
                    {getIconComponent(
                      repo.programmingLanguages[0]?.iconName,
                      repo.programmingLanguages[0]?.color
                    )}
                  </span>
                  <span className="truncate text-xs md:text-sm max-w-[60px] md:max-w-none">
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
              {/* Video - Smaller aspect ratio */}
              <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-black shadow-sm border">
                <iframe
                  className="w-full h-full"
                  src={repo.youtube + "?hl=" + lang}
                  title={`${repo.displayName.stringified}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Repository Information - Compact */}
              <Card className="border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <LuCode className="h-4 w-4" />
                    <span className="truncate">{repo.displayName.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {repo.displayName.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {/* Description - Truncated */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {repo.description[lang]}
                  </p>

                  {/* Technologies - Compact Grid */}
                  <div className="space-y-2">
                    {/* Languages */}
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {repo.programmingLanguages
                          .slice(0, 4)
                          .map((language) => (
                            <Badge
                              key={language.name}
                              variant="outline"
                              className="text-xs px-1.5 py-0.5 flex items-center gap-1"
                            >
                              {getIconComponent(
                                language.iconName,
                                language.color
                              )}
                              <span>{lang}</span>
                            </Badge>
                          ))}
                        {repo.programmingLanguages.length > 4 && (
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0.5"
                          >
                            +{repo.programmingLanguages.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Frameworks */}
                    {getAllFrameworks(repo).length > 0 && (
                      <div>
                        <div className="flex flex-wrap gap-1">
                          {getAllFrameworks(repo)
                            .slice(0, 3)
                            .map((framework) => (
                              <Badge
                                key={framework.iconName}
                                variant="secondary"
                                className="text-xs px-1.5 py-0.5 flex items-center gap-1"
                              >
                                {getIconComponent(
                                  framework.iconName,
                                  framework.color
                                )}
                                <span>{framework.iconName}</span>
                              </Badge>
                            ))}
                          {getAllFrameworks(repo).length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-1.5 py-0.5"
                            >
                              +{getAllFrameworks(repo).length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Platforms */}
                    {repo.platforms.length > 0 && (
                      <div>
                        <div className="flex flex-wrap gap-1">
                          {repo.platforms.map((platform) => (
                            <Badge
                              key={platform.iconName}
                              variant="outline"
                              className="text-xs px-1.5 py-0.5 flex items-center gap-1"
                            >
                              {getIconComponent(
                                platform.iconName,
                                platform.color
                              )}
                              <span>{platform.iconName}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Links - Compact */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      asChild
                      size="sm"
                      className="h-7 px-2 text-xs flex items-center gap-1"
                    >
                      <Link
                        href={repo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiGithub className="h-3 w-3" />
                        {projectsDict.Code}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs flex items-center gap-1"
                    >
                      <Link
                        href={repo.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiYoutube className="h-3 w-3 text-red-500" />
                        {projectsDict.Video}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs flex items-center gap-1"
                    >
                      <Link href={"/projects/" + repo._id}>
                        <SiGoogledocs className="h-3 w-3" />
                        {projectsDict.Documentation}
                      </Link>
                    </Button>
                  </div>
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
