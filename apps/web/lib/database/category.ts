import { Types } from "mongoose"

import Category, { type CategoryModel } from "@/lib/database/models/Category"
import {
  aggregate,
  count,
  createOne,
  deleteOneById,
  findAll,
  findOneById,
  updateOneById,
} from "@/lib/database/queries"

import { type BillboardModel } from "./models/Billboard"

type CategoryModelProps = Pick<
  CategoryModel,
  "name" | "spaceId" | "billboardId"
>

type CategoryModelUpdateProps = Pick<CategoryModel, "name" | "billboardId">

type CategoriesAggregated = CategoryModel & { billboard: BillboardModel }

export async function countAllCategoriesBySpaceId(
  spaceId: string
): Promise<number> {
  return count(Category, { spaceId })
}

export async function countAllCategoriesBySpaceIdAndBillboardId(
  spaceId: string,
  billboardId: string
): Promise<number> {
  return count(Category, { spaceId, billboardId })
}

export async function createCategory(
  data: CategoryModelProps
): Promise<CategoryModel | null> {
  return createOne(Category, data)
}

export async function deleteOneCategory(
  categoryId: string
): Promise<CategoryModel | null> {
  return deleteOneById(Category, categoryId)
}

export async function findAllCategoriesBySpaceId(
  spaceId: string
): Promise<CategoryModel[] | []> {
  return findAll(Category, { spaceId })
}

const addBillboard = [
  {
    $addFields: {
      billboard: {
        $toObjectId: "$billboardId",
      },
    },
  },
  {
    $lookup: {
      from: "billboards",
      localField: "billboard",
      foreignField: "_id",
      as: "fromBillboards",
    },
  },
  {
    $set: {
      billboard: {
        $arrayElemAt: ["$fromBillboards", 0],
      },
    },
  },
  {
    $project: {
      fromBillboards: 0,
    },
  },
]

export async function findAllCategoriesWithDataBySpaceId(
  spaceId: string
): Promise<CategoriesAggregated[] | []> {
  return aggregate(Category, [
    {
      $match: {
        spaceId: spaceId,
      },
    },
    ...addBillboard,
  ])
}

export async function findOneCategoryWithData(
  categoryId: string,
  spaceId: string
): Promise<CategoriesAggregated | null> {
  const category = await aggregate<CategoriesAggregated[]>(Category, [
    {
      $match: {
        _id: new Types.ObjectId(categoryId),
        spaceId: spaceId,
      },
    },
    {
      $limit: 1,
    },
    ...addBillboard,
  ])

  return category[0] || null
}

export async function findOneCategory(
  categoryId: string
): Promise<CategoryModel | null> {
  return findOneById(Category, categoryId)
}

export async function updateOneCategory(
  categoryId: string,
  data: CategoryModelUpdateProps
): Promise<CategoryModel | null> {
  return updateOneById(Category, categoryId, data)
}
