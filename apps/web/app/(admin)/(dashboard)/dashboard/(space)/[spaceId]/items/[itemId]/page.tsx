import { findAllCategoriesBySpaceId } from "@/lib/database/category"
import { findOneItem } from "@/lib/database/items"
import { ItemForm } from "@/components/admin/item-form"

interface ItemProps {
  params: {
    spaceId: string
    itemId: string
  }
}

export default async function Page({ params }: ItemProps) {
  const item = await findOneItem(params.itemId)
  const categories = await findAllCategoriesBySpaceId(params.spaceId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ItemForm
          initialData={JSON.parse(JSON.stringify(item))}
          categories={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </div>
  )
}
