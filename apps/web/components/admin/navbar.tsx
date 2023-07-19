import { redirect } from "next/navigation"
import { UserButton, auth } from "@clerk/nextjs"

import { findAllByUserId } from "@/lib/database/space"
import MainNav from "@/components/admin/main-nav"
import SpaceSwitcher from "@/components/admin/space-switcher"

const Navbar: React.FC = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const spaces = await findAllByUserId(userId)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SpaceSwitcher items={JSON.parse(JSON.stringify(spaces))} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
