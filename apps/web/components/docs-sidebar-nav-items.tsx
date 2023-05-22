import Link from "next/link"

import { NavItem } from "types"
import { cn } from "@lib/utils"

interface DocsSidebarNavItemsProps {
  items: NavItem[]
  pathname: string | null
}

export const DocsSidebarNavItems = ({
  items,
  pathname,
}: DocsSidebarNavItemsProps) => {
  return items.length ? (
    <div className="grid grid-flow-row auto-rows-max pl-1 text-sm">
      {items.map((item, index) =>
        item.href ? (
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
        ) : null
      )}
    </div>
  ) : null
}
