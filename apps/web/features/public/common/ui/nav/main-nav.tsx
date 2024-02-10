"use client"

import { useState, type PropsWithChildren } from "react"
import { usePathname } from "next/navigation"
import { Cross2Icon, RocketIcon } from "@radix-ui/react-icons"

import { type MainNavItem as TypeMainNavItem } from "types"
import { Button } from "@shared/ui"
import { Logo } from "@/components/logo"

import { MainNavItems } from "./main-nav-items"
import { MobileNav } from "./mobile-nav"

type Props = PropsWithChildren & {
  items?: TypeMainNavItem[]
}

export const MainNav = ({ items, children }: Props) => {
  const pathName = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const toggle = () => setShowMobileMenu(!showMobileMenu)
  const close = () => setShowMobileMenu(false)

  return (
    <div className="flex gap-6">
      <Logo />

      <MainNavItems
        items={items}
        pathName={pathName}
        className="hidden gap-2 md:flex"
      />

      <Button
        variant="ghost"
        size="md"
        className="space-x-2 md:hidden"
        onClick={toggle}
      >
        {showMobileMenu ? (
          <Cross2Icon className="size-5" />
        ) : (
          <RocketIcon className="size-5" />
        )}
        <span className="font-bold">Menu</span>
      </Button>

      {showMobileMenu && items && (
        <MobileNav items={items} close={close} pathName={pathName}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
