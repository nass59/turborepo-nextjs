import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { deleteOne, findOneBillboard, update } from "@/lib/database/billboard"
import { findOne } from "@/lib/database/space"

type ApiProps = {
  params: {
    spaceId: string
    billboardId: string
  }
}

type PatchProps = ApiProps
type DeleteProps = ApiProps

type GetProps = {
  params: {
    billboardId: string
  }
}

export async function GET(req: Request, { params }: GetProps) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 })
    }

    const billboard = await findOneBillboard(params.billboardId)

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: PatchProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { label, imageUrl } = body

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 })
    }

    const spaceByUserId = await findOne(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await update(params.billboardId, { label, imageUrl })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: DeleteProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 })
    }

    const spaceByUserId = await findOne(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await deleteOne(params.billboardId)

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
