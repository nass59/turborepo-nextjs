"use client"

import { useState, type PropsWithChildren } from "react"
import { useSelectedLayoutSegment } from "next/navigation"

import { type MainNavItem as TypeMainNavItem } from "types"
import { Button } from "@shared/ui"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { MobileNav } from "@/components/nav/mobile-nav"

import { MainNavItems } from "./main-nav-items"

type Props = PropsWithChildren & {
  items?: TypeMainNavItem[]
}

export const MainNav = ({ items, children }: Props) => {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const toggle = () => setShowMobileMenu(!showMobileMenu)
  const close = () => setShowMobileMenu(false)

  return (
    <div className="flex gap-6">
      <Logo />

      <MainNavItems
        items={items}
        segment={segment}
        className="hidden gap-2 md:flex"
      />

      <Button
        variant="ghost"
        size="md"
        className="space-x-2 md:hidden"
        onClick={toggle}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </Button>

      {showMobileMenu && items && (
        <MobileNav items={items} close={close} segment={segment}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
