import { Types } from "mongoose"

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

const addCategory = [
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
      fromCategories: 0,
    },
  },
]

export async function findAllItemsBySpaceId(
  query: object
): Promise<ItemsAggregated[] | []> {
  return aggregate(Item, [
    {
      $match: query,
    },
    ...addCategory,
  ])
}

export async function findOneItem(itemId: string): Promise<ItemModel | null> {
  return findOneById(Item, itemId)
}

export async function findOneItemWithCategory(
  itemId: string,
  spaceId: string,
  query: object
): Promise<ItemsAggregated | null> {
  const result = await aggregate<ItemsAggregated[]>(Item, [
    {
      $match: {
        _id: new Types.ObjectId(itemId),
        spaceId: spaceId,
        ...query,
      },
    },
    ...addCategory,
    {
      $limit: 1,
    },
  ])

  return result[0] || null
}

export async function updateOneItem(
  itemId: string,
  data: ItemModelUpdateProps
): Promise<ItemModel | null> {
  return updateOneById(Item, itemId, data)
}
