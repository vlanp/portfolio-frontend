"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineIdentification,
  HiOutlineBriefcase,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { IDictionary } from "../dictionaries/generated";
import { HiOutlineHand } from "react-icons/hi";

const TopNav = ({ dictionary }: { dictionary: IDictionary }) => {
  const pathname = "/" + (usePathname().split("/")[2] || "");

  const links = [
    { name: dictionary.topNav.About, href: "/", icon: HiOutlineHand },
    {
      name: dictionary.topNav.Projects,
      href: "/projects",
      icon: HiOutlineBriefcase,
    },
    {
      name: dictionary.topNav.Resume,
      href: "/resume",
      icon: HiOutlineIdentification,
    },
    {
      name: dictionary.topNav.Contact,
      href: "/contact",
      icon: HiOutlineEnvelope,
    },
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
