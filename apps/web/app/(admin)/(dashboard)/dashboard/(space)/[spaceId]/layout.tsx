import { redirect } from "next/navigation"

import { type LayoutProps } from "@/types/common"
import { routes } from "@/constants/routes"
import { Navbar } from "@/features/dashboard/ui/navbar"
import { getSpace } from "@/features/dashboard/utilities/space"
import { getCurrentUserId } from "@/features/dashboard/utilities/user"

type SpaceLayoutProps = LayoutProps & {
  params: {
    spaceId: string
  }
}

export default async function Layout({ children, params }: SpaceLayoutProps) {
  // Get the current user's ID.
  const userId = getCurrentUserId()
  const space = await getSpace(params.spaceId, userId)

  if (!space) {
    redirect(routes.dashboard)
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
