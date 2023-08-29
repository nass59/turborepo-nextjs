import Item, { type ItemModel } from "@/lib/database/models/Item"
import {
  aggregate,
  count,
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

type ItemsAggregated = ItemModel & { category: string }

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

export async function countAllItems(query: object): Promise<number> {
  return count(Item, query)
}

export async function findAllItemsBySpaceId(
  spaceId: string
): Promise<ItemsAggregated[] | []> {
  return aggregate(Item, [
    {
      $match: {
        spaceId: spaceId,
      },
    },
    {
      $addFields: {
        category: {
          $toObjectId: "$categoryId",
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "fromCategories",
      },
    },
    {
      $set: {
        category: {
          $arrayElemAt: ["$fromCategories.name", 0],
        },
      },
    },
    {
      $project: {
        categoryId: 0,
        fromCategories: 0,
      },
    },
  ])
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
