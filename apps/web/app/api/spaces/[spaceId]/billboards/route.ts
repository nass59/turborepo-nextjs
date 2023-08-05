import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { create, findAllBySpaceId } from "@/lib/database/billboard"
import { findOne } from "@/lib/database/space"

type PostProps = {
  params: {
    spaceId: string
  }
}

export async function POST(req: Request, { params }: PostProps) {
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

    if (!params.spaceId) {
      return new NextResponse("Space ID is required", { status: 400 })
    }

    const spaceByUserId = await findOne(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await create({ label, imageUrl, spaceId: params.spaceId })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request, { params }: PostProps) {
  try {
    if (!params.spaceId) {
      return new NextResponse("Space ID is required", { status: 400 })
    }

    const billboards = await findAllBySpaceId(params.spaceId)

    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
