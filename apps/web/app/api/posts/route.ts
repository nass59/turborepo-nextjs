import { getServerSession } from "next-auth/next"
import { z } from "zod"

import {
  accessDeniedResponse,
  errorResponse,
} from "@/lib/api-response/api-responses"
import { authOptions } from "@/lib/auth"
import { createPost, findPostsForUser } from "@/lib/database/post"

const postCreateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return accessDeniedResponse()
    }

    const { user } = session

    if (!user.email) {
      return accessDeniedResponse()
    }

    const posts = await findPostsForUser(user.email)

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return accessDeniedResponse()
    }

    const { user } = session

    if (!user.email) {
      return accessDeniedResponse()
    }

    const json = await req.json()
    const body = postCreateSchema.parse(json)
    const post = await createPost(body, user.email)

    return new Response(JSON.stringify(post))
  } catch (error) {
    return errorResponse(error)
  }
}
