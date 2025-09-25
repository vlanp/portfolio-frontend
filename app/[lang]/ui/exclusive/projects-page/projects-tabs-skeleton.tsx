import ProjectTabsSkeleton from "./projects-tabs/project-tabs-skeleton";

const ProjectsTabsSkeleton = () => {
  return (
    <section className="flex flex-1 justify-around flex-wrap gap-y-5">
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <ProjectTabsSkeleton key={key} />
      ))}
    </section>
  );
};

export default ProjectsTabsSkeleton;
