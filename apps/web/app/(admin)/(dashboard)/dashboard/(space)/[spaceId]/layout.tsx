import { type ReactNode } from "react"
import { redirect } from "next/navigation"
import { routes } from "@/constants/routes"
import { auth } from "@clerk/nextjs"

import { findOneSpace } from "@/lib/database/space"
import Navbar from "@/components/admin/navbar"

interface DashboardSpaceLayoutProps {
  children: ReactNode
  params: {
    spaceId: string
  }
}

/**
 * This component checks if the user is authenticated. If not, it redirects to the sign-in page.
 * It then checks if the space with the given spaceId exists for the authenticated user.
 * If not, it redirects to the dashboard page.
 */
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
