import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import {
  deleteOneCategory,
  findOneCategory,
  updateOneCategory,
} from "@/lib/database/category"
import { countAllItems } from "@/lib/database/items"
import { findOneSpace } from "@/lib/database/space"

type ApiProps = {
  params: {
    spaceId: string
    categoryId: string
  }
}

type PatchProps = ApiProps
type DeleteProps = ApiProps

type GetProps = {
  params: {
    categoryId: string
  }
}

interface JsonResponse {
  name: string | null
  billboardId: string | null
}

export async function GET(req: Request, { params }: GetProps) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 })
    }

    const category = await findOneCategory(params.categoryId)

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_DELETE]", error)
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
    const { name, billboardId } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse("CategoryId Id is required", { status: 400 })
    }

    const spaceByUserId = await findOneSpace(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const category = await updateOneCategory(params.categoryId, {
      name,
      billboardId,
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: DeleteProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 })
    }

    const spaceByUserId = await findOneSpace(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const itemsByCategory = await countAllItems({
      spaceId: params.spaceId,
      categoryId: params.categoryId,
    })

    if (itemsByCategory > 0) {
      return new NextResponse(
        `You cannot delete this category. This category is attached to ${itemsByCategory} items. You must delete those items before.`,
        { status: 402 }
      )
    }

    const category = await deleteOneCategory(params.categoryId)

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
