import { findOneBillboard } from "@/lib/database/billboard"
import { parseData } from "@/lib/utils"
import { BillboardForm } from "@/components/admin/billboard-form"

interface BillboardProps {
  params: {
    billboardId: string
  }
}

/**
 * This component fetches a billboard associated with a given billboardId from the database.
 * It then passes these data to the BillboardForm component for display and manipulation.
 */
const Page = async ({ params }: BillboardProps) => {
  const billboard = await findOneBillboard(params.billboardId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={parseData(billboard)} />
      </div>
    </div>
  )
}

export default Page
