import { redirect } from "next/navigation"

import { apiRoutes, routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import { parseData } from "@/lib/utils"
import { Separator } from "@shared/ui"
import { Api } from "@/features/dashboard/ui/api"
import { FormHeading } from "@/features/dashboard/ui/form/form-heading"
import { SettingsForm } from "@/features/dashboard/ui/form/setting"
import { getSpace } from "@/features/dashboard/utilities/space"
import { getCurrentUserId } from "@/features/dashboard/utilities/user"

type Props = {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches the first space with the given spaceId from the database for the user.
 * It then displays the settings form of the active space.
 */
export default async function Page({ params }: Props) {
  const userId = getCurrentUserId()
  const space = await getSpace(params.spaceId, userId)

  if (!space) {
    redirect(routes.dashboard)
  }

  return (
    <>
      <FormHeading labels={SPACE_LABELS.edit} />
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
