import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";
import TopNav from "./ui/topnav";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border border-2 flex flex-row p-5 justify-between">
        <ModeToggle />
        <TopNav />
      </header>
      <main className="flex flex-1"></main>
      <footer></footer>
    </div>
  );
}
