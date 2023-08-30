import { Types } from "mongoose"

import Space, { type SpaceModel } from "@/lib/database/models/Space"
import {
  createOne,
  deleteOne,
  findAll,
  findOne,
  updateOne,
} from "@/lib/database/queries"

type SpaceModelProps = Pick<SpaceModel, "name" | "userId">
type SpaceModelUpdateProps = Pick<SpaceModel, "name">

export async function createSpace(
  data: SpaceModelProps
): Promise<SpaceModel | null> {
  return createOne(Space, data)
}

export async function deleteOneSpace(
  spaceId: string,
  userId: string
): Promise<SpaceModel | null> {
  return deleteOne(Space, {
    _id: new Types.ObjectId(spaceId),
    userId,
  })
}

export async function findAllSpacesByUserId(
  userId: string
): Promise<SpaceModel[] | []> {
  return findAll(Space, { userId })
}

export async function findFirstBySpaceId(
  spaceId: string
): Promise<SpaceModel | null> {
  return findOne(Space, { _id: new Types.ObjectId(spaceId) })
}

export async function findFirstSpaceByUserId(
  userId: string
): Promise<SpaceModel | null> {
  return findOne(Space, { userId })
}

export async function findOneSpace(
  spaceId: string,
  userId: string
): Promise<SpaceModel | null> {
  return findOne(Space, {
    _id: new Types.ObjectId(spaceId),
    userId,
  })
}

export async function updateOneSpace(
  spaceId: string,
  userId: string,
  data: SpaceModelUpdateProps
): Promise<SpaceModel | null> {
  return updateOne(
    Space,
    {
      _id: new Types.ObjectId(spaceId),
      userId,
    },
    data
  )
}
