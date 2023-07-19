import { Types } from "mongoose"

import Space, { type SpaceModel } from "@/lib/database/models/Space"
import dbConnect from "@/lib/database/mongodb"

type SpaceModelProps = Pick<SpaceModel, "name" | "userId">
type SpaceModelUpdateProps = Pick<SpaceModel, "name">

export async function findAllByUserId(
  userId: string
): Promise<SpaceModel[] | []> {
  await dbConnect()

  return await Space.find({ userId })
}

export async function create(
  data: SpaceModelProps
): Promise<SpaceModel | null> {
  await dbConnect()

  try {
    return await Space.create(data)
  } catch (error) {
    console.log("[SPACES_CREATE]", error)
    return null
  }
}

export async function update(
  spaceId: string,
  userId: string,
  data: SpaceModelUpdateProps
): Promise<SpaceModel | null> {
  await dbConnect()

  try {
    return await Space.findOneAndUpdate(
      {
        _id: new Types.ObjectId(spaceId),
        userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    )
  } catch (error) {
    console.log("[SPACES_FIND_ONE_AND_UPDATE]", error)
    return null
  }
}

export async function deleteOne(
  spaceId: string,
  userId: string
): Promise<SpaceModel | null> {
  await dbConnect()

  try {
    return await Space.findOneAndRemove({
      _id: new Types.ObjectId(spaceId),
      userId,
    })
  } catch (error) {
    console.log("[SPACES_DELETE_ONE]", error)
    return null
  }
}

export async function findOne(
  spaceId: string,
  userId: string
): Promise<SpaceModel | null> {
  await dbConnect()

  try {
    return await Space.findOne({
      _id: new Types.ObjectId(spaceId),
      userId,
    })
  } catch (error) {
    console.log("[SPACES_FIND_ONE]", error)
    return null
  }
}

export async function findFirstByUserId(
  userId: string
): Promise<SpaceModel | null> {
  await dbConnect()

  try {
    return await Space.findOne({ userId })
  } catch (error) {
    console.log("[SPACES_FIND_FIRST_BY_USER_ID]", error)
    return null
  }
}

export async function findFirstBySpaceId(
  spaceId: string
): Promise<SpaceModel | null> {
  await dbConnect()

  try {
    return await Space.findOne({ _id: new Types.ObjectId(spaceId) })
  } catch (error) {
    console.log("[SPACES_FIND_FIRST_BY_SPACE_ID]", error)
    return null
  }
}
