import { ILang } from "@/types/ILang";
import { ProjectsIconsProvider } from "../contexts/ProjectsIconsContext";

export default async function ProjectsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: ILang }>;
}>) {
  const { lang } = await params;
  return <ProjectsIconsProvider lang={lang}>{children}</ProjectsIconsProvider>;
}
