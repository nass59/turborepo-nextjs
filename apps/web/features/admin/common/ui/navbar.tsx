import { UserButton } from "@clerk/nextjs"

import { routes } from "@/constants/routes"
import { ThemeToggle } from "@/components/theme-toggle"

export const Navbar = async () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-end px-8">
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl={routes.home} />
        </div>
      </div>
    </header>
  )
}
