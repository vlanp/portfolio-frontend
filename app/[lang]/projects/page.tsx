import { getProjectsNames } from "@/lib/projects";
import Link from "next/link";

const ProjectsPage = () => {
  const projectsNames = getProjectsNames();
  return (
    <section className="w-full">
      {projectsNames.map((projectName) => (
        <Link href={"/projects/" + projectName} key={projectName}>
          <p>{projectName}</p>
        </Link>
      ))}
    </section>
  );
};

export default ProjectsPage;
