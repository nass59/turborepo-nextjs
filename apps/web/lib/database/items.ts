import Item, { type ItemModel } from "@/lib/database/models/Item"
import {
  createOne,
  deleteOneById,
  findAll,
  findOneById,
  updateOneById,
} from "@/lib/database/queries"

type ItemModelProps = Pick<
  ItemModel,
  "name" | "categoryId" | "images" | "isFeatured" | "isArchived" | "spaceId"
>

type ItemModelUpdateProps = Omit<ItemModelProps, "spaceId">

export async function createItem(
  data: ItemModelProps
): Promise<ItemModel | null> {
  return createOne(Item, data)
}

export async function deleteOneItem(itemId: string): Promise<ItemModel | null> {
  return deleteOneById(Item, itemId)
}

export async function findAllItems(query: object): Promise<ItemModel[] | []> {
  return findAll(Item, query)
}

export async function findAllItemsBySpaceId(
  spaceId: string
): Promise<ItemModel[] | []> {
  return findAll(Item, { spaceId })
}

export async function findOneItem(itemId: string): Promise<ItemModel | null> {
  return findOneById(Item, itemId)
}

export async function updateOneItem(
  itemId: string,
  data: ItemModelUpdateProps
): Promise<ItemModel | null> {
  return updateOneById(Item, itemId, data)
}
