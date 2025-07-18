import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-providers";
import Favicon from "./favicon.ico";
import { ModeToggle } from "./ui/exclusive/mode-toggle";
import TopNav from "./ui/exclusive/topnav";
import { LangToggle } from "./ui/exclusive/lang-toggle";
import { getDictionary } from "./dictionaries";
import { IDictionary } from "./dictionaries/generated";
import { ILang } from "@/types/ILang";
import { Toaster } from "@/components/ui/sonner";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Valentin GUILLAUME Portfolio",
  description: "",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: ILang }>;
}>) {
  const { lang } = await params;
  const dict: IDictionary = await getDictionary(lang);
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP"
          crossOrigin="anonymous"
        />

        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js"
          integrity="sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${sans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 overflow-hidden">
            <NavigationMenu className="bg-card border-b border-border">
              <NavigationMenuList className="flex flex-row justify-around w-svw px-5 h-header-height">
                <NavigationMenuItem>
                  <ModeToggle />
                </NavigationMenuItem>
                <TopNav dictionary={dict} />
                <NavigationMenuItem>
                  <LangToggle dictionary={dict} />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </header>
          <main className="min-h-main-height flex flex-col">{children}</main>
          <Toaster />
          <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
