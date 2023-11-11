import Category, { type CategoryModel } from "@/lib/database/models/Category"
import {
  aggregate,
  createOne,
  deleteOneById,
  findAll,
  findOneById,
  updateOneById,
} from "@/lib/database/queries"

type CategoryModelProps = Pick<
  CategoryModel,
  "name" | "spaceId" | "billboardId"
>

type CategoryModelUpdateProps = Pick<CategoryModel, "name" | "billboardId">

type CategoriesAggregated = CategoryModel & { billboard: string }

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

export async function findAllCategoriesWithDataBySpaceId(
  spaceId: string
): Promise<CategoriesAggregated[] | []> {
  return aggregate(Category, [
    {
      $match: {
        spaceId: spaceId,
      },
    },
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
          $arrayElemAt: ["$fromBillboards.label", 0],
        },
      },
    },
    {
      $project: {
        billboardId: 0,
        fromBillboards: 0,
      },
    },
  ])
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
