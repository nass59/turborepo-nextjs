import { findAllCategoriesWithDataBySpaceId } from "@/lib/database/category"
import { findOneItem } from "@/lib/database/items"
import { parseData } from "@/lib/utils"
import { ItemForm } from "@/components/admin/item-form"

interface ItemProps {
  params: {
    spaceId: string
    itemId: string
  }
}

/**
 * This component fetches an item and all categories associated with a given spaceId from the database.
 * It then passes these data to the ItemForm component for display and manipulation.
 */
const Page = async ({ params }: ItemProps) => {
  const item = await findOneItem(params.itemId)
  const categories = await findAllCategoriesWithDataBySpaceId(params.spaceId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ItemForm
          initialData={parseData(item)}
          categories={parseData(categories)}
        />
      </div>
    </div>
  )
}

export default Page
