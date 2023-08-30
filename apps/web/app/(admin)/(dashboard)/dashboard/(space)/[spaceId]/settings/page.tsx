import { redirect } from "next/navigation"
import { routes } from "@/constants/routes"
import { auth } from "@clerk/nextjs"

import { findOneSpace } from "@/lib/database/space"
import { parseData } from "@/lib/utils"
import { SettingsForm } from "@/components/admin/settings-form"

interface SettingsProps {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches the first space with the given spaceId from the database for the user.
 * It then displays the settings form of the active space.
 */
const Page = async ({ params }: SettingsProps) => {
  const { userId } = auth()

  if (!userId) {
    return redirect(routes.signIn)
  }

  const space = await findOneSpace(params.spaceId, userId)

  if (!space) {
    return redirect(routes.dashboard)
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={parseData(space)} />
      </div>
    </div>
  )
}

export default Page
