import { findAllBillboardsBySpaceId } from "@/lib/database/billboard"
import { findOneCategory } from "@/lib/database/category"
import { parseData } from "@/lib/utils"
import { CategoryForm } from "@/components/admin/category-form"

interface CategoryProps {
  params: {
    spaceId: string
    categoryId: string
  }
}

/**
 * This component fetches a category associated with a given categoryId and billboards from the database.
 * It then passes these data to the CategoryForm component for display and manipulation.
 */
const Page = async ({ params }: CategoryProps) => {
  const category = await findOneCategory(params.categoryId)
  const billboards = await findAllBillboardsBySpaceId(params.spaceId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={parseData(category)}
          billboards={parseData(billboards)}
        />
      </div>
    </div>
  )
}

export default Page
