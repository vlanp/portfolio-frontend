"use client";

import {
  IdentificationIcon,
  HomeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Projects",
    href: "/projects",
    icon: BriefcaseIcon,
  },
  { name: "About", href: "/about", icon: IdentificationIcon },
  { name: "Contact", href: "/contact", icon: EnvelopeIcon },
];

const TopNav = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "text-sidebar-foreground w-30 h-10 flex items-center justify-center gap-2 rounded-xl",
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
