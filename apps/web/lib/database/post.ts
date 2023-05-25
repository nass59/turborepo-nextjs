import { ObjectId } from "mongodb"

import clientPromise from "@lib/database/mongodb"

const DATABASE_NAME = process.env.MONGODB_DATABASE
export interface PostProps {
  title?: string
  content?: string
  createdAt?: string
}

export interface PostDocumentProps {
  post: {
    _id: string | ObjectId
    title?: string
    content?: string
    createdAt?: string
  }
}

export interface Query {
  _id: ObjectId
  authorId?: string
}

const projection = {
  _id: { $toString: "$_id" },
  title: 1,
  content: 1,
  createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
}

export async function createPost(
  body: PostProps,
  userId: string
): Promise<PostDocumentProps["post"] | null> {
  const client = await clientPromise
  const database = client.db(DATABASE_NAME)
  const collection = database.collection("posts")

  const result = await collection.insertOne({
    title: body.title,
    content: body.content || "",
    authorId: userId,
    createdAt: new Date(),
  })

  return !result.insertedId ? null : findPost(result.insertedId.toString())
}

async function findOne(
  query: Query
): Promise<PostDocumentProps["post"] | null> {
  const client = await clientPromise
  const database = client.db(DATABASE_NAME)
  const collection = database.collection("posts")

  return await collection.findOne(query, {
    projection,
  })
}

export async function findPost(
  postId: string
): Promise<PostDocumentProps["post"] | null> {
  return await findOne({
    _id: new ObjectId(postId),
  })
}

export async function findPostForUser(
  postId: string,
  userId: string
): Promise<PostDocumentProps["post"] | null> {
  return await findOne({
    _id: new ObjectId(postId),
    authorId: userId,
  })
}

export async function findPostsForUser(
  userId: string
): Promise<PostDocumentProps["post"][]> {
  const client = await clientPromise
  const database = client.db(DATABASE_NAME)
  const collection = database.collection("posts")

  return await collection
    .find(
      {
        authorId: userId,
      },
      {
        projection,
      }
    )
    .toArray()
}
