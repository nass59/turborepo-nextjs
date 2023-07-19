import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { findOne } from "@/lib/database/space"
import { SettingsForm } from "@/components/admin/settings-form"

interface SettingsProps {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: SettingsProps) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const space = await findOne(params.spaceId, userId)

  if (!space) {
    return redirect("/dashboard")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={JSON.parse(JSON.stringify(space))} />
      </div>
    </div>
  )
}
