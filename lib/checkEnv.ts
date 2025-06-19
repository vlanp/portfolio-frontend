interface IEnvVariables {
  NEXT_PUBLIC_BACKEND_URL: string;
  NEXT_PUBLIC_POST_PROJECTS_URL: string;
  NEXT_PUBLIC_GET_TAG_URL: string;
  NEXT_PUBLIC_GET_REPO_URL: string;
  NEXT_PUBLIC_GET_FILE_CONTENT_URL: string;
  NEXT_PUBLIC_GET_FILE_EXIST_URL: string;
  NEXT_PUBLIC_GET_TAGS_URL: string;
  NEXT_PUBLIC_GET_PROJECT_FROM_REPO_URL: string;
  NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL: string;
  NEXT_PUBLIC_GET_SEARCH_PATHS_URL: string;
}

const checkEnv = (): IEnvVariables => {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_BACKEND_URL");
  }
  if (!process.env.NEXT_PUBLIC_POST_PROJECTS_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_POST_PROJECTS_URL"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_TAG_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_GET_TAG_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_REPO_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_GET_REPO_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_FILE_CONTENT_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_FILE_CONTENT_URL"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_FILE_EXIST_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_FILE_EXIST_URL"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_TAGS_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_GET_TAGS_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_PROJECT_FROM_REPO_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_PROJECT_FROM_REPO_URL"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_SEARCH_PATHS_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_SEARCH_PATHS_URL"
    );
  }
  return {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_POST_PROJECTS_URL: process.env.NEXT_PUBLIC_POST_PROJECTS_URL,
    NEXT_PUBLIC_GET_TAG_URL: process.env.NEXT_PUBLIC_GET_TAG_URL,
    NEXT_PUBLIC_GET_REPO_URL: process.env.NEXT_PUBLIC_GET_REPO_URL,
    NEXT_PUBLIC_GET_FILE_CONTENT_URL:
      process.env.NEXT_PUBLIC_GET_FILE_CONTENT_URL,
    NEXT_PUBLIC_GET_FILE_EXIST_URL: process.env.NEXT_PUBLIC_GET_FILE_EXIST_URL,
    NEXT_PUBLIC_GET_TAGS_URL: process.env.NEXT_PUBLIC_GET_TAGS_URL,
    NEXT_PUBLIC_GET_PROJECT_FROM_REPO_URL:
      process.env.NEXT_PUBLIC_GET_PROJECT_FROM_REPO_URL,
    NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL:
      process.env.NEXT_PUBLIC_GET_PROJECTS_FILTERS_URL,
    NEXT_PUBLIC_GET_SEARCH_PATHS_URL:
      process.env.NEXT_PUBLIC_GET_SEARCH_PATHS_URL,
  };
};

const checkedEnv = checkEnv();

export default checkedEnv;
