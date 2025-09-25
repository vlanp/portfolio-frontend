interface IGitHubContent {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
}

export type { IGitHubContent };
