import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { findOne } from "@/lib/database/store"
import { SettingsForm } from "@/components/admin/settings-form"

interface SettingsProps {
  params: {
    storeId: string
  }
}

export default async function Page({ params }: SettingsProps) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const store = await findOne(params.storeId, userId)

  if (!store) {
    return redirect("/dashboard")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={JSON.parse(JSON.stringify(store))} />
      </div>
    </div>
  )
}
