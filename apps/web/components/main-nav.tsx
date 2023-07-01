"use client"

import { useState } from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { cn } from "ui"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export const MainNav = ({ items, children }: MainNavProps) => {
  // @see https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#useselectedlayoutsegments
  const segment = useSelectedLayoutSegment()

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const close = () => setShowMobileMenu(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="inline-block font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-semibold text-slate-600 transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/70",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
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

      {showMobileMenu && items && (
        <MobileNav items={items} close={close}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
