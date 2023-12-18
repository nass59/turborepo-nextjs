import { env } from "@/env.mjs"
import { findAllCategoriesBySpaceId } from "@/lib/database/category"

const BASE_PATH = "/explore/category"

export const getCategoryRoutes = async () => {
  const categories = await findAllCategoriesBySpaceId(env.SPACE_ID)

  return categories.map((category) => ({
    href: `${BASE_PATH}/${category._id}`,
    title: category.name,
  }))
}
