import { Types } from "mongoose"

import { env } from "@/env.mjs"
import {
  findAllItemsBySpaceId,
  findOneItemWithCategory,
} from "@/lib/database/items"

export const getItem = async (itemId: string) => {
  return await findOneItemWithCategory(itemId, env.SPACE_ID, {
    isArchived: false,
  })
}

export const getFeaturedItems = async () => {
  return await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    isFeatured: true,
    isArchived: false,
  })
}

export const getItemsByCategory = async (categoryId: string) => {
  return await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    categoryId: categoryId,
    isArchived: false,
  })
}

export const getSuggestedItems = async (itemId: string, categoryId: string) => {
  return await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    _id: { $ne: new Types.ObjectId(itemId) },
    categoryId: categoryId,
    isArchived: false,
  })
}

export const getPageSlugs = async () => {
  const items = await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    isArchived: false,
  })

  return items.map((item) => ({ slug: String(item._id) }))
}
