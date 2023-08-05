import { Types, isValidObjectId } from "mongoose"

import Billboard, { type BillboardModel } from "@/lib/database/models/Billboard"
import dbConnect from "@/lib/database/mongodb"

type BillboardModelProps = Pick<
  BillboardModel,
  "label" | "imageUrl" | "spaceId"
>

type BillboardModelUpdateProps = Pick<BillboardModel, "label" | "imageUrl">

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

export async function create(
  data: BillboardModelProps
): Promise<BillboardModel | null> {
  await dbConnect()

  try {
    return await Billboard.create(data)
  } catch (error) {
    console.log("[BILLBOARDS_CREATE]", error)
    return null
  }
}

export async function findAllBySpaceId(
  spaceId: string
): Promise<BillboardModel[] | []> {
  await dbConnect()

  return await Billboard.find({ spaceId })
}

export async function update(
  billboardId: string,
  data: BillboardModelUpdateProps
): Promise<BillboardModel | null> {
  await dbConnect()

  try {
    return await Billboard.findOneAndUpdate(
      { _id: new Types.ObjectId(billboardId) },
      data,
      {
        new: true,
        runValidators: true,
      }
    )
  } catch (error) {
    console.log("[BILLBOARDS_FIND_ONE_AND_UPDATE]", error)
    return null
  }
}

export async function deleteOne(
  billboardId: string
): Promise<BillboardModel | null> {
  await dbConnect()

  try {
    return await Billboard.findOneAndRemove({
      _id: new Types.ObjectId(billboardId),
    })
  } catch (error) {
    console.log("[BILLBOARDS_DELETE_ONE]", error)
    return null
  }
}

export async function findOneBillboard(
  billboardId: string
): Promise<BillboardModel | null> {
  await dbConnect()

  try {
    return await Billboard.findOne({
      _id: new Types.ObjectId(billboardId),
    })
  } catch (error) {
    console.log("[BILLBOARDS_FIND_ONE]", error)
    return null
  }
}
