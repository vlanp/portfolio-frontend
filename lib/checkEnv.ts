interface EnvVariables {
  BACKEND_URL: string;
  GET_REPOS_URL: string;
  GET_LAST_TAG_URL: string;
  GET_TAG_URL: string;
  GET_REPO_URL: string;
  GET_FILE_CONTENT_URL: string;
}

const checkEnv = (): EnvVariables => {
  if (!process.env.BACKEND_URL) {
    throw new Error("Missing environment variable: BACKEND_URL");
  }
  if (!process.env.GET_REPOS_URL) {
    throw new Error("Missing environment variable: GET_REPOS_URL");
  }
  if (!process.env.GET_LAST_TAG_URL) {
    throw new Error("Missing environment variable: GET_LAST_TAG_URL");
  }
  if (!process.env.GET_TAG_URL) {
    throw new Error("Missing environment variable: GET_TAG_URL");
  }
  if (!process.env.GET_REPO_URL) {
    throw new Error("Missing environment variable: GET_REPO_URL");
  }
  if (!process.env.GET_FILE_CONTENT_URL) {
    throw new Error("Missing environment variable: GET_FILE_CONTENT_URL");
  }
  return {
    BACKEND_URL: process.env.BACKEND_URL,
    GET_REPOS_URL: process.env.GET_REPOS_URL,
    GET_LAST_TAG_URL: process.env.GET_LAST_TAG_URL,
    GET_TAG_URL: process.env.GET_TAG_URL,
    GET_REPO_URL: process.env.GET_REPO_URL,
    GET_FILE_CONTENT_URL: process.env.GET_FILE_CONTENT_URL,
  };
};

const checkedEnv = checkEnv();

export default checkedEnv;
