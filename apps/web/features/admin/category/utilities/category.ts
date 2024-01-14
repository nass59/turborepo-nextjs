import { format } from "date-fns"

import { findAllCategoriesWithDataBySpaceId } from "@/lib/database/category"
import Category, { type CategoryModel } from "@/lib/database/models/Category"
import { findOneById } from "@/lib/database/queries"

import { type CategoryColumn } from "../ui/columns"

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

export const getCategory = async (
  categoryId: string
): Promise<CategoryModel | null> => {
  return findOneById(Category, categoryId)
}
