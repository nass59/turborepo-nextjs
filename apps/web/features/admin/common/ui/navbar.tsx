import { UserButton } from "@clerk/nextjs"

import { ThemeToggle } from "@/components/theme-toggle"

import { MobileNav } from "./mobile-nav"
import { NavbarActions } from "./navbar-actions"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background md:pl-56">
      <div className="flex h-16 items-center justify-between px-8">
        <MobileNav />

        <div className="ml-auto flex items-center space-x-4">
          <NavbarActions />
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}
