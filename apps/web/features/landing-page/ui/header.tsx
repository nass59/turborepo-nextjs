import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/nav/main-nav"

import { NavActions } from "./nav-actions"

export const Header = () => {
  return (
    <header className="container z-10 bg-background">
      <div className="flex h-20 items-center justify-between border-b py-6">
        <MainNav items={marketingConfig.mainNav} />
        <NavActions />
      </div>
    </header>
  )
}
