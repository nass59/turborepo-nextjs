import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { findOne } from "@/lib/database/space"
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
    redirect("/sign-in")
  }

  const space = await findOne(params.spaceId, userId)

  if (!space) {
    redirect("/dashboard")
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
