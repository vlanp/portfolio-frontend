"use client";

import * as React from "react";
import { LuGlobe } from "react-icons/lu";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDictionary } from "../../dictionaries/generated";

export function LangToggle({ dictionary }: { dictionary: IDictionary }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());
  const currentLocale = pathname.split("/")[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LuGlobe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle display language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setCookie("NEXT_LOCALE", "en");
            const newPath = pathname.replace(`/${currentLocale}`, "/en");
            router.push(`${newPath}?${searchParams.toString()}`);
          }}
        >
          {dictionary.langToggle.English}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCookie("NEXT_LOCALE", "fr");
            const newPath = pathname.replace(`/${currentLocale}`, "/fr");
            router.push(`${newPath}?${searchParams.toString()}`);
          }}
        >
          {dictionary.langToggle.French}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
