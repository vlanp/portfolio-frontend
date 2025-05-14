interface EnvVariables {
  BACKEND_URL: string;
  GET_REPOS_URL: string;
}

const checkEnv = (): EnvVariables => {
  if (!process.env.BACKEND_URL) {
    throw new Error("Missing environment variable: BACKEND_URL");
  }
  if (!process.env.GET_REPOS_URL) {
    throw new Error("Missing environment variable: GET_REPOS_URL");
  }
  return {
    BACKEND_URL: process.env.BACKEND_URL,
    GET_REPOS_URL: process.env.GET_REPOS_URL,
  };
};

const checkedEnv = checkEnv();

export default checkedEnv;
