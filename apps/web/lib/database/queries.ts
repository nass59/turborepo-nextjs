import {
  isValidObjectId,
  Types,
  type Model,
  type PipelineStage,
} from "mongoose"

import dbConnect from "@/lib/database/mongodb"

const QUERY_LABELS = {
  createOne: "CREATE_ONE",
  deleteOne: "DELETE_ONE",
  deleteOneById: "DELETE_ONE_BY_ID",
  findOne: "FIND_ONE",
  findOneById: "FIND_ONE_BY_ID",
  updateOne: "UPDATE_ONE",
  updateOneById: "UPDATE_ONE_BY_ID",
} as const

const log = (collectionName: string, queryType: string, error: unknown) => {
  console.log(`[${collectionName.toUpperCase()}_${queryType}]`, error)
}

export async function createOne<T>(
  collection: Model<any>,
  data: object
): Promise<T | null> {
  await dbConnect()

  try {
    return await collection.create(data)
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.createOne, error)
    return null
  }
}

export async function deleteOne<T>(
  collection: Model<any>,
  query: object
): Promise<T | null> {
  await dbConnect()

  try {
    return (await collection.findOneAndDelete(query)) as T
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.deleteOne, error)
    return null
  }
}

export async function deleteOneById<T>(
  collection: Model<any>,
  id: string
): Promise<T | null> {
  if (!isValidObjectId(id)) {
    return null
  }

  await dbConnect()

  try {
    return (await collection.findOneAndDelete({
      _id: new Types.ObjectId(id),
    })) as T
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.deleteOneById, error)
    return null
  }
}

export async function findAll<T>(
  collection: Model<any>,
  query: object
): Promise<T[] | []> {
  await dbConnect()

  return await collection.find(query).sort({ createdAt: -1 })
}

export async function findOne<T>(
  collection: Model<any>,
  query: object
): Promise<T | null> {
  await dbConnect()

  try {
    return await collection.findOne(query).sort({ createdAt: -1 })
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.findOne, error)
    return null
  }
}

export async function findOneById<T>(
  collection: Model<any>,
  id: string
): Promise<T | null> {
  if (!isValidObjectId(id)) {
    return null
  }

  await dbConnect()

  try {
    return await collection.findOne({
      _id: new Types.ObjectId(id),
    })
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.findOneById, error)
    return null
  }
}

export async function updateOne<T>(
  collection: Model<any>,
  query: object,
  data: object
): Promise<T | null> {
  await dbConnect()

  try {
    return await collection.findOneAndUpdate(query, data, {
      new: true,
      runValidators: true,
    })
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.updateOne, error)
    return null
  }
}

export async function updateOneById<T>(
  collection: Model<any>,
  id: string,
  data: object
): Promise<T | null> {
  if (!isValidObjectId(id)) {
    return null
  }

  await dbConnect()

  try {
    return await collection.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      data,
      {
        new: true,
        runValidators: true,
      }
    )
  } catch (error: unknown) {
    log(collection.name, QUERY_LABELS.updateOneById, error)
    return null
  }
}

export async function aggregate<T>(
  collection: Model<any>,
  query: PipelineStage[]
): Promise<T | never[]> {
  await dbConnect()

  return await collection.aggregate(query)
}

export async function count(
  collection: Model<any>,
  query: object
): Promise<number> {
  await dbConnect()

  return await collection.countDocuments(query)
}
