import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import {
  deletePostForUser,
  findPostForUser,
  updatePost,
} from "@/lib/database/post"
import { postSchema } from "@/lib/validation/post"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (!user.email) {
    return res.status(401).end()
  }

  if (req.method === "PATCH") {
    try {
      const postId = req.query.postId as string
      const post = await findPostForUser(postId, user.email)

      if (!post) {
        throw new Error("Post not found.")
      }

      const body = postSchema.parse(req.body)
      await updatePost(postId, body, user.email)

      return res.end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }

  if (req.method === "DELETE") {
    try {
      const postId = req.query.postId as string
      await deletePostForUser(postId, user.email)

      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }
}

export default withMethods(["PATCH", "DELETE"], handler)
