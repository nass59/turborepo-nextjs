import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import {
  createBillboard,
  findAllBillboardsBySpaceId,
} from "@/lib/database/billboard"
import { findOneSpace } from "@/lib/database/space"

type PostProps = {
  params: {
    spaceId: string
  }
}

interface JsonResponse {
  label: string | null
  imageUrl: string | null
}

export async function POST(req: Request, { params }: PostProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = (await req.json()) as JsonResponse
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

    const spaceByUserId = await findOneSpace(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await createBillboard({
      label,
      imageUrl,
      spaceId: params.spaceId,
    })

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

    const billboards = await findAllBillboardsBySpaceId(params.spaceId)

    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
