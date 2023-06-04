"use client"

import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { DocsSidebarNavItems } from "@/components/docs/docs-sidebar-nav-items"

interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export const DocsSidebarNav = ({ items }: DocsSidebarNavProps) => {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-8">
          <h4 className="mb-1 ml-1 px-2 py-1 text-sm font-medium">
            {item.title}
          </h4>

          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}
