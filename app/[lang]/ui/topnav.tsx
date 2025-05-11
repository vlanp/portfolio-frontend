"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  IdentificationIcon,
  HomeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { IDictionary } from "../dictionaries";

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
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "text-sidebar-foreground px-4 h-10 flex items-center justify-center gap-2 rounded-xl",
              {
                "bg-sidebar-ring text-sidebar-primary-foreground":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default TopNav;
