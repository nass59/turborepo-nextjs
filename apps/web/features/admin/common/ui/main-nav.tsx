"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { routes } from "@/constants/routes"
import { cn } from "@shared/ui"

import { navRoutes } from "../constants/navbar"

export const MainNav = () => {
  const pathname = usePathname()
  const { spaceId } = useParams()

  const routeSpace = `${routes.dashboard}/${spaceId}`

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navRoutes.map(({ path, key, label }) => {
        const href = `${routeSpace}${path}`
        const isActive = pathname === href

        return (
          <Link
            key={key}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              {
                "text-black dark:text-white": isActive,
                "text-muted-foreground": !isActive,
              }
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
