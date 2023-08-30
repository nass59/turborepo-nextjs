import { format } from "date-fns"

import { findAllItemsBySpaceId } from "@/lib/database/items"
import { parseData } from "@/lib/utils"
import { ItemClient } from "@/components/admin/item-client"
import { type ItemColumn } from "@/components/admin/item-columns"

interface PageProps {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches all items associated with a given spaceId from the database.
 * It then formats these items and passes them to the ItemClient component for display.
 */
const Page = async ({ params }: PageProps) => {
  const items = await findAllItemsBySpaceId(params.spaceId)

  const formattedItems: ItemColumn[] = items.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    category: item.category,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ItemClient data={parseData(formattedItems)} />
      </div>
    </div>
  )
}

export default Page
