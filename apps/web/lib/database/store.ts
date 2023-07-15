import { Types } from "mongoose"

import Store, { type StoreModel } from "@/lib/database/models/Store"
import dbConnect from "@/lib/database/mongodb"

type StoreModelProps = Pick<StoreModel, "name" | "userId">
type StoreModelUpdateProps = Pick<StoreModel, "name">

export async function findAllByUserId(
  userId: string
): Promise<StoreModel[] | []> {
  await dbConnect()

  return await Store.find({ userId })
}

export async function create(
  data: StoreModelProps
): Promise<StoreModel | null> {
  await dbConnect()

  try {
    /* create a new model in the database */
    return await Store.create(data)
  } catch (error) {
    console.log("[STORES_CREATE]", error)
    return null
  }
}

export async function update(
  storeId: string,
  userId: string,
  data: StoreModelUpdateProps
): Promise<StoreModel | null> {
  await dbConnect()

  try {
    return await Store.findOneAndUpdate(
      {
        _id: new Types.ObjectId(storeId),
        userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    )
  } catch (error) {
    console.log("[STORES_FIND_ONE_AND_UPDATE]", error)
    return null
  }
}

export async function deleteOne(
  storeId: string,
  userId: string
): Promise<StoreModel | null> {
  await dbConnect()

  try {
    return await Store.findOneAndRemove({
      _id: new Types.ObjectId(storeId),
      userId,
    })
  } catch (error) {
    console.log("[STORES_DELETE_ONE]", error)
    return null
  }
}

export async function findOne(
  storeId: string,
  userId: string
): Promise<StoreModel | null> {
  await dbConnect()

  try {
    return await Store.findOne({
      _id: new Types.ObjectId(storeId),
      userId,
    })
  } catch (error) {
    console.log("[STORES_FIND_ONE]", error)
    return null
  }
}

export async function findFirstByUserId(
  userId: string
): Promise<StoreModel | null> {
  await dbConnect()

  try {
    return await Store.findOne({ userId })
  } catch (error) {
    console.log("[STORES_FIND_FIRST_BY_USER_ID]", error)
    return null
  }
}

export async function findFirstByStoreId(
  storeId: string
): Promise<StoreModel | null> {
  await dbConnect()

  try {
    return await Store.findOne({ _id: new Types.ObjectId(storeId) })
  } catch (error) {
    console.log("[STORES_FIND_FIRST_BY_STORE_ID]", error)
    return null
  }
}
