import { User } from "next-auth"

import { dashboardConfig } from "@/config/dashboard"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user/user-account-nav"

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  user: Pick<User, "name" | "email" | "image">
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={dashboardConfig.mainNav} />
        <UserAccountNav user={user} />
      </div>
    </header>
  )
}
