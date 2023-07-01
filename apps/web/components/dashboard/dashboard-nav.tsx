"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "ui"

import { SidebarNavItem } from "types"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export const DashboardNav = ({ items }: DashboardNavProps) => {
  // @see https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#checking-active-links
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "post"]

        return (
          <Link
            key={index}
            href={item.disabled || !item.href ? "/" : item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2",
              path === item.href ? "bg-accent" : "bg-transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
