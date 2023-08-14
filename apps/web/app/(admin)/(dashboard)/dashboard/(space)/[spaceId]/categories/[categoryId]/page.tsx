import { findAllBillboardsBySpaceId } from "@/lib/database/billboard"
import { findOneCategory } from "@/lib/database/category"
import { CategoryForm } from "@/components/admin/category-form"

interface CategoryProps {
  params: {
    spaceId: string
    categoryId: string
  }
}

export default async function Page({ params }: CategoryProps) {
  const category = await findOneCategory(params.categoryId)
  const billboards = await findAllBillboardsBySpaceId(params.spaceId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={JSON.parse(JSON.stringify(category))}
          billboards={JSON.parse(JSON.stringify(billboards))}
        />
      </div>
    </div>
  )
}
