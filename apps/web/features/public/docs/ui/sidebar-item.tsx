import Link from "next/link"

import { type NavItem } from "types"
import { cn } from "@shared/ui"

type Props = {
  item: NavItem
  isActive: boolean
}

export const SidebarItem = ({ item, isActive }: Props) => {
  if (item.disabled || !item.href) {
    return (
      <span className="flex w-full items-center rounded-md p-2 opacity-60">
        {item.title}
      </span>
    )
  }

  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : ""}
      rel={item.external ? "noreferrer" : ""}
      className={cn(
        "flex w-full items-center rounded-md p-2 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2",
        {
          "bg-muted": isActive,
        }
      )}
    >
      {item.title}
    </Link>
  )
}
