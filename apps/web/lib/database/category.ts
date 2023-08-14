import Category, { type CategoryModel } from "@/lib/database/models/Category"
import {
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
