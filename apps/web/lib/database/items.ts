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
import { type MonthlyItem } from "@/features/admin/home/types/overview"

type ItemModelProps = Pick<
  ItemModel,
  "name" | "categoryId" | "images" | "isFeatured" | "isArchived" | "spaceId"
>

type ItemModelUpdateProps = Omit<ItemModelProps, "spaceId">

type ItemsAggregated = ItemModel & { category: string }

export async function countAllItemsBySpaceId(spaceId: string): Promise<number> {
  return count(Item, { spaceId })
}

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

const itemsByMonth = [
  {
    $addFields: {
      createdAt: {
        $cond: {
          if: {
            $eq: [
              {
                $type: "$createdAt",
              },
              "date",
            ],
          },
          then: "$createdAt",
          else: null,
        },
      },
    },
  },
  {
    $addFields: {
      __alias_month: {
        month: {
          $subtract: [
            {
              $month: "$createdAt",
            },
            1,
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: {
        __alias_month: "$__alias_month",
      },
      __alias_count: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      __alias_month: "$_id.__alias_month",
      __alias_count: 1,
    },
  },
  {
    $project: {
      x: "$__alias_month",
      y: "$__alias_count",
      _id: 0,
    },
  },
]

type ItemsByMonth = {
  x: {
    month: number
  }
  y: number
}

const monthlyItems: MonthlyItem[] = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
]

export async function countAllItemsByMonthBySpaceId(
  spaceId: string
): Promise<MonthlyItem[]> {
  const result = await aggregate<ItemsByMonth[]>(Item, [
    {
      $match: {
        spaceId: spaceId,
      },
    },
    ...itemsByMonth,
    {
      $sort: {
        "x.month": 1,
      },
    },
    {
      $limit: 5000,
    },
  ])

  for (let i = 0; i < result.length; i++) {
    const item = result[i]

    if (item?.x.month) {
      const entry = monthlyItems[item.x.month] as MonthlyItem
      entry.total = item.y
    }
  }

  return monthlyItems
}
