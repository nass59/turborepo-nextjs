import { ObjectId } from "mongodb"

import { type User } from "types"
import clientPromise, { DATABASE_NAME } from "@/lib/database/mongodb"

interface Query {
  email: string
}

const projection = {
  _id: { $toString: "$_id" },
  title: 1,
  name: 1,
  email: 1,
  image: 1,
}

async function getCollection() {
  const client = await clientPromise
  const database = client.db(DATABASE_NAME)

  return database.collection("users")
}

async function findOne(query: Query): Promise<User | null> {
  const collection = await getCollection()

  return await collection.findOne(query, { projection })
}

export async function findUser(email: string): Promise<User | null> {
  return await findOne({ email })
}

export async function updateUser(userId: string, name: string) {
  const collection = await getCollection()
  const result = await collection.updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        name: name,
      },
    },
    { upsert: false }
  )

  if (result.matchedCount !== 1) {
    throw new Error("Update failed")
  }
}
