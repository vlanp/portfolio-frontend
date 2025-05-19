"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IdentificationIcon,
  HomeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { IDictionary } from "../dictionaries";
import { Button } from "@/components/ui/button";

const TopNav = ({ dictionary }: { dictionary: IDictionary }) => {
  const pathname = "/" + (usePathname().split("/")[2] || "");

  const links = [
    { name: dictionary.topNav.Home, href: "/", icon: HomeIcon },
    {
      name: dictionary.topNav.Projects,
      href: "/projects",
      icon: BriefcaseIcon,
    },
    {
      name: dictionary.topNav.About,
      href: "/about",
      icon: IdentificationIcon,
    },
    { name: dictionary.topNav.Contact, href: "/contact", icon: EnvelopeIcon },
  ];
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Button
            key={link.name}
            size={"lg"}
            asChild
            variant={pathname === link.href ? "outline" : "link"}
          >
            <Link className="text-[18px]" href={link.href}>
              <LinkIcon className="h-full size-fit py-2" />
              <span className="hidden md:flex">{link.name}</span>
            </Link>
          </Button>
        );
      })}
    </>
  );
};

export default TopNav;
