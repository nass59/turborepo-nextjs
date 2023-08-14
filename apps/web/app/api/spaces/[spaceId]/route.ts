import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { deleteOneSpace, updateOneSpace } from "@/lib/database/space"

export async function PATCH(
  req: Request,
  { params }: { params: { spaceId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!params.spaceId) {
      return new NextResponse("Space Id is required", { status: 400 })
    }

    const space = await updateOneSpace(params.spaceId, userId, { name })

    return NextResponse.json(space)
  } catch (error) {
    console.log("[SPACES_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { spaceId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.spaceId) {
      return new NextResponse("Space Id is required", { status: 400 })
    }

    const space = await deleteOneSpace(params.spaceId, userId)

    return NextResponse.json(space)
  } catch (error) {
    console.log("[SPACES_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
