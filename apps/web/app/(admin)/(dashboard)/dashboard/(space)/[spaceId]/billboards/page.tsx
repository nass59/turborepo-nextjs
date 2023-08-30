import { format } from "date-fns"

import { findAllBillboardsBySpaceId } from "@/lib/database/billboard"
import { parseData } from "@/lib/utils"
import { BillboardClient } from "@/components/admin/billboard-client"
import { type BillboardColumn } from "@/components/admin/billboard-columns"

interface PageProps {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches all billboards associated with a given spaceId from the database.
 * It then passes these data to the BillboardClient component for display and manipulation.
 */
const Page = async ({ params }: PageProps) => {
  const billboards = await findAllBillboardsBySpaceId(params.spaceId)

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item._id.toString(),
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={parseData(formattedBillboards)} />
      </div>
    </div>
  )
}

export default Page
