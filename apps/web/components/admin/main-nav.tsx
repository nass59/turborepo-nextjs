"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@shared/ui"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routeSetting = `/dashboard/${params.storeId}/settings`
  const routes = [
    {
      href: routeSetting,
      label: "Settings",
      active: pathname === routeSetting,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
