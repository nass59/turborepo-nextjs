import { type PropsWithChildren } from "react"
import { type MainNavItem, type SidebarNavItem } from "@/types"

import { Sidebar } from "@/features/docs/ui/sidebar"

import { HeaderActions } from "./header-actions"
import { MainNav } from "./nav/main-nav"

type Props = PropsWithChildren & {
  mainNavItems: MainNavItem[]
  sidebarNavItems?: SidebarNavItem[]
}

export const Header = ({ mainNavItems, sidebarNavItems, children }: Props) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
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
