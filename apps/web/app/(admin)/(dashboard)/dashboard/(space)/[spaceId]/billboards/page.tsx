import { format } from "date-fns"

import { findAllBySpaceId } from "@/lib/database/billboard"
import { BillboardClient } from "@/components/admin/billboard-client"
import { type BillboardColumn } from "@/components/admin/columns"

interface PageProps {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: PageProps) {
  const billboards = await findAllBySpaceId(params.spaceId)

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item._id.toString(),
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient
          data={JSON.parse(JSON.stringify(formattedBillboards))}
        />
      </div>
    </div>
  )
}
