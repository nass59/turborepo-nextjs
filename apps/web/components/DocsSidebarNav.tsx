"use client";

import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem, NavItem } from "types";

interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export const DocsSidebarNav = ({ items }: DocsSidebarNavProps) => {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-8">
          <h4 className="mb-1 ml-1 px-2 py-1 text-sm font-medium">
            {item.title}
          </h4>
          <DocsSidebarNavItem
            items={item.items || []}
            pathname={pathname || ""}
          />
        </div>
      ))}
    </div>
  ) : null;
};

interface DocsSidebarNavItemsProps {
  items: NavItem[];
  pathname: string;
}

export const DocsSidebarNavItem = ({
  items,
  pathname,
}: DocsSidebarNavItemsProps) => {
  return items.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm pl-1">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          target={item.external ? "_blank" : ""}
          rel={item.external ? "noreferrer" : ""}
          className={cn(
            "flex w-full items-center rounded-md p-2 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2",
            item.disabled && "cursor-not-allowed opacity-60",
            {
              "bg-slate-100": pathname === item.href,
            }
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  ) : null;
};
