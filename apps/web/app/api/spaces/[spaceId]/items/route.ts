import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { createItem, findAllItems } from "@/lib/database/items"
import { findOneSpace } from "@/lib/database/space"

type PostProps = {
  params: {
    spaceId: string
  }
}

const removeUndefinedValuesFromObject = <T>(obj: any): T => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key])
  return obj
}

export async function POST(req: Request, { params }: PostProps) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
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

    if (!params.spaceId) {
      return new NextResponse("Space ID is required", { status: 400 })
    }

    const spaceByUserId = await findOneSpace(params.spaceId, userId)

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const item = await createItem({
      name,
      categoryId,
      isFeatured,
      isArchived,
      images,
      spaceId: params.spaceId,
    })

    return NextResponse.json(item)
  } catch (error) {
    console.log("[ITEMS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request, { params }: PostProps) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    if (!params.spaceId) {
      return new NextResponse("Space ID is required", { status: 400 })
    }

    const items = await findAllItems(
      removeUndefinedValuesFromObject({
        spaceId: params.spaceId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      })
    )

    return NextResponse.json(items)
  } catch (error) {
    console.log("[ITEMS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
