import checkedEnv from "@/lib/checkEnv";
import IRepo from "@/types/IRepo";
import Link from "next/link";
import axios from "axios";

const ProjectsPage = async () => {
  const response = await axios.get<IRepo[]>(
    checkedEnv.BACKEND_URL + checkedEnv.GET_REPOS_URL
  );

  return (
    <section className="w-full">
      {response.data.map((repo) => (
        <Link href={"/projects/" + repo._id} key={repo._id}>
          <p>{repo.displayName}</p>
        </Link>
      ))}
    </section>
  );
};

export default ProjectsPage;
