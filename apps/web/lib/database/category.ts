import { Types } from 'mongoose';

import Category, { type CategoryModel } from '@/lib/database/models/category';
import {
  aggregate,
  count,
  createOne,
  deleteOneById,
  findAll,
  findOneById,
  updateOneById,
} from '@/lib/database/queries';

import type { BillboardModel } from './models/billboard';

type CategoryModelProps = Pick<
  CategoryModel,
  'name' | 'spaceId' | 'billboardId'
>;

type CategoryModelUpdateProps = Pick<CategoryModel, 'name' | 'billboardId'>;

type CategoriesAggregated = CategoryModel & { billboard: BillboardModel };

export function countAllCategoriesBySpaceId(spaceId: string): Promise<number> {
  return count(Category, { spaceId });
}

export function countAllCategoriesBySpaceIdAndBillboardId(
  spaceId: string,
  billboardId: string
): Promise<number> {
  return count(Category, { spaceId, billboardId });
}

export function createCategory(
  data: CategoryModelProps
): Promise<CategoryModel | null> {
  return createOne(Category, data);
}

export function deleteOneCategory(
  categoryId: string
): Promise<CategoryModel | null> {
  return deleteOneById(Category, categoryId);
}

export function findAllCategoriesBySpaceId(
  spaceId: string
): Promise<CategoryModel[] | []> {
  return findAll(Category, { spaceId });
}

const addBillboard = [
  {
    $addFields: {
      billboard: {
        $toObjectId: '$billboardId',
      },
    },
  },
  {
    $lookup: {
      from: 'billboards',
      localField: 'billboard',
      foreignField: '_id',
      as: 'fromBillboards',
    },
  },
  {
    $set: {
      billboard: {
        $arrayElemAt: ['$fromBillboards', 0],
      },
    },
  },
  {
    $project: {
      fromBillboards: 0,
    },
  },
];

export function findAllCategoriesWithDataBySpaceId(
  spaceId: string
): Promise<CategoriesAggregated[] | []> {
  return aggregate(Category, [
    {
      $match: {
        spaceId,
      },
    },
    ...addBillboard,
  ]);
}

export async function findOneCategoryWithData(
  categoryId: string,
  spaceId: string
): Promise<CategoriesAggregated | null> {
  const category = await aggregate<CategoriesAggregated[]>(Category, [
    {
      $match: {
        _id: new Types.ObjectId(categoryId),
        spaceId,
      },
    },
    {
      $limit: 1,
    },
    ...addBillboard,
  ]);

  return category[0] || null;
}

export function findOneCategory(
  categoryId: string
): Promise<CategoryModel | null> {
  return findOneById(Category, categoryId);
}

export function updateOneCategory(
  categoryId: string,
  data: CategoryModelUpdateProps
): Promise<CategoryModel | null> {
  return updateOneById(Category, categoryId, data);
}
