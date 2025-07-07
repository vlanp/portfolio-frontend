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
  NEXT_PUBLIC_GET_MAIN_PICTURE_URL: string;
  NEXT_PUBLIC_GITHUB_URL: string;
  NEXT_PUBLIC_LINKEDIN_URL: string;
  NEXT_PUBLIC_GET_TIMELINE_DATAS_NO_MD: string;
  NEXT_PUBLIC_GET_TIMELINE_DATA_MD_CONTENT: string;
  NEXT_PUBLIC_GET_ARTICLES_NO_MD: string;
  NEXT_PUBLIC_GET_ARTICLES_MD_CONTENT: string;
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
  if (!process.env.NEXT_PUBLIC_GET_MAIN_PICTURE_URL) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_MAIN_PICTURE_URL"
    );
  }
  if (!process.env.NEXT_PUBLIC_GITHUB_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_GITHUB_URL");
  }
  if (!process.env.NEXT_PUBLIC_LINKEDIN_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_LINKEDIN_URL");
  }
  if (!process.env.NEXT_PUBLIC_GET_TIMELINE_DATAS_NO_MD) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_TIMELINE_DATA_NO_MD"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_TIMELINE_DATA_MD_CONTENT) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_TIMELINE_DATA_MD_CONTENT"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_ARTICLES_NO_MD) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_ARTICLES_NO_MD"
    );
  }
  if (!process.env.NEXT_PUBLIC_GET_ARTICLES_MD_CONTENT) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_GET_ARTICLES_MD_CONTENT"
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
    NEXT_PUBLIC_GET_MAIN_PICTURE_URL:
      process.env.NEXT_PUBLIC_GET_MAIN_PICTURE_URL,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_GET_TIMELINE_DATAS_NO_MD:
      process.env.NEXT_PUBLIC_GET_TIMELINE_DATAS_NO_MD,
    NEXT_PUBLIC_GET_TIMELINE_DATA_MD_CONTENT:
      process.env.NEXT_PUBLIC_GET_TIMELINE_DATA_MD_CONTENT,
    NEXT_PUBLIC_GET_ARTICLES_NO_MD: process.env.NEXT_PUBLIC_GET_ARTICLES_NO_MD,
    NEXT_PUBLIC_GET_ARTICLES_MD_CONTENT:
      process.env.NEXT_PUBLIC_GET_ARTICLES_MD_CONTENT,
  };
};

const checkedEnv = checkEnv();

export default checkedEnv;
