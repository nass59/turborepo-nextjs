import { redirect } from "next/navigation"

import { routes } from "@/constants/routes"
import { parseData } from "@/lib/utils"
import { Heading, HeadingAction, Separator } from "@shared/ui"
import { apiRoutes } from "@/features/admin/common/constants/routes"
import { Api } from "@/features/admin/common/ui/api"
import { getCurrentUserId } from "@/features/admin/common/utilities/user"
import { SettingsForm } from "@/features/admin/setting/ui/form"
import { SPACE_LABELS } from "@/features/admin/space/constants/space"
import { DeleteSpaceModal } from "@/features/admin/space/ui/delete-space-modal"
import { getSpace } from "@/features/admin/space/utilities/space"

type Props = {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: Props) {
  const userId = getCurrentUserId()
  const space = await getSpace(params.spaceId, userId)

  if (!space) {
    redirect(routes.dashboard)
  }

  const { title, description } = SPACE_LABELS.edit

  return (
    <>
      <Heading title={title} description={description}>
        <HeadingAction>
          <DeleteSpaceModal />
        </HeadingAction>
      </Heading>

      <SettingsForm initialData={parseData(space)} />

      <Separator />

      <Api
        title="API - Space"
        path={`${apiRoutes.spaces}/${params.spaceId}`}
        variant="public"
      />
    </>
  )
}
