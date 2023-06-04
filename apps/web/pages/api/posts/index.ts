import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { createPost } from "@/lib/database/post"

const postCreateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (!user.email) {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    try {
      return res.json([
        {
          title: "Test title",
          content: "Test content",
          authorId: user.email,
        },
      ])
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const body = postCreateSchema.parse(req.body)
      const post = await createPost(body, user.email)

      return res.json(post)
    } catch (error) {
      return error instanceof z.ZodError
        ? res.status(422).json(error.issues)
        : res.status(500).end()
    }
  }
}

export default withMethods(["GET", "POST"], handler)
