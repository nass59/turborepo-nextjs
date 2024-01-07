import { format } from "date-fns"

import { findAllCategoriesWithDataBySpaceId } from "@/lib/database/category"
import { type CategoryColumn } from "@/components/admin/category-columns"

export const getAllCategories = async (
  spaceId: string
): Promise<CategoryColumn[]> => {
  const categories = await findAllCategoriesWithDataBySpaceId(spaceId)

  return categories.map((item) => ({
    id: String(item._id),
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
}
