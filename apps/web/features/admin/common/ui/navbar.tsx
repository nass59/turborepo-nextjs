import { UserButton } from "@clerk/nextjs"

import { routes } from "@/constants/routes"
import { ThemeToggle } from "@/components/theme-toggle"

import { MobileNav } from "./mobile-nav"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background md:pl-56">
      <div className="flex h-16 items-center justify-between px-8">
        <div>
          <MobileNav />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl={routes.home} />
        </div>
      </div>
    </header>
  )
}
