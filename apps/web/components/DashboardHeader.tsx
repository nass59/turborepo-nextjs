import { User } from "next-auth"

import { dashboardConfig } from "@config/dashboard"
import { UserAccountNav } from "@components/UserAccountNav"
import { MainNav } from "@components/main-nav"

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  user: Pick<User, "name" | "email" | "image">
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <MainNav items={dashboardConfig.mainNav} />
        <UserAccountNav user={user} />
      </div>
    </header>
  )
}
