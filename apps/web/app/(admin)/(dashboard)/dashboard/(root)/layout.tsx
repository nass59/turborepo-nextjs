import { type ReactNode } from "react"
import { redirect } from "next/navigation"
import { routes } from "@/constants/routes"
import { auth } from "@clerk/nextjs"

import { findFirstSpaceByUserId } from "@/lib/database/space"

interface DashboardLayoutProps {
  children: ReactNode
}

/**
 * DashboardLayout is a layout component for the dashboard.
 * It checks if the user is authenticated and if the user has any spaces.
 * If the user is not authenticated, it redirects to the sign in page.
 * If the user has spaces, it redirects to the first space.
 * Otherwise, it renders the children components inside a main layout.
 */
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Get the current user's ID
  const { userId } = auth()

  // If the user is not authenticated, redirect to the sign in page
  if (!userId) {
    return redirect(routes.signIn)
  }

  // Find the first space that belongs to the user
  const space = await findFirstSpaceByUserId(userId)

  // If the user has a space, redirect to the dashboard of the first space
  if (space) {
    return redirect(`${routes.dashboard}/${space._id.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
