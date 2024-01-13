import { redirect } from "next/navigation"

import { type LayoutProps } from "@/types/common"
import { routes } from "@/constants/routes"
import { Container } from "@/features/admin/common/ui/container"
import { Navbar } from "@/features/admin/common/ui/navbar"
import { getCurrentUserId } from "@/features/admin/common/utilities/user"
import { getSpace } from "@/features/admin/space/utilities/space"

type SpaceLayoutProps = LayoutProps & {
  params: {
    spaceId: string
  }
}

export const revalidate = 0

export default async function Layout({ children, params }: SpaceLayoutProps) {
  const userId = getCurrentUserId()
  const space = await getSpace(params.spaceId, userId)

  if (!space) {
    redirect(routes.dashboard)
  }

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  )
}
