import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { deleteOneItem, findOneItem, updateOneItem } from "@/lib/database/items"
import { findOneSpace } from "@/lib/database/space"

type ApiProps = {
  params: {
    spaceId: string
    itemId: string
  }
}

type PatchProps = ApiProps
type DeleteProps = ApiProps

type GetProps = {
  params: {
    itemId: string
  }
}

interface JsonResponse {
  name: string | null
  categoryId: string | null
  images: []
  isFeatured: boolean
  isArchived: boolean
}

export async function GET(req: Request, { params }: GetProps) {
  try {
    if (!params.itemId) {
      return new NextResponse("Item Id is required", { status: 400 })
    }

    const item = await findOneItem(params.itemId)

    return NextResponse.json(item)
  } catch (error) {
    console.log("[ITEMS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: PatchProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = (await req.json()) as JsonResponse
    const { name, categoryId, images, isFeatured, isArchived } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse("Category Id URL is required", { status: 400 })
    }

    const spaceByUserId = await findOneSpace(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const item = await updateOneItem(params.itemId, {
      name,
      categoryId,
      images,
      isFeatured,
      isArchived,
    })

    return NextResponse.json(item)
  } catch (error) {
    console.log("[ITEMS_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: DeleteProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.itemId) {
      return new NextResponse("Item Id is required", { status: 400 })
    }

    const spaceByUserId = await findOneSpace(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const item = await deleteOneItem(params.itemId)

    return NextResponse.json(item)
  } catch (error) {
    console.log("[ITEMS_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
