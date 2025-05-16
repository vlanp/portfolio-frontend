interface IProjectPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    sha?: string;
    filePath?: string;
  }>;
}

export default IProjectPageProps;
