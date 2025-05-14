interface EnvVariables {
  NEXT_PUBLIC_BACKEND_URL: string;
  NEXT_PUBLIC_GET_REPOS_URL: string;
  NEXT_PUBLIC_GET_LAST_TAG_URL: string;
  NEXT_PUBLIC_GET_TAG_URL: string;
  NEXT_PUBLIC_GET_REPO_URL: string;
  NEXT_PUBLIC_GET_FILE_CONTENT_URL: string;
  NEXT_PUBLIC_GET_FILE_EXIST_URL: string;
}

const checkEnv = (): EnvVariables => {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw new Error("Missing environment variable: BACKEND_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_REPOS_URL) {
    throw new Error("Missing environment variable: GET_REPOS_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_LAST_TAG_URL) {
    throw new Error("Missing environment variable: GET_LAST_TAG_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_TAG_URL) {
    throw new Error("Missing environment variable: GET_TAG_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_REPO_URL) {
    throw new Error("Missing environment variable: GET_REPO_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_FILE_CONTENT_URL) {
    throw new Error("Missing environment variable: GET_FILE_CONTENT_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_FILE_EXIST_URL) {
    throw new Error("Missing environment variable: GET_FILE_EXIST_URL");
  }
  return {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_GET_REPOS_URL: process.env.NEXT_PUBLIC_GET_REPOS_URL,
    NEXT_PUBLIC_GET_LAST_TAG_URL: process.env.NEXT_PUBLIC_GET_LAST_TAG_URL,
    NEXT_PUBLIC_GET_TAG_URL: process.env.NEXT_PUBLIC_GET_TAG_URL,
    NEXT_PUBLIC_GET_REPO_URL: process.env.NEXT_PUBLIC_GET_REPO_URL,
    NEXT_PUBLIC_GET_FILE_CONTENT_URL:
      process.env.NEXT_PUBLIC_GET_FILE_CONTENT_URL,
    NEXT_PUBLIC_GET_FILE_EXIST_URL: process.env.NEXT_PUBLIC_GET_FILE_EXIST_URL,
  };
};

const checkedEnv = checkEnv();

export default checkedEnv;
