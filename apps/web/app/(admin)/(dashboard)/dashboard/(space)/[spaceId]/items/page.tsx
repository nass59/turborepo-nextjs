import { format } from "date-fns"

import { findAllItemsBySpaceId } from "@/lib/database/items"
import { ItemClient } from "@/components/admin/item-client"
import { type ItemColumn } from "@/components/admin/item-columns"

interface PageProps {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: PageProps) {
  const items = await findAllItemsBySpaceId(params.spaceId)

  const formattedItems: ItemColumn[] = items.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    category: item.categoryId,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ItemClient data={JSON.parse(JSON.stringify(formattedItems))} />
      </div>
    </div>
  )
}
