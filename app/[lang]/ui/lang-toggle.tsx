"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDictionary } from "../dictionaries";
import { usePathname, useRouter } from "next/navigation";

export function LangToggle({ dictionary }: { dictionary: IDictionary }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle display language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setCookie("NEXT_LOCALE", "en");
            const newPath = pathname.replace(`/${currentLocale}`, "/en");
            router.push(newPath);
          }}
        >
          {dictionary.langToggle.English}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCookie("NEXT_LOCALE", "fr");
            const newPath = pathname.replace(`/${currentLocale}`, "/fr");
            router.push(newPath);
          }}
        >
          {dictionary.langToggle.French}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
