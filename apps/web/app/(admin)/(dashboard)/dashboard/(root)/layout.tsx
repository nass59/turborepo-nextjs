import { redirect } from "next/navigation"

import { type LayoutProps } from "@/types/common"
import { routes } from "@/constants/routes"
import { getCurrentUserId } from "@/features/admin/common/utilities/user"
import { getCurrentSpace } from "@/features/admin/space/utilities/space"

/**
 * DashboardLayout is a layout component for the dashboard.
 * It checks if the user is authenticated and if the user has any spaces.
 * If the user is not authenticated, it redirects to the sign in page.
 * If the user has spaces, it redirects to the first space.
 * Otherwise, it renders the children components inside a main layout.
 */
export default async function Layout({ children }: LayoutProps) {
  // Get the current user's ID
  const userId = getCurrentUserId()

  // Find the first space that belongs to the user
  const space = await getCurrentSpace(userId)

  // If the user has a space, redirect to the dashboard of the first space
  if (space) {
    return redirect(`${routes.dashboard}/${String(space._id)}`)
  }

  return (
    <main className="flex w-full flex-1 flex-col overflow-hidden">
      {children}
    </main>
  )
}
