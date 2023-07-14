import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { findOne } from "@/lib/database/store"
import Navbar from "@/components/admin/navbar"

interface DashboardStoreLayoutProps {
  children: React.ReactNode
  params: { storeId: string }
}

export default async function DashboardStoreLayout({
  children,
  params,
}: DashboardStoreLayoutProps) {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const store = await findOne(params.storeId, userId)

  if (!store) {
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
