import { format } from "date-fns"

import { findAllCategoriesBySpaceId } from "@/lib/database/category"
import { parseData } from "@/lib/utils"
import { CategoryClient } from "@/components/admin/category-client"
import { type CategoryColumn } from "@/components/admin/category-columns"

interface PageProps {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches all categories associated with a given spaceId from the database.
 * It then passes these data to the CategoryClient component for display and manipulation.
 */
const Page = async ({ params }: PageProps) => {
  const categories = await findAllCategoriesBySpaceId(params.spaceId)

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    billboardLabel: item.billboard,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={parseData(formattedCategories)} />
      </div>
    </div>
  )
}

export default Page
