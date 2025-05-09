import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-providers";
import Favicon from "./favicon.ico";
import { ModeToggle } from "./ui/mode-toggle";
import TopNav from "./ui/topnav";
import { LangToggle } from "./ui/lang-toggle";
import { getDictionary, IDictionary } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border border-2 flex flex-row justify-between items-center px-5 h-header-height">
              <ModeToggle />
              <TopNav dictionary={dict} />
              <LangToggle dictionary={dict} />
            </header>
            <main className="flex flex-1">{children}</main>
            <footer></footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
