import { UserButton } from "@clerk/nextjs"

import { routes } from "@/constants/routes"
import { parseData } from "@/lib/utils"
import MainNav from "@/components/admin/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { getAllSpaces } from "../utilities/space"
import { getCurrentUserId } from "../utilities/user"
import { SpaceSwitcher } from "./space-switcher"

export const Navbar = async () => {
  const userId = getCurrentUserId()
  const spaces = await getAllSpaces(userId)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SpaceSwitcher items={parseData(spaces)} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl={routes.home} />
        </div>
      </div>
    </div>
  )
}
