import { redirect } from "next/navigation"
import { UserButton, auth } from "@clerk/nextjs"

import { findAllByUserId } from "@/lib/database/store"
import { MainNav } from "@/components/admin/main-nav"
import StoreSwitcher from "@/components/admin/store-switcher"

const Navbar: React.FC = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const stores = await findAllByUserId(userId)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={JSON.parse(JSON.stringify(stores))} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
