import { CATEGORY_LABELS } from "@/constants/category"
import { parseData } from "@/lib/utils"
import { DataTable } from "@shared/ui"
import { ListHeading } from "@/features/dashboard/ui/list-heading"
import { columns } from "@/features/dashboard/ui/list/categories"
import { getAllCategories } from "@/features/dashboard/utilities/category"

type Props = {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches all categories associated with a given spaceId from the database.
 * It then passes these data to the CategoryClient component for display and manipulation.
 */
export default async function Page({ params }: Props) {
  const categories = await getAllCategories(params.spaceId)

  return (
    // <div className="flex-col">
    //   <div className="flex-1 space-y-4 p-8 pt-6">
    //     <CategoryClient data={parseData(categories)} />
    //   </div>
    // </div>
    <>
      <ListHeading
        labels={CATEGORY_LABELS.list}
        value={categories.length}
        path="/categories/new"
      />

      <DataTable
        columns={columns}
        data={parseData(categories)}
        searchKey="name"
      />
    </>
  )
}
