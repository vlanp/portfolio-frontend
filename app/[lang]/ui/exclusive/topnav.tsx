"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineIdentification,
  HiOutlineCalendarDateRange,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import { IoHammerOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { IDictionary } from "../../dictionaries/generated";
import { HiOutlineHand } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { mobileBreakpoint } from "@/types/IBreakpoints";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const TopNav = ({ dictionary }: { dictionary: IDictionary }) => {
  const pathname = "/" + (usePathname().split("/")[2] || "");
  const isBelowMobileBP = useIsBelowBP(mobileBreakpoint);

  const links = useMemo(
    () => [
      { name: dictionary.topNav.About, href: "/", icon: HiOutlineHand },
      {
        name: dictionary.topNav.Timeline,
        href: "/timeline",
        icon: HiOutlineCalendarDateRange,
      },
      {
        name: dictionary.topNav.Projects,
        href: "/projects",
        icon: IoHammerOutline,
      },
      {
        name: dictionary.topNav.Resume,
        href: "/resume",
        icon: HiOutlineIdentification,
      },
      {
        name: dictionary.topNav.Articles,
        href: "/articles",
        icon: HiOutlineNewspaper,
      },
    ],
    [dictionary.topNav]
  );

  useEffect(() => {
    if (isBelowMobileBP) {
      const pageName = links.filter((link) => link.href === pathname)[0]?.name;
      if (pageName) {
        toast(dictionary.topNav.PageNameToast({ pageName }));
      }
    }
  }, [links, pathname, isBelowMobileBP, dictionary.topNav]);
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink asChild>
              <Button
                size={"responsive"}
                asChild
                variant={pathname === link.href ? "outline" : "ghost"}
                title={link.name}
                className="flex flex-row items-center"
              >
                <Link className="text-[18px] py-0" href={link.href}>
                  <LinkIcon className="h-full size-fit py-1.5 sm:py-2" />
                  <span
                    className={cn(
                      "hidden",
                      pathname === link.href ? "md:flex" : "lg:flex"
                    )}
                  >
                    {link.name}
                  </span>
                </Link>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      })}
    </>
  );
};

export default TopNav;
