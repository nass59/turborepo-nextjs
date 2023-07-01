import Link from "next/link"
import { cn } from "ui"

import { NavItem } from "types"

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
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
            className={cn(
              "flex w-full items-center rounded-md p-2 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2",
              {
                "bg-muted": pathname === item.href,
              }
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full items-center rounded-md p-2 opacity-60"
          >
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null
}
