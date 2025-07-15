import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { ELangs } from "./types/ILang";

const locales: string[] = Object.values(ELangs);

function getLocale(request: NextRequest) {
  const nextLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (nextLocale && locales.includes(nextLocale)) {
    return nextLocale;
  }
  const headers = Object.fromEntries(request.headers);
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en";
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // const headers = new Headers(request.headers);
  // headers.set("x-current-path", request.nextUrl.pathname);

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // if (pathnameHasLocale) return NextResponse.next({ headers });
  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  // return NextResponse.redirect(request.nextUrl, { headers });
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    {
      source: "/((?!_next).*)",
      missing: [{ type: "header", key: "next-action" }], // If not, receive undefined when calling server actions => https://github.com/vercel/next.js/issues/50659#issuecomment-1846046743 & https://www.reddit.com/r/nextjs/comments/1euu4vq/server_action_returning_undefined_on_client_even/
    },
  ],
};
