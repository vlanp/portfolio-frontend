import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-providers";
import Favicon from "./favicon.ico";
import { ModeToggle } from "./ui/mode-toggle";
import TopNav from "./ui/topnav";
import { LangToggle } from "./ui/lang-toggle";
import { getDictionary, IDictionary } from "./dictionaries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
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
  params: Promise<{ lang: "en" | "fr" }>;
}>) {
  const { lang } = await params;
  const dict: IDictionary = await getDictionary(lang);
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full flex flex-col">
            <header className="fixed w-full bg-sidebar-accent text-sidebar-foreground border-sidebar-border border-2 flex flex-row justify-between items-center px-5 h-header-height z-50">
              <ModeToggle />
              <TopNav dictionary={dict} />
              <LangToggle dictionary={dict} />
            </header>
            <main className="mt-header-height flex flex-1 p-5">{children}</main>
            <footer></footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
