import { getServerSession } from "next-auth/next"
import { z } from "zod"

import {
  accessDeniedResponse,
  errorResponse,
  successResponse,
} from "@/lib/api-response/api-responses"
import { authOptions } from "@/lib/auth"
import { updateUser } from "@/lib/database/user"
import { userNameSchema } from "@/lib/validation/user"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)

    if (!session?.user || params.userId !== session.user.id) {
      return accessDeniedResponse()
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    await updateUser(session.user.id, payload.name)

    return successResponse()
  } catch (error) {
    return errorResponse(error)
  }
}
