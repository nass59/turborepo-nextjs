"use client"

import { usePathname } from "next/navigation"

import { type NavItem } from "types"

import { SidebarItem } from "./sidebar-item"

type Props = {
  items: NavItem[]
}

export const SidebarItems = ({ items }: Props) => {
  /**
   * You can use usePathname() to determine if a link is active
   * @see https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#checking-active-links
   */
  const pathname = usePathname()

  if (!items) return null

  return (
    <div className="grid grid-flow-row auto-rows-max pl-1 text-sm">
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          item={item}
          isActive={pathname === item.href}
        />
      ))}
    </div>
  )
}
