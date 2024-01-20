import { type PropsWithChildren } from "react"
import { type MainNavItem, type SidebarNavItem } from "@/types"

import { Sidebar } from "@/features/public/docs/ui/sidebar"

import { MainNav } from "../nav/main-nav"
import { HeaderActions } from "./header-actions"

type Props = PropsWithChildren & {
  mainNavItems: MainNavItem[]
  sidebarNavItems?: SidebarNavItem[]
}

export const Header = ({ mainNavItems, sidebarNavItems, children }: Props) => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <MainNav items={mainNavItems}>
          {sidebarNavItems && <Sidebar items={sidebarNavItems} />}
        </MainNav>
        {children}
        <HeaderActions />
      </div>
    </header>
  )
}
