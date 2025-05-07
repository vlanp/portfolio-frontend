import { getDictionary, IDictionary } from "./dictionaries";
import { ModeToggle } from "./ui/mode-toggle";
import TopNav from "./ui/topnav";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) {
  const { lang } = await params;
  const dict: IDictionary = await getDictionary(lang);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border border-2 flex flex-row p-5 justify-between">
        <ModeToggle />
        <TopNav dictionary={dict} />
      </header>
      <main className="flex flex-1"></main>
      <footer></footer>
    </div>
  );
}
