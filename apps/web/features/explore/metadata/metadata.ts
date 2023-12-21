import { type Metadata } from "next"

import { getCategory } from "../utilities/category"
import { getItem } from "../utilities/item"

export const getItemPageMetadata = async (
  slug: string
): Promise<Metadata | null> => {
  const item = await getItem(slug)

  if (!item) return null

  return {
    title: item.name,
  }
}

export const getCategoryPageMetadata = async (
  slug: string
): Promise<Metadata | null> => {
  const category = await getCategory(slug)

  if (!category) return null

  return {
    title: category.name,
  }
}
