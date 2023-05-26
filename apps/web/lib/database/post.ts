import { ObjectId } from "mongodb"

import { type Post } from "types"
import clientPromise, { DATABASE_NAME } from "@lib/database/mongodb"

interface BodyPostProps {
  title?: string
  content?: string
}

interface Query {
  _id: ObjectId
  authorId?: string
}

const projection = {
  _id: { $toString: "$_id" },
  title: 1,
  content: 1,
  createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
}

async function getCollection() {
  const client = await clientPromise
  const database = client.db(DATABASE_NAME)

  return database.collection("posts")
}

async function findOne(query: Query): Promise<Post | null> {
  const collection = await getCollection()

  return await collection.findOne(query, { projection })
}

export async function findPost(postId: string): Promise<Post | null> {
  return await findOne({ _id: new ObjectId(postId) })
}

export async function findPostsForUser(userId: string): Promise<Post[]> {
  const collection = await getCollection()

  return await collection.find({ authorId: userId }, { projection }).toArray()
}

export async function deletePostForUser(postId: string, userId: string) {
  const collection = await getCollection()

  await collection.deleteOne({
    _id: new ObjectId(postId),
    authorId: userId,
  })
}

export async function findPostForUser(
  postId: string,
  userId: string
): Promise<Post | null> {
  return await findOne({
    _id: new ObjectId(postId),
    authorId: userId,
  })
}

export async function createPost(
  body: BodyPostProps,
  userId: string
): Promise<Post | null> {
  const collection = await getCollection()
  const result = await collection.insertOne({
    title: body.title,
    content: body.content || "",
    authorId: userId,
    createdAt: new Date(),
  })

  return !result.insertedId ? null : findPost(result.insertedId.toString())
}

export async function updatePost(
  postId: string,
  body: BodyPostProps,
  userId: string
) {
  const collection = await getCollection()
  const result = await collection.updateOne(
    {
      _id: new ObjectId(postId),
      authorId: userId,
    },
    {
      $set: {
        title: body.title,
        content: body.content || "",
        updatedAt: new Date(),
      },
    },
    { upsert: false }
  )

  if (result.modifiedCount !== 1) {
    throw new Error("Update failed")
  }
}
