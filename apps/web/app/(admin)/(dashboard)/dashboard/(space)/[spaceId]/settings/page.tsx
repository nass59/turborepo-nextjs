import { redirect } from "next/navigation"

import { routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import { findOneSpace } from "@/lib/database/space"
import { parseData } from "@/lib/utils"
import { Heading } from "@shared/ui"
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
    return redirect(routes.dashboard)
  }

  return (
    <>
      <Heading
        title={SPACE_LABELS.edit.title}
        description={SPACE_LABELS.edit.desscription}
      />

      <SettingsForm initialData={parseData(space)} />
    </>
  )
}
