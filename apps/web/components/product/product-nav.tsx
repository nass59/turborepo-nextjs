"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { type Category } from "@/config/product"
import { siteConfig } from "@/config/site"
import { cn } from "@shared/ui"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface ProductNavProps {
  data: Category[]
  children?: React.ReactNode
}

interface RoutesNavProps {
  href: string
  title: string
}

export const ProductNav = ({ data, children }: ProductNavProps) => {
  const pathName = usePathname()

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const close = () => setShowMobileMenu(false)

  const routes: RoutesNavProps[] = data.map((route) => ({
    href: `/products/category/${route._id}`,
    title: route.name,
  }))

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="inline-block font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {routes?.length ? (
        <nav className="hidden gap-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-lg font-semibold text-slate-600 transition-colors hover:text-foreground/80 sm:text-sm",
                route.href === pathName
                  ? "text-foreground"
                  : "text-foreground/70"
              )}
            >
              {route.title}
            </Link>
          ))}
        </nav>
      ) : null}

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>

      {showMobileMenu && routes && (
        <MobileNav items={routes} close={close}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
