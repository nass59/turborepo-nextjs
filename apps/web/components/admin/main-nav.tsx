"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { NAVIGATION_LABELS } from "@/constants/navigation"
import { routes } from "@/constants/routes"

import { cn } from "@shared/ui"

const MainNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const pathname = usePathname()
  const { spaceId } = useParams()

  // Define navigation routes
  const routeSpace = `${routes.dashboard}/${spaceId}`
  const navRoutes = [
    {
      href: routeSpace,
      label: NAVIGATION_LABELS.overview,
    },
    {
      href: `${routeSpace}/billboards`,
      label: NAVIGATION_LABELS.billboards,
    },
    {
      href: `${routeSpace}/categories`,
      label: NAVIGATION_LABELS.categories,
    },
    {
      href: `${routeSpace}/items`,
      label: NAVIGATION_LABELS.items,
    },
    {
      href: `${routeSpace}/settings`,
      label: NAVIGATION_LABELS.settings,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navRoutes.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === href
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
