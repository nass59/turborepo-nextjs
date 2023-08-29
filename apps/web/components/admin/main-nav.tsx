"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { routes } from "@/constants/routes"

import { cn } from "@shared/ui"

// MainNav component
export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const { spaceId } = useParams()

  // Define routes
  const routeSpace = `${routes.dashboard}/${spaceId}`
  const routeSetting = `${routeSpace}/settings`
  const routeBillboard = `${routeSpace}/billboards`
  const routeCategory = `${routeSpace}/categories`
  const routeItem = `${routeSpace}/items`

  // Define navigation routes
  const navRoutes = [
    {
      href: routeSpace,
      label: "Overview",
      active: pathname === routeSpace,
    },
    {
      href: routeBillboard,
      label: "Billboards",
      active: pathname === routeBillboard,
    },
    {
      href: routeCategory,
      label: "Categories",
      active: pathname === routeCategory,
    },
    {
      href: routeItem,
      label: "Items",
      active: pathname === routeItem,
    },
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
      {navRoutes.map(({ href, label, active }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
