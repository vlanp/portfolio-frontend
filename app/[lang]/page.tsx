import { ILang } from "@/types/ILang";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: ILang }>;
}) {
  return <section></section>;
}
