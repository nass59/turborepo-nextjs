import { redirect } from "next/navigation"
import { routes } from "@/constants/routes"
import { auth } from "@clerk/nextjs"

import { findOneSpace } from "@/lib/database/space"
import Navbar from "@/components/admin/navbar"

interface DashboardSpaceLayoutProps {
  children: React.ReactNode
  params: { spaceId: string }
}

export default async function DashboardSpaceLayout({
  children,
  params,
}: DashboardSpaceLayoutProps) {
  const { userId } = auth()

  if (!userId) {
    redirect(routes.signIn)
  }

  const space = await findOneSpace(params.spaceId, userId)

  if (!space) {
    redirect(routes.dashboard)
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </div>
    </>
  )
}
