import { Types, isValidObjectId } from "mongoose"

import Billboard, { type BillboardModel } from "@/lib/database/models/Billboard"
import dbConnect from "@/lib/database/mongodb"

export async function findFirstByBillboardId(
  billboardId: string
): Promise<BillboardModel | null> {
  if (!isValidObjectId(billboardId)) {
    return null
  }

  await dbConnect()

  try {
    return await Billboard.findOne({ _id: new Types.ObjectId(billboardId) })
  } catch (error) {
    console.log("[BILLBOARDS_FIND_FIRST_BY_BILLBOARD_ID]", error)
    return null
  }
}
