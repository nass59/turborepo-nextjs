import { countAllBillboardsBySpaceId } from "@/lib/database/billboard"
import { countAllCategoriesBySpaceId } from "@/lib/database/category"
import {
  countAllItemsByMonthBySpaceId,
  countAllItemsBySpaceId,
} from "@/lib/database/items"

export const getOverview = async (spaceId: string) => {
  const totalBillboards = await countAllBillboardsBySpaceId(spaceId)
  const totalCategories = await countAllCategoriesBySpaceId(spaceId)
  const totalItems = await countAllItemsBySpaceId(spaceId)
  const monthlyItems = await countAllItemsByMonthBySpaceId(spaceId)

  return {
    totalBillboards,
    totalCategories,
    totalItems,
    monthlyItems,
  }
}
