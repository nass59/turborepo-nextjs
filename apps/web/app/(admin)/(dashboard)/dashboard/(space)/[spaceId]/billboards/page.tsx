import { BillboardClient } from "@/components/admin/billboard-client"

export default async function Page() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  )
}
