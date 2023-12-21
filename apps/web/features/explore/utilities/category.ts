import { env } from "@/env.mjs"
import {
  findAllCategoriesBySpaceId,
  findOneCategoryWithData,
} from "@/lib/database/category"

const BASE_PATH = "/explore/category"

export const getCategoryRoutes = async () => {
  const categories = await findAllCategoriesBySpaceId(env.SPACE_ID)

  return categories.map((category) => ({
    href: `${BASE_PATH}/${category._id}`,
    title: category.name,
  }))
}

export const getCategory = async (categoryId: string) => {
  return await findOneCategoryWithData(categoryId, env.SPACE_ID)
}

export const getPageSlugs = async () => {
  const categories = await findAllCategoriesBySpaceId(env.SPACE_ID)

  return categories.map((category) => ({ slug: String(category._id) }))
}
