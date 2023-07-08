import { getServerSession } from "next-auth/next"
import { z } from "zod"

import {
  accessDeniedResponse,
  emptyResponse,
  errorResponse,
  successResponse,
} from "@/lib/api-response/api-responses"
import { authOptions } from "@/lib/auth"
import { deletePost, findPostForUser, updatePost } from "@/lib/database/post"
import { postSchema } from "@/lib/validation/post"

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return accessDeniedResponse()
    }

    const postId = String(params.postId)
    await deletePost(postId)

    return emptyResponse()
  } catch (error) {
    return errorResponse(error)
  }
}

// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return accessDeniedResponse()
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = postSchema.parse(json)

    const postId = params.postId
    await updatePost(postId, body)

    return successResponse()
  } catch (error) {
    return errorResponse(error)
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return accessDeniedResponse()
  }

  const { user } = session

  if (!user.email) {
    return new Response(null, { status: 401 })
  }

  const post = await findPostForUser(postId, user.email)

  return post !== null
}
