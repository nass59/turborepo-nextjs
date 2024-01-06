import { redirect } from "next/navigation"

import { env } from "@/env.mjs"
import { apiRoutes, routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import { findOneSpace } from "@/lib/database/space"
import { parseData } from "@/lib/utils"
import {
  Heading,
  HeadingAction,
  HeadingDescription,
  HeadingTitle,
  Separator,
} from "@shared/ui"
import { Api } from "@/features/dashboard/ui/api"
import { DeleteModal } from "@/features/dashboard/ui/delete-modal"
import { SettingsForm } from "@/features/dashboard/ui/form/setting"
import { getCurrentUserId } from "@/features/dashboard/utilities/user"

interface Props {
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
  const space = await findOneSpace(params.spaceId, userId)

  if (!space) {
    redirect(routes.dashboard)
  }

  return (
    <>
      <Heading>
        <HeadingTitle>{SPACE_LABELS.edit.title}</HeadingTitle>
        <HeadingDescription>
          {SPACE_LABELS.edit.desscription}
        </HeadingDescription>
        <HeadingAction>
          <DeleteModal />
        </HeadingAction>
      </Heading>

      <SettingsForm initialData={parseData(space)} />

      <Separator />

      <Api
        title="API - Space"
        description={`${env.NEXT_PUBLIC_APP_URL}${apiRoutes.spaces}/${params.spaceId}`}
        variant="public"
      />
    </>
  )
}
