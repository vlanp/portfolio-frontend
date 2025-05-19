interface IProjectPageProps {
  params: Promise<{ id: string; lang: "en" | "fr" }>;
  searchParams: Promise<{
    sha?: string;
    filePath?: string;
  }>;
}

export default IProjectPageProps;
