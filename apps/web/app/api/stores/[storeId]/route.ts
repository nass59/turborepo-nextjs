import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { deleteOne, update } from "@/lib/database/store"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    const store = await update(params.storeId, userId, { name })

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORES_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    const store = await deleteOne(params.storeId, userId)

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORES_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
