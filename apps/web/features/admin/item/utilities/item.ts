import { format } from "date-fns"

import { findAllItemsBySpaceId, findOneItem } from "@/lib/database/items"
import { type ItemModel } from "@/lib/database/models/Item"

import { type ItemColumn } from "../ui/columns"

export const getAllItems = async (spaceId: string): Promise<ItemColumn[]> => {
  const items = await findAllItemsBySpaceId({ spaceId })

  return items.map((item) => ({
    id: String(item._id),
    name: item.name,
    category: item.category,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
}

export const getItem = async (itemId: string): Promise<ItemModel | null> => {
  return await findOneItem(itemId)
}
